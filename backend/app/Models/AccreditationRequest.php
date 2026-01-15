<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class AccreditationRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'tourism_actor_id',
        'full_name',
        'email',
        'phone',
        'position',
        'identity_document_type',
        'identity_document_number',
        'accreditation_document',
        'message',
        'status',
        'admin_notes',
    ];

    protected $casts = [
        'tourism_actor_id' => 'integer',
    ];

    public function tourismActor()
    {
        return $this->belongsTo(TourismActor::class);
    }

    /**
     * Accessor pour convertir le chemin du document en URL complète
     */
    public function getAccreditationDocumentAttribute($value)
    {
        if (!$value) {
            return null;
        }

        // Si c'est déjà une URL complète, la retourner telle quelle
        if (filter_var($value, FILTER_VALIDATE_URL)) {
            return $value;
        }

        // Sinon, convertir le chemin en URL absolue
        $url = Storage::url($value);
        // Si l'URL commence par /storage/, construire l'URL complète
        if (strpos($url, '/storage/') === 0) {
            $baseUrl = config('app.url', 'http://localhost:8000');
            return rtrim($baseUrl, '/') . $url;
        }

        return $url;
    }
}
