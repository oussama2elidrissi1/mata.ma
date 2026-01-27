<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class SettingController extends Controller
{
    /**
     * Get all settings or by group
     */
    public function index(Request $request): JsonResponse
    {
        $query = Setting::query();

        if ($request->has('group')) {
            $query->where('group', $request->group);
        }

        $settings = $query->orderBy('group')->orderBy('key')->get();

        return response()->json([
            'success' => true,
            'data' => $settings
        ]);
    }

    /**
     * Get a specific setting by key
     */
    public function show($key): JsonResponse
    {
        $setting = Setting::where('key', $key)->first();

        if (!$setting) {
            return response()->json([
                'success' => false,
                'message' => 'Setting not found'
            ], 404);
        }

        // Si c'est le logo, générer l'URL complète
        if ($key === 'site_logo' && $setting->value_fr) {
            $logoPath = $setting->value_fr;
            $logoUrl = Storage::url($logoPath);
            // Si l'URL ne commence pas par http, construire l'URL complète
            if (!filter_var($logoUrl, FILTER_VALIDATE_URL)) {
                $baseUrl = config('app.url', 'http://localhost:8000');
                $logoUrl = rtrim($baseUrl, '/') . $logoUrl;
            }
            $setting->logo_url = $logoUrl;
        }

        return response()->json([
            'success' => true,
            'data' => $setting
        ]);
    }

    /**
     * Update or create a setting
     */
    public function update(Request $request, $key): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'value_fr' => 'nullable|string',
            'value_en' => 'nullable|string',
            'value_ar' => 'nullable|string',
            'type' => 'nullable|string|in:text,textarea,email,phone,address',
            'group' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $setting = Setting::firstOrNew(['key' => $key]);

        if ($request->has('value_fr')) {
            $setting->value_fr = $request->value_fr;
        }
        if ($request->has('value_en')) {
            $setting->value_en = $request->value_en;
        }
        if ($request->has('value_ar')) {
            $setting->value_ar = $request->value_ar;
        }
        if ($request->has('type')) {
            $setting->type = $request->type;
        }
        if ($request->has('group')) {
            $setting->group = $request->group;
        }
        if ($request->has('description')) {
            $setting->description = $request->description;
        }

        $setting->save();

        return response()->json([
            'success' => true,
            'data' => $setting,
            'message' => 'Setting updated successfully'
        ]);
    }

    /**
     * Bulk update settings
     */
    public function bulkUpdate(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'settings' => 'required|array',
            'settings.*.key' => 'required|string',
            'settings.*.value_fr' => 'nullable|string',
            'settings.*.value_en' => 'nullable|string',
            'settings.*.value_ar' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $updated = [];
        foreach ($request->settings as $settingData) {
            $setting = Setting::firstOrNew(['key' => $settingData['key']]);
            
            if (isset($settingData['value_fr'])) {
                $setting->value_fr = $settingData['value_fr'];
            }
            if (isset($settingData['value_en'])) {
                $setting->value_en = $settingData['value_en'];
            }
            if (isset($settingData['value_ar'])) {
                $setting->value_ar = $settingData['value_ar'];
            }
            if (isset($settingData['type'])) {
                $setting->type = $settingData['type'];
            }
            if (isset($settingData['group'])) {
                $setting->group = $settingData['group'];
            }
            
            $setting->save();
            $updated[] = $setting;
        }

        return response()->json([
            'success' => true,
            'data' => $updated,
            'message' => 'Settings updated successfully'
        ]);
    }

    /**
     * Upload logo
     */
    public function uploadLogo(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // 2MB max
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $file = $request->file('logo');
            $filename = 'logo.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('public/logos', $filename);
            
            // Remove 'public/' from path for URL
            $urlPath = str_replace('public/', '', $path);
            
            // Save logo path in settings
            $setting = Setting::firstOrNew(['key' => 'site_logo']);
            $setting->group = 'general';
            $setting->value_fr = $urlPath;
            $setting->value_en = $urlPath;
            $setting->value_ar = $urlPath;
            $setting->type = 'image';
            $setting->description = 'Logo du site';
            $setting->save();

            // Générer l'URL complète du logo
            $logoUrl = Storage::url($urlPath);
            // Si l'URL ne commence pas par http, construire l'URL complète
            if (!filter_var($logoUrl, FILTER_VALIDATE_URL)) {
                $baseUrl = config('app.url', 'http://localhost:8000');
                $logoUrl = rtrim($baseUrl, '/') . $logoUrl;
            }

            return response()->json([
                'success' => true,
                'message' => 'Logo uploadé avec succès',
                'data' => [
                    'path' => $urlPath,
                    'url' => $logoUrl
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'upload du logo: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Handle contact form submission
     */
    public function contact(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:2000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // TODO: Send email notification to admin
        // Mail::to(config('mail.admin_email'))->send(new ContactFormSubmitted($request->all()));

        // Log the contact form submission
        \Log::info('Contact form submitted', $request->all());

        return response()->json([
            'success' => true,
            'message' => 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.'
        ]);
    }
}
