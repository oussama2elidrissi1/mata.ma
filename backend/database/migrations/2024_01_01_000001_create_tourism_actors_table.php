<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tourism_actors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('name_ar')->nullable();
            $table->enum('type', [
                'hotel',
                'restaurant',
                'travel_agency',
                'tour_guide',
                'transport',
                'attraction',
                'other',
                'association'
            ]);
            $table->enum('category', [
                'luxury',
                'premium',
                'standard',
                'budget'
            ])->nullable();
            $table->text('description')->nullable();
            $table->text('description_ar')->nullable();
            $table->string('address');
            $table->string('city');
            $table->string('region');
            $table->string('postal_code')->nullable();
            $table->string('country')->default('Morocco');
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('website')->nullable();
            $table->string('accreditation_number')->unique()->nullable();
            $table->date('accreditation_date')->nullable();
            $table->date('accreditation_expiry')->nullable();
            $table->enum('status', [
                'active',
                'inactive',
                'pending',
                'suspended'
            ])->default('pending');
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->string('logo')->nullable();
            $table->json('images')->nullable();
            $table->json('services')->nullable();
            $table->json('languages')->nullable();
            $table->decimal('rating', 3, 2)->default(0);
            $table->boolean('verified')->default(false);
            $table->timestamps();
            $table->softDeletes();

            $table->index(['type', 'status']);
            $table->index(['region', 'city']);
            $table->index('verified');
            $table->fullText(['name', 'description']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tourism_actors');
    }
};
