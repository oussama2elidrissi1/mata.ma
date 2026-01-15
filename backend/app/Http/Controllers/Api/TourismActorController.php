<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TourismActor;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class TourismActorController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = TourismActor::query();

        // Filtres
        if ($request->has('type')) {
            $query->byType($request->type);
        }

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        if ($request->has('region')) {
            $query->byRegion($request->region);
        }

        if ($request->has('city')) {
            $query->byCity($request->city);
        }

        if ($request->has('verified') && $request->verified === 'true') {
            $query->verified();
        }

        // Filtrer par accréditation (acteurs avec numéro d'accréditation)
        if ($request->has('accredited') && $request->accredited === 'true') {
            $query->whereNotNull('accreditation_number');
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        } elseif (!$request->has('all_status')) {
            // Par défaut, afficher seulement les actifs sauf si 'all_status' est demandé
            $query->active();
        }

        // Recherche
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('city', 'like', "%{$search}%")
                  ->orWhere('region', 'like', "%{$search}%");
            });
        }

        // Tri
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $request->get('per_page', 15);
        $actors = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $actors->items(),
            'pagination' => [
                'current_page' => $actors->currentPage(),
                'last_page' => $actors->lastPage(),
                'per_page' => $actors->perPage(),
                'total' => $actors->total(),
            ]
        ]);
    }

    public function show($id): JsonResponse
    {
        $actor = TourismActor::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $actor
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'type' => 'required|in:hotel,restaurant,travel_agency,tour_guide,transport,attraction,other,association',
            'address' => 'required|string',
            'city' => 'required|string',
            'region' => 'required|string',
            'email' => 'nullable|email',
            'phone' => 'nullable|string',
            'accreditation_number' => 'nullable|string|unique:tourism_actors',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Si créé par l'admin (authentifié), approuver automatiquement
        $data = $request->all();
        
        // L'admin est authentifié, donc on approuve automatiquement
        if ($request->user()) {
            $data['status'] = 'active';
            $data['verified'] = true;
            
            // Si un numéro d'accréditation est fourni, générer les dates
            if (!empty($data['accreditation_number']) && empty($data['accreditation_date'])) {
                $data['accreditation_date'] = now();
                $data['accreditation_expiry'] = now()->addYears(2);
            }
        } else {
            // Si créé sans authentification (demande publique), status = pending
            $data['status'] = 'pending';
            $data['verified'] = false;
        }

        $actor = TourismActor::create($data);

        return response()->json([
            'success' => true,
            'data' => $actor,
            'message' => 'Acteur créé avec succès' . ($request->user() ? ' et approuvé automatiquement' : '')
        ], 201);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $actor = TourismActor::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'type' => 'sometimes|required|in:hotel,restaurant,travel_agency,tour_guide,transport,attraction,other,association',
            'email' => 'nullable|email',
            'accreditation_number' => 'nullable|string|unique:tourism_actors,accreditation_number,' . $id,
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $actor->update($request->all());

        return response()->json([
            'success' => true,
            'data' => $actor,
            'message' => 'Acteur mis à jour avec succès'
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $actor = TourismActor::findOrFail($id);
        $actor->delete();

        return response()->json([
            'success' => true,
            'message' => 'Acteur supprimé avec succès'
        ]);
    }

    public function regions(): JsonResponse
    {
        $regions = TourismActor::select('region')
            ->distinct()
            ->whereNotNull('region')
            ->orderBy('region')
            ->pluck('region');

        return response()->json([
            'success' => true,
            'data' => $regions
        ]);
    }

    public function cities(Request $request): JsonResponse
    {
        $query = TourismActor::select('city')
            ->distinct()
            ->whereNotNull('city');

        if ($request->has('region')) {
            $query->where('region', $request->region);
        }

        $cities = $query->orderBy('city')->pluck('city');

        return response()->json([
            'success' => true,
            'data' => $cities
        ]);
    }

    /**
     * Approuver plusieurs acteurs en masse
     */
    public function bulkApprove(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'ids' => 'required|array',
            'ids.*' => 'required|integer|exists:tourism_actors,id',
            'with_badge' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $ids = $request->ids;
        $withBadge = $request->get('with_badge', false);
        $approved = 0;
        $errors = [];

        foreach ($ids as $id) {
            try {
                $actor = TourismActor::findOrFail($id);
                
                $data = [
                    'status' => 'active',
                    'verified' => true,
                ];

                if ($withBadge) {
                    // Si avec badge et pas de numéro, en générer un
                    if (empty($actor->accreditation_number)) {
                        $data['accreditation_number'] = 'MATA-' . strtoupper(uniqid());
                        $data['accreditation_date'] = now();
                        $data['accreditation_expiry'] = now()->addYears(2);
                    } else {
                        // Si numéro existe déjà, juste mettre à jour les dates si nécessaire
                        if (empty($actor->accreditation_date)) {
                            $data['accreditation_date'] = now();
                            $data['accreditation_expiry'] = now()->addYears(2);
                        }
                    }
                } else {
                    // Sans badge, s'assurer qu'il n'y a pas de numéro
                    $data['accreditation_number'] = null;
                    $data['accreditation_date'] = null;
                    $data['accreditation_expiry'] = null;
                }

                $actor->update($data);
                $approved++;
            } catch (\Exception $e) {
                $errors[] = "ID {$id}: " . $e->getMessage();
            }
        }

        return response()->json([
            'success' => true,
            'message' => "{$approved} acteur(s) approuvé(s) avec succès",
            'approved' => $approved,
            'total' => count($ids),
            'errors' => $errors
        ]);
    }
}
