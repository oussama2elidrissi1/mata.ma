<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class TourismActor extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'name_ar',
        'type',
        'category',
        'description',
        'description_ar',
        'address',
        'city',
        'region',
        'postal_code',
        'country',
        'phone',
        'email',
        'website',
        'accreditation_number',
        'accreditation_date',
        'accreditation_expiry',
        'status',
        'latitude',
        'longitude',
        'logo',
        'images',
        'services',
        'languages',
        'opening_hours',
        'team_size',
        'rating',
        'verified',
        'user_id',
    ];

    protected $casts = [
        'accreditation_date' => 'date',
        'accreditation_expiry' => 'date',
        'images' => 'array',
        'services' => 'array',
        'languages' => 'array',
        'opening_hours' => 'array',
        'rating' => 'decimal:2',
        'verified' => 'boolean',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
    ];

    // Types d'acteurs
    const TYPE_HOTEL = 'hotel';
    const TYPE_RESTAURANT = 'restaurant';
    const TYPE_AGENCY = 'travel_agency';
    const TYPE_GUIDE = 'tour_guide';
    const TYPE_TRANSPORT = 'transport';
    const TYPE_ATTRACTION = 'attraction';
    const TYPE_OTHER = 'other';
    const TYPE_ASSOCIATION = 'association';

    // Catégories
    const CATEGORY_LUXURY = 'luxury';
    const CATEGORY_PREMIUM = 'premium';
    const CATEGORY_STANDARD = 'standard';
    const CATEGORY_BUDGET = 'budget';

    // Statuts
    const STATUS_ACTIVE = 'active';
    const STATUS_INACTIVE = 'inactive';
    const STATUS_PENDING = 'pending';
    const STATUS_SUSPENDED = 'suspended';

    public function scopeActive($query)
    {
        return $query->where('status', self::STATUS_ACTIVE);
    }

    public function scopeVerified($query)
    {
        return $query->where('verified', true);
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopeByRegion($query, $region)
    {
        return $query->where('region', $region);
    }

    public function scopeByCity($query, $city)
    {
        return $query->where('city', $city);
    }

    public function isAccredited()
    {
        return $this->accreditation_number && 
               $this->accreditation_expiry && 
               $this->accreditation_expiry->isFuture();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function jobOffers(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(JobOffer::class);
    }

    /**
     * Accessor pour convertir le logo en URL complète
     * Utilise getOriginal() pour préserver la valeur originale lors de la sauvegarde
     */
    public function getLogoAttribute($value)
    {
        // Si on est en train de définir la valeur (sauvegarde), retourner la valeur telle quelle
        if ($this->attributes['logo'] ?? null) {
            $originalValue = $this->attributes['logo'];
        } else {
            $originalValue = $value;
        }

        if (!$originalValue) {
            return null;
        }

        // Si c'est déjà une URL complète, la retourner telle quelle
        if (filter_var($originalValue, FILTER_VALIDATE_URL)) {
            return $originalValue;
        }

        // Sinon, convertir le chemin en URL absolue
        $url = Storage::url($originalValue);
        // Si l'URL commence par /storage/, construire l'URL complète
        if (strpos($url, '/storage/') === 0) {
            $baseUrl = config('app.url', 'http://localhost:8000');
            return rtrim($baseUrl, '/') . $url;
        }

        return $url;
    }

    /**
     * Accessor pour convertir les images en URLs complètes
     */
    public function getImagesAttribute($value)
    {
        // Récupérer la valeur originale depuis les attributs
        $originalValue = $this->attributes['images'] ?? $value;
        
        if (!$originalValue) {
            return null;
        }

        $images = is_string($originalValue) ? json_decode($originalValue, true) : $originalValue;
        
        if (!is_array($images)) {
            return [];
        }

        $baseUrl = config('app.url', 'http://localhost:8000');

        return array_map(function ($image) use ($baseUrl) {
            // Si c'est déjà une URL complète, la retourner telle quelle
            if (filter_var($image, FILTER_VALIDATE_URL)) {
                return $image;
            }

            // Sinon, convertir le chemin en URL absolue
            $url = Storage::url($image);
            if (strpos($url, '/storage/') === 0) {
                return rtrim($baseUrl, '/') . $url;
            }

            return $url;
        }, $images);
    }
}
