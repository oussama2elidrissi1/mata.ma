<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Event;
use Carbon\Carbon;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = [
            [
                'title' => 'Salon International du Tourisme',
                'description' => 'Le plus grand salon professionnel dédié au tourisme au Maroc. Rencontrez les acteurs clés du secteur, découvrez les dernières tendances et développez votre réseau professionnel.',
                'category' => 'Salon',
                'event_date' => Carbon::now()->addMonths(2)->format('Y-m-d'),
                'start_time' => '09:00',
                'end_time' => '18:00',
                'location' => 'Palais des Congrès, Casablanca',
                'participants' => 5000,
                'image' => 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
                'featured' => true,
                'status' => 'published',
            ],
            [
                'title' => 'Conférence sur le Tourisme Durable',
                'description' => 'Échanges et débats sur les pratiques écoresponsables dans le tourisme. Participez à des discussions enrichissantes sur le développement durable du secteur touristique marocain.',
                'category' => 'Conférence',
                'event_date' => Carbon::now()->addMonths(1)->addDays(7)->format('Y-m-d'),
                'start_time' => '14:00',
                'end_time' => '18:00',
                'location' => 'Centre de Congrès, Rabat',
                'participants' => 300,
                'image' => 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=400&fit=crop',
                'featured' => false,
                'status' => 'published',
            ],
            [
                'title' => 'Formation Marketing Digital',
                'description' => 'Workshop pratique sur les stratégies digitales pour le secteur touristique. Apprenez à optimiser votre présence en ligne et à attirer plus de clients.',
                'category' => 'Formation',
                'event_date' => Carbon::now()->addMonths(1)->addDays(20)->format('Y-m-d'),
                'start_time' => '09:00',
                'end_time' => '17:00',
                'location' => 'Business Center, Marrakech',
                'participants' => 50,
                'image' => 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=400&fit=crop',
                'featured' => false,
                'status' => 'published',
            ],
            [
                'title' => 'Networking Professionnels du Tourisme',
                'description' => 'Soirée de networking pour développer votre réseau professionnel. Rencontrez des acteurs du secteur dans une ambiance conviviale et professionnelle.',
                'category' => 'Networking',
                'event_date' => Carbon::now()->addMonths(1)->addDays(27)->format('Y-m-d'),
                'start_time' => '18:00',
                'end_time' => '22:00',
                'location' => 'Rooftop, Casablanca',
                'participants' => 150,
                'image' => 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=400&fit=crop',
                'featured' => true,
                'status' => 'published',
            ],
            [
                'title' => 'Journée Innovation Tourisme',
                'description' => 'Découvrez les dernières innovations technologiques du secteur. Explorez les nouvelles solutions digitales qui transforment le tourisme marocain.',
                'category' => 'Conférence',
                'event_date' => Carbon::now()->addMonths(2)->addDays(5)->format('Y-m-d'),
                'start_time' => '10:00',
                'end_time' => '18:00',
                'location' => 'Acropolis, Tanger',
                'participants' => 400,
                'image' => 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=800&h=400&fit=crop',
                'featured' => false,
                'status' => 'published',
            ],
            [
                'title' => 'Atelier Gestion et Rentabilité',
                'description' => 'Formation sur l\'optimisation de la gestion et de la rentabilité dans le secteur touristique. Apprenez les meilleures pratiques pour améliorer vos performances.',
                'category' => 'Formation',
                'event_date' => Carbon::now()->addMonths(2)->addDays(18)->format('Y-m-d'),
                'start_time' => '09:00',
                'end_time' => '16:00',
                'location' => 'Convention Center, Agadir',
                'participants' => 80,
                'image' => 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
                'featured' => false,
                'status' => 'published',
            ],
        ];

        foreach ($events as $event) {
            Event::create($event);
        }
    }
}
