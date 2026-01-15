<?php

namespace Database\Factories;

use App\Models\TourismActor;
use Illuminate\Database\Eloquent\Factories\Factory;

class TourismActorFactory extends Factory
{
    protected $model = TourismActor::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->company(),
            'type' => $this->faker->randomElement(['hotel', 'restaurant', 'travel_agency', 'tour_guide', 'transport', 'attraction']),
            'category' => $this->faker->randomElement(['luxury', 'premium', 'standard', 'budget']),
            'description' => $this->faker->paragraph(),
            'address' => $this->faker->streetAddress(),
            'city' => $this->faker->city(),
            'region' => $this->faker->randomElement([
                'Casablanca-Settat',
                'Rabat-Salé-Kénitra',
                'Fès-Meknès',
                'Marrakech-Safi',
                'Tanger-Tétouan-Al Hoceïma',
            ]),
            'phone' => $this->faker->phoneNumber(),
            'email' => $this->faker->email(),
            'website' => $this->faker->url(),
            'accreditation_number' => 'MATA-' . strtoupper($this->faker->bothify('####-####')),
            'accreditation_date' => $this->faker->dateTimeBetween('-2 years', 'now'),
            'accreditation_expiry' => $this->faker->dateTimeBetween('now', '+2 years'),
            'status' => 'active',
            'rating' => $this->faker->randomFloat(2, 3, 5),
            'verified' => $this->faker->boolean(70),
            'latitude' => $this->faker->latitude(28, 36),
            'longitude' => $this->faker->longitude(-13, -1),
        ];
    }
}
