<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('job_offers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tourism_actor_id')->constrained('tourism_actors')->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->string('category')->nullable(); // Hôtellerie, Agences de Voyage, etc.
            $table->string('location')->nullable();
            $table->string('type')->nullable(); // CDI, CDD, Stage, etc.
            $table->decimal('salary_min', 10, 2)->nullable();
            $table->decimal('salary_max', 10, 2)->nullable();
            $table->text('requirements')->nullable();
            $table->text('benefits')->nullable();
            $table->enum('status', ['draft', 'published', 'closed'])->default('draft');
            $table->date('expiry_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_offers');
    }
};
