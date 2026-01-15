<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TourismActor;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ActorController extends Controller
{
    /**
     * Obtenir les informations de l'acteur connecté
     */
    public function me(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if ($user->role !== 'actor') {
            return response()->json([
                'success' => false,
                'message' => 'Accès non autorisé'
            ], 403);
        }

        $actor = TourismActor::where('user_id', $user->id)->first();

        if (!$actor) {
            return response()->json([
                'success' => false,
                'message' => 'Acteur non trouvé'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $actor
        ]);
    }

    /**
     * Mettre à jour les informations de l'acteur
     */
    public function update(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if ($user->role !== 'actor') {
            return response()->json([
                'success' => false,
                'message' => 'Accès non autorisé'
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
            'name' => 'sometimes|string|max:255',
            'name_ar' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'description_ar' => 'nullable|string',
            'address' => 'nullable|string|max:500',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:255',
            'services' => 'nullable|array',
            'languages' => 'nullable|array',
            'opening_hours' => 'nullable|array',
            'team_size' => 'nullable|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $actor->update($validator->validated());

        return response()->json([
            'success' => true,
            'data' => $actor,
            'message' => 'Informations mises à jour avec succès'
        ]);
    }

    /**
     * Upload du logo
     */
    public function uploadLogo(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if ($user->role !== 'actor') {
            return response()->json([
                'success' => false,
                'message' => 'Accès non autorisé'
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
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120', // 5MB
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Supprimer l'ancien logo s'il existe
        if ($actor->logo) {
            Storage::disk('public')->delete($actor->logo);
        }

        // Upload du nouveau logo
        $logoPath = $request->file('logo')->store('actors/logos', 'public');
        $actor->update(['logo' => $logoPath]);

        return response()->json([
            'success' => true,
            'data' => [
                'logo' => Storage::url($logoPath)
            ],
            'message' => 'Logo mis à jour avec succès'
        ]);
    }

    /**
     * Upload d'images
     */
    public function uploadImages(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if ($user->role !== 'actor') {
            return response()->json([
                'success' => false,
                'message' => 'Accès non autorisé'
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
            'images' => 'required|array|max:10',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:5120',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $uploadedImages = [];
        foreach ($request->file('images') as $image) {
            $imagePath = $image->store('actors/images', 'public');
            $uploadedImages[] = Storage::url($imagePath);
        }

        // Ajouter les nouvelles images aux images existantes
        $existingImages = $actor->images ?? [];
        $allImages = array_merge($existingImages, $uploadedImages);
        
        $actor->update(['images' => $allImages]);

        return response()->json([
            'success' => true,
            'data' => [
                'images' => $allImages
            ],
            'message' => 'Images ajoutées avec succès'
        ]);
    }

    /**
     * Supprimer une image
     */
    public function deleteImage(Request $request, $imageIndex): JsonResponse
    {
        $user = $request->user();
        
        if ($user->role !== 'actor') {
            return response()->json([
                'success' => false,
                'message' => 'Accès non autorisé'
            ], 403);
        }

        $actor = TourismActor::where('user_id', $user->id)->first();

        if (!$actor) {
            return response()->json([
                'success' => false,
                'message' => 'Acteur non trouvé'
            ], 404);
        }

        $images = $actor->images ?? [];
        
        if (isset($images[$imageIndex])) {
            // Supprimer le fichier
            $imagePath = str_replace('/storage/', '', $images[$imageIndex]);
            Storage::disk('public')->delete($imagePath);
            
            // Retirer de la liste
            unset($images[$imageIndex]);
            $images = array_values($images); // Réindexer
            
            $actor->update(['images' => $images]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Image supprimée avec succès'
        ]);
    }
}
