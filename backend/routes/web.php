<?php

use Illuminate\Support\Facades\Route;

Route::get('/test-api', function () {
    $actors = \App\Models\TourismActor::where('status', 'active')->limit(5)->get();
    return response()->json([
        'success' => true,
        'count' => \App\Models\TourismActor::where('status', 'active')->count(),
        'sample' => $actors,
        'message' => 'API is working!'
    ]);
});
