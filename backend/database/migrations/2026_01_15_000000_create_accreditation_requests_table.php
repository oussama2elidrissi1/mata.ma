<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('accreditation_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tourism_actor_id')->constrained('tourism_actors')->onDelete('cascade');
            $table->string('full_name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('position')->nullable(); // Poste/fonction
            $table->string('identity_document_type')->nullable(); // Type de pièce d'identité
            $table->string('identity_document_number')->nullable(); // Numéro de pièce d'identité
            $table->string('accreditation_document')->nullable(); // Chemin vers le document d'accréditation
            $table->text('message')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->text('admin_notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('accreditation_requests');
    }
};
