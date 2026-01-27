<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cv;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class CvController extends Controller
{
    // Récupérer le CV de l'utilisateur connecté
    public function me(Request $request): JsonResponse
    {
        $user = $request->user();
        if ($user->role !== 'user') {
            return response()->json([
                'success' => false,
                'message' => 'Accès réservé aux candidats'
            ], 403);
        }

        $cv = Cv::where('user_id', $user->id)->first();

        return response()->json([
            'success' => true,
            'data' => $cv
        ]);
    }

    // Créer ou mettre à jour le CV
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
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'birth_date' => 'nullable|date',
            'summary' => 'nullable|string',
            'experience' => 'nullable|array',
            'education' => 'nullable|array',
            'skills' => 'nullable|array',
            'languages' => 'nullable|array',
            'cv_file' => 'nullable|file|mimes:pdf,doc,docx|max:5120',
            'status' => 'nullable|in:draft,published',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $cv = Cv::where('user_id', $user->id)->first();

        $data = $request->only([
            'first_name', 'last_name', 'email', 'phone', 'address',
            'birth_date', 'summary', 'experience', 'education',
            'skills', 'languages', 'status'
        ]);

        // Gérer l'upload du fichier CV
        if ($request->hasFile('cv_file')) {
            if ($cv && $cv->cv_file) {
                Storage::disk('public')->delete($cv->cv_file);
            }
            $data['cv_file'] = $request->file('cv_file')->store('cvs', 'public');
        }

        if ($cv) {
            $cv->update($data);
        } else {
            $data['user_id'] = $user->id;
            $cv = Cv::create($data);
        }

        return response()->json([
            'success' => true,
            'data' => $cv,
            'message' => 'CV enregistré avec succès'
        ]);
    }

    // Télécharger le fichier CV
    public function download(Request $request, $id)
    {
        $cv = Cv::findOrFail($id);
        $user = $request->user();

        // Vérifier que l'utilisateur peut accéder à ce CV
        if ($cv->user_id !== $user->id && $user->role !== 'actor') {
            return response()->json([
                'success' => false,
                'message' => 'Non autorisé'
            ], 403);
        }

        if (!$cv->cv_file || !Storage::disk('public')->exists($cv->cv_file)) {
            return response()->json([
                'success' => false,
                'message' => 'Fichier CV non trouvé'
            ], 404);
        }

        $filePath = Storage::disk('public')->path($cv->cv_file);
        $fileName = basename($cv->cv_file);
        
        return response()->download($filePath, $fileName);
    }

    // Mettre à jour le statut du CV
    public function updateStatus(Request $request): JsonResponse
    {
        $user = $request->user();
        if ($user->role !== 'user') {
            return response()->json([
                'success' => false,
                'message' => 'Accès réservé aux candidats'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:draft,published',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $cv = Cv::where('user_id', $user->id)->first();

        if (!$cv) {
            return response()->json([
                'success' => false,
                'message' => 'CV non trouvé'
            ], 404);
        }

        $cv->update(['status' => $request->status]);

        return response()->json([
            'success' => true,
            'data' => $cv,
            'message' => 'Statut mis à jour avec succès'
        ]);
    }

    // Supprimer le CV
    public function destroy(Request $request): JsonResponse
    {
        $user = $request->user();
        if ($user->role !== 'user') {
            return response()->json([
                'success' => false,
                'message' => 'Accès réservé aux candidats'
            ], 403);
        }

        $cv = Cv::where('user_id', $user->id)->first();

        if (!$cv) {
            return response()->json([
                'success' => false,
                'message' => 'CV non trouvé'
            ], 404);
        }

        // Supprimer le fichier CV s'il existe
        if ($cv->cv_file && Storage::disk('public')->exists($cv->cv_file)) {
            Storage::disk('public')->delete($cv->cv_file);
        }

        $cv->delete();

        return response()->json([
            'success' => true,
            'message' => 'CV supprimé avec succès'
        ]);
    }
}
