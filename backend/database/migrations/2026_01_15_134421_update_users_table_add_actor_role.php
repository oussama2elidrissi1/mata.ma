<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Modifier la colonne role pour inclure 'actor'
        DB::statement("ALTER TABLE `users` MODIFY COLUMN `role` ENUM('admin', 'user', 'actor') DEFAULT 'user'");
    }

    public function down(): void
    {
        // Revenir à l'ancien enum sans 'actor'
        DB::statement("ALTER TABLE `users` MODIFY COLUMN `role` ENUM('admin', 'user') DEFAULT 'user'");
    }
};
