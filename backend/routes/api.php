<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TourismActorController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TourismActorImportController;
use App\Http\Controllers\Api\AccreditationController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\NewsController;

// Routes d'authentification
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');
});

// Routes publiques
Route::prefix('tourism-actors')->group(function () {
    Route::get('/', [TourismActorController::class, 'index']);
    Route::get('/{id}', [TourismActorController::class, 'show']);
    Route::get('/regions/list', [TourismActorController::class, 'regions']);
    Route::get('/cities/list', [TourismActorController::class, 'cities']);
});

// Routes protégées pour l'administration
Route::middleware('auth:sanctum')->prefix('tourism-actors')->group(function () {
    Route::post('/', [TourismActorController::class, 'store']);
    Route::put('/{id}', [TourismActorController::class, 'update']);
    Route::delete('/{id}', [TourismActorController::class, 'destroy']);
    Route::post('/import', [TourismActorImportController::class, 'import']);
    Route::post('/bulk-approve', [TourismActorController::class, 'bulkApprove']);
});

// Routes pour la gestion des accréditations
Route::middleware('auth:sanctum')->prefix('accreditations')->group(function () {
    Route::get('/', [AccreditationController::class, 'index']);
    Route::post('/{id}/approve', [AccreditationController::class, 'approve']);
    Route::post('/{id}/reject', [AccreditationController::class, 'reject']);
    Route::post('/{id}/approve-without-badge', [AccreditationController::class, 'approveWithoutBadge']);
});

// Routes pour les demandes d'accréditation (publiques et protégées)
Route::post('/accreditation-requests', [\App\Http\Controllers\Api\AccreditationRequestController::class, 'store']);
Route::middleware('auth:sanctum')->prefix('accreditation-requests')->group(function () {
    Route::get('/', [\App\Http\Controllers\Api\AccreditationRequestController::class, 'index']);
    Route::get('/{id}', [\App\Http\Controllers\Api\AccreditationRequestController::class, 'show']);
});

// Routes pour les acteurs (gestion de leur propre compte)
Route::middleware('auth:sanctum')->prefix('actor')->group(function () {
    Route::get('/me', [\App\Http\Controllers\Api\ActorController::class, 'me']);
    Route::put('/update', [\App\Http\Controllers\Api\ActorController::class, 'update']);
    Route::post('/logo', [\App\Http\Controllers\Api\ActorController::class, 'uploadLogo']);
    Route::post('/images', [\App\Http\Controllers\Api\ActorController::class, 'uploadImages']);
    Route::delete('/images/{imageIndex}', [\App\Http\Controllers\Api\ActorController::class, 'deleteImage']);
});

// Routes pour la gestion des utilisateurs (admin uniquement)
Route::middleware('auth:sanctum')->prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index']);
    Route::get('/{id}', [UserController::class, 'show']);
    Route::post('/', [UserController::class, 'store']);
    Route::put('/{id}', [UserController::class, 'update']);
    Route::post('/{id}/reset-password', [UserController::class, 'resetPassword']);
    Route::delete('/{id}', [UserController::class, 'destroy']);
});

// Routes publiques pour les événements
Route::prefix('events')->group(function () {
    Route::get('/', [EventController::class, 'index']);
    Route::get('/{id}', [EventController::class, 'show']);
});

// Routes protégées pour la gestion des événements (admin uniquement)
Route::middleware('auth:sanctum')->prefix('events')->group(function () {
    Route::post('/', [EventController::class, 'store']);
    Route::put('/{id}', [EventController::class, 'update']);
    Route::delete('/{id}', [EventController::class, 'destroy']);
});

// Routes publiques pour les actualités
Route::prefix('news')->group(function () {
    Route::get('/', [\App\Http\Controllers\Api\NewsController::class, 'index']);
    Route::get('/{id}', [\App\Http\Controllers\Api\NewsController::class, 'show']);
});

// Routes protégées pour la gestion des actualités (admin uniquement)
Route::middleware('auth:sanctum')->prefix('news')->group(function () {
    Route::post('/', [\App\Http\Controllers\Api\NewsController::class, 'store']);
    Route::put('/{id}', [\App\Http\Controllers\Api\NewsController::class, 'update']);
    // Fallback for multipart/form-data updates: POST + _method=PUT (common Laravel pattern)
    Route::post('/{id}', [\App\Http\Controllers\Api\NewsController::class, 'update']);
    Route::delete('/{id}', [\App\Http\Controllers\Api\NewsController::class, 'destroy']);
});
