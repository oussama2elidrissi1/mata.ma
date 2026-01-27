<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JobApplication;
use App\Models\JobOffer;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class JobApplicationController extends Controller
{
    // Postuler à une offre (candidat)
    public function store(Request $request): JsonResponse
    {
        $user = $request->user();
        if ($user->role !== 'user') {
            return response()->json([
                'success' => false,
                'message' => 'Accès réservé aux candidats'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'job_offer_id' => 'required|exists:job_offers,id',
            'cv_id' => 'nullable|exists:cvs,id',
            'cover_letter' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Vérifier que l'offre est publiée
        $offer = JobOffer::findOrFail($request->job_offer_id);
        if ($offer->status !== 'published') {
            return response()->json([
                'success' => false,
                'message' => 'Cette offre n\'est plus disponible'
            ], 400);
        }

        // Vérifier que le CV appartient à l'utilisateur
        if ($request->cv_id) {
            $cv = \App\Models\Cv::findOrFail($request->cv_id);
            if ($cv->user_id !== $user->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'CV non autorisé'
                ], 403);
            }
        }

        // Vérifier si l'utilisateur a déjà postulé
        $existing = JobApplication::where('job_offer_id', $request->job_offer_id)
            ->where('user_id', $user->id)
            ->first();

        if ($existing) {
            return response()->json([
                'success' => false,
                'message' => 'Vous avez déjà postulé à cette offre'
            ], 400);
        }

        $application = JobApplication::create([
            'job_offer_id' => $request->job_offer_id,
            'user_id' => $user->id,
            'cv_id' => $request->cv_id,
            'cover_letter' => $request->cover_letter,
            'status' => 'pending',
        ]);

        return response()->json([
            'success' => true,
            'data' => $application,
            'message' => 'Candidature envoyée avec succès'
        ], 201);
    }

    // Liste des candidatures d'un candidat
    public function myApplications(Request $request): JsonResponse
    {
        $user = $request->user();
        if ($user->role !== 'user') {
            return response()->json([
                'success' => false,
                'message' => 'Accès réservé aux candidats'
            ], 403);
        }

        $applications = JobApplication::where('user_id', $user->id)
            ->with(['jobOffer.tourismActor:id,name,city'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $applications
        ]);
    }

    // Liste des candidatures pour une offre (recruteur)
    public function offerApplications(Request $request, $offerId): JsonResponse
    {
        $user = $request->user();
        if ($user->role !== 'actor') {
            return response()->json([
                'success' => false,
                'message' => 'Accès réservé aux recruteurs'
            ], 403);
        }

        $offer = JobOffer::with('tourismActor')->findOrFail($offerId);

        if ($offer->tourismActor->user_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Non autorisé'
            ], 403);
        }

        $applications = JobApplication::where('job_offer_id', $offerId)
            ->with(['user:id,name,email', 'cv:id,first_name,last_name,email,phone'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $applications
        ]);
    }

    // Mettre à jour le statut d'une candidature (recruteur)
    public function updateStatus(Request $request, $id): JsonResponse
    {
        $user = $request->user();
        if ($user->role !== 'actor') {
            return response()->json([
                'success' => false,
                'message' => 'Accès réservé aux recruteurs'
            ], 403);
        }

        $application = JobApplication::with('jobOffer.tourismActor')->findOrFail($id);

        if ($application->jobOffer->tourismActor->user_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Non autorisé'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,reviewed,accepted,rejected',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $application->update([
            'status' => $request->status,
            'notes' => $request->notes,
        ]);

        return response()->json([
            'success' => true,
            'data' => $application,
            'message' => 'Statut mis à jour avec succès'
        ]);
    }
}
