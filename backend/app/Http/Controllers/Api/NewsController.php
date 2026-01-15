<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = News::query();

        // Filter by status (default: published)
        $status = $request->get('status', 'published');
        if ($status !== 'all') {
            $query->where('status', $status);
        }

        // Filter by category
        if ($request->has('category') && $request->category !== 'Tous') {
            $query->where('category', $request->category);
        }

        // Filter by featured
        if ($request->has('featured')) {
            $query->where('featured', $request->featured === 'true');
        }

        // Sort
        $sortBy = $request->get('sort_by', 'published_at');
        $sortDirection = $request->get('sort_direction', 'desc');
        $query->orderBy($sortBy, $sortDirection);

        // Pagination
        $perPage = $request->get('per_page', 15);
        $news = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $news->items(),
            'pagination' => [
                'current_page' => $news->currentPage(),
                'last_page' => $news->lastPage(),
                'per_page' => $news->perPage(),
                'total' => $news->total(),
            ]
        ]);
    }

    public function show($id): JsonResponse
    {
        $news = News::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $news
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string|max:500',
            'content' => 'required|string',
            'category' => 'nullable|string|max:100',
            'author' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120', // 5MB
            'featured' => 'nullable|boolean',
            'status' => 'nullable|in:draft,published,archived',
            'published_at' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->all();

        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store('news', 'public');
            $data['image'] = $imagePath;
        }

        // Set default values
        if (!isset($data['category'])) {
            $data['category'] = 'Actualité';
        }
        if (!isset($data['author'])) {
            $data['author'] = 'MATA';
        }
        if (!isset($data['status'])) {
            $data['status'] = 'published';
        }
        if (!isset($data['published_at']) && $data['status'] === 'published') {
            $data['published_at'] = now();
        }

        $news = News::create($data);

        return response()->json([
            'success' => true,
            'data' => $news,
            'message' => 'Article créé avec succès'
        ], 201);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $news = News::findOrFail($id);
        
        // Log pour débogage
        \Log::info('News update request', [
            'id' => $id,
            'all_data' => $request->all(),
            'has_image' => $request->hasFile('image'),
        ]);

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'excerpt' => 'sometimes|required|string|max:500',
            'content' => 'sometimes|required|string',
            'category' => 'nullable|string|max:100',
            'author' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
            'featured' => 'nullable|boolean',
            'status' => 'nullable|in:draft,published,archived',
            'published_at' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Récupérer les données du formulaire
        // Avec FormData, utiliser only() pour récupérer uniquement les champs nécessaires
        $data = $request->only([
            'title',
            'excerpt',
            'content',
            'category',
            'author',
            'status',
            'published_at'
        ]);
        
        // Filtrer les valeurs null/vides (sauf published_at qui peut être null)
        $data = array_filter($data, function($value, $key) {
            return $key === 'published_at' ? true : ($value !== null && $value !== '');
        }, ARRAY_FILTER_USE_BOTH);
        
        // Traiter featured séparément car c'est un booléen
        if ($request->has('featured')) {
            $featuredValue = $request->input('featured');
            $data['featured'] = $featuredValue === '1' || $featuredValue === 1 || $featuredValue === 'true' || $featuredValue === true;
        }

        // Handle image upload
        if ($request->hasFile('image')) {
            // Get the original image path (before accessor transformation)
            $originalImagePath = $news->getOriginal('image');
            
            // Delete old image if exists
            if ($originalImagePath) {
                // Si c'est une URL, extraire le chemin
                if (filter_var($originalImagePath, FILTER_VALIDATE_URL)) {
                    // C'est une URL externe (Unsplash), ne pas supprimer
                } else {
                    // C'est un chemin de stockage local
                    if (Storage::disk('public')->exists($originalImagePath)) {
                        Storage::disk('public')->delete($originalImagePath);
                    }
                }
            }
            
            $image = $request->file('image');
            $imagePath = $image->store('news', 'public');
            $data['image'] = $imagePath;
        }

        // Set published_at if status is published and not set
        if (isset($data['status']) && $data['status'] === 'published' && !isset($data['published_at']) && !$news->published_at) {
            $data['published_at'] = now();
        }

        // Log pour débogage
        \Log::info('News update data', [
            'id' => $id,
            'data_to_update' => $data,
            'data_count' => count($data),
            'news_before' => [
                'title' => $news->title,
                'excerpt' => $news->excerpt,
            ]
        ]);

        // Mettre à jour les champs
        if (!empty($data)) {
            $updated = $news->update($data);
            \Log::info('News update result', [
                'id' => $id,
                'update_result' => $updated,
                'news_after' => [
                    'title' => $news->fresh()->title,
                    'excerpt' => $news->fresh()->excerpt,
                ]
            ]);
            // Recharger le modèle pour avoir les données à jour
            $news->refresh();
        } else {
            \Log::warning('News update: no data to update', [
                'id' => $id,
                'request_all' => $request->all(),
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $news->fresh(), // Retourner les données fraîches depuis la base
            'message' => 'Article mis à jour avec succès'
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $news = News::findOrFail($id);

        // Delete image if exists
        if ($news->image && Storage::disk('public')->exists($news->image)) {
            Storage::disk('public')->delete($news->image);
        }

        $news->delete();

        return response()->json([
            'success' => true,
            'message' => 'Article supprimé avec succès'
        ]);
    }
}
