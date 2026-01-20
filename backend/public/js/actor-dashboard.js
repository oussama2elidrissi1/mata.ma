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

  const renderDashboard = () => {
    const container = $('#actor-dashboard');
    if (!container || !actorData) return;

    container.innerHTML = `
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

    initIcons();
    attachEventListeners();
  };

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
