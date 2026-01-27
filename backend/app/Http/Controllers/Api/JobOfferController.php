<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JobOffer;
use App\Models\TourismActor;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class JobOfferController extends Controller
{
    // Liste publique des offres publiées
    public function index(Request $request): JsonResponse
    {
        $query = JobOffer::where('status', 'published')
            ->with(['tourismActor:id,name,city,region'])
            ->orderBy('created_at', 'desc');

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        if ($request->has('location')) {
            $query->where('location', 'like', '%' . $request->location . '%');
        }

        $offers = $query->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => $offers
        ]);
    }

    // Détails d'une offre
    public function show($id): JsonResponse
    {
        $offer = JobOffer::with(['tourismActor', 'applications.user'])
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $offer
        ]);
    }

    // Créer une offre (acteur connecté)
    public function store(Request $request): JsonResponse
    {
        $user = $request->user();
        if ($user->role !== 'actor') {
            return response()->json([
                'success' => false,
                'message' => 'Seuls les acteurs peuvent publier des offres'
            ], 403);
        }

        $actor = TourismActor::where('user_id', $user->id)->first();
        if (!$actor) {
            return response()->json([
                'success' => false,
                'message' => 'Acteur non trouvé'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'nullable|string',
            'location' => 'nullable|string',
            'type' => 'nullable|string',
            'salary_min' => 'nullable|numeric',
            'salary_max' => 'nullable|numeric',
            'requirements' => 'nullable|string',
            'benefits' => 'nullable|string',
            'expiry_date' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $offer = JobOffer::create([
            'tourism_actor_id' => $actor->id,
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
            'location' => $request->location,
            'type' => $request->type,
            'salary_min' => $request->salary_min,
            'salary_max' => $request->salary_max,
            'requirements' => $request->requirements,
            'benefits' => $request->benefits,
            'status' => $request->status ?? 'draft',
            'expiry_date' => $request->expiry_date,
        ]);

        return response()->json([
            'success' => true,
            'data' => $offer,
            'message' => 'Offre créée avec succès'
        ], 201);
    }

    // Mettre à jour une offre
    public function update(Request $request, $id): JsonResponse
    {
        $user = $request->user();
        $offer = JobOffer::with('tourismActor')->findOrFail($id);

        if ($offer->tourismActor->user_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Non autorisé'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'category' => 'nullable|string',
            'location' => 'nullable|string',
            'type' => 'nullable|string',
            'salary_min' => 'nullable|numeric',
            'salary_max' => 'nullable|numeric',
            'requirements' => 'nullable|string',
            'benefits' => 'nullable|string',
            'status' => 'sometimes|in:draft,published,closed',
            'expiry_date' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $offer->update($request->only([
            'title', 'description', 'category', 'location', 'type',
            'salary_min', 'salary_max', 'requirements', 'benefits',
            'status', 'expiry_date'
        ]));

        return response()->json([
            'success' => true,
            'data' => $offer,
            'message' => 'Offre mise à jour avec succès'
        ]);
    }

    // Supprimer une offre
    public function destroy(Request $request, $id): JsonResponse
    {
        $user = $request->user();
        $offer = JobOffer::with('tourismActor')->findOrFail($id);

        if ($offer->tourismActor->user_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Non autorisé'
            ], 403);
        }

        $offer->delete();

        return response()->json([
            'success' => true,
            'message' => 'Offre supprimée avec succès'
        ]);
    }

    // Liste des offres d'un acteur
    public function myOffers(Request $request): JsonResponse
    {
        $user = $request->user();
        $actor = TourismActor::where('user_id', $user->id)->first();

        if (!$actor) {
            return response()->json([
                'success' => false,
                'message' => 'Acteur non trouvé'
            ], 404);
        }

        $offers = JobOffer::where('tourism_actor_id', $actor->id)
            ->withCount('applications')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $offers
        ]);
    }
}
