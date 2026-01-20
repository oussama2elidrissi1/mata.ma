<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AccreditationRequest;
use App\Models\TourismActor;
use App\Mail\AccreditationRequestReceived;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;

class AccreditationRequestController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'tourism_actor_id' => 'required|exists:tourism_actors,id',
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'position' => 'nullable|string|max:255',
            'identity_document_type' => 'required|string|in:cin,passport,other',
            'identity_document_number' => 'required|string|max:50',
            'accreditation_document' => 'required|file|mimes:pdf,doc,docx,jpg,jpeg,png|max:10240', // 10MB
            'message' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Vérifier que l'acteur existe
        $actor = TourismActor::findOrFail($request->tourism_actor_id);

        // Vérifier s'il existe déjà une demande en cours (pending) pour cet acteur
        $existingRequest = AccreditationRequest::where('tourism_actor_id', $request->tourism_actor_id)
            ->where('status', 'pending')
            ->first();

        if ($existingRequest) {
            return response()->json([
                'success' => false,
                'message' => 'Une demande d\'accréditation est déjà en cours pour cet acteur. Veuillez attendre la validation ou le rejet de la demande existante.',
                'existing_request_id' => $existingRequest->id,
            ], 409); // 409 Conflict
        }

        // Upload du document
        $documentPath = null;
        if ($request->hasFile('accreditation_document')) {
            $file = $request->file('accreditation_document');
            $documentPath = $file->store('accreditation_documents', 'public');
        }

        // Créer la demande
        $accreditationRequest = AccreditationRequest::create([
            'tourism_actor_id' => $request->tourism_actor_id,
            'full_name' => $request->full_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'position' => $request->position,
            'identity_document_type' => $request->identity_document_type,
            'identity_document_number' => $request->identity_document_number,
            'accreditation_document' => $documentPath,
            'message' => $request->message,
            'status' => 'pending',
        ]);

        // Mettre à jour l'acteur avec le numéro d'accréditation demandé (si fourni)
        // L'acteur passe en statut pending s'il n'a pas encore de numéro
        if ($request->has('accreditation_number') && !empty($request->accreditation_number)) {
            $actor->update([
                'accreditation_number' => $request->accreditation_number,
                'status' => 'pending',
            ]);
        } elseif (empty($actor->accreditation_number)) {
            // Si pas de numéro fourni, l'acteur reste en pending pour la demande
            $actor->update([
                'status' => 'pending',
            ]);
        }

        // Envoyer un email de confirmation à l'utilisateur
        try {
            Mail::to($request->email)->send(new AccreditationRequestReceived($accreditationRequest));
        } catch (\Exception $e) {
            \Log::error('Erreur envoi email confirmation demande: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'data' => $accreditationRequest,
            'message' => 'Demande d\'accréditation soumise avec succès. Un email de confirmation a été envoyé.'
        ], 201);
    }

    public function index(Request $request): JsonResponse
    {
        $query = AccreditationRequest::with('tourismActor')
            ->orderBy('created_at', 'desc');

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filtrer par acteur si fourni
        if ($request->has('tourism_actor_id')) {
            $query->where('tourism_actor_id', $request->tourism_actor_id);
        }

        $perPage = $request->get('per_page', 15);
        $requests = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $requests->items(),
            'pagination' => [
                'current_page' => $requests->currentPage(),
                'last_page' => $requests->lastPage(),
                'per_page' => $requests->perPage(),
                'total' => $requests->total(),
            ]
        ]);
    }

    public function show($id): JsonResponse
    {
        $request = AccreditationRequest::with('tourismActor')->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $request
        ]);
    }

    /**
     * Approuver une demande d'accréditation
     */
    public function approve(Request $request, $id): JsonResponse
    {
        $accreditationRequest = AccreditationRequest::with('tourismActor')->findOrFail($id);
        
        if ($accreditationRequest->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Cette demande n\'est plus en attente.'
            ], 400);
        }

        $actor = $accreditationRequest->tourismActor;
        
        if (!$actor) {
            return response()->json([
                'success' => false,
                'message' => 'Acteur associé introuvable.'
            ], 404);
        }

        // Utiliser le contrôleur d'accréditation pour approuver
        $accreditationController = new \App\Http\Controllers\Api\AccreditationController();
        
        // Si la demande a un numéro d'accréditation, l'utiliser
        if ($actor->accreditation_number) {
            $request->merge(['accreditation_number' => $actor->accreditation_number]);
        }
        
        return $accreditationController->approve($request, $actor->id);
    }

    /**
     * Rejeter une demande d'accréditation
     */
    public function reject(Request $request, $id): JsonResponse
    {
        $accreditationRequest = AccreditationRequest::with('tourismActor')->findOrFail($id);
        
        if ($accreditationRequest->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Cette demande n\'est plus en attente.'
            ], 400);
        }

        $actor = $accreditationRequest->tourismActor;
        
        if (!$actor) {
            return response()->json([
                'success' => false,
                'message' => 'Acteur associé introuvable.'
            ], 404);
        }

        // Utiliser le contrôleur d'accréditation pour rejeter
        $accreditationController = new \App\Http\Controllers\Api\AccreditationController();
        return $accreditationController->reject($request, $actor->id);
    }
}
