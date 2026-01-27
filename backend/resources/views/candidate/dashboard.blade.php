@extends('layouts.app')

@section('content')
<div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="mb-8 flex justify-between items-center">
            <div>
                <h1 class="text-3xl font-bold mb-2" style="color: #1a1a1a;" data-i18n="candidateDashboardTitle">Mon Espace Candidat</h1>
                <p class="text-gray-600" data-i18n="candidateDashboardSubtitle">Gérez votre CV et consultez les offres d'emploi</p>
            </div>
            <button 
                onclick="logout()"
                class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                data-i18n="logout"
            >
                Déconnexion
            </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Sidebar - CV Section -->
            <div class="lg:col-span-1">
                <div class="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                    <h2 class="text-xl font-bold mb-4" style="color: #1a1a1a;" data-i18n="myCV">Mon CV</h2>
                    
                    <div id="cv-status" class="mb-4">
                        <div class="text-center py-8">
                            <p class="text-gray-500 mb-4" data-i18n="noCV">Aucun CV enregistré</p>
                            <div class="space-y-3">
                                <button 
                                    onclick="openCVModal()"
                                    class="w-full px-6 py-2 rounded-lg text-white font-semibold transition-colors hover:opacity-90"
                                    style="background-color: #CC0000;"
                                    data-i18n="createCV"
                                >
                                    Créer mon CV
                                </button>
                                <button 
                                    onclick="openQuickUploadModal()"
                                    class="w-full px-6 py-2 rounded-lg border-2 font-semibold transition-colors hover:bg-gray-50"
                                    style="border-color: #CC0000; color: #CC0000;"
                                    data-i18n="uploadCVPDF"
                                >
                                    📄 Déposer mon CV PDF
                                </button>
                            </div>
                        </div>
                    </div>

                    <div id="cv-content" class="hidden">
                        <div class="mb-4">
                            <p class="text-sm text-gray-600 mb-2" data-i18n="cvStatus">Statut:</p>
                            <span id="cv-status-badge" class="inline-block px-3 py-1 rounded-full text-sm font-semibold"></span>
                        </div>
                        <div class="mb-4 p-3 bg-gray-50 rounded-lg">
                            <p class="text-sm font-semibold mb-1" style="color: #1a1a1a;" id="cv-name-display"></p>
                            <p class="text-xs text-gray-600" id="cv-email-display"></p>
                        </div>
                        <button 
                            onclick="openCVModal()"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors mb-2"
                            data-i18n="editCV"
                        >
                            Modifier mon CV
                        </button>
                        <button 
                            onclick="toggleCVStatus()"
                            id="toggle-status-btn"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors mb-2"
                        >
                            <span id="toggle-status-text"></span>
                        </button>
                        <div class="mb-2">
                            <p class="text-xs text-gray-500 mb-1" data-i18n="cvFileInfo">Fichier CV:</p>
                            <div id="cv-file-info" class="text-sm text-gray-700 flex items-center gap-2">
                                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                                </svg>
                                <span id="cv-file-name" class="truncate"></span>
                            </div>
                        </div>
                        <button 
                            onclick="downloadCV()"
                            id="download-cv-btn"
                            class="w-full px-4 py-2 rounded-lg text-white font-semibold transition-colors hover:opacity-90 mb-2"
                            style="background-color: #CC0000;"
                            data-i18n="downloadCV"
                        >
                            Télécharger mon CV
                        </button>
                        <button 
                            onclick="openQuickUploadModal()"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors mb-2"
                            data-i18n="replaceCV"
                        >
                            Remplacer le fichier CV
                        </button>
                        <button 
                            onclick="deleteCV()"
                            class="w-full px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                            data-i18n="deleteCV"
                        >
                            Supprimer mon CV
                        </button>
                    </div>
                </div>
            </div>

            <!-- Main Content - Job Offers -->
            <div class="lg:col-span-2">
                <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold" style="color: #1a1a1a;" data-i18n="jobOffers">Offres d'emploi</h2>
                        <div class="flex gap-2">
                            <select id="filter-category" class="px-4 py-2 border border-gray-300 rounded-lg text-sm" onchange="loadJobOffers()">
                                <option value="">Toutes les catégories</option>
                                <option value="Hôtellerie & Restauration">Hôtellerie & Restauration</option>
                                <option value="Agences de Voyage">Agences de Voyage</option>
                                <option value="Guide Touristique">Guide Touristique</option>
                                <option value="Événementiel & Animation">Événementiel & Animation</option>
                                <option value="Marketing & Communication">Marketing & Communication</option>
                                <option value="Formation & Management">Formation & Management</option>
                            </select>
                        </div>
                    </div>

                    <div id="job-offers-list" class="space-y-4">
                        <div class="text-center py-12 text-gray-500" data-i18n="loading">Chargement...</div>
                    </div>
                </div>

            <!-- My Applications -->
            <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold" style="color: #1a1a1a;" data-i18n="myApplications">Mes Candidatures</h2>
                    <select id="filter-applications" class="px-4 py-2 border border-gray-300 rounded-lg text-sm" onchange="loadMyApplications()">
                        <option value="">Tous les statuts</option>
                        <option value="pending">En attente</option>
                        <option value="reviewed">Examiné</option>
                        <option value="accepted">Accepté</option>
                        <option value="rejected">Rejeté</option>
                    </select>
                </div>
                <div id="my-applications-list" class="space-y-4">
                    <div class="text-center py-12 text-gray-500" data-i18n="loading">Chargement...</div>
                </div>
            </div>
            </div>
        </div>
    </div>
