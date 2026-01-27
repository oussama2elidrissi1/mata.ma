@extends('layouts.app')

@section('content')
<div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-red-900 via-red-800 to-red-950 text-white py-20">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto text-center">
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif tracking-tight drop-shadow-lg" data-i18n="accreditationSystemTitle">
                    Système d'Accréditation MATA
                </h1>
                <p class="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed" data-i18n="accreditationSystemSubtitle">
                    Un processus simple et transparent pour obtenir votre accréditation et rejoindre notre réseau de professionnels certifiés du tourisme marocain
                </p>
            </div>
        </div>
    </section>

    <!-- Process Section -->
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-12">
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif tracking-tight" data-i18n="accreditationProcessTitle">
                        Processus d'Accréditation
                    </h2>
                    <p class="text-lg text-gray-600 max-w-2xl mx-auto" data-i18n="accreditationProcessSubtitle">
                        Suivez ces étapes simples pour obtenir votre accréditation MATA
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div class="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200 hover:border-red-300 transition-all">
                        <div class="flex items-start gap-4 mb-4">
                            <div class="w-16 h-16 rounded-full bg-red-100 text-red-900 flex items-center justify-center flex-shrink-0">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                            </div>
                            <div class="flex-1">
                                <span class="text-sm font-bold text-red-900 bg-red-100 px-3 py-1 rounded-full" data-i18n="step1">Étape 1</span>
                                <h3 class="text-xl font-bold text-gray-900 mb-2 font-serif mt-2" data-i18n="findProfile">Trouvez Votre Profil</h3>
                            </div>
                        </div>
                        <p class="text-gray-600 leading-relaxed" data-i18n="findProfileDesc">
                            Recherchez votre établissement dans notre annuaire en ligne. Si votre profil existe déjà (ajouté par l'administration), vous pouvez directement demander l'accréditation.
                        </p>
                    </div>

                    <div class="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200 hover:border-red-300 transition-all">
                        <div class="flex items-start gap-4 mb-4">
                            <div class="w-16 h-16 rounded-full bg-red-100 text-red-900 flex items-center justify-center flex-shrink-0">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                            </div>
                            <div class="flex-1">
                                <span class="text-sm font-bold text-red-900 bg-red-100 px-3 py-1 rounded-full" data-i18n="step2">Étape 2</span>
                                <h3 class="text-xl font-bold text-gray-900 mb-2 font-serif mt-2" data-i18n="requestAccreditationStep">Demande d'Accréditation</h3>
                            </div>
                        </div>
                        <p class="text-gray-600 leading-relaxed" data-i18n="requestAccreditationStepDesc">
                            Cliquez sur "Demander l'accréditation" sur votre page de profil. Remplissez le formulaire avec vos informations personnelles, votre pièce d'identité et téléchargez votre document d'accréditation.
                        </p>
                    </div>

                    <div class="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200 hover:border-red-300 transition-all">
                        <div class="flex items-start gap-4 mb-4">
                            <div class="w-16 h-16 rounded-full bg-red-100 text-red-900 flex items-center justify-center flex-shrink-0">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                            </div>
                            <div class="flex-1">
                                <span class="text-sm font-bold text-red-900 bg-red-100 px-3 py-1 rounded-full" data-i18n="step3">Étape 3</span>
                                <h3 class="text-xl font-bold text-gray-900 mb-2 font-serif mt-2" data-i18n="confirmationStep">Confirmation de Réception</h3>
                            </div>
                        </div>
                        <p class="text-gray-600 leading-relaxed" data-i18n="confirmationStepDesc">
                            Vous recevrez un email de confirmation confirmant que votre demande a bien été reçue et est en cours d'examen par notre équipe.
                        </p>
                    </div>

                    <div class="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200 hover:border-red-300 transition-all">
                        <div class="flex items-start gap-4 mb-4">
                            <div class="w-16 h-16 rounded-full bg-red-100 text-red-900 flex items-center justify-center flex-shrink-0">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
                            </div>
                            <div class="flex-1">
                                <span class="text-sm font-bold text-red-900 bg-red-100 px-3 py-1 rounded-full" data-i18n="step4">Étape 4</span>
                                <h3 class="text-xl font-bold text-gray-900 mb-2 font-serif mt-2" data-i18n="evaluationStep">Évaluation par l'Administration</h3>
                            </div>
                        </div>
                        <p class="text-gray-600 leading-relaxed" data-i18n="evaluationStepDesc">
                            Notre équipe d'administration examine votre demande, vérifie vos documents et évalue votre établissement selon nos critères de qualité.
                        </p>
                    </div>

                    <div class="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200 hover:border-red-300 transition-all">
                        <div class="flex items-start gap-4 mb-4">
                            <div class="w-16 h-16 rounded-full bg-red-100 text-red-900 flex items-center justify-center flex-shrink-0">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                            </div>
                            <div class="flex-1">
                                <span class="text-sm font-bold text-red-900 bg-red-100 px-3 py-1 rounded-full" data-i18n="step5">Étape 5</span>
                                <h3 class="text-xl font-bold text-gray-900 mb-2 font-serif mt-2" data-i18n="validationStep">Validation et Création de Compte</h3>
                            </div>
                        </div>
                        <p class="text-gray-600 leading-relaxed" data-i18n="validationStepDesc">
                            Si votre demande est approuvée, vous recevrez un email avec vos identifiants de connexion (email et mot de passe) pour accéder à votre espace personnel.
                        </p>
                    </div>

                    <div class="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200 hover:border-red-300 transition-all">
                        <div class="flex items-start gap-4 mb-4">
                            <div class="w-16 h-16 rounded-full bg-red-100 text-red-900 flex items-center justify-center flex-shrink-0">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
                            </div>
                            <div class="flex-1">
                                <span class="text-sm font-bold text-red-900 bg-red-100 px-3 py-1 rounded-full">Étape 6</span>
                                <h3 class="text-xl font-bold text-gray-900 mb-2 font-serif mt-2">Gestion de Votre Profil</h3>
                            </div>
                        </div>
                        <p class="text-gray-600 leading-relaxed">
                            Une fois connecté, vous pouvez modifier vos informations, ajouter des photos, mettre à jour vos services et gérer votre profil professionnel.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Requirements Section -->
    <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-12">
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif tracking-tight">
                        Documents Requis
                    </h2>
                    <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                        Assurez-vous d'avoir tous les documents nécessaires avant de soumettre votre demande
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow">
                        <div class="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3 font-serif" data-i18n="identityInformation">Information d'identité</h3>
                        <p class="text-gray-600 leading-relaxed" data-i18n="identityInformationDesc">
                            Numero (CIN), passeport ou autre pièce d'identité officielle valide.
                        </p>
                    </div>

                    <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow">
                        <div class="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3 font-serif">Document d'Accréditation</h3>
                        <p class="text-gray-600 leading-relaxed">
                            Document officiel attestant de votre activité (licence, autorisation, certificat, etc.) au format PDF, DOC, DOCX, JPG ou PNG (max 10MB).
                        </p>
                    </div>

                    <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow">
                        <div class="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3 font-serif">Informations Complètes</h3>
                        <p class="text-gray-600 leading-relaxed">
                            Nom complet, email, téléphone, fonction/poste et message optionnel expliquant votre demande.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Criteria Section -->
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto">
                <div class="text-center mb-12">
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif tracking-tight">
                        Critères d'Évaluation
                    </h2>
                    <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                        Votre établissement sera évalué selon les critères suivants
                    </p>
                </div>

                <div class="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="flex items-start gap-4">
                            <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            <span class="text-gray-700 leading-relaxed">Conformité aux standards de qualité du tourisme marocain</span>
                        </div>
                        <div class="flex items-start gap-4">
                            <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            <span class="text-gray-700 leading-relaxed">Expérience professionnelle vérifiable dans le secteur touristique</span>
                        </div>
                        <div class="flex items-start gap-4">
                            <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            <span class="text-gray-700 leading-relaxed">Infrastructure et équipements adéquats pour votre activité</span>
                        </div>
                        <div class="flex items-start gap-4">
                            <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            <span class="text-gray-700 leading-relaxed">Service client de qualité et professionnalisme</span>
                        </div>
                        <div class="flex items-start gap-4">
                            <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            <span class="text-gray-700 leading-relaxed">Respect des normes de sécurité et d'hygiène</span>
                        </div>
                        <div class="flex items-start gap-4">
                            <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            <span class="text-gray-700 leading-relaxed">Transparence financière et légale</span>
                        </div>
                        <div class="flex items-start gap-4 md:col-span-2">
                            <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            <span class="text-gray-700 leading-relaxed">Engagement envers le développement durable du tourisme</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Benefits Section -->
    <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-12">
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif tracking-tight">
                        Avantages de l'Accréditation
                    </h2>
                    <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                        Rejoignez notre réseau et bénéficiez de nombreux avantages
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div class="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-200 hover:shadow-xl transition-shadow">
                        <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 text-red-900 rounded-full mb-6">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4 font-serif">Reconnaissance Officielle</h3>
                        <p class="text-gray-600 leading-relaxed">
                            Certification MATA reconnue dans le secteur du tourisme marocain, attestant de votre professionnalisme et de votre engagement qualité.
                        </p>
                    </div>

                    <div class="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-200 hover:shadow-xl transition-shadow">
                        <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 text-red-900 rounded-full mb-6">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4 font-serif">Visibilité Accrue</h3>
                        <p class="text-gray-600 leading-relaxed">
                            Présence dans notre annuaire officiel avec un badge "Accrédité", promotion auprès de nos partenaires et meilleure visibilité en ligne.
                        </p>
                    </div>

                    <div class="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-200 hover:shadow-xl transition-shadow">
                        <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 text-red-900 rounded-full mb-6">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4 font-serif">Espace Personnel</h3>
                        <p class="text-gray-600 leading-relaxed">
                            Accès à votre espace personnel pour gérer votre profil, mettre à jour vos informations, ajouter des photos et suivre vos statistiques.
                        </p>
                    </div>

                    <div class="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-200 hover:shadow-xl transition-shadow">
                        <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 text-red-900 rounded-full mb-6">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4 font-serif">Crédibilité Renforcée</h3>
                        <p class="text-gray-600 leading-relaxed">
                            Renforcez la confiance de vos clients avec le badge d'accréditation MATA, symbole de qualité et de professionnalisme.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Important Notes Section -->
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto">
                <div class="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
                    <div class="flex items-start gap-4 mb-6">
                        <svg class="w-8 h-8 text-red-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                        <div>
                            <h3 class="text-2xl font-bold text-red-900 mb-2 font-serif">Informations Importantes</h3>
                        </div>
                    </div>
                    <ul class="space-y-4 text-gray-700">
                        <li class="flex items-start gap-3">
                            <svg class="w-5 h-5 text-red-900 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            <span><strong>Délai de traitement :</strong> Votre demande sera examinée dans les plus brefs délais. Vous serez notifié par email de la décision.</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg class="w-5 h-5 text-red-900 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                            <span><strong>Une seule demande à la fois :</strong> Si vous avez déjà une demande en attente, vous ne pourrez pas en soumettre une nouvelle jusqu'à ce que la première soit traitée.</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg class="w-5 h-5 text-red-900 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                            <span><strong>Communication par email :</strong> Toutes les communications se font par email. Assurez-vous de fournir une adresse email valide et de vérifier régulièrement votre boîte de réception.</span>
                        </li>
                        <li class="flex items-start gap-3">
                            <svg class="w-5 h-5 text-red-900 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            <span><strong>Gestion de profil :</strong> Une fois accrédité, vous recevrez vos identifiants de connexion pour gérer votre profil et mettre à jour vos informations à tout moment.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gradient-to-br from-red-900 via-red-800 to-red-950 text-white">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto text-center">
                <h2 class="text-3xl md:text-4xl font-bold mb-6 font-serif tracking-tight">
                    <span data-i18n="accreditationReady">Prêt à Obtenir Votre Accréditation ?</span>
                </h2>
                <p class="text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
                    Rejoignez notre réseau de professionnels accrédités et bénéficiez de tous les avantages MATA pour développer votre activité touristique.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="{{ route('actors.index') }}" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-red-900 rounded-xl hover:bg-gray-100 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                        Rechercher Mon Profil
                    </a>
                    <a href="{{ route('contact') }}" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        Nous Contacter
                    </a>
                </div>
            </div>
        </div>
    </section>
</div>
@endsection
