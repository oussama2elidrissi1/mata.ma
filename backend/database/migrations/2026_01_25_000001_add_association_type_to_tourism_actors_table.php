<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Ajouter 'association' à l'ENUM type
        DB::statement("
            ALTER TABLE `tourism_actors`
            MODIFY COLUMN `type`
            ENUM('hotel','restaurant','travel_agency','tour_guide','transport','attraction','other','association')
            NOT NULL
        ");
    }

    public function down(): void
    {
        // Retirer 'association' de l'ENUM type (revenir à l'état précédent)
        DB::statement("
            ALTER TABLE `tourism_actors`
            MODIFY COLUMN `type`
            ENUM('hotel','restaurant','travel_agency','tour_guide','transport','attraction','other')
            NOT NULL
        ");
    }
};

