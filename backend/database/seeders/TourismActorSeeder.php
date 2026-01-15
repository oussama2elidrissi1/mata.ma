<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TourismActor;
use Faker\Factory as Faker;

class TourismActorSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('fr_FR');

        $regions = [
            'Casablanca-Settat',
            'Rabat-Salé-Kénitra',
            'Fès-Meknès',
            'Marrakech-Safi',
            'Tanger-Tétouan-Al Hoceïma',
            'Oriental',
            'Souss-Massa',
        ];

        $cities = [
            'Casablanca' => 'Casablanca-Settat',
            'Rabat' => 'Rabat-Salé-Kénitra',
            'Fès' => 'Fès-Meknès',
            'Marrakech' => 'Marrakech-Safi',
            'Tanger' => 'Tanger-Tétouan-Al Hoceïma',
            'Agadir' => 'Souss-Massa',
            'Meknès' => 'Fès-Meknès',
            'Oujda' => 'Oriental',
        ];

        $types = ['hotel', 'restaurant', 'travel_agency', 'tour_guide', 'transport', 'attraction'];
        $categories = ['luxury', 'premium', 'standard', 'budget'];

        foreach ($cities as $city => $region) {
            // Hotels
            for ($i = 0; $i < 3; $i++) {
                TourismActor::create([
                    'name' => $faker->company() . ' Hotel',
                    'type' => 'hotel',
                    'category' => $faker->randomElement($categories),
                    'description' => $faker->paragraph(),
                    'address' => $faker->streetAddress(),
                    'city' => $city,
                    'region' => $region,
                    'phone' => $faker->phoneNumber(),
                    'email' => $faker->email(),
                    'website' => $faker->url(),
                    'accreditation_number' => 'MATA-' . strtoupper($faker->bothify('####-####')),
                    'accreditation_date' => $faker->dateTimeBetween('-2 years', 'now'),
                    'accreditation_expiry' => $faker->dateTimeBetween('now', '+2 years'),
                    'status' => 'active',
                    'rating' => $faker->randomFloat(2, 3, 5),
                    'verified' => $faker->boolean(80),
                    'latitude' => $faker->latitude(28, 36),
                    'longitude' => $faker->longitude(-13, -1),
                ]);
            }

            // Restaurants
            for ($i = 0; $i < 2; $i++) {
                TourismActor::create([
                    'name' => $faker->company() . ' Restaurant',
                    'type' => 'restaurant',
                    'category' => $faker->randomElement($categories),
                    'description' => $faker->paragraph(),
                    'address' => $faker->streetAddress(),
                    'city' => $city,
                    'region' => $region,
                    'phone' => $faker->phoneNumber(),
                    'email' => $faker->email(),
                    'accreditation_number' => 'MATA-' . strtoupper($faker->bothify('####-####')),
                    'accreditation_date' => $faker->dateTimeBetween('-2 years', 'now'),
                    'accreditation_expiry' => $faker->dateTimeBetween('now', '+2 years'),
                    'status' => 'active',
                    'rating' => $faker->randomFloat(2, 3, 5),
                    'verified' => $faker->boolean(70),
                    'latitude' => $faker->latitude(28, 36),
                    'longitude' => $faker->longitude(-13, -1),
                ]);
            }

            // Travel Agencies
            for ($i = 0; $i < 2; $i++) {
                TourismActor::create([
                    'name' => $faker->company() . ' Travel',
                    'type' => 'travel_agency',
                    'description' => $faker->paragraph(),
                    'address' => $faker->streetAddress(),
                    'city' => $city,
                    'region' => $region,
                    'phone' => $faker->phoneNumber(),
                    'email' => $faker->email(),
                    'website' => $faker->url(),
                    'accreditation_number' => 'MATA-' . strtoupper($faker->bothify('####-####')),
                    'accreditation_date' => $faker->dateTimeBetween('-2 years', 'now'),
                    'accreditation_expiry' => $faker->dateTimeBetween('now', '+2 years'),
                    'status' => 'active',
                    'rating' => $faker->randomFloat(2, 3, 5),
                    'verified' => $faker->boolean(75),
                    'latitude' => $faker->latitude(28, 36),
                    'longitude' => $faker->longitude(-13, -1),
                ]);
            }
        }
    }
}
