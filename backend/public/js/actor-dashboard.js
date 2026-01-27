(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => root.querySelectorAll(sel);

  const API_BASE = '/api';
  const escapeHtml = (value) => {
    const s = String(value ?? "");
    return s.replace(/[&<>"']/g, (c) => {
      switch (c) {
        case "&": return "&amp;";
        case "<": return "&lt;";
        case ">": return "&gt;";
        case '"': return "&quot;";
        case "'": return "&#39;";
        default: return c;
      }
    });
  };

  const apiCall = async (url, options = {}) => {
    const token = localStorage.getItem('auth_token');
    const headers = {
      'Accept': 'application/json',
      ...options.headers,
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    if (options.body && !(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }
    
    const response = await fetch(`${API_BASE}${url}`, {
      ...options,
      headers,
    });
    
    if (response.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      window.location.href = '/actor/login';
      throw new Error('Non authentifié');
    }
    
    const data = await response.json().catch(() => ({}));
    
    if (!response.ok) {
      throw new Error(data.message || `Erreur HTTP ${response.status}`);
    }
    
    return data;
  };

  const checkAuth = () => {
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('auth_user');
    
    if (!token || !userStr) {
      window.location.href = '/actor/login';
      return false;
    }
    
    try {
      const user = JSON.parse(userStr);
      if (user.role !== 'actor') {
        window.location.href = '/actor/login';
        return false;
      }
    } catch (e) {
      window.location.href = '/actor/login';
      return false;
    }
    
    return true;
  };

  let actorData = null;
  let formData = {
    name: '',
    name_ar: '',
    description: '',
    description_ar: '',
    address: '',
    phone: '',
    website: '',
    services: [],
    languages: [],
  };

  const loadActor = async () => {
    const container = $('#actor-dashboard');
    if (!container) return;

    try {
      const response = await apiCall('/actor/me');
      if (response.success) {
        actorData = response.data;
        formData = {
          name: actorData.name || '',
          name_ar: actorData.name_ar || '',
          description: actorData.description || '',
          description_ar: actorData.description_ar || '',
          address: actorData.address || '',
          phone: actorData.phone || '',
          website: actorData.website || '',
          services: Array.isArray(actorData.services) ? [...actorData.services] : [],
          languages: Array.isArray(actorData.languages) ? [...actorData.languages] : [],
        };
        renderDashboard();
      }
    } catch (error) {
      console.error('Error loading actor:', error);
      container.innerHTML = `
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p class="text-red-600">Erreur lors du chargement. Veuillez rafraîchir la page.</p>
        </div>
      `;
    }
  };

  let currentSection = 'info'; // 'info' or 'jobs'
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('section') === 'jobs') {
    currentSection = 'jobs';
  }

  const renderDashboard = () => {
    const container = $('#actor-dashboard');
    if (!container || !actorData) return;

    container.innerHTML = `
      <!-- Tabs -->
      <div class="mb-6 border-b border-gray-200">
        <div class="flex gap-4">
          <button
            onclick="switchSection('info')"
            class="px-6 py-3 font-semibold border-b-2 transition-colors ${currentSection === 'info' ? 'border-red-900 text-red-900' : 'border-transparent text-gray-600 hover:text-gray-900'}"
          >
            Mes Informations
          </button>
          <button
            onclick="switchSection('jobs')"
            class="px-6 py-3 font-semibold border-b-2 transition-colors ${currentSection === 'jobs' ? 'border-red-900 text-red-900' : 'border-transparent text-gray-600 hover:text-gray-900'}"
          >
            Offres d'emploi
          </button>
        </div>
      </div>

      ${currentSection === 'info' ? renderInfoSection() : renderJobsSection()}
    `;

    initIcons();
    attachEventListeners();
    if (currentSection === 'jobs') {
      loadJobOffers();
    }
  };

  const renderInfoSection = () => {
    return `
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-200 sticky top-24">
            <div class="text-center mb-6">
              ${actorData.logo ? `
                <img
                  src="${escapeHtml(actorData.logo)}"
                  alt="${escapeHtml(actorData.name)}"
                  class="w-32 h-32 rounded-full mx-auto object-cover border-4 border-red-900"
                />
              ` : `
                <div class="w-32 h-32 rounded-full mx-auto bg-gradient-to-br from-blue-600 to-amber-600 flex items-center justify-center">
                  <i data-lucide="building-2" class="w-16 h-16 text-white"></i>
                </div>
              `}
              <h2 class="text-xl font-bold text-gray-900 mt-4">${escapeHtml(actorData.name)}</h2>
              ${actorData.name_ar ? `<p class="text-sm text-gray-600 mt-1">${escapeHtml(actorData.name_ar)}</p>` : ''}
              ${actorData.accreditation_number ? `
                <div class="mt-3 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold inline-block">
                  Accrédité: ${escapeHtml(actorData.accreditation_number)}
                </div>
              ` : ''}
            </div>

            <div class="space-y-2">
              <div class="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <i data-lucide="user" class="w-5 h-5 text-red-900"></i>
                <span class="font-medium text-gray-900">Informations</span>
              </div>
              <div class="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer" onclick="scrollToSection('images')">
                <i data-lucide="image" class="w-5 h-5"></i>
                <span>Images</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Informations générales -->
          <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 class="text-xl font-bold text-gray-900 mb-6">Informations générales</h3>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nom (FR) *</label>
                <input
                  type="text"
                  id="form-name"
                  value="${escapeHtml(formData.name)}"
                  class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 text-gray-900 bg-white"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nom (AR)</label>
                <input
                  type="text"
                  id="form-name-ar"
                  value="${escapeHtml(formData.name_ar || '')}"
                  class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 text-gray-900 bg-white"
                  dir="rtl"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Description (FR)</label>
                <textarea
                  id="form-description"
                  rows="4"
                  class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 text-gray-900 bg-white"
                >${escapeHtml(formData.description || '')}</textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Description (AR)</label>
                <textarea
                  id="form-description-ar"
                  rows="4"
                  class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 text-gray-900 bg-white"
                  dir="rtl"
                >${escapeHtml(formData.description_ar || '')}</textarea>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  <input
                    type="text"
                    id="form-phone"
                    value="${escapeHtml(formData.phone || '')}"
                    class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 text-gray-900 bg-white"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Site web</label>
                  <input
                    type="url"
                    id="form-website"
                    value="${escapeHtml(formData.website || '')}"
                    class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 text-gray-900 bg-white"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                <input
                  type="text"
                  id="form-address"
                  value="${escapeHtml(formData.address || '')}"
                  class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 text-gray-900 bg-white"
                />
              </div>

              <!-- Services -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Services</label>
                <div id="services-container" class="flex flex-wrap gap-2 mb-2">
                  ${formData.services.map((service, idx) => `
                    <span class="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm flex items-center gap-2">
                      ${escapeHtml(service)}
                      <button onclick="removeService(${idx})" class="text-red-600 hover:text-red-800">
                        <i data-lucide="x" class="w-3 h-3"></i>
                      </button>
                    </span>
                  `).join('')}
                </div>
                <div class="flex gap-2">
                  <input
                    type="text"
                    id="new-service"
                    placeholder="Ajouter un service"
                    class="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 text-gray-900 bg-white"
                    onkeypress="if(event.key==='Enter') addService()"
                  />
                  <button onclick="addService()" class="px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors">
                    <i data-lucide="plus" class="w-5 h-5"></i>
                  </button>
                </div>
              </div>

              <!-- Langues -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Langues</label>
                <div id="languages-container" class="flex flex-wrap gap-2 mb-2">
                  ${formData.languages.map((lang, idx) => `
                    <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center gap-2">
                      ${escapeHtml(lang)}
                      <button onclick="removeLanguage(${idx})" class="text-green-600 hover:text-green-800">
                        <i data-lucide="x" class="w-3 h-3"></i>
                      </button>
                    </span>
                  `).join('')}
                </div>
                <div class="flex gap-2">
                  <input
                    type="text"
                    id="new-language"
                    placeholder="Ajouter une langue"
                    class="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 text-gray-900 bg-white"
                    onkeypress="if(event.key==='Enter') addLanguage()"
                  />
                  <button onclick="addLanguage()" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <i data-lucide="plus" class="w-5 h-5"></i>
                  </button>
                </div>
              </div>

              <button
                onclick="saveActorInfo()"
                id="save-btn"
                class="w-full py-3 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <i data-lucide="save" class="w-5 h-5"></i>
                <span id="save-btn-text">Enregistrer les modifications</span>
              </button>
            </div>
          </div>

          <!-- Logo -->
          <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Logo</h3>
            <div class="flex items-center gap-6">
              ${actorData.logo ? `
                <img src="${escapeHtml(actorData.logo)}" alt="Logo" class="w-32 h-32 rounded-lg object-cover border-2 border-gray-200" />
              ` : `
                <div class="w-32 h-32 rounded-lg bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
                  <i data-lucide="image" class="w-12 h-12 text-gray-400"></i>
                </div>
              `}
              <div>
                <label class="block">
                  <span class="sr-only">Choisir un logo</span>
                  <input
                    type="file"
                    id="logo-input"
                    accept="image/*"
                    class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-900 file:text-white hover:file:bg-blue-800 disabled:opacity-50"
                  />
                </label>
                <p class="mt-2 text-sm text-gray-500">JPG, PNG ou GIF (max 5MB)</p>
              </div>
            </div>
          </div>

          <!-- Images -->
          <div id="images-section" class="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Images</h3>
            
            <div class="mb-4">
              <label class="block">
                <span class="sr-only">Ajouter des images</span>
                <input
                  type="file"
                  id="images-input"
                  accept="image/*"
                  multiple
                  class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-900 file:text-white hover:file:bg-blue-800 disabled:opacity-50"
                />
              </label>
              <p class="mt-2 text-sm text-gray-500">Jusqu'à 10 images (max 5MB chacune)</p>
            </div>

            ${actorData.images && Array.isArray(actorData.images) && actorData.images.length > 0 ? `
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                ${actorData.images.map((image, index) => `
                  <div class="relative group">
                    <img
                      src="${escapeHtml(image)}"
                      alt="Image ${index + 1}"
                      class="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      onclick="deleteImage(${index})"
                      class="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                  </div>
                `).join('')}
              </div>
            ` : `
              <div class="text-center py-8 text-gray-500">
                <i data-lucide="image" class="w-12 h-12 mx-auto mb-2 text-gray-300"></i>
                <p>Aucune image pour le moment</p>
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  };

  const renderJobsSection = () => {
    return `
      <div class="space-y-6">
        <!-- Create Job Offer Button -->
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-2xl font-bold text-gray-900 mb-2">Mes Offres d'emploi</h2>
              <p class="text-gray-600">Créez et gérez vos offres d'emploi</p>
            </div>
            <button
              onclick="openJobOfferModal()"
              class="px-6 py-3 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors font-semibold flex items-center gap-2"
            >
              <i data-lucide="plus" class="w-5 h-5"></i>
              Publier une offre
            </button>
          </div>
        </div>

        <!-- Job Offers List -->
        <div id="job-offers-list" class="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div class="text-center py-12 text-gray-500">Chargement des offres...</div>
        </div>
      </div>

      <!-- Job Offer Modal -->
      <div id="job-offer-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold text-gray-900" id="job-modal-title">Publier une offre</h2>
              <button onclick="closeJobOfferModal()" class="text-gray-400 hover:text-gray-600">
                <i data-lucide="x" class="w-6 h-6"></i>
              </button>
            </div>

            <form id="job-offer-form" onsubmit="saveJobOffer(event)">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Titre de l'offre *</label>
                  <input type="text" name="title" required class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea name="description" required rows="6" class="w-full px-4 py-2 border border-gray-300 rounded-lg"></textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                    <select name="category" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                      <option value="">Sélectionner</option>
                      <option value="Hôtellerie & Restauration">Hôtellerie & Restauration</option>
                      <option value="Agences de Voyage">Agences de Voyage</option>
                      <option value="Guide Touristique">Guide Touristique</option>
                      <option value="Événementiel & Animation">Événementiel & Animation</option>
                      <option value="Marketing & Communication">Marketing & Communication</option>
                      <option value="Formation & Management">Formation & Management</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
                    <input type="text" name="location" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Type de contrat</label>
                    <select name="type" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                      <option value="">Sélectionner</option>
                      <option value="CDI">CDI</option>
                      <option value="CDD">CDD</option>
                      <option value="Stage">Stage</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Temps partiel">Temps partiel</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                    <select name="status" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                      <option value="draft">Brouillon</option>
                      <option value="published">Publié</option>
                    </select>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Salaire minimum (MAD)</label>
                    <input type="number" name="salary_min" step="0.01" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Salaire maximum (MAD)</label>
                    <input type="number" name="salary_max" step="0.01" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Exigences</label>
                  <textarea name="requirements" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg"></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Avantages</label>
                  <textarea name="benefits" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg"></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Date d'expiration</label>
                  <input type="date" name="expiry_date" class="w-full px-4 py-2 border border-gray-300 rounded-lg">
                </div>
              </div>

              <div id="job-offer-error" class="hidden mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"></div>

              <div class="mt-6 flex gap-3">
                <button type="button" onclick="closeJobOfferModal()" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Annuler</button>
                <button type="submit" class="flex-1 px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800 font-semibold">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  };

  const switchSection = (section) => {
    currentSection = section;
    renderDashboard();
  };

  window.switchSection = switchSection;

  let currentEditingJob = null;

  const loadJobOffers = async () => {
    try {
      const response = await apiCall('/job-offers/my/offers');
      const container = $('#job-offers-list');
      
      if (response.success && response.data && response.data.length > 0) {
        container.innerHTML = response.data.map(offer => {
          const statusColors = {
            'draft': 'bg-gray-100 text-gray-800',
            'published': 'bg-green-100 text-green-800',
            'closed': 'bg-red-100 text-red-800'
          };
          return `
            <div class="border border-gray-200 rounded-lg p-6 mb-4">
              <div class="flex justify-between items-start mb-4">
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-gray-900 mb-2">${escapeHtml(offer.title)}</h3>
                  <div class="flex gap-4 text-sm text-gray-600 mb-2">
                    ${offer.category ? `<span>${escapeHtml(offer.category)}</span>` : ''}
                    ${offer.location ? `<span>• ${escapeHtml(offer.location)}</span>` : ''}
                    ${offer.type ? `<span>• ${escapeHtml(offer.type)}</span>` : ''}
                  </div>
                  <p class="text-gray-700 line-clamp-2">${escapeHtml(offer.description)}</p>
                </div>
                <div class="flex flex-col items-end gap-2">
                  <span class="px-3 py-1 rounded-full text-sm font-semibold ${statusColors[offer.status] || 'bg-gray-100 text-gray-800'}">
                    ${offer.status}
                  </span>
                  <span class="text-sm text-gray-600">${offer.applications_count || 0} candidature(s)</span>
                </div>
              </div>
              <div class="flex gap-2">
                <button onclick="editJobOffer(${offer.id})" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  Modifier
                </button>
                <button onclick="viewApplications(${offer.id})" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Voir candidatures (${offer.applications_count || 0})
                </button>
                <button onclick="deleteJobOffer(${offer.id})" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Supprimer
                </button>
              </div>
            </div>
          `;
        }).join('');
      } else {
        container.innerHTML = '<div class="text-center py-12 text-gray-500">Aucune offre publiée</div>';
      }
    } catch (error) {
      console.error('Error loading job offers:', error);
      $('#job-offers-list').innerHTML = '<div class="text-center py-12 text-red-500">Erreur lors du chargement</div>';
    }
  };

  const openJobOfferModal = (jobId = null) => {
    currentEditingJob = jobId;
    const modal = $('#job-offer-modal');
    const form = $('#job-offer-form');
    const title = $('#job-modal-title');
    
    if (jobId) {
      title.textContent = 'Modifier l\'offre';
      // Charger les données de l'offre
      loadJobOfferData(jobId);
    } else {
      title.textContent = 'Publier une offre';
      form.reset();
    }
    
    modal.classList.remove('hidden');
    initIcons();
  };

  const closeJobOfferModal = () => {
    $('#job-offer-modal').classList.add('hidden');
    $('#job-offer-form').reset();
    $('#job-offer-error').classList.add('hidden');
    currentEditingJob = null;
  };

  const loadJobOfferData = async (jobId) => {
    try {
      const response = await apiCall(`/job-offers/${jobId}`);
      if (response.success && response.data) {
        const offer = response.data;
        $('[name="title"]').value = offer.title || '';
        $('[name="description"]').value = offer.description || '';
        $('[name="category"]').value = offer.category || '';
        $('[name="location"]').value = offer.location || '';
        $('[name="type"]').value = offer.type || '';
        $('[name="status"]').value = offer.status || 'draft';
        $('[name="salary_min"]').value = offer.salary_min || '';
        $('[name="salary_max"]').value = offer.salary_max || '';
        $('[name="requirements"]').value = offer.requirements || '';
        $('[name="benefits"]').value = offer.benefits || '';
        if (offer.expiry_date) {
          $('[name="expiry_date"]').value = offer.expiry_date.split('T')[0];
        }
      }
    } catch (error) {
      console.error('Error loading job offer:', error);
    }
  };

  const saveJobOffer = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const errorDiv = $('#job-offer-error');
    
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      location: formData.get('location'),
      type: formData.get('type'),
      status: formData.get('status'),
      salary_min: formData.get('salary_min') ? parseFloat(formData.get('salary_min')) : null,
      salary_max: formData.get('salary_max') ? parseFloat(formData.get('salary_max')) : null,
      requirements: formData.get('requirements'),
      benefits: formData.get('benefits'),
      expiry_date: formData.get('expiry_date') || null,
    };

    try {
      let response;
      if (currentEditingJob) {
        response = await apiCall(`/job-offers/${currentEditingJob}`, {
          method: 'PUT',
          body: JSON.stringify(data),
        });
      } else {
        response = await apiCall('/job-offers/', {
          method: 'POST',
          body: JSON.stringify(data),
        });
      }

      if (response.success) {
        alert(currentEditingJob ? 'Offre mise à jour avec succès' : 'Offre créée avec succès');
        closeJobOfferModal();
        loadJobOffers();
      }
    } catch (error) {
      errorDiv.textContent = error.message || 'Une erreur est survenue';
      errorDiv.classList.remove('hidden');
    }
  };

  const editJobOffer = (jobId) => {
    openJobOfferModal(jobId);
  };

  const deleteJobOffer = async (jobId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) return;

    try {
      const response = await apiCall(`/job-offers/${jobId}`, {
        method: 'DELETE',
      });

      if (response.success) {
        alert('Offre supprimée avec succès');
        loadJobOffers();
      }
    } catch (error) {
      alert(error.message || 'Erreur lors de la suppression');
    }
  };

  const viewApplications = async (jobId) => {
    try {
      const response = await apiCall(`/job-applications/offer/${jobId}/applications`);
      if (response.success) {
        const applications = response.data;
        const modal = `
          <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div class="p-6">
                <div class="flex justify-between items-center mb-6">
                  <h2 class="text-2xl font-bold text-gray-900">Candidatures</h2>
                  <button onclick="closeApplicationsModal()" class="text-gray-400 hover:text-gray-600">
                    <i data-lucide="x" class="w-6 h-6"></i>
                  </button>
                </div>
                <div class="space-y-4">
                  ${applications.length > 0 ? applications.map(app => {
                    const statusColors = {
                      'pending': 'bg-yellow-100 text-yellow-800',
                      'reviewed': 'bg-blue-100 text-blue-800',
                      'accepted': 'bg-green-100 text-green-800',
                      'rejected': 'bg-red-100 text-red-800'
                    };
                    return `
                      <div class="border border-gray-200 rounded-lg p-4">
                        <div class="flex justify-between items-start mb-3">
                          <div>
                            <h4 class="font-bold text-gray-900">${escapeHtml(app.user?.name || app.cv?.first_name + ' ' + app.cv?.last_name || 'Candidat')}</h4>
                            <p class="text-sm text-gray-600">${escapeHtml(app.user?.email || app.cv?.email || '')}</p>
                            ${app.cv?.phone ? `<p class="text-sm text-gray-600">${escapeHtml(app.cv.phone)}</p>` : ''}
                          </div>
                          <select onchange="updateApplicationStatus(${app.id}, this.value)" class="px-3 py-1 border border-gray-300 rounded-lg text-sm ${statusColors[app.status] || ''}">
                            <option value="pending" ${app.status === 'pending' ? 'selected' : ''}>En attente</option>
                            <option value="reviewed" ${app.status === 'reviewed' ? 'selected' : ''}>Examiné</option>
                            <option value="accepted" ${app.status === 'accepted' ? 'selected' : ''}>Accepté</option>
                            <option value="rejected" ${app.status === 'rejected' ? 'selected' : ''}>Rejeté</option>
                          </select>
                        </div>
                        ${app.cover_letter ? `<p class="text-gray-700 mb-3">${escapeHtml(app.cover_letter)}</p>` : ''}
                        ${app.cv?.cv_file ? `
                          <a href="/api/cv/${app.cv.id}/download" target="_blank" class="inline-block px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800">
                            Télécharger le CV
                          </a>
                        ` : ''}
                      </div>
                    `;
                  }).join('') : '<div class="text-center py-12 text-gray-500">Aucune candidature</div>'}
                </div>
              </div>
            </div>
          </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modal);
        initIcons();
      }
    } catch (error) {
      alert('Erreur lors du chargement des candidatures');
    }
  };

  const closeApplicationsModal = () => {
    const modal = document.querySelector('.fixed.inset-0.bg-black.bg-opacity-50');
    if (modal) modal.remove();
  };

  const updateApplicationStatus = async (appId, status) => {
    try {
      const response = await apiCall(`/job-applications/${appId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status, notes: '' }),
      });

      if (response.success) {
        // Recharger la liste des candidatures
        const offerId = currentEditingJob || prompt('ID de l\'offre');
        if (offerId) viewApplications(offerId);
      }
    } catch (error) {
      alert('Erreur lors de la mise à jour');
    }
  };

  window.openJobOfferModal = openJobOfferModal;
  window.closeJobOfferModal = closeJobOfferModal;
  window.saveJobOffer = saveJobOffer;
  window.editJobOffer = editJobOffer;
  window.deleteJobOffer = deleteJobOffer;
  window.viewApplications = viewApplications;
  window.closeApplicationsModal = closeApplicationsModal;
  window.updateApplicationStatus = updateApplicationStatus;

  const initIcons = () => {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  };

  const attachEventListeners = () => {
    // Logo upload
    const logoInput = $('#logo-input');
    if (logoInput) {
      logoInput.addEventListener('change', handleLogoUpload);
    }

    // Images upload
    const imagesInput = $('#images-input');
    if (imagesInput) {
      imagesInput.addEventListener('change', handleImagesUpload);
    }

    // Logout
    const logoutBtn = $('#logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', handleLogout);
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('logo', file);

    const saveBtn = $('#save-btn');
    const saveBtnText = $('#save-btn-text');
    
    if (saveBtn) {
      saveBtn.disabled = true;
      if (saveBtnText) saveBtnText.textContent = 'Upload en cours...';
    }

    try {
      const result = await apiCall('/actor/logo', {
        method: 'POST',
        body: formData,
      });
      
      if (result.success) {
        alert('Logo mis à jour avec succès');
        await loadActor();
      }
    } catch (error) {
      console.error('Logo upload error:', error);
      alert(error.message || 'Erreur lors de l\'upload du logo');
    } finally {
      if (saveBtn) {
        saveBtn.disabled = false;
        if (saveBtnText) saveBtnText.textContent = 'Enregistrer les modifications';
      }
    }
  };

  const handleImagesUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('images[]', file);
    });

    const saveBtn = $('#save-btn');
    const saveBtnText = $('#save-btn-text');
    
    if (saveBtn) {
      saveBtn.disabled = true;
      if (saveBtnText) saveBtnText.textContent = 'Upload en cours...';
    }

    try {
      const result = await apiCall('/actor/images', {
        method: 'POST',
        body: formData,
      });
      
      if (result.success) {
        alert('Images ajoutées avec succès');
        await loadActor();
      }
    } catch (error) {
      console.error('Images upload error:', error);
      alert(error.message || 'Erreur lors de l\'upload des images');
    } finally {
      if (saveBtn) {
        saveBtn.disabled = false;
        if (saveBtnText) saveBtnText.textContent = 'Enregistrer les modifications';
      }
    }
  };

  const deleteImage = async (index) => {
    if (!confirm('Supprimer cette image ?')) return;

    try {
      const result = await apiCall(`/actor/images/${index}`, { method: 'DELETE' });
      if (result.success) {
        alert('Image supprimée');
        await loadActor();
      }
    } catch (error) {
      console.error('Delete image error:', error);
      alert(error.message || 'Erreur lors de la suppression');
    }
  };

  window.deleteImage = deleteImage;

  const addService = () => {
    const input = $('#new-service');
    if (!input || !input.value.trim()) return;
    
    formData.services.push(input.value.trim());
    input.value = '';
    renderDashboard();
  };

  window.addService = addService;

  const removeService = (index) => {
    formData.services.splice(index, 1);
    renderDashboard();
  };

  window.removeService = removeService;

  const addLanguage = () => {
    const input = $('#new-language');
    if (!input || !input.value.trim()) return;
    
    formData.languages.push(input.value.trim());
    input.value = '';
    renderDashboard();
  };

  window.addLanguage = addLanguage;

  const removeLanguage = (index) => {
    formData.languages.splice(index, 1);
    renderDashboard();
  };

  window.removeLanguage = removeLanguage;

  const saveActorInfo = async () => {
    const saveBtn = $('#save-btn');
    const saveBtnText = $('#save-btn-text');
    
    if (saveBtn) {
      saveBtn.disabled = true;
      if (saveBtnText) saveBtnText.textContent = 'Enregistrement...';
    }

    // Récupérer les valeurs des champs
    const updatedData = {
      name: $('#form-name')?.value || '',
      name_ar: $('#form-name-ar')?.value || '',
      description: $('#form-description')?.value || '',
      description_ar: $('#form-description-ar')?.value || '',
      address: $('#form-address')?.value || '',
      phone: $('#form-phone')?.value || '',
      website: $('#form-website')?.value || '',
      services: formData.services,
      languages: formData.languages,
    };

    try {
      const result = await apiCall('/actor/update', {
        method: 'PUT',
        body: JSON.stringify(updatedData),
      });
      
      if (result.success) {
        alert('Informations mises à jour avec succès');
        await loadActor();
      }
    } catch (error) {
      console.error('Save error:', error);
      alert(error.message || 'Erreur lors de la mise à jour');
    } finally {
      if (saveBtn) {
        saveBtn.disabled = false;
        if (saveBtnText) saveBtnText.textContent = 'Enregistrer les modifications';
      }
    }
  };

  window.saveActorInfo = saveActorInfo;

  const handleLogout = async () => {
    try {
      await apiCall('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      window.location.href = '/actor/login';
    }
  };

  window.scrollToSection = (sectionId) => {
    const section = $(`#${sectionId}-section`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Initialize
  if (checkAuth()) {
    loadActor();
  }
})();
