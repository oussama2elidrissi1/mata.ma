<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Pour l'instant, on vérifie via Sanctum token dans les headers
        // Si pas de token, rediriger vers login
        $token = $request->bearerToken() ?? $request->header('Authorization');
        
        if (!$token) {
            // Vérifier si c'est une requête AJAX/JSON
            if ($request->expectsJson() || $request->wantsJson()) {
                return response()->json(['message' => 'Non authentifié'], 401);
            }
            return redirect()->route('admin.login');
        }

        return $next($request);
    }
}
