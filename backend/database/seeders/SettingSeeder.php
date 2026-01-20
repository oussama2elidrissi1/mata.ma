<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            // General settings
            [
                'key' => 'site_logo',
                'type' => 'image',
                'group' => 'general',
                'description' => 'Logo du site',
                'value_fr' => '',
                'value_en' => '',
                'value_ar' => '',
            ],
            
            // Contact settings
            [
                'key' => 'contact_email',
                'type' => 'email',
                'group' => 'contact',
                'description' => 'Email de contact',
                'value_fr' => 'contact@mata.ma',
                'value_en' => 'contact@mata.ma',
                'value_ar' => 'contact@mata.ma',
            ],
            [
                'key' => 'contact_phone',
                'type' => 'phone',
                'group' => 'contact',
                'description' => 'Téléphone de contact',
                'value_fr' => '+212 5 22 12 34 56',
                'value_en' => '+212 5 22 12 34 56',
                'value_ar' => '+212 5 22 12 34 56',
            ],
            [
                'key' => 'contact_address',
                'type' => 'address',
                'group' => 'contact',
                'description' => 'Adresse',
                'value_fr' => 'Rabat, Maroc',
                'value_en' => 'Rabat, Morocco',
                'value_ar' => 'الرباط، المغرب',
            ],
            
            // About settings
            [
                'key' => 'about_title',
                'type' => 'text',
                'group' => 'about',
                'description' => 'Titre de la page À propos',
                'value_fr' => 'À propos de MATA',
                'value_en' => 'About MATA',
                'value_ar' => 'حول MATA',
            ],
            [
                'key' => 'about_subtitle',
                'type' => 'textarea',
                'group' => 'about',
                'description' => 'Sous-titre de la page À propos',
                'value_fr' => 'Nous sommes la plateforme de référence pour les professionnels du tourisme, offrant un annuaire vérifié, des ressources de qualité et un réseau collaboratif dynamique.',
                'value_en' => 'We are the reference platform for tourism professionals, offering a verified directory, quality resources and a dynamic collaborative network.',
                'value_ar' => 'نحن المنصة المرجعية للمهنيين في مجال السياحة، نقدم دليلاً موثقاً وموارد عالية الجودة وشبكة تعاونية ديناميكية.',
            ],
            
            // Partners settings
            [
                'key' => 'partners_title',
                'type' => 'text',
                'group' => 'partners',
                'description' => 'Titre de la page Partenaires',
                'value_fr' => 'Nos Partenaires',
                'value_en' => 'Our Partners',
                'value_ar' => 'شركاؤنا',
            ],
            [
                'key' => 'partners_subtitle',
                'type' => 'textarea',
                'group' => 'partners',
                'description' => 'Sous-titre de la page Partenaires',
                'value_fr' => 'Nous collaborons avec des organisations nationales et internationales pour promouvoir l\'excellence du tourisme',
                'value_en' => 'We collaborate with national and international organizations to promote tourism excellence',
                'value_ar' => 'نتعاون مع المنظمات الوطنية والدولية لتعزيز التميز السياحي',
            ],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
