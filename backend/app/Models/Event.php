<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'category',
        'event_date',
        'start_time',
        'end_time',
        'location',
        'participants',
        'image',
        'featured',
        'status',
    ];

    protected $casts = [
        'event_date' => 'date',
        'featured' => 'boolean',
        'participants' => 'integer',
    ];

    /**
     * Accessor for converting the image path to a full URL.
     */
    public function getImageAttribute($value)
    {
        if (!$value) {
            return 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop';
        }
        return filter_var($value, FILTER_VALIDATE_URL) ? $value : url(Storage::url($value));
    }

    /**
     * Format date for display
     */
    public function getFormattedDateAttribute()
    {
        return $this->event_date->format('d-m-Y');
    }

    /**
     * Format time range for display
     */
    public function getFormattedTimeAttribute()
    {
        if ($this->start_time && $this->end_time) {
            return $this->start_time . ' - ' . $this->end_time;
        }
        if ($this->start_time) {
            return $this->start_time;
        }
        return null;
    }
}
