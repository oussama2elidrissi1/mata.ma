<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'value_fr',
        'value_en',
        'value_ar',
        'type',
        'group',
        'description',
    ];

    /**
     * Get the value for the current locale
     */
    public function getValueAttribute()
    {
        $locale = app()->getLocale();
        $valueKey = 'value_' . $locale;
        
        // Fallback to French if current locale value is empty
        if (empty($this->$valueKey)) {
            return $this->value_fr ?? '';
        }
        
        return $this->$valueKey;
    }

    /**
     * Get setting by key
     */
    public static function getByKey($key, $locale = null)
    {
        $setting = self::where('key', $key)->first();
        
        if (!$setting) {
            return null;
        }

        if ($locale) {
            $valueKey = 'value_' . $locale;
            return $setting->$valueKey ?? $setting->value_fr ?? '';
        }

        return $setting->value;
    }

    /**
     * Set setting by key
     */
    public static function setByKey($key, $value, $locale = 'fr')
    {
        $setting = self::firstOrNew(['key' => $key]);
        $valueKey = 'value_' . $locale;
        $setting->$valueKey = $value;
        $setting->save();
        return $setting;
    }
}
