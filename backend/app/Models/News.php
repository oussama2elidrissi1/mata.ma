<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class News extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'excerpt',
        'content',
        'category',
        'author',
        'image',
        'featured',
        'status',
        'published_at',
    ];

    protected $casts = [
        'featured' => 'boolean',
        'published_at' => 'date',
    ];

    /**
     * Accessor for converting the image path to a full URL.
     */
    public function getImageAttribute($value)
    {
        // Si la valeur est déjà une URL complète, la retourner telle quelle
        if (!$value) {
            return 'https://images.unsplash.com/photo-1504711434969-e33886180f91?w=800&h=400&fit=crop';
        }
        
        // Si c'est déjà une URL valide (http/https), la retourner
        if (filter_var($value, FILTER_VALIDATE_URL)) {
            return $value;
        }
        
        // Si c'est un chemin de stockage, construire l'URL complète
        try {
            $url = Storage::url($value);
            if (strpos($url, '/storage/') === 0) {
                $baseUrl = config('app.url', 'http://localhost:8000');
                return rtrim($baseUrl, '/') . $url;
            }
            return $url;
        } catch (\Exception $e) {
            // En cas d'erreur, retourner une image par défaut
            return 'https://images.unsplash.com/photo-1504711434969-e33886180f91?w=800&h=400&fit=crop';
        }
    }

    /**
     * Get formatted date
     */
    public function getFormattedDateAttribute()
    {
        $date = $this->published_at ?? $this->created_at;
        if ($date instanceof \Carbon\Carbon || $date instanceof \DateTime) {
            return $date->format('d/m/Y');
        }
        if (is_string($date)) {
            return \Carbon\Carbon::parse($date)->format('d/m/Y');
        }
        return '';
    }
}
