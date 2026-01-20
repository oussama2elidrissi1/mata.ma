(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => root.querySelectorAll(sel);
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

  const API_BASE = '/api';
  const apiCall = async (url, options = {}) => {
    const token = localStorage.getItem('auth_token');
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE}${url}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      window.location.href = '/admin/login';
      throw new Error('Non authentifié');
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || `Erreur HTTP ${response.status}`);
    }

    return data;
  };

  // Default settings structure
  const defaultSettings = [
    // General settings
    { key: 'site_logo', type: 'image', group: 'general', description: 'Logo du site', value_fr: '', value_en: '', value_ar: '' },
    
    // Contact settings
    { key: 'contact_email', type: 'email', group: 'contact', description: 'Email de contact', value_fr: 'contact@mata.ma', value_en: 'contact@mata.ma', value_ar: 'contact@mata.ma' },
    { key: 'contact_phone', type: 'phone', group: 'contact', description: 'Téléphone de contact', value_fr: '+212 5 22 12 34 56', value_en: '+212 5 22 12 34 56', value_ar: '+212 5 22 12 34 56' },
    { key: 'contact_address', type: 'address', group: 'contact', description: 'Adresse', value_fr: 'Rabat, Maroc', value_en: 'Rabat, Morocco', value_ar: 'الرباط، المغرب' },
    
    // About settings
    { key: 'about_title', type: 'text', group: 'about', description: 'Titre de la page À propos', value_fr: 'À propos de MATA', value_en: 'About MATA', value_ar: 'حول MATA' },
    { key: 'about_subtitle', type: 'textarea', group: 'about', description: 'Sous-titre de la page À propos', value_fr: 'Nous sommes la plateforme de référence pour les professionnels du tourisme', value_en: 'We are the reference platform for tourism professionals', value_ar: 'نحن المنصة المرجعية للمهنيين في مجال السياحة' },
    
    // Partners settings
    { key: 'partners_title', type: 'text', group: 'partners', description: 'Titre de la page Partenaires', value_fr: 'Nos Partenaires', value_en: 'Our Partners', value_ar: 'شركاؤنا' },
    { key: 'partners_subtitle', type: 'textarea', group: 'partners', description: 'Sous-titre de la page Partenaires', value_fr: 'Nous collaborons avec des organisations nationales et internationales', value_en: 'We collaborate with national and international organizations', value_ar: 'نتعاون مع المنظمات الوطنية والدولية' },
  ];

  const initSettings = async () => {
    const container = $('#settings-container');
    if (!container) return;

    try {
      // Load existing settings
      const response = await apiCall('/settings');
      let settings = response.data || [];

      // Merge with defaults (only add missing keys)
      const existingKeys = settings.map(s => s.key);
      defaultSettings.forEach(defaultSetting => {
        if (!existingKeys.includes(defaultSetting.key)) {
          settings.push(defaultSetting);
        }
      });

      // Group settings by group
      const groupedSettings = {};
      settings.forEach(setting => {
        if (!groupedSettings[setting.group]) {
          groupedSettings[setting.group] = [];
        }
        groupedSettings[setting.group].push(setting);
      });

      // Render settings
      const groups = ['contact', 'about', 'partners', 'general'];
      let html = '';

      groups.forEach(groupName => {
        const groupSettings = groupedSettings[groupName] || [];
        if (groupSettings.length === 0) return;

        const groupLabels = {
          contact: 'Informations de Contact',
          about: 'Page À Propos',
          partners: 'Page Partenaires',
          general: 'Paramètres Généraux'
        };

        html += `
          <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">${escapeHtml(groupLabels[groupName] || groupName)}</h2>
            <div class="space-y-6">
              ${groupSettings.map(setting => {
                const inputId = `setting-${setting.key}`;
                
                // Special handling for logo/image type
                if (setting.type === 'image') {
                  const logoUrl = setting.value_fr ? `/storage/${setting.value_fr}` : '';
                  return `
                    <div class="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        ${escapeHtml(setting.description || setting.key)}
                      </label>
                      <div class="space-y-4">
                        ${logoUrl ? `
                          <div class="flex items-center gap-4">
                            <img id="${inputId}-preview" src="${escapeHtml(logoUrl)}" alt="Logo" class="h-20 w-auto object-contain border border-gray-200 rounded-lg p-2" />
                            <div>
                              <p class="text-sm text-gray-600">Logo actuel</p>
                              <button
                                type="button"
                                onclick="document.getElementById('${inputId}-file').click()"
                                class="mt-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm"
                              >
                                Changer le logo
                              </button>
                            </div>
                          </div>
                        ` : `
                          <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <p class="text-gray-600 mb-4">Aucun logo uploadé</p>
                            <button
                              type="button"
                              onclick="document.getElementById('${inputId}-file').click()"
                              class="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
                            >
                              Uploader un logo
                            </button>
                          </div>
                        `}
                        <input
                          type="file"
                          id="${inputId}-file"
                          accept="image/*"
                          data-key="${escapeHtml(setting.key)}"
                          class="hidden"
                          onchange="handleLogoUpload('${escapeHtml(setting.key)}', this)"
                        />
                        <p class="text-xs text-gray-500">Formats acceptés: JPG, PNG, GIF, SVG (max 2MB)</p>
                      </div>
                    </div>
                  `;
                }
                
                return `
                  <div class="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      ${escapeHtml(setting.description || setting.key)}
                    </label>
                    ${setting.type === 'textarea' ? `
                      <textarea
                        id="${inputId}"
                        data-key="${escapeHtml(setting.key)}"
                        data-type="${escapeHtml(setting.type)}"
                        rows="3"
                        class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
                        placeholder="Français"
                      >${escapeHtml(setting.value_fr || '')}</textarea>
                      <div class="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                        <input
                          type="text"
                          id="${inputId}-en"
                          data-key="${escapeHtml(setting.key)}"
                          data-locale="en"
                          class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
                          placeholder="Anglais"
                          value="${escapeHtml(setting.value_en || '')}"
                        />
                        <input
                          type="text"
                          id="${inputId}-ar"
                          data-key="${escapeHtml(setting.key)}"
                          data-locale="ar"
                          class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
                          placeholder="Arabe"
                          value="${escapeHtml(setting.value_ar || '')}"
                        />
                      </div>
                    ` : `
                      <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <input
                          type="${setting.type === 'email' ? 'email' : setting.type === 'phone' ? 'tel' : 'text'}"
                          id="${inputId}"
                          data-key="${escapeHtml(setting.key)}"
                          data-locale="fr"
                          class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
                          placeholder="Français"
                          value="${escapeHtml(setting.value_fr || '')}"
                        />
                        <input
                          type="${setting.type === 'email' ? 'email' : setting.type === 'phone' ? 'tel' : 'text'}"
                          id="${inputId}-en"
                          data-key="${escapeHtml(setting.key)}"
                          data-locale="en"
                          class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
                          placeholder="Anglais"
                          value="${escapeHtml(setting.value_en || '')}"
                        />
                        <input
                          type="${setting.type === 'email' ? 'email' : setting.type === 'phone' ? 'tel' : 'text'}"
                          id="${inputId}-ar"
                          data-key="${escapeHtml(setting.key)}"
                          data-locale="ar"
                          class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-gray-900 bg-white"
                          placeholder="Arabe"
                          value="${escapeHtml(setting.value_ar || '')}"
                        />
                      </div>
                    `}
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      });

      html += `
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <button
            id="save-settings-btn"
            class="w-full px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-semibold flex items-center justify-center gap-2"
          >
            <i data-lucide="save" class="w-5 h-5"></i>
            <span>Enregistrer tous les paramètres</span>
          </button>
        </div>
      `;

      container.innerHTML = html;
      
      // Initialize Lucide icons
      if (window.lucide) {
        window.lucide.createIcons();
      }

      // Initialize Lucide icons
      if (window.lucide) {
        window.lucide.createIcons();
      }

      // Save button handler
      $('#save-settings-btn')?.addEventListener('click', async () => {
        const btn = $('#save-settings-btn');
        btn.disabled = true;
        btn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> <span>Enregistrement...</span>';
        if (window.lucide) window.lucide.createIcons();

        try {
          // Collect all settings
          const settingsToUpdate = [];
          const processedKeys = new Set();

          $$('[data-key]').forEach(input => {
            const key = input.dataset.key;
            const locale = input.dataset.locale || 'fr';
            const value = input.value.trim();

            if (!processedKeys.has(key)) {
              processedKeys.add(key);
              const setting = {
                key: key,
                value_fr: '',
                value_en: '',
                value_ar: ''
              };

              // Get all locale values for this key
              $$(`[data-key="${key}"]`).forEach(inp => {
                const loc = inp.dataset.locale || 'fr';
                const val = inp.value.trim();
                setting[`value_${loc}`] = val;
              });

              settingsToUpdate.push(setting);
            }
          });

          await apiCall('/settings/bulk-update', {
            method: 'POST',
            body: JSON.stringify({ settings: settingsToUpdate })
          });

          alert('Paramètres enregistrés avec succès !');
        } catch (error) {
          alert(`Erreur lors de l'enregistrement: ${error.message}`);
          console.error('Error saving settings:', error);
        } finally {
          btn.disabled = false;
          btn.innerHTML = '<i data-lucide="save" class="w-5 h-5"></i> <span>Enregistrer tous les paramètres</span>';
          if (window.lucide) window.lucide.createIcons();
        }
      });

    } catch (error) {
      console.error('Error loading settings:', error);
      container.innerHTML = `<div class="text-center py-12 text-red-600">Erreur lors du chargement: ${error.message}</div>`;
    }
  };

  // Handle logo upload
  window.handleLogoUpload = async (key, fileInput) => {
    const file = fileInput.files[0];
    if (!file) return;

    // Validate file
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      alert('Format de fichier non supporté. Veuillez utiliser JPG, PNG, GIF ou SVG.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Le fichier est trop volumineux. Taille maximale: 2MB.');
      return;
    }

    const formData = new FormData();
    formData.append('logo', file);

    const previewId = `setting-${key}-preview`;
    const preview = document.getElementById(previewId);
    const button = fileInput.nextElementSibling?.querySelector('button') || fileInput.parentElement?.querySelector('button');

    // Show loading
    if (preview) {
      preview.style.opacity = '0.5';
    }
    if (button) {
      button.disabled = true;
      button.textContent = 'Upload en cours...';
    }

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${API_BASE}/settings/upload-logo`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'upload');
      }

      // Update preview
      if (preview) {
        preview.src = data.data.url;
        preview.style.opacity = '1';
      } else {
        // Reload settings to show new logo
        location.reload();
      }

      alert('Logo uploadé avec succès!');
    } catch (error) {
      alert('Erreur lors de l\'upload du logo: ' + error.message);
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = 'Changer le logo';
      }
    }
  };

  // Initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSettings);
  } else {
    initSettings();
  }
})();
