<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TourismActor;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class TourismActorImportController extends Controller
{
    public function import(Request $request): JsonResponse
    {
        // Validation plus flexible pour les fichiers CSV
        $validator = Validator::make($request->all(), [
            'file' => [
                'required',
                'file',
                'max:10240', // 10MB max
                function ($attribute, $value, $fail) {
                    $extension = strtolower($value->getClientOriginalExtension());
                    $mimeType = $value->getMimeType();
                    
                    // Accepter les extensions Excel et CSV
                    $allowedExtensions = ['xlsx', 'xls', 'csv'];
                    // Accepter les types MIME courants
                    $allowedMimeTypes = [
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
                        'application/vnd.ms-excel', // .xls
                        'text/csv', // .csv
                        'text/plain', // .csv (certains serveurs)
                        'application/csv', // .csv
                        'text/x-csv', // .csv
                    ];
                    
                    if (!in_array($extension, $allowedExtensions)) {
                        $fail('Le fichier doit être au format Excel (.xlsx, .xls) ou CSV (.csv)');
                    }
                    
                    // Vérifier aussi le type MIME si l'extension est CSV
                    if ($extension === 'csv' && !in_array($mimeType, $allowedMimeTypes)) {
                        // Pour CSV, on est plus permissif car les types MIME varient
                        // On accepte si l'extension est correcte
                    }
                },
            ],
            'default_type' => 'nullable|in:hotel,restaurant,travel_agency,tour_guide,transport,attraction,other',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            $errorMessage = 'Fichier invalide';
            
            // Message plus détaillé
            if ($errors->has('file')) {
                $fileErrors = $errors->get('file');
                if (!empty($fileErrors)) {
                    $errorMessage = implode(', ', $fileErrors);
                }
            }
            
            return response()->json([
                'success' => false,
                'message' => $errorMessage,
                'errors' => $errors
            ], 422);
        }

        $file = $request->file('file');
        $extension = strtolower($file->getClientOriginalExtension());
        
            $total = 0;
            $success = 0;
            $skipped = 0; // Acteurs déjà existants
            $errors = [];

        try {
            // Lire le fichier
            try {
                if ($extension === 'csv') {
                    // Pour CSV, spécifier le reader explicitement
                    $reader = IOFactory::createReader('Csv');
                    
                    // Lire le début du fichier pour détecter le délimiteur
                    $fileContent = file_get_contents($file->getPathname());
                    
                    // Si le fichier commence par BOM UTF-8, le supprimer
                    if (substr($fileContent, 0, 3) === "\xEF\xBB\xBF") {
                        $fileContent = substr($fileContent, 3);
                        file_put_contents($file->getPathname(), $fileContent);
                    }
                    
                    // Détecter le délimiteur (virgule, point-virgule ou tabulation)
                    $firstLine = strtok($fileContent, "\n");
                    $delimiter = ',';
                    $delimiterCount = substr_count($firstLine, ',');
                    $semicolonCount = substr_count($firstLine, ';');
                    $tabCount = substr_count($firstLine, "\t");
                    
                    if ($tabCount > $delimiterCount && $tabCount > $semicolonCount) {
                        $delimiter = "\t";
                    } elseif ($semicolonCount > $delimiterCount) {
                        $delimiter = ';';
                    }
                    
                    Log::info('Délimiteur détecté', [
                        'delimiter' => $delimiter === "\t" ? 'TAB' : $delimiter,
                        'comma_count' => $delimiterCount,
                        'semicolon_count' => $semicolonCount,
                        'tab_count' => $tabCount
                    ]);
                    
                    // Configurer le délimiteur et l'encodage
                    $reader->setDelimiter($delimiter);
                    $reader->setEnclosure('"');
                    $reader->setEscapeCharacter('\\');
                    
                    // Essayer de détecter l'encodage
                    $encoding = mb_detect_encoding($fileContent, ['UTF-8', 'Windows-1252', 'ISO-8859-1', 'ASCII'], true);
                    if (!$encoding) {
                        $encoding = 'UTF-8'; // Par défaut
                    }
                    
                    $reader->setInputEncoding($encoding);
                    $spreadsheet = $reader->load($file->getPathname());
                } else {
                    $spreadsheet = IOFactory::load($file->getPathname());
                }
            } catch (\Exception $e) {
                Log::error('Erreur lecture fichier', [
                    'extension' => $extension,
                    'error' => $e->getMessage(),
                    'file' => $file->getClientOriginalName()
                ]);
                
                return response()->json([
                    'success' => false,
                    'message' => 'Erreur lors de la lecture du fichier : ' . $e->getMessage(),
                    'result' => [
                        'total' => 0,
                        'success' => 0,
                        'skipped' => 0,
                        'errors' => ['Impossible de lire le fichier. Vérifiez que le format est correct.']
                    ]
                ], 422);
            }
            
            $worksheet = $spreadsheet->getActiveSheet();
            $rows = $worksheet->toArray();

            if (count($rows) < 2) {
                return response()->json([
                    'success' => false,
                    'message' => 'Le fichier doit contenir au moins une ligne de données (en plus de l\'en-tête)',
                    'result' => [
                        'total' => 0,
                        'success' => 0,
                        'skipped' => 0,
                        'errors' => []
                    ]
                ], 422);
            }

            // Récupérer les en-têtes (première ligne)
            // Normaliser les en-têtes : minuscules, supprimer accents, espaces multiples
            $headers = array_map(function($header) {
                if (!is_string($header)) {
                    $header = (string)$header;
                }
                // Supprimer les caractères null (\x00)
                $header = str_replace("\x00", '', $header);
                // Supprimer les autres caractères invisibles (sauf espaces et tabulations)
                $header = preg_replace('/[\x01-\x08\x0B-\x0C\x0E-\x1F\x7F]/', '', $header);
                $header = trim($header);
                // Normaliser les espaces multiples
                $header = preg_replace('/\s+/', ' ', $header);
                // Convertir en minuscules
                $header = mb_strtolower($header, 'UTF-8');
                return $header;
            }, $rows[0]);
            
            // Filtrer les en-têtes vides
            $headers = array_filter($headers, function($h) {
                return !empty(trim($h));
            });
            $headers = array_values($headers); // Réindexer
            
            // Log pour debug
            Log::info('Headers détectés', ['headers' => $headers]);
            
            // Mapping des colonnes possibles (avec toutes les variations)
            $columnMap = [
                // Nom / Dénomination
                'dénomination sociale' => 'name',
                'denomination sociale' => 'name',
                'denomination' => 'name',
                'nom' => 'last_name',
                'prenom' => 'first_name',
                'prénom' => 'first_name',
                'first name' => 'first_name',
                'firstname' => 'first_name',
                'last name' => 'last_name',
                'lastname' => 'last_name',
                'name' => 'name',
                // Ville
                'ville' => 'city',
                'city' => 'city',
                'cité' => 'city',
                // Adresse
                'adresse agence' => 'address',
                'adresse' => 'address',
                'address' => 'address',
                // Type
                'type' => 'type',
                // Catégorie
                'catégorie' => 'category',
                'categorie' => 'category',
                'category' => 'category',
                // Téléphone
                'téléphone' => 'phone',
                'telephone' => 'phone',
                'phone' => 'phone',
                'tel' => 'phone',
                // Email
                'email' => 'email',
                'e-mail' => 'email',
                // Site web
                'site web' => 'website',
                'website' => 'website',
                'site' => 'website',
                // Région
                'région' => 'region',
                'region' => 'region',
                // Description
                'description' => 'description',
                // Accréditation
                'numéro accréditation' => 'accreditation_number',
                'numero accreditation' => 'accreditation_number',
                'accreditation_number' => 'accreditation_number',
                'accreditation' => 'accreditation_number',
                // Statut
                'statut' => 'status',
                'status' => 'status',
                // Vérifié
                'vérifié' => 'verified',
                'verifie' => 'verified',
                'verified' => 'verified',
                // Langues
                'langue de travail' => 'languages',
                'langue' => 'languages',
                'languages' => 'languages',
                'langues' => 'languages',
                'langue travail' => 'languages',
            ];

            // Trouver les indices des colonnes
            $columnIndices = [];
            foreach ($columnMap as $header => $field) {
                // Recherche exacte d'abord
                $index = array_search($header, $headers);
                if ($index !== false) {
                    $columnIndices[$field] = $index;
                } else {
                    // Recherche partielle (contient)
                    foreach ($headers as $idx => $h) {
                        if (stripos($h, $header) !== false || stripos($header, $h) !== false) {
                            $columnIndices[$field] = $idx;
                            break;
                        }
                    }
                }
            }
            
            // Log pour debug
            Log::info('Colonnes détectées', ['columnIndices' => $columnIndices]);

            // Vérifier les colonnes requises
            // Si on a "nom" et "prénom", on peut créer "name", sinon on a besoin de "name"
            $hasName = isset($columnIndices['name']);
            $hasLastNameAndFirstName = isset($columnIndices['last_name']) && isset($columnIndices['first_name']);
            
            $requiredFields = ['city'];
            $missingFields = [];
            
            // Vérifier qu'on a soit "name" soit ("nom" et "prénom")
            if (!$hasName && !$hasLastNameAndFirstName) {
                $missingFields[] = 'name (ou nom + prénom)';
            }
            
            foreach ($requiredFields as $field) {
                if (!isset($columnIndices[$field])) {
                    $missingFields[] = $field;
                }
            }

            if (!empty($missingFields)) {
                // Afficher les en-têtes détectés pour aider au débogage
                $detectedHeaders = implode(', ', array_filter($headers, function($h) {
                    return !empty(trim($h));
                }));
                
                return response()->json([
                    'success' => false,
                    'message' => 'Colonnes requises manquantes : ' . implode(', ', $missingFields) . 
                                 (count($headers) > 0 ? '. Colonnes détectées dans le fichier : ' . $detectedHeaders : ''),
                    'result' => [
                        'total' => 0,
                        'success' => 0,
                        'skipped' => 0,
                        'errors' => [
                            'Colonnes requises : ' . implode(', ', $missingFields),
                            'Colonnes détectées : ' . $detectedHeaders,
                            'Colonnes attendues pour guides : Nom, Prénom, Ville (ou Dénomination Sociale, Ville pour agences)'
                        ]
                    ]
                ], 422);
            }

            // Traiter les lignes de données
            for ($i = 1; $i < count($rows); $i++) {
                $total++;
                $row = $rows[$i];
                
                // Ignorer les lignes vides
                if (empty(array_filter($row))) {
                    continue;
                }

                try {
                    $data = [];
                    $lastName = null;
                    $firstName = null;
                    $languages = [];
                    
                    // Extraire les données selon les colonnes trouvées
                    foreach ($columnIndices as $field => $index) {
                        $value = isset($row[$index]) ? $row[$index] : null;
                        
                        // Nettoyer la valeur
                        if ($value !== null) {
                            if (!is_string($value)) {
                                $value = (string)$value;
                            }
                            // Supprimer les caractères null
                            $value = str_replace("\x00", '', $value);
                            // Supprimer les autres caractères invisibles
                            $value = preg_replace('/[\x01-\x08\x0B-\x0C\x0E-\x1F\x7F]/', '', $value);
                            $value = trim($value);
                        }
                        
                        if ($value !== null && $value !== '') {
                            switch ($field) {
                                case 'name':
                                    $data['name'] = $value;
                                    break;
                                case 'last_name':
                                    $lastName = $value;
                                    break;
                                case 'first_name':
                                    $firstName = $value;
                                    break;
                                case 'city':
                                    $data['city'] = $value;
                                    break;
                                case 'address':
                                    $data['address'] = $value;
                                    break;
                                case 'type':
                                    $data['type'] = $this->normalizeType($value);
                                    break;
                                case 'category':
                                    $data['category'] = $this->normalizeCategory($value);
                                    break;
                                case 'phone':
                                    $data['phone'] = $value;
                                    break;
                                case 'email':
                                    if (filter_var($value, FILTER_VALIDATE_EMAIL)) {
                                        $data['email'] = $value;
                                    }
                                    break;
                                case 'website':
                                    $data['website'] = $value;
                                    break;
                                case 'region':
                                    $data['region'] = $value;
                                    break;
                                case 'description':
                                    $data['description'] = $value;
                                    break;
                                case 'accreditation_number':
                                    $data['accreditation_number'] = $value;
                                    break;
                                case 'status':
                                    $data['status'] = $this->normalizeStatus($value);
                                    break;
                                case 'verified':
                                    $data['verified'] = $this->normalizeBoolean($value);
                                    break;
                                case 'languages':
                                    // Les langues peuvent être séparées par virgule, point-virgule, tiret ou espace
                                    // Exemples: "FR, EN, AR" ou "FR-ANG ALL" ou "FR;EN;AR" ou "FR EN AR"
                                    // Normaliser les séparateurs multiples et les espaces
                                    $normalized = preg_replace('/[\s\-]+/', ' ', $value); // Remplacer tirets et espaces multiples par un seul espace
                                    $normalized = str_replace(['-', ';'], ',', $normalized); // Remplacer tirets et point-virgule par virgule
                                    $langArray = preg_split('/[,]+/', $normalized); // Séparer par virgule
                                    $langArray = array_map('trim', $langArray); // Nettoyer les espaces
                                    $langArray = array_filter($langArray, function($lang) {
                                        return !empty($lang);
                                    }); // Supprimer les valeurs vides
                                    
                                    // Normaliser les codes de langue (FR, EN, AR, ITA, ALL, ESP, ANG, RUSSE, etc.)
                                    $normalizedLangs = [];
                                    foreach ($langArray as $lang) {
                                        $langUpper = strtoupper(trim($lang));
                                        // Mapper les codes alternatifs
                                        $langMap = [
                                            'ANG' => 'EN',
                                            'ALL' => 'DE',
                                            'RUSSE' => 'RU',
                                            'ESP' => 'ES',
                                            'ITA' => 'IT',
                                        ];
                                        $normalizedLangs[] = $langMap[$langUpper] ?? $langUpper;
                                    }
                                    $languages = array_merge($languages, $normalizedLangs);
                                    break;
                            }
                        }
                    }
                    
                    // Construire le nom complet si on a nom et prénom
                    if ($lastName && $firstName && !isset($data['name'])) {
                        $data['name'] = trim($firstName . ' ' . $lastName);
                    } elseif ($lastName && !isset($data['name'])) {
                        $data['name'] = $lastName;
                    } elseif ($firstName && !isset($data['name'])) {
                        $data['name'] = $firstName;
                    }
                    
                    // Stocker les langues si présentes
                    if (!empty($languages)) {
                        $data['languages'] = array_filter(array_unique($languages));
                    }

                    // Valeurs par défaut
                    if (!isset($data['type'])) {
                        // Utiliser le type par défaut fourni dans la requête, sinon 'travel_agency'
                        $data['type'] = $request->input('default_type', 'travel_agency');
                    }
                    
                    // Si pas d'adresse, créer une adresse par défaut basée sur la ville
                    if (!isset($data['address']) || empty($data['address'])) {
                        $data['address'] = $data['city'] ?? 'Adresse non spécifiée';
                    }
                    
                    // Nettoyer et valider accreditation_number
                    if (isset($data['accreditation_number'])) {
                        $data['accreditation_number'] = trim($data['accreditation_number']);
                        // Si le numéro est vide ou invalide, le supprimer
                        if (empty($data['accreditation_number']) || strlen($data['accreditation_number']) < 2) {
                            unset($data['accreditation_number']);
                        }
                    }
                    
                    // Si importé par admin (authentifié), approuver automatiquement
                    if ($request->user()) {
                        $data['status'] = 'active';
                        $data['verified'] = true;
                        // Si un numéro d'accréditation est fourni, générer les dates
                        if (!empty($data['accreditation_number']) && empty($data['accreditation_date'])) {
                            $data['accreditation_date'] = now();
                            $data['accreditation_expiry'] = now()->addYears(2);
                        }
                    } else {
                        if (!isset($data['status'])) {
                            $data['status'] = 'pending';
                        }
                        $data['verified'] = false;
                    }
                    if (!isset($data['region'])) {
                        $data['region'] = $data['city'] ?? 'Non spécifié';
                    }
                    if (!isset($data['country'])) {
                        $data['country'] = 'Morocco';
                    }

                    // Valider les données
                    $validator = Validator::make($data, [
                        'name' => 'required|string|max:255',
                        'type' => 'required|in:hotel,restaurant,travel_agency,tour_guide,transport,attraction,other',
                        'address' => 'required|string',
                        'city' => 'required|string',
                        'region' => 'required|string',
                        'email' => 'nullable|email',
                        'accreditation_number' => 'nullable|string',
                        'languages' => 'nullable|array',
                    ]);

                    if ($validator->fails()) {
                        $errors[] = "Ligne {$i}: " . implode(', ', $validator->errors()->all());
                        continue;
                    }

                    // Vérifier si l'acteur existe déjà
                    $existingActor = null;
                    
                    // Recherche par numéro d'accréditation si présent
                    if (!empty($data['accreditation_number'])) {
                        $existingActor = TourismActor::where('accreditation_number', $data['accreditation_number'])->first();
                    }
                    
                    // Si pas trouvé par accréditation, chercher par nom + ville
                    if (!$existingActor && !empty($data['name']) && !empty($data['city'])) {
                        $existingActor = TourismActor::where('name', $data['name'])
                            ->where('city', $data['city'])
                            ->first();
                    }
                    
                    // Si pas trouvé, chercher par email si présent
                    if (!$existingActor && !empty($data['email'])) {
                        $existingActor = TourismActor::where('email', $data['email'])->first();
                    }
                    
                    // Si l'acteur existe déjà, le mettre à jour au lieu de créer un doublon
                    if ($existingActor) {
                        try {
                            // Mettre à jour l'acteur existant avec les nouvelles données
                            $updateData = $data;
                            // Ne pas changer l'ID ni créer de doublon d'accréditation
                            if (isset($updateData['accreditation_number']) && 
                                $existingActor->accreditation_number && 
                                $updateData['accreditation_number'] !== $existingActor->accreditation_number) {
                                // Si l'acteur existant a déjà un numéro d'accréditation différent, ne pas le changer
                                unset($updateData['accreditation_number']);
                            }
                            
                            $existingActor->update($updateData);
                            $skipped++;
                        } catch (\Exception $e) {
                            $errors[] = "Ligne {$i}: Erreur lors de la mise à jour de l'acteur existant - " . $e->getMessage();
                        }
                    } else {
                        // Créer l'acteur (gérer les doublons d'accreditation_number)
                        try {
                            TourismActor::create($data);
                            $success++;
                        } catch (\Illuminate\Database\QueryException $e) {
                            // Si erreur de contrainte unique sur accreditation_number, réessayer sans
                            if ($e->getCode() == '23000' && strpos($e->getMessage(), 'accreditation_number') !== false) {
                                unset($data['accreditation_number']);
                                unset($data['accreditation_date']);
                                unset($data['accreditation_expiry']);
                                try {
                                    TourismActor::create($data);
                                    $success++;
                                    $errors[] = "Ligne {$i}: Numéro d'accréditation en doublon, acteur créé sans numéro";
                                } catch (\Exception $e2) {
                                    $errors[] = "Ligne {$i}: " . $e2->getMessage();
                                }
                            } else {
                                throw $e;
                            }
                        }
                    }

                } catch (\Exception $e) {
                    $errors[] = "Ligne {$i}: " . $e->getMessage();
                    Log::error('Import error on line ' . $i, [
                        'error' => $e->getMessage(),
                        'row' => $row
                    ]);
                }
            }

            $message = "Import terminé : {$success} acteur(s) créé(s)";
            if ($skipped > 0) {
                $message .= ", {$skipped} acteur(s) déjà existant(s) mis à jour";
            }
            $message .= " sur {$total} ligne(s)";
            
            return response()->json([
                'success' => true,
                'message' => $message,
                'result' => [
                    'total' => $total,
                    'success' => $success,
                    'skipped' => $skipped,
                    'errors' => $errors
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Import file error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la lecture du fichier : ' . $e->getMessage(),
                'result' => [
                    'total' => $total,
                    'success' => $success,
                    'skipped' => $skipped,
                    'errors' => array_merge($errors, [$e->getMessage()])
                ]
            ], 500);
        }
    }

    private function normalizeType($value): string
    {
        $value = strtolower(trim($value));
        $types = [
            'hotel' => 'hotel',
            'hôtel' => 'hotel',
            'restaurant' => 'restaurant',
            'agence de voyage' => 'travel_agency',
            'agence' => 'travel_agency',
            'travel_agency' => 'travel_agency',
            'guide touristique' => 'tour_guide',
            'guide' => 'tour_guide',
            'tour_guide' => 'tour_guide',
            'transport' => 'transport',
            'attraction' => 'attraction',
            'autre' => 'other',
            'other' => 'other',
        ];

        return $types[$value] ?? 'other';
    }

    private function normalizeCategory($value): ?string
    {
        $value = strtolower(trim($value));
        $categories = [
            'luxury' => 'luxury',
            'luxe' => 'luxury',
            'premium' => 'premium',
            'standard' => 'standard',
            'budget' => 'budget',
            'économique' => 'budget',
            'economique' => 'budget',
        ];

        return $categories[$value] ?? null;
    }

    private function normalizeStatus($value): string
    {
        $value = strtolower(trim($value));
        $statuses = [
            'active' => 'active',
            'actif' => 'active',
            'inactive' => 'inactive',
            'inactif' => 'inactive',
            'pending' => 'pending',
            'en attente' => 'pending',
            'suspended' => 'suspended',
            'suspendu' => 'suspended',
        ];

        return $statuses[$value] ?? 'pending';
    }

    private function normalizeBoolean($value): bool
    {
        $value = strtolower(trim($value));
        return in_array($value, ['oui', 'yes', 'true', '1', 'vrai', 'o']);
    }
}
