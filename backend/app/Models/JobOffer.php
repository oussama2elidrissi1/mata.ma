<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobOffer extends Model
{
    use HasFactory;

    protected $fillable = [
        'tourism_actor_id',
        'title',
        'description',
        'category',
        'location',
        'type',
        'salary_min',
        'salary_max',
        'requirements',
        'benefits',
        'status',
        'expiry_date',
    ];

    protected $casts = [
        'expiry_date' => 'date',
        'salary_min' => 'decimal:2',
        'salary_max' => 'decimal:2',
    ];

    public function tourismActor(): BelongsTo
    {
        return $this->belongsTo(TourismActor::class);
    }

    public function applications(): HasMany
    {
        return $this->hasMany(JobApplication::class);
    }
}
