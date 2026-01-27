<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Les identifiants fournis sont incorrects.'
            ], 401);
        }

        // Générer le token selon le rôle
        $tokenName = $user->role === 'admin' ? 'admin-token' : ($user->role === 'actor' ? 'actor-token' : 'user-token');
        $token = $user->createToken($tokenName)->plainTextToken;

        return response()->json([
            'success' => true,
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                ],
                'token' => $token,
            ],
            'message' => 'Connexion réussie'
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Déconnexion réussie'
        ]);
    }

    public function user(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'id' => $request->user()->id,
                'name' => $request->user()->name,
                'email' => $request->user()->email,
                'role' => $request->user()->role,
            ]
        ]);
    }

    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:user,actor',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            $errorMessages = [];
            
            // Vérifier spécifiquement les erreurs d'email unique
            if ($errors->has('email') && $errors->first('email')) {
                $emailError = $errors->first('email');
                $emailErrorLower = strtolower($emailError);
                if (str_contains($emailErrorLower, 'unique') || 
                    str_contains($emailErrorLower, 'already been taken') || 
                    str_contains($emailErrorLower, 'déjà pris') ||
                    str_contains($emailErrorLower, 'has already been taken')) {
                    $errorMessages[] = 'Cet email est déjà utilisé. Veuillez utiliser un autre email ou vous connecter.';
                } elseif (str_contains($emailErrorLower, 'required')) {
                    $errorMessages[] = 'L\'email est obligatoire.';
                } elseif (str_contains($emailErrorLower, 'invalid') || str_contains($emailErrorLower, 'format')) {
                    $errorMessages[] = 'L\'email n\'est pas valide.';
                } else {
                    $errorMessages[] = $emailError;
                }
            }
            
            // Vérifier les erreurs de mot de passe
            if ($errors->has('password')) {
                $passwordError = $errors->first('password');
                $passwordErrorLower = strtolower($passwordError);
                if (str_contains($passwordErrorLower, 'confirmed')) {
                    $errorMessages[] = 'Les mots de passe ne correspondent pas.';
                } elseif (str_contains($passwordErrorLower, 'min')) {
                    $errorMessages[] = 'Le mot de passe doit contenir au moins 8 caractères.';
                } elseif (str_contains($passwordErrorLower, 'required')) {
                    $errorMessages[] = 'Le mot de passe est obligatoire.';
                } else {
                    $errorMessages[] = $passwordError;
                }
            }
            
            // Vérifier les erreurs de nom
            if ($errors->has('name')) {
                $nameError = $errors->first('name');
                $nameErrorLower = strtolower($nameError);
                if (str_contains($nameErrorLower, 'required')) {
                    $errorMessages[] = 'Le nom est obligatoire.';
                } else {
                    $errorMessages[] = $nameError;
                }
            }
            
            // Ajouter les autres erreurs non traitées
            foreach ($errors->all() as $error) {
                if (!in_array($error, $errorMessages)) {
                    $errorMessages[] = $error;
                }
            }
            
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
                'error_messages' => $errorMessages,
                'message' => count($errorMessages) === 1 ? $errorMessages[0] : 'Les données fournies sont invalides.',
                'is_email_unique_error' => $errors->has('email') && (
                    str_contains(strtolower($errors->first('email')), 'unique') ||
                    str_contains(strtolower($errors->first('email')), 'already been taken')
                )
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
            'message' => 'Compte créé avec succès'
        ], 201);
    }
}
