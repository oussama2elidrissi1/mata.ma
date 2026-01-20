<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes (Laravel Front)
|--------------------------------------------------------------------------
| Pages Blade + chargement des données via JavaScript (fetch) depuis /api/*
*/

Route::view('/', 'home')->name('home');
Route::view('/about', 'about')->name('about');
Route::view('/contact', 'contact')->name('contact');
Route::view('/join', 'join')->name('join');

// Public pages: News
Route::view('/news', 'news.index')->name('news.index');
Route::get('/news/{id}', function (string $id) {
    return view('news.show', ['id' => $id]);
})->whereNumber('id')->name('news.show');

// Public pages: Events
Route::view('/events', 'events.index')->name('events.index');
Route::get('/events/{id}', function (string $id) {
    return view('events.show', ['id' => $id]);
})->whereNumber('id')->name('events.show');

// Public pages: Tourism actors
Route::view('/actors', 'actors.index')->name('actors.index');
Route::get('/actors/{id}', function (string $id) {
    return view('actors.show', ['id' => $id]);
})->whereNumber('id')->name('actors.show');

// Admin routes (authentification gérée côté client avec Sanctum)
Route::prefix('admin')->name('admin.')->group(function () {
    // Login page (publique)
    Route::view('/login', 'admin.login')->name('login');
    
    // Admin pages (protégées côté client)
    Route::view('/', 'admin.dashboard')->name('dashboard');
    Route::view('/actors', 'admin.actors')->name('actors');
    Route::view('/associations', 'admin.associations')->name('associations');
    Route::view('/accreditations', 'admin.accreditations')->name('accreditations');
    Route::view('/pending', 'admin.pending')->name('pending');
    Route::view('/events', 'admin.events')->name('events');
    Route::view('/news', 'admin.news')->name('news');
    Route::view('/suspended', 'admin.suspended')->name('suspended');
    Route::view('/users', 'admin.users')->name('users');
    Route::view('/stats', 'admin.stats')->name('stats');
    Route::view('/settings', 'admin.settings')->name('settings');
});

// Actor/Association routes
Route::prefix('actor')->name('actor.')->group(function () {
    Route::view('/login', 'actor.login')->name('login');
    Route::view('/dashboard', 'actor.dashboard')->name('dashboard');
});

Route::prefix('association')->name('association.')->group(function () {
    Route::view('/dashboard', 'association.dashboard')->name('dashboard');
});

// Public pages supplémentaires
Route::view('/accreditation', 'accreditation')->name('accreditation');
Route::view('/partners', 'partners')->name('partners');

// Debug route (optional)
Route::get('/test-api', function () {
    $actors = \App\Models\TourismActor::where('status', 'active')->limit(5)->get();
    return response()->json([
        'success' => true,
        'count' => \App\Models\TourismActor::where('status', 'active')->count(),
        'sample' => $actors,
        'message' => 'API is working!'
    ]);
});