</div>

<!-- CV Modal -->
<div id="cv-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold" style="color: #1a1a1a;" data-i18n="editCV">Modifier mon CV</h2>
                <button onclick="closeCVModal()" class="text-gray-400 hover:text-gray-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>

            <form id="cv-form" onsubmit="saveCV(event)" enctype="multipart/form-data">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-sm font-medium mb-2" style="color: #333333;">Prénom *</label>
                        <input type="text" name="first_name" required class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2" style="color: #333333;">Nom *</label>
                        <input type="text" name="last_name" required class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-sm font-medium mb-2" style="color: #333333;">Email *</label>
                        <input type="email" name="email" required class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2" style="color: #333333;">Téléphone</label>
                        <input type="tel" name="phone" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    </div>
                </div>

                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2" style="color: #333333;">Adresse</label>
                    <input type="text" name="address" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                </div>

                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2" style="color: #333333;">Résumé professionnel</label>
                    <textarea name="summary" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg"></textarea>
                </div>

                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2" style="color: #333333;">Date de naissance</label>
                    <input type="date" name="birth_date" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                </div>

                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2" style="color: #333333;">
                        <span data-i18n="cvFile">Fichier CV (PDF, DOC, DOCX)</span>
                        <span class="text-red-500">*</span>
                    </label>
                    <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors">
                        <input 
                            type="file" 
                            name="cv_file" 
                            id="cv_file_input"
                            accept=".pdf,.doc,.docx" 
                            class="hidden"
                            onchange="handleFileSelect(this)"
                        >
                        <div id="file-upload-area" onclick="document.getElementById('cv_file_input').click()" class="cursor-pointer">
                            <svg class="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                            </svg>
                            <p class="text-sm text-gray-600 mb-1" data-i18n="clickToUpload">Cliquez pour télécharger ou glissez-déposez</p>
                            <p class="text-xs text-gray-500" data-i18n="fileFormat">PDF, DOC ou DOCX (max 5MB)</p>
                        </div>
                        <div id="file-selected" class="hidden mt-3">
                            <div class="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                <div class="flex items-center gap-2">
                                    <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    <span id="file-name" class="text-sm font-medium text-gray-700"></span>
                                    <span id="file-size" class="text-xs text-gray-500"></span>
                                </div>
                                <button 
                                    type="button"
                                    onclick="clearFileSelection()"
                                    class="text-red-500 hover:text-red-700 text-sm"
                                    data-i18n="remove"
                                >
                                    Retirer
                                </button>
                            </div>
                        </div>
                    </div>
                    <p class="text-xs text-gray-500 mt-2" data-i18n="fileMaxSize">Taille maximale: 5MB</p>
                </div>

                <div class="mb-4">
                    <label class="block text-sm font-medium mb-2" style="color: #333333;">Statut</label>
                    <select name="status" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                        <option value="draft">Brouillon</option>
                        <option value="published">Publié</option>
                    </select>
                </div>

                <div id="cv-form-error" class="hidden mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"></div>

                <div class="flex gap-3">
                    <button type="button" onclick="closeCVModal()" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50" data-i18n="cancel">Annuler</button>
                    <button type="submit" class="flex-1 px-4 py-2 rounded-lg text-white font-semibold transition-colors hover:opacity-90" style="background-color: #CC0000;" data-i18n="save">Enregistrer</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
    let currentCV = null;

    function checkAuth() {
        const token = localStorage.getItem('auth_token');
        const userStr = localStorage.getItem('auth_user');
        
        if (!token || !userStr) {
            window.location.href = '{{ route("jobs") }}';
            return false;
        }
        
        try {
            const user = JSON.parse(userStr);
            if (user.role !== 'user') {
                window.location.href = '{{ route("jobs") }}';
                return false;
            }
        } catch (e) {
            window.location.href = '{{ route("jobs") }}';
            return false;
        }
        
        return true;
    }

    async function loadCV() {
        if (!checkAuth()) return;

        try {
            const token = localStorage.getItem('auth_token');
            const response = await fetch('/api/cv/me', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();

            if (data.success && data.data) {
                currentCV = data.data;
                displayCV(data.data);
            } else {
                document.getElementById('cv-status').classList.remove('hidden');
                document.getElementById('cv-content').classList.add('hidden');
            }
        } catch (error) {
            console.error('Error loading CV:', error);
        }
    }

    function displayCV(cv) {
        document.getElementById('cv-status').classList.add('hidden');
        document.getElementById('cv-content').classList.remove('hidden');
        
        const statusBadge = document.getElementById('cv-status-badge');
        const toggleBtn = document.getElementById('toggle-status-btn');
        const toggleText = document.getElementById('toggle-status-text');
        const downloadBtn = document.getElementById('download-cv-btn');
        const cvFileName = document.getElementById('cv-file-name');
        
        if (cv.status === 'published') {
            statusBadge.textContent = 'Publié';
            statusBadge.className = 'inline-block px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800';
            toggleText.textContent = 'Mettre en brouillon';
        } else {
            statusBadge.textContent = 'Brouillon';
            statusBadge.className = 'inline-block px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800';
            toggleText.textContent = 'Publier';
        }
        
        // Afficher les informations du CV
        document.getElementById('cv-name-display').textContent = `${cv.first_name || ''} ${cv.last_name || ''}`.trim() || 'Non renseigné';
        document.getElementById('cv-email-display').textContent = cv.email || '';
        
        // Afficher le nom du fichier CV
        if (cv.cv_file) {
            const fileName = cv.cv_file.split('/').pop() || cv.cv_file;
            cvFileName.textContent = fileName;
            cvFileName.parentElement.classList.remove('hidden');
        } else {
            cvFileName.parentElement.classList.add('hidden');
        }
        
        // Activer/désactiver le bouton de téléchargement selon la présence du fichier
        if (!cv.cv_file) {
            downloadBtn.disabled = true;
            downloadBtn.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            downloadBtn.disabled = false;
            downloadBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }

    async function loadJobOffers() {
        if (!checkAuth()) return;

        const category = document.getElementById('filter-category').value;
        const params = new URLSearchParams();
        if (category) params.append('category', category);

        try {
            const response = await fetch(`/api/job-offers?${params.toString()}`);
            const data = await response.json();

            const container = document.getElementById('job-offers-list');
            if (data.success && data.data.data && data.data.data.length > 0) {
                container.innerHTML = data.data.data.map(offer => `
                    <div class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div class="flex justify-between items-start mb-4">
                            <div class="flex-1">
                                <h3 class="text-xl font-bold mb-2" style="color: #1a1a1a;">${offer.title}</h3>
                                <p class="text-gray-600 text-sm mb-1">${offer.tourism_actor?.name || ''}</p>
                                ${offer.location ? `<p class="text-gray-500 text-xs flex items-center gap-1"><svg class="w-4 h-4" style="color: #CC0000;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>${offer.location}</p>` : ''}
                            </div>
                            ${offer.category ? `<span class="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold whitespace-nowrap ml-2">${offer.category}</span>` : ''}
                        </div>
                        <p class="text-gray-700 mb-4 line-clamp-3">${offer.description}</p>
                        <div class="flex flex-wrap gap-2 mb-4 text-sm text-gray-600">
                            ${offer.type ? `<span class="px-2 py-1 bg-gray-100 rounded">${offer.type}</span>` : ''}
                            ${offer.salary_min ? `<span class="px-2 py-1 bg-gray-100 rounded">${offer.salary_min}${offer.salary_max ? ' - ' + offer.salary_max : ''} MAD</span>` : ''}
                            ${offer.expiry_date ? `<span class="px-2 py-1 bg-yellow-100 rounded text-yellow-800">Expire: ${new Date(offer.expiry_date).toLocaleDateString('fr-FR')}</span>` : ''}
                        </div>
                        <div class="flex gap-2">
                            <button 
                                onclick="applyToJob(${offer.id})"
                                class="flex-1 px-6 py-2 rounded-lg text-white font-semibold transition-colors hover:opacity-90"
                                style="background-color: #CC0000;"
                            >
                                Postuler
                            </button>
                            <a 
                                href="/actors/${offer.tourism_actor?.id || ''}"
                                class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Voir l'entreprise
                            </a>
                        </div>
                    </div>
                `).join('');
            } else {
                container.innerHTML = '<div class="text-center py-12 text-gray-500">Aucune offre disponible</div>';
            }
        } catch (error) {
            console.error('Error loading job offers:', error);
        }
    }

    async function loadMyApplications() {
        if (!checkAuth()) return;

        const statusFilter = document.getElementById('filter-applications')?.value || '';

        try {
            const token = localStorage.getItem('auth_token');
            const response = await fetch('/api/job-applications/my/applications', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();
            const container = document.getElementById('my-applications-list');

            if (data.success && data.data && data.data.length > 0) {
                let applications = data.data;
                
                // Filtrer par statut si un filtre est sélectionné
                if (statusFilter) {
                    applications = applications.filter(app => app.status === statusFilter);
                }

                if (applications.length > 0) {
                    container.innerHTML = applications.map(app => {
                        const statusLabels = {
                            'pending': 'En attente',
                            'reviewed': 'Examiné',
                            'accepted': 'Accepté',
                            'rejected': 'Rejeté'
                        };
                        const statusColors = {
                            'pending': 'bg-yellow-100 text-yellow-800',
                            'reviewed': 'bg-blue-100 text-blue-800',
                            'accepted': 'bg-green-100 text-green-800',
                            'rejected': 'bg-red-100 text-red-800'
                        };
                        const date = new Date(app.created_at);
                        const formattedDate = date.toLocaleDateString('fr-FR', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        });
                        return `
                            <div class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                <div class="flex justify-between items-start mb-3">
                                    <div class="flex-1">
                                        <h4 class="text-lg font-bold mb-1" style="color: #1a1a1a;">${app.job_offer?.title || 'Offre supprimée'}</h4>
                                        <p class="text-sm text-gray-600 mb-2">${app.job_offer?.tourism_actor?.name || ''} - ${app.job_offer?.location || ''}</p>
                                        <p class="text-xs text-gray-500">Candidature envoyée le ${formattedDate}</p>
                                    </div>
                                    <span class="px-3 py-1 rounded-full text-sm font-semibold ${statusColors[app.status] || 'bg-gray-100 text-gray-800'}">
                                        ${statusLabels[app.status] || app.status}
                                    </span>
                                </div>
                                ${app.cover_letter ? `<p class="text-sm text-gray-700 mb-3 italic">"${app.cover_letter.substring(0, 100)}${app.cover_letter.length > 100 ? '...' : ''}"</p>` : ''}
                                ${app.notes ? `<div class="mt-3 p-3 bg-blue-50 rounded-lg"><p class="text-xs text-blue-800"><strong>Note du recruteur:</strong> ${app.notes}</p></div>` : ''}
                                <div class="mt-3 flex gap-2">
                                    <a href="/actors/${app.job_offer?.tourism_actor?.id || ''}" class="text-sm" style="color: #CC0000;">Voir l'entreprise →</a>
                                </div>
                            </div>
                        `;
                    }).join('');
                } else {
                    container.innerHTML = '<div class="text-center py-12 text-gray-500">Aucune candidature avec ce statut</div>';
                }
            } else {
                container.innerHTML = '<div class="text-center py-12 text-gray-500">Aucune candidature</div>';
            }
        } catch (error) {
            console.error('Error loading applications:', error);
            container.innerHTML = '<div class="text-center py-12 text-red-500">Erreur lors du chargement</div>';
        }
    }

    function openCVModal() {
        if (currentCV) {
            document.querySelector('[name="first_name"]').value = currentCV.first_name || '';
            document.querySelector('[name="last_name"]').value = currentCV.last_name || '';
            document.querySelector('[name="email"]').value = currentCV.email || '';
            document.querySelector('[name="phone"]').value = currentCV.phone || '';
            document.querySelector('[name="address"]').value = currentCV.address || '';
            document.querySelector('[name="summary"]').value = currentCV.summary || '';
            document.querySelector('[name="status"]').value = currentCV.status || 'draft';
            if (currentCV.birth_date) {
                document.querySelector('[name="birth_date"]').value = currentCV.birth_date.split('T')[0];
            }
        }
        document.getElementById('cv-modal').classList.remove('hidden');
    }

    function closeCVModal() {
        document.getElementById('cv-modal').classList.add('hidden');
        document.getElementById('cv-form').reset();
        document.getElementById('cv-form-error').classList.add('hidden');
    }

    async function saveCV(event) {
        event.preventDefault();
        if (!checkAuth()) return;

        const form = event.target;
        const formData = new FormData(form);
        const errorDiv = document.getElementById('cv-form-error');

        try {
            const token = localStorage.getItem('auth_token');
            const response = await fetch('/api/cv/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                currentCV = data.data;
                displayCV(data.data);
                closeCVModal();
            } else {
                errorDiv.textContent = data.message || 'Une erreur est survenue';
                errorDiv.classList.remove('hidden');
            }
        } catch (error) {
            errorDiv.textContent = 'Erreur de connexion. Veuillez réessayer.';
            errorDiv.classList.remove('hidden');
        }
    }

    function openApplicationModal(offerId) {
        const modal = `
            <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div class="p-6">
                        <div class="flex justify-between items-center mb-6">
                            <h2 class="text-2xl font-bold text-gray-900">Postuler à cette offre</h2>
                            <button onclick="closeApplicationModal()" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                        <form id="application-form" onsubmit="submitApplication(event, ${offerId})">
                            <div class="mb-4">
                                <label class="block text-sm font-medium mb-2" style="color: #333333;">Lettre de motivation (optionnel)</label>
                                <textarea 
                                    id="cover-letter-input"
                                    rows="6" 
                                    class="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Expliquez pourquoi vous êtes le candidat idéal pour ce poste..."
                                ></textarea>
                            </div>
                            <div id="application-error" class="hidden mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"></div>
                            <div class="flex gap-3">
                                <button type="button" onclick="closeApplicationModal()" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Annuler</button>
                                <button type="submit" class="flex-1 px-4 py-2 rounded-lg text-white font-semibold transition-colors hover:opacity-90" style="background-color: #CC0000;">Envoyer la candidature</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modal);
    }

    function closeApplicationModal() {
        const modal = document.querySelector('.fixed.inset-0.bg-black.bg-opacity-50');
        if (modal) modal.remove();
    }

    async function submitApplication(event, offerId) {
        event.preventDefault();
        if (!checkAuth()) return;

        if (!currentCV) {
            alert('Veuillez d\'abord créer votre CV');
            closeApplicationModal();
            openCVModal();
            return;
        }

        const coverLetter = document.getElementById('cover-letter-input')?.value || '';
        const errorDiv = document.getElementById('application-error');

        try {
            const token = localStorage.getItem('auth_token');
            const response = await fetch('/api/job-applications/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    job_offer_id: offerId,
                    cv_id: currentCV.id,
                    cover_letter: coverLetter
                })
            });

            const data = await response.json();

            if (data.success) {
                alert('Candidature envoyée avec succès !');
                closeApplicationModal();
                loadMyApplications();
                loadJobOffers();
            } else {
                if (errorDiv) {
                    errorDiv.textContent = data.message || 'Erreur lors de la candidature';
                    errorDiv.classList.remove('hidden');
                } else {
                    alert(data.message || 'Erreur lors de la candidature');
                }
            }
        } catch (error) {
            if (errorDiv) {
                errorDiv.textContent = 'Erreur de connexion. Veuillez réessayer.';
                errorDiv.classList.remove('hidden');
            } else {
                alert('Erreur de connexion. Veuillez réessayer.');
            }
        }
    }

    function applyToJob(offerId) {
        if (!checkAuth()) return;

        if (!currentCV) {
            alert('Veuillez d\'abord créer votre CV');
            openCVModal();
            return;
        }

        openApplicationModal(offerId);
    }

    async function toggleCVStatus() {
        if (!checkAuth() || !currentCV) return;

        const newStatus = currentCV.status === 'published' ? 'draft' : 'published';
        const confirmMessage = newStatus === 'published' 
            ? 'Voulez-vous publier votre CV ? Il sera visible par les recruteurs.'
            : 'Voulez-vous mettre votre CV en brouillon ? Il ne sera plus visible.';

        if (!confirm(confirmMessage)) return;

        try {
            const token = localStorage.getItem('auth_token');
            const response = await fetch('/api/cv/status', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });

            const data = await response.json();

            if (data.success) {
                currentCV = data.data;
                displayCV(data.data);
            } else {
                alert(data.message || 'Erreur lors de la mise à jour');
            }
        } catch (error) {
            alert('Erreur de connexion. Veuillez réessayer.');
        }
    }

    async function deleteCV() {
        if (!checkAuth() || !currentCV) return;

        if (!confirm('Êtes-vous sûr de vouloir supprimer votre CV ? Cette action est irréversible.')) {
            return;
        }

        try {
            const token = localStorage.getItem('auth_token');
            const response = await fetch('/api/cv/', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();

            if (data.success) {
                currentCV = null;
                document.getElementById('cv-status').classList.remove('hidden');
                document.getElementById('cv-content').classList.add('hidden');
                alert('CV supprimé avec succès');
            } else {
                alert(data.message || 'Erreur lors de la suppression');
            }
        } catch (error) {
            alert('Erreur de connexion. Veuillez réessayer.');
        }
    }

    async function downloadCV() {
        if (!currentCV || !currentCV.cv_file) {
            alert('Aucun fichier CV disponible');
            return;
        }

        try {
            const token = localStorage.getItem('auth_token');
            const response = await fetch(`/api/cv/${currentCV.id}/download`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `CV_${currentCV.first_name}_${currentCV.last_name}.${currentCV.cv_file.split('.').pop()}`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            } else {
                alert('Erreur lors du téléchargement');
            }
        } catch (error) {
            alert('Erreur de connexion. Veuillez réessayer.');
        }
    }

    // Logout function
    async function logout() {
        if (!confirm('Voulez-vous vous déconnecter ?')) {
            return;
        }

        try {
            const token = localStorage.getItem('auth_token');
            if (token) {
                await fetch('/api/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                });
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
            window.location.href = '{{ route("jobs") }}';
        }
    }

    // Initialisation
    if (checkAuth()) {
        loadCV();
        loadJobOffers();
        loadMyApplications();
    } else {
        // Rediriger vers la page jobs si non authentifié
        window.location.href = '{{ route("jobs") }}';
    }

    // Gestion de l'upload de fichier
    function handleFileSelect(input) {
        if (input.files && input.files[0]) {
            const file = input.files[0];
            const fileName = file.name;
            const fileSize = (file.size / 1024 / 1024).toFixed(2) + ' MB';
            
            document.getElementById('file-name').textContent = fileName;
            document.getElementById('file-size').textContent = fileSize;
            document.getElementById('file-upload-area').classList.add('hidden');
            document.getElementById('file-selected').classList.remove('hidden');
        }
    }

    function clearFileSelection() {
        document.getElementById('cv_file_input').value = '';
        document.getElementById('file-upload-area').classList.remove('hidden');
        document.getElementById('file-selected').classList.add('hidden');
    }

    // Modal d'upload rapide de CV PDF
    function openQuickUploadModal() {
        const modal = `
            <div id="quick-upload-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div class="bg-white rounded-xl shadow-2xl max-w-md w-full">
                    <div class="p-6">
                        <div class="flex justify-between items-center mb-6">
                            <h2 class="text-2xl font-bold text-gray-900" data-i18n="uploadCVPDF">Déposer mon CV PDF</h2>
                            <button onclick="closeQuickUploadModal()" class="text-gray-400 hover:text-gray-600">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                        <form id="quick-upload-form" onsubmit="handleQuickUpload(event)" enctype="multipart/form-data">
                            <div class="mb-4">
                                <label class="block text-sm font-medium mb-2" style="color: #333333;" data-i18n="selectPDFFile">Sélectionnez votre fichier CV (PDF)</label>
                                <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors">
                                    <input 
                                        type="file" 
                                        name="cv_file" 
                                        id="quick_cv_file"
                                        accept=".pdf" 
                                        required
                                        class="hidden"
                                        onchange="handleQuickFileSelect(this)"
                                    >
                                    <div id="quick-file-upload-area" onclick="document.getElementById('quick_cv_file').click()" class="cursor-pointer">
                                        <svg class="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                                        </svg>
                                        <p class="text-sm text-gray-600 mb-1" data-i18n="clickToUpload">Cliquez pour télécharger</p>
                                        <p class="text-xs text-gray-500" data-i18n="pdfOnly">PDF uniquement (max 5MB)</p>
                                    </div>
                                    <div id="quick-file-selected" class="hidden mt-3">
                                        <div class="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                            <div class="flex items-center gap-2">
                                                <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>
                                                <span id="quick-file-name" class="text-sm font-medium text-gray-700"></span>
                                                <span id="quick-file-size" class="text-xs text-gray-500"></span>
                                            </div>
                                            <button 
                                                type="button"
                                                onclick="clearQuickFileSelection()"
                                                class="text-red-500 hover:text-red-700 text-sm"
                                            >
                                                Retirer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="quick-upload-error" class="hidden mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"></div>
                            <div class="flex gap-3">
                                <button type="button" onclick="closeQuickUploadModal()" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50" data-i18n="cancel">Annuler</button>
                                <button type="submit" class="flex-1 px-4 py-2 rounded-lg text-white font-semibold transition-colors hover:opacity-90" style="background-color: #CC0000;" data-i18n="upload">Télécharger</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modal);
    }

    function closeQuickUploadModal() {
        const modal = document.getElementById('quick-upload-modal');
        if (modal) modal.remove();
    }

    function handleQuickFileSelect(input) {
        if (input.files && input.files[0]) {
            const file = input.files[0];
            const fileName = file.name;
            const fileSize = (file.size / 1024 / 1024).toFixed(2) + ' MB';
            
            document.getElementById('quick-file-name').textContent = fileName;
            document.getElementById('quick-file-size').textContent = fileSize;
            document.getElementById('quick-file-upload-area').classList.add('hidden');
            document.getElementById('quick-file-selected').classList.remove('hidden');
        }
    }

    function clearQuickFileSelection() {
        document.getElementById('quick_cv_file').value = '';
        document.getElementById('quick-file-upload-area').classList.remove('hidden');
        document.getElementById('quick-file-selected').classList.add('hidden');
    }

    async function handleQuickUpload(event) {
        event.preventDefault();
        if (!checkAuth()) return;

        const form = event.target;
        const formData = new FormData(form);
        const errorDiv = document.getElementById('quick-upload-error');
        
        // Ajouter les champs minimaux requis
        const userStr = localStorage.getItem('auth_user');
        if (userStr) {
            const user = JSON.parse(userStr);
            formData.append('first_name', user.name.split(' ')[0] || '');
            formData.append('last_name', user.name.split(' ').slice(1).join(' ') || '');
            formData.append('email', user.email);
        }

        errorDiv.classList.add('hidden');

        try {
            const token = localStorage.getItem('auth_token');
            const response = await fetch('/api/cv/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                currentCV = data.data;
                displayCV(data.data);
                closeQuickUploadModal();
                alert('CV téléchargé avec succès !');
                loadCV();
            } else {
                let errorMessage = data.message || 'Une erreur est survenue';
                if (data.errors) {
                    const errorList = Object.values(data.errors).flat();
                    if (errorList.length > 0) {
                        errorMessage = errorList.join(', ');
                    }
                }
                errorDiv.textContent = errorMessage;
                errorDiv.classList.remove('hidden');
            }
        } catch (error) {
            errorDiv.textContent = 'Erreur de connexion. Veuillez réessayer.';
            errorDiv.classList.remove('hidden');
        }
    }

    // Fermer le modal si on clique en dehors
    document.getElementById('cv-modal')?.addEventListener('click', function(e) {
        if (e.target === this) {
            closeCVModal();
        }
    });

    // Fermer le modal de candidature si on clique en dehors
    document.addEventListener('click', function(e) {
        const applicationModal = document.querySelector('.fixed.inset-0.bg-black.bg-opacity-50');
        if (applicationModal && e.target === applicationModal) {
            closeApplicationModal();
        }
        const quickUploadModal = document.getElementById('quick-upload-modal');
        if (quickUploadModal && e.target === quickUploadModal) {
            closeQuickUploadModal();
        }
    });
</script>
@endsection
