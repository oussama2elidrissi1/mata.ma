<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class EventController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Event::query();

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

        // Filter by date (upcoming events)
        if ($request->has('upcoming') && $request->upcoming === 'true') {
            $query->where('event_date', '>=', now()->toDateString());
        }

        // Sort
        $sortBy = $request->get('sort_by', 'event_date');
        $sortDirection = $request->get('sort_direction', 'asc');
        $query->orderBy($sortBy, $sortDirection);

        // Pagination
        $perPage = $request->get('per_page', 15);
        $events = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $events->items(),
            'pagination' => [
                'current_page' => $events->currentPage(),
                'last_page' => $events->lastPage(),
                'per_page' => $events->perPage(),
                'total' => $events->total(),
            ]
        ]);
    }

    public function show($id): JsonResponse
    {
        $event = Event::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $event
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|in:Conférence,Salon,Formation,Networking,Autre',
            'event_date' => 'required|date',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i|after:start_time',
            'location' => 'required|string|max:255',
            'participants' => 'nullable|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120', // 5MB
            'featured' => 'nullable|boolean',
            'status' => 'nullable|in:draft,published,cancelled',
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
            $imagePath = $image->store('events', 'public');
            $data['image'] = $imagePath;
        }

        // Set default status if not provided
        if (!isset($data['status'])) {
            $data['status'] = 'published';
        }

        $event = Event::create($data);

        return response()->json([
            'success' => true,
            'data' => $event,
            'message' => 'Événement créé avec succès'
        ], 201);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $event = Event::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'category' => 'sometimes|required|in:Conférence,Salon,Formation,Networking,Autre',
            'event_date' => 'sometimes|required|date',
            'start_time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i|after:start_time',
            'location' => 'sometimes|required|string|max:255',
            'participants' => 'nullable|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
            'featured' => 'nullable|boolean',
            'status' => 'nullable|in:draft,published,cancelled',
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
            // Delete old image if exists
            if ($event->image && Storage::disk('public')->exists($event->image)) {
                Storage::disk('public')->delete($event->image);
            }
            $image = $request->file('image');
            $imagePath = $image->store('events', 'public');
            $data['image'] = $imagePath;
        }

        $event->update($data);

        return response()->json([
            'success' => true,
            'data' => $event,
            'message' => 'Événement mis à jour avec succès'
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $event = Event::findOrFail($id);

        // Delete image if exists
        if ($event->image && Storage::disk('public')->exists($event->image)) {
            Storage::disk('public')->delete($event->image);
        }

        $event->delete();

        return response()->json([
            'success' => true,
            'message' => 'Événement supprimé avec succès'
        ]);
    }
}
