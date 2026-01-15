<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tourism_actors', function (Blueprint $table) {
            $table->json('opening_hours')->nullable()->after('languages');
            $table->string('team_size')->nullable()->after('opening_hours');
        });
    }

    public function down(): void
    {
        Schema::table('tourism_actors', function (Blueprint $table) {
            $table->dropColumn(['opening_hours', 'team_size']);
        });
    }
};
