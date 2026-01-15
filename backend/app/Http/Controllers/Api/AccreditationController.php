<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TourismActor;
use App\Models\User;
use App\Models\AccreditationRequest;
use App\Mail\ActorAccountCreated;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AccreditationController extends Controller
{
    /**
     * Obtenir toutes les demandes d'accréditation en attente
     */
    public function index(Request $request): JsonResponse
    {
        $query = AccreditationRequest::with('tourismActor')
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc');

        $perPage = $request->get('per_page', 15);
        $requests = $query->paginate($perPage);

        // Transformer les données pour inclure les informations de l'acteur
        $data = $requests->map(function ($request) {
            $actor = $request->tourismActor;
            return [
                'id' => $actor->id,
                'request_id' => $request->id,
                'name' => $actor->name,
                'name_ar' => $actor->name_ar,
                'type' => $actor->type,
                'category' => $actor->category,
                'description' => $actor->description,
                'address' => $actor->address,
                'city' => $actor->city,
                'region' => $actor->region,
                'phone' => $actor->phone,
                'email' => $actor->email,
                'website' => $actor->website,
                'accreditation_number' => $actor->accreditation_number,
                'status' => $actor->status,
                'verified' => $actor->verified,
                'logo' => $actor->logo,
                'created_at' => $actor->created_at,
                // Informations de la demande
                'request' => [
                    'id' => $request->id,
                    'full_name' => $request->full_name,
                    'email' => $request->email,
                    'phone' => $request->phone,
                    'position' => $request->position,
                    'identity_document_type' => $request->identity_document_type,
                    'identity_document_number' => $request->identity_document_number,
                    'accreditation_document' => $request->accreditation_document,
                    'message' => $request->message,
                    'status' => $request->status,
                    'created_at' => $request->created_at,
                ],
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $data,
            'pagination' => [
                'current_page' => $requests->currentPage(),
                'last_page' => $requests->lastPage(),
                'per_page' => $requests->perPage(),
                'total' => $requests->total(),
            ]
        ]);
    }

    /**
     * Approuver une demande d'accréditation
     */
    public function approve(Request $request, $id): JsonResponse
    {
        // $id est l'ID de l'acteur, mais on peut aussi recevoir request_id
        $actor = TourismActor::findOrFail($id);
        
        // Récupérer la demande d'accréditation associée
        $accreditationRequest = AccreditationRequest::where('tourism_actor_id', $actor->id)
            ->where('status', 'pending')
            ->first();

        $validator = Validator::make($request->all(), [
            'accreditation_number' => 'nullable|string|unique:tourism_actors,accreditation_number,' . $id,
            'accreditation_date' => 'nullable|date',
            'accreditation_expiry' => 'nullable|date|after:accreditation_date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $data = [
            'status' => 'active',
            'verified' => true,
        ];

        // Si un numéro d'accréditation est fourni, c'est une demande avec badge
        if ($request->has('accreditation_number') && !empty($request->accreditation_number)) {
            $data['accreditation_number'] = $request->accreditation_number;
            $data['accreditation_date'] = $request->accreditation_date ?? now();
            $data['accreditation_expiry'] = $request->accreditation_expiry ?? now()->addYears(2);
        } else {
            // Si pas de numéro, on génère un numéro automatique
            if (empty($actor->accreditation_number)) {
                $data['accreditation_number'] = 'MATA-' . strtoupper(uniqid());
                $data['accreditation_date'] = now();
                $data['accreditation_expiry'] = now()->addYears(2);
            }
        }

        $actor->update($data);

        // Créer un compte utilisateur pour l'acteur s'il n'en a pas déjà un
        if (!$actor->user_id) {
            // Récupérer l'email de la demande d'accréditation
            $accreditationRequest = AccreditationRequest::where('tourism_actor_id', $actor->id)
                ->where('status', 'pending')
                ->first();

            $userEmail = $accreditationRequest ? $accreditationRequest->email : $actor->email;
            
            // Vérifier si un utilisateur avec cet email existe déjà
            $user = User::where('email', $userEmail)->first();
            
            if (!$user) {
                // Générer un mot de passe aléatoire
                $password = Str::random(12);
                
                // Créer l'utilisateur
                $user = User::create([
                    'name' => $actor->name,
                    'email' => $userEmail,
                    'password' => Hash::make($password),
                    'role' => 'actor',
                ]);
                
                // Lier l'acteur à l'utilisateur
                $actor->update(['user_id' => $user->id]);
                
                // Envoyer l'email avec les identifiants
                try {
                    Mail::to($userEmail)->send(new ActorAccountCreated($actor, $userEmail, $password));
                } catch (\Exception $e) {
                    \Log::error('Erreur envoi email compte acteur: ' . $e->getMessage());
                }
            } else {
                // Si l'utilisateur existe déjà, juste lier l'acteur
                $actor->update(['user_id' => $user->id]);
            }
        }

        // Mettre à jour le statut de la demande d'accréditation
        if ($accreditationRequest) {
            $accreditationRequest->update(['status' => 'approved']);
        } else {
            // Si pas de demande trouvée, créer une entrée pour historique
            AccreditationRequest::where('tourism_actor_id', $actor->id)
                ->where('status', 'pending')
                ->update(['status' => 'approved']);
        }

        return response()->json([
            'success' => true,
            'data' => $actor,
            'message' => 'Demande d\'accréditation approuvée avec succès. Un email a été envoyé avec les identifiants de connexion.'
        ]);
    }

    /**
     * Rejeter une demande d'accréditation
     */
    public function reject(Request $request, $id): JsonResponse
    {
        $actor = TourismActor::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'rejection_reason' => 'nullable|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Mettre à jour le statut de l'acteur
        $actor->update([
            'status' => 'inactive',
            'verified' => false,
            'accreditation_number' => null,
            'accreditation_date' => null,
            'accreditation_expiry' => null,
        ]);

        // Mettre à jour le statut de la demande d'accréditation
        AccreditationRequest::where('tourism_actor_id', $actor->id)
            ->where('status', 'pending')
            ->update(['status' => 'rejected']);

        return response()->json([
            'success' => true,
            'data' => $actor,
            'message' => 'Demande d\'accréditation rejetée'
        ]);
    }

    /**
     * Approuver sans badge (acteur actif mais sans accréditation)
     */
    public function approveWithoutBadge($id): JsonResponse
    {
        $actor = TourismActor::findOrFail($id);

        $actor->update([
            'status' => 'active',
            'verified' => true,
            'accreditation_number' => null,
            'accreditation_date' => null,
            'accreditation_expiry' => null,
        ]);

        // Créer un compte utilisateur pour l'acteur s'il n'en a pas déjà un
        if (!$actor->user_id) {
            $accreditationRequest = AccreditationRequest::where('tourism_actor_id', $actor->id)
                ->where('status', 'pending')
                ->first();

            $userEmail = $accreditationRequest ? $accreditationRequest->email : $actor->email;
            
            $user = User::where('email', $userEmail)->first();
            
            if (!$user) {
                $password = Str::random(12);
                
                $user = User::create([
                    'name' => $actor->name,
                    'email' => $userEmail,
                    'password' => Hash::make($password),
                    'role' => 'actor',
                ]);
                
                $actor->update(['user_id' => $user->id]);
                
                try {
                    Mail::to($userEmail)->send(new ActorAccountCreated($actor, $userEmail, $password));
                } catch (\Exception $e) {
                    \Log::error('Erreur envoi email compte acteur: ' . $e->getMessage());
                }
            } else {
                $actor->update(['user_id' => $user->id]);
            }
        }

        AccreditationRequest::where('tourism_actor_id', $actor->id)
            ->where('status', 'pending')
            ->update(['status' => 'approved']);

        return response()->json([
            'success' => true,
            'data' => $actor,
            'message' => 'Acteur approuvé sans badge. Un email a été envoyé avec les identifiants de connexion.'
        ]);
    }
}
