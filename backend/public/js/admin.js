(() => {
  'use strict';
  
  const API_BASE = '/api';
  let cache = {}; // Simple cache pour éviter les requêtes répétées
  
  // Helper functions
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  
  const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };
  
  // API helper avec cache
  const apiCall = async (url, options = {}, useCache = false) => {
    // Vérifier le cache
    if (useCache && cache[url] && Date.now() - cache[url].timestamp < 30000) {
      return cache[url].data;
    }
    
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
    
    // Mettre en cache
    if (useCache) {
      cache[url] = { data, timestamp: Date.now() };
    }
    
    return data;
  };
  
  // Check authentication
  const checkAuth = () => {
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('auth_user');
    
    if (!token || !userStr) {
      window.location.href = '/actor/login';
      return false;
    }
    
    try {
      const user = JSON.parse(userStr);
      if (user.role !== 'admin') {
        window.location.href = '/actor/login';
        return false;
      }
    } catch (e) {
      window.location.href = '/actor/login';
      return false;
    }
    
    return true;
  };
  
  // Logout
  const initLogout = () => {
    const btn = $('#logout-btn');
    if (btn) {
      btn.addEventListener('click', async () => {
        try {
          await apiCall('/auth/logout', { method: 'POST' });
        } catch (e) {
          console.error('Logout error:', e);
        } finally {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
          window.location.href = '/actor/login';
        }
      });
    }
  };
  
  // Initialize icons
  const initIcons = () => {
    if (window.lucide) {
      lucide.createIcons();
    }
  };
  
  // ==================== ACTEURS ====================
  const initActors = () => {
    if (!$('#actors-table-container')) return;
    
    let currentPage = 1;
    let perPage = 25;
    let searchTerm = '';
    let selectedType = '';
    let selectedStatus = '';
    let sortField = 'id';
    let sortDirection = 'desc';
    
    const loadActors = async (showLoading = true) => {
      const container = $('#actors-table-container');
      if (!container) return;
      
      if (showLoading) {
        container.innerHTML = `
          <div class="flex flex-col justify-center items-center py-20">
            <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-900 border-t-transparent"></div>
            <p class="mt-4 text-gray-600">Chargement des données...</p>
          </div>
        `;
      }
      
      try {
        const params = new URLSearchParams();
        if (searchTerm) params.append('search', searchTerm);
        if (selectedType) params.append('type', selectedType);
        if (selectedStatus) {
          params.append('status', selectedStatus);
        } else {
          params.append('all_status', 'true');
        }
        params.append('per_page', perPage.toString());
        params.append('page', currentPage.toString());
        params.append('sort_by', sortField);
        params.append('sort_direction', sortDirection);
        
        const res = await apiCall(`/tourism-actors?${params.toString()}`);
        const actors = res.data || [];
        const pagination = res.pagination || { current_page: 1, last_page: 1, total: 0 };
        
        // Stats
        const statsHtml = `
          <div class="bg-blue-600 rounded-lg shadow-md p-5 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-blue-100 text-sm font-medium mb-1">Total Acteurs</p>
                <p class="text-3xl font-bold">${pagination.total}</p>
              </div>
              <div class="bg-white/20 rounded-lg p-3">
                <i data-lucide="eye" class="w-6 h-6"></i>
              </div>
            </div>
          </div>
          <div class="bg-emerald-600 rounded-lg shadow-md p-5 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-emerald-100 text-sm font-medium mb-1">Actifs</p>
                <p class="text-3xl font-bold">${actors.filter(a => a.status === 'active').length}</p>
              </div>
              <div class="bg-white/20 rounded-lg p-3">
                <i data-lucide="check-circle-2" class="w-6 h-6"></i>
              </div>
            </div>
          </div>
          <div class="bg-amber-500 rounded-lg shadow-md p-5 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-amber-100 text-sm font-medium mb-1">En Attente</p>
                <p class="text-3xl font-bold">${actors.filter(a => a.status === 'pending').length}</p>
              </div>
              <div class="bg-white/20 rounded-lg p-3">
                <i data-lucide="clock" class="w-6 h-6"></i>
              </div>
            </div>
          </div>
          <div class="bg-amber-600 rounded-lg shadow-md p-5 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-amber-100 text-sm font-medium mb-1">Accrédités</p>
                <p class="text-3xl font-bold">${actors.filter(a => a.accreditation_number).length}</p>
              </div>
              <div class="bg-white/20 rounded-lg p-3">
                <i data-lucide="award" class="w-6 h-6"></i>
              </div>
            </div>
          </div>
        `;
        $('#actors-stats').innerHTML = statsHtml;
        initIcons();
        
        // Table
        const typeLabels = {
          hotel: 'Hôtel',
          restaurant: 'Restaurant',
          travel_agency: 'Agence de Voyage',
          tour_guide: 'Guide Touristique',
          transport: 'Transport',
          attraction: 'Attraction',
          other: 'Autre',
        };
        
        const statusLabels = {
          active: 'Actif',
          inactive: 'Inactif',
          pending: 'En attente',
          suspended: 'Suspendu',
        };
        
        const tableHtml = `
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">NOM</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">TYPE</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">VILLE</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">STATUT</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ACCRÉDITÉ</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ACTIONS</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                ${actors.length === 0 ? `
                  <tr>
                    <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                      Aucun acteur trouvé
                    </td>
                  </tr>
                ` : actors.map(actor => `
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      #${actor.id}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">${escapeHtml(actor.name)}</div>
                      ${actor.email ? `<div class="text-sm text-gray-500">${escapeHtml(actor.email)}</div>` : ''}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                        ${typeLabels[actor.type] || actor.type}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${escapeHtml(actor.city)}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 py-1 text-xs font-medium rounded-full ${
                        actor.status === 'active' ? 'bg-green-100 text-green-800' :
                        actor.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        actor.status === 'suspended' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }">
                        ${statusLabels[actor.status] || actor.status}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      ${actor.accreditation_number ? `
                        <div class="flex items-center gap-2">
                          <i data-lucide="award" class="w-5 h-5 text-amber-500"></i>
                          <span class="text-sm text-amber-600 font-medium">${escapeHtml(actor.accreditation_number)}</span>
                        </div>
                      ` : '<span class="text-sm text-gray-500">Simple</span>'}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div class="flex items-center gap-2">
                        <a href="/actors/${actor.id}" class="text-blue-600 hover:text-blue-900" title="Voir">
                          <i data-lucide="eye" class="w-5 h-5"></i>
                        </a>
                        <button onclick="editActor(${actor.id})" class="text-yellow-600 hover:text-yellow-900" title="Modifier">
                          <i data-lucide="edit" class="w-5 h-5"></i>
                        </button>
                        <button onclick="deleteActor(${actor.id})" class="text-red-600 hover:text-red-900" title="Supprimer">
                          <i data-lucide="trash-2" class="w-5 h-5"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          ${pagination.last_page > 1 ? `
            <div class="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                <div class="text-sm text-gray-700">
                  Affichage de <span class="font-medium">${(pagination.current_page - 1) * pagination.per_page + 1}</span> à
                  <span class="font-medium">${Math.min(pagination.current_page * pagination.per_page, pagination.total)}</span>
                  sur <span class="font-medium">${pagination.total}</span> résultats
                </div>
                <div class="flex items-center gap-2">
                  <button onclick="changePage(${pagination.current_page - 1})" ${pagination.current_page === 1 ? 'disabled' : ''} 
                    class="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50">
                    <i data-lucide="chevron-left" class="w-5 h-5"></i>
                  </button>
                  <span class="px-4 py-2 text-sm font-medium">Page ${pagination.current_page} / ${pagination.last_page}</span>
                  <button onclick="changePage(${pagination.current_page + 1})" ${pagination.current_page === pagination.last_page ? 'disabled' : ''}
                    class="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50">
                    <i data-lucide="chevron-right" class="w-5 h-5"></i>
                  </button>
                </div>
              </div>
            </div>
          ` : ''}
        `;
        
        container.innerHTML = tableHtml;
        initIcons();
      } catch (error) {
        console.error('Error loading actors:', error);
        container.innerHTML = '<div class="text-center py-12 text-red-600">Erreur lors du chargement des acteurs</div>';
      }
    };
    
    // Event listeners
    const searchInput = $('#actors-search');
    const typeSelect = $('#actors-type');
    const statusSelect = $('#actors-status');
    
    let searchTimeout;
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTerm = e.target.value;
        currentPage = 1;
        searchTimeout = setTimeout(() => loadActors(), 300);
      });
    }
    
    if (typeSelect) {
      typeSelect.addEventListener('change', (e) => {
        selectedType = e.target.value;
        currentPage = 1;
        loadActors();
      });
    }
    
    if (statusSelect) {
      statusSelect.addEventListener('change', (e) => {
        selectedStatus = e.target.value;
        currentPage = 1;
        loadActors();
      });
    }
    
    // Global functions for pagination
    window.changePage = (page) => {
      if (page >= 1) {
        currentPage = page;
        loadActors();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    
    window.editActor = async (id) => {
      try {
        const res = await apiCall(`/tourism-actors/${id}`);
        const actor = res.data;
        showActorModal(actor);
      } catch (error) {
        alert('Erreur lors du chargement de l\'acteur: ' + error.message);
      }
    };
    
    window.createActor = () => {
      showActorModal(null);
    };
    
    window.deleteActor = async (id) => {
      if (!confirm('Êtes-vous sûr de vouloir supprimer cet acteur ?')) return;
      try {
        await apiCall(`/tourism-actors/${id}`, { method: 'DELETE' });
        loadActors();
      } catch (error) {
        alert('Erreur lors de la suppression');
      }
    };
    
    if ($('#add-actor-btn')) {
      $('#add-actor-btn').addEventListener('click', () => {
        window.createActor();
      });
    }
    
    if ($('#import-excel-btn')) {
      $('#import-excel-btn').addEventListener('click', () => {
        showExcelImportModal();
      });
    }
    
    // Load immediately
    loadActors();
  };
  
  // ==================== DASHBOARD ====================
  const initDashboard = () => {
    if (!$('#dashboard-stats')) return;
    
    const loadStats = async () => {
      try {
        // Charger en parallèle pour plus de rapidité
        const [allRes] = await Promise.all([
          apiCall('/tourism-actors?per_page=1000&all_status=true', {}, true),
        ]);
        
        const allActors = allRes.data || [];
        const activeActors = allActors.filter(a => a.status === 'active');
        const pendingActors = allActors.filter(a => a.status === 'pending');
        const suspendedActors = allActors.filter(a => a.status === 'suspended');
        const accreditedActors = allActors.filter(a => a.accreditation_number);
        
        const byType = {};
        const byRegion = {};
        allActors.forEach(actor => {
          byType[actor.type] = (byType[actor.type] || 0) + 1;
          byRegion[actor.region] = (byRegion[actor.region] || 0) + 1;
        });
        
        const statsHtml = `
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-blue-600 rounded-lg shadow-md p-5 text-white">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-blue-100 text-sm font-medium mb-1">Total Acteurs</p>
                  <p class="text-3xl font-bold">${allActors.length}</p>
                </div>
                <div class="bg-white/20 rounded-lg p-3">
                  <i data-lucide="users" class="w-6 h-6"></i>
                </div>
              </div>
            </div>
            <div class="bg-emerald-600 rounded-lg shadow-md p-5 text-white">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-emerald-100 text-sm font-medium mb-1">Actifs</p>
                  <p class="text-3xl font-bold">${activeActors.length}</p>
                </div>
                <div class="bg-white/20 rounded-lg p-3">
                  <i data-lucide="check-circle-2" class="w-6 h-6"></i>
                </div>
              </div>
            </div>
            <div class="bg-amber-500 rounded-lg shadow-md p-5 text-white">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-amber-100 text-sm font-medium mb-1">En Attente</p>
                  <p class="text-3xl font-bold">${pendingActors.length}</p>
                </div>
                <div class="bg-white/20 rounded-lg p-3">
                  <i data-lucide="clock" class="w-6 h-6"></i>
                </div>
              </div>
            </div>
            <div class="bg-amber-600 rounded-lg shadow-md p-5 text-white">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-amber-100 text-sm font-medium mb-1">Accrédités</p>
                  <p class="text-3xl font-bold">${accreditedActors.length}</p>
                </div>
                <div class="bg-white/20 rounded-lg p-3">
                  <i data-lucide="award" class="w-6 h-6"></i>
                </div>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 class="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <i data-lucide="trending-up" class="w-5 h-5 text-blue-900"></i>
                Répartition par Type
              </h3>
              <div class="space-y-4">
                ${Object.entries(byType).map(([type, count]) => {
                  const percentage = allActors.length > 0 ? (count / allActors.length) * 100 : 0;
                  const typeLabels = {
                    hotel: 'Hôtels',
                    restaurant: 'Restaurants',
                    travel_agency: 'Agences',
                    tour_guide: 'Guides',
                    transport: 'Transport',
                    attraction: 'Attractions',
                    other: 'Autres',
                  };
                  return `
                    <div>
                      <div class="flex justify-between items-center mb-2">
                        <span class="text-sm font-medium text-gray-700">${typeLabels[type] || type}</span>
                        <span class="text-sm text-gray-600">${count} (${percentage.toFixed(1)}%)</span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-blue-900 h-2 rounded-full transition-all" style="width: ${percentage}%"></div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 class="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <i data-lucide="map-pin" class="w-5 h-5 text-blue-900"></i>
                Répartition par Région
              </h3>
              <div class="space-y-3 max-h-64 overflow-y-auto">
                ${Object.entries(byRegion)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 10)
                  .map(([region, count]) => {
                    const percentage = allActors.length > 0 ? (count / allActors.length) * 100 : 0;
                    return `
                      <div>
                        <div class="flex justify-between items-center mb-1">
                          <span class="text-sm font-medium text-gray-700 truncate">${escapeHtml(region)}</span>
                          <span class="text-sm text-gray-600 ml-2">${count}</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                          <div class="bg-amber-500 h-2 rounded-full transition-all" style="width: ${percentage}%"></div>
                        </div>
                      </div>
                    `;
                  }).join('')}
              </div>
            </div>
          </div>
        `;
        
        $('#dashboard-stats').innerHTML = statsHtml;
        initIcons();
        
        // Load recent actors
        loadRecentActors();
      } catch (error) {
        console.error('Error loading stats:', error);
        $('#dashboard-stats').innerHTML = '<div class="text-center text-red-600">Erreur lors du chargement des statistiques</div>';
      }
    };
    
    const loadRecentActors = async () => {
      try {
        const res = await apiCall('/tourism-actors?per_page=5&sort_by=created_at&sort_direction=desc&all_status=true', {}, true);
        const actors = res.data || [];
        
        const typeLabels = {
          hotel: 'Hôtel',
          restaurant: 'Restaurant',
          travel_agency: 'Agence',
          tour_guide: 'Guide',
          transport: 'Transport',
          attraction: 'Attraction',
          other: 'Autre',
        };
        
        const statusColors = {
          active: 'bg-green-100 text-green-800',
          pending: 'bg-yellow-100 text-yellow-800',
          suspended: 'bg-red-100 text-red-800',
          inactive: 'bg-gray-100 text-gray-800',
        };
        
        const actorsHtml = `
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="p-6 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold text-gray-900">Acteurs Récents</h2>
                <a href="/admin/actors" class="text-sm text-blue-900 hover:text-blue-700 font-medium">
                  Voir tout →
                </a>
              </div>
            </div>
            <div class="divide-y divide-gray-200">
              ${actors.map(actor => `
                <div class="p-6 hover:bg-gray-50 transition-colors">
                  <div class="flex items-center justify-between">
                    <div class="flex-1">
                      <div class="flex items-center gap-3 mb-2">
                        <h3 class="font-semibold text-gray-900">${escapeHtml(actor.name)}</h3>
                        <span class="px-2 py-1 text-xs font-medium rounded-full ${statusColors[actor.status] || statusColors.inactive}">
                          ${actor.status}
                        </span>
                        ${actor.verified ? '<i data-lucide="check-circle-2" class="w-4 h-4 text-green-500"></i>' : ''}
                      </div>
                      <div class="flex items-center gap-4 text-sm text-gray-600">
                        <span>${typeLabels[actor.type] || actor.type}</span>
                        <span>•</span>
                        <span>${escapeHtml(actor.city)}, ${escapeHtml(actor.region)}</span>
                        <span>•</span>
                        <span class="text-gray-400">${formatDate(actor.created_at)}</span>
                      </div>
                    </div>
                    <div class="flex items-center gap-2">
                      <a href="/actors/${actor.id}" class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Voir">
                        <i data-lucide="eye" class="w-4 h-4"></i>
                      </a>
                      <a href="/admin/actors?edit=${actor.id}" class="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors" title="Modifier">
                        <i data-lucide="edit" class="w-4 h-4"></i>
                      </a>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
            ${actors.length === 0 ? '<div class="p-6 text-center text-gray-500">Aucun acteur récent</div>' : ''}
          </div>
        `;
        
        $('#recent-actors').innerHTML = actorsHtml;
        initIcons();
      } catch (error) {
        console.error('Error loading recent actors:', error);
      }
    };
    
    loadStats();
  };
  
  // ==================== NEWS ====================
  const initNews = () => {
    if (!$('#news-table-container')) return;
    
    let currentPage = 1;
    let perPage = 15;
    let searchTerm = '';
    let selectedCategory = '';
    let selectedStatus = 'all';
    
    const loadNews = async () => {
      const container = $('#news-table-container');
      if (!container) return;
      
      container.innerHTML = `
        <div class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent mx-auto mb-4"></div>
          <p class="text-gray-600">Chargement des articles...</p>
        </div>
      `;
      
      try {
        const params = new URLSearchParams();
        if (selectedStatus !== 'all') {
          params.append('status', selectedStatus);
        } else {
          params.append('status', 'all');
        }
        if (selectedCategory) params.append('category', selectedCategory);
        params.append('per_page', perPage.toString());
        params.append('page', currentPage.toString());
        
        const res = await apiCall(`/news?${params.toString()}`);
        const news = res.data || [];
        const pagination = res.pagination || { current_page: 1, last_page: 1, total: 0 };
        
        // Stats
        const statsHtml = `
          <div class="bg-blue-600 rounded-lg shadow-md p-5 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-blue-100 text-sm font-medium mb-1">Total</p>
                <p class="text-3xl font-bold">${pagination.total}</p>
              </div>
              <div class="bg-white/20 rounded-lg p-3">
                <i data-lucide="file-text" class="w-6 h-6"></i>
              </div>
            </div>
          </div>
          <div class="bg-emerald-600 rounded-lg shadow-md p-5 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-emerald-100 text-sm font-medium mb-1">Publiés</p>
                <p class="text-3xl font-bold">${news.filter(n => n.status === 'published').length}</p>
              </div>
              <div class="bg-white/20 rounded-lg p-3">
                <i data-lucide="eye" class="w-6 h-6"></i>
              </div>
            </div>
          </div>
          <div class="bg-gray-500 rounded-lg shadow-md p-5 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-200 text-sm font-medium mb-1">Brouillons</p>
                <p class="text-3xl font-bold">${news.filter(n => n.status === 'draft').length}</p>
              </div>
              <div class="bg-white/20 rounded-lg p-3">
                <i data-lucide="edit" class="w-6 h-6"></i>
              </div>
            </div>
          </div>
          <div class="bg-red-600 rounded-lg shadow-md p-5 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-red-100 text-sm font-medium mb-1">Archivés</p>
                <p class="text-3xl font-bold">${news.filter(n => n.status === 'archived').length}</p>
              </div>
              <div class="bg-white/20 rounded-lg p-3">
                <i data-lucide="x" class="w-6 h-6"></i>
              </div>
            </div>
          </div>
          <div class="bg-amber-500 rounded-lg shadow-md p-5 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-amber-100 text-sm font-medium mb-1">À la une</p>
                <p class="text-3xl font-bold">${news.filter(n => n.featured).length}</p>
              </div>
              <div class="bg-white/20 rounded-lg p-3">
                <i data-lucide="star" class="w-6 h-6"></i>
              </div>
            </div>
          </div>
        `;
        $('#news-stats').innerHTML = statsHtml;
        initIcons();
        
        // Filter by search
        const filteredNews = searchTerm ? news.filter(article => {
          const searchLower = searchTerm.toLowerCase();
          return (
            article.title?.toLowerCase().includes(searchLower) ||
            article.excerpt?.toLowerCase().includes(searchLower) ||
            article.content?.toLowerCase().includes(searchLower)
          );
        }) : news;
        
        const tableHtml = `
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Image</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Titre</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Catégorie</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Auteur</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Statut</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                ${filteredNews.length === 0 ? `
                  <tr>
                    <td colspan="7" class="px-6 py-12 text-center">
                      <i data-lucide="file-text" class="w-12 h-12 text-gray-400 mx-auto mb-4"></i>
                      <p class="text-gray-600 font-medium">Aucun article trouvé</p>
                    </td>
                  </tr>
                ` : filteredNews.map(article => `
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                        <img src="${escapeHtml(article.image || 'https://images.unsplash.com/photo-1504711434969-e33886180f91?w=800&h=400&fit=crop')}" 
                             alt="${escapeHtml(article.title)}" 
                             class="w-full h-full object-cover"
                             onerror="this.src='https://images.unsplash.com/photo-1504711434969-e33886180f91?w=800&h=400&fit=crop'" />
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="text-sm font-semibold text-gray-900">${escapeHtml(article.title)}</div>
                      ${article.featured ? '<div class="flex items-center gap-1 mt-1"><i data-lucide="star" class="w-4 h-4 text-yellow-500 fill-yellow-500"></i><span class="text-xs text-yellow-600 font-medium">À la une</span></div>' : ''}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                        ${escapeHtml(article.category || 'Actualité')}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900 flex items-center gap-1">
                        <i data-lucide="user" class="w-4 h-4 text-gray-400"></i>
                        ${escapeHtml(article.author || 'MATA')}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900 flex items-center gap-1">
                        <i data-lucide="calendar" class="w-4 h-4 text-gray-400"></i>
                        ${formatDate(article.published_at || article.created_at)}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-3 py-1 text-xs font-medium rounded-full ${
                        article.status === 'published' ? 'bg-green-100 text-green-800' :
                        article.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                      }">
                        ${article.status === 'published' ? 'Publié' : article.status === 'draft' ? 'Brouillon' : 'Archivé'}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center gap-3">
                        <button onclick="editNews(${article.id})" class="text-blue-600 hover:text-blue-800" title="Modifier">
                          <i data-lucide="edit" class="w-5 h-5"></i>
                        </button>
                        <button onclick="deleteNews(${article.id})" class="text-red-600 hover:text-red-800" title="Supprimer">
                          <i data-lucide="trash-2" class="w-5 h-5"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          ${pagination.last_page > 1 ? `
            <div class="mt-6 bg-white rounded-lg shadow-md p-4 border border-gray-200">
              <div class="flex justify-between items-center">
                <div class="text-sm text-gray-600">
                  <span class="font-medium">Page ${pagination.current_page}</span> sur ${pagination.last_page}
                </div>
                <div class="flex items-center gap-2">
                  <button onclick="changeNewsPage(${pagination.current_page - 1})" ${pagination.current_page === 1 ? 'disabled' : ''}
                    class="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
                    Précédent
                  </button>
                  <button onclick="changeNewsPage(${pagination.current_page + 1})" ${pagination.current_page === pagination.last_page ? 'disabled' : ''}
                    class="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
                    Suivant
                  </button>
                </div>
              </div>
            </div>
          ` : ''}
        `;
        
        container.innerHTML = tableHtml;
        initIcons();
      } catch (error) {
        console.error('Error loading news:', error);
        container.innerHTML = '<div class="text-center py-12 text-red-600">Erreur lors du chargement des articles</div>';
      }
    };
    
    // Event listeners
    const searchInput = $('#news-search');
    const categoryInput = $('#news-category');
    const statusSelect = $('#news-status');
    const refreshBtn = $('#refresh-news-btn');
    const resetBtn = $('#reset-filters-btn');
    
    let searchTimeout;
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTerm = e.target.value;
        searchTimeout = setTimeout(() => loadNews(), 300);
      });
    }
    
    if (categoryInput) {
      categoryInput.addEventListener('input', (e) => {
        selectedCategory = e.target.value;
        currentPage = 1;
        loadNews();
      });
    }
    
    if (statusSelect) {
      statusSelect.addEventListener('change', (e) => {
        selectedStatus = e.target.value;
        currentPage = 1;
        loadNews();
      });
    }
    
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => loadNews());
    }
    
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        searchTerm = '';
        selectedCategory = '';
        selectedStatus = 'all';
        currentPage = 1;
        if (searchInput) searchInput.value = '';
        if (categoryInput) categoryInput.value = '';
        if (statusSelect) statusSelect.value = 'all';
        loadNews();
      });
    }
    
    window.changeNewsPage = (page) => {
      if (page >= 1) {
        currentPage = page;
        loadNews();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    
    window.editNews = async (id) => {
      try {
        const res = await apiCall(`/news/${id}`);
        const news = res.data;
        showNewsModal(news);
      } catch (error) {
        alert('Erreur lors du chargement de l\'article: ' + error.message);
      }
    };
    
    window.createNews = () => {
      showNewsModal(null);
    };
    
    window.deleteNews = async (id) => {
      if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return;
      try {
        await apiCall(`/news/${id}`, { method: 'DELETE' });
        loadNews();
      } catch (error) {
        alert('Erreur lors de la suppression');
      }
    };
    
    if ($('#add-news-btn')) {
      $('#add-news-btn').addEventListener('click', () => {
        window.createNews();
      });
    }
    
    loadNews();
  };
  
  // ==================== EVENTS ====================
  const initEvents = () => {
    if (!$('#events-table-container')) return;
    
    let currentPage = 1;
    let perPage = 15;
    let searchTerm = '';
    let selectedCategory = '';
    let selectedStatus = 'all';
    
    const loadEvents = async () => {
      const container = $('#events-table-container');
      if (!container) return;
      
      container.innerHTML = `
        <div class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent mx-auto mb-4"></div>
          <p class="text-gray-600">Chargement des événements...</p>
        </div>
      `;
      
      try {
        const params = new URLSearchParams();
        if (selectedStatus !== 'all') {
          params.append('status', selectedStatus);
        } else {
          params.append('status', 'all');
        }
        if (selectedCategory) params.append('category', selectedCategory);
        params.append('per_page', perPage.toString());
        params.append('page', currentPage.toString());
        
        const res = await apiCall(`/events?${params.toString()}`);
        const events = res.data || [];
        const pagination = res.pagination || { current_page: 1, last_page: 1, total: 0 };
        
        // Stats
        const statsHtml = `
          <div class="bg-blue-600 rounded-lg shadow-md p-5 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-blue-100 text-sm font-medium mb-1">Total</p>
                <p class="text-3xl font-bold">${pagination.total}</p>
              </div>
              <div class="bg-white/20 rounded-lg p-3">
                <i data-lucide="calendar" class="w-6 h-6"></i>
              </div>
            </div>
          </div>
          <div class="bg-emerald-600 rounded-lg shadow-md p-5 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-emerald-100 text-sm font-medium mb-1">Publiés</p>
                <p class="text-3xl font-bold">${events.filter(e => e.status === 'published').length}</p>
              </div>
              <div class="bg-white/20 rounded-lg p-3">
                <i data-lucide="eye" class="w-6 h-6"></i>
              </div>
            </div>
          </div>
          <div class="bg-gray-500 rounded-lg shadow-md p-5 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-200 text-sm font-medium mb-1">Brouillons</p>
                <p class="text-3xl font-bold">${events.filter(e => e.status === 'draft').length}</p>
              </div>
              <div class="bg-white/20 rounded-lg p-3">
                <i data-lucide="clock" class="w-6 h-6"></i>
              </div>
            </div>
          </div>
          <div class="bg-red-600 rounded-lg shadow-md p-5 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-red-100 text-sm font-medium mb-1">Annulés</p>
                <p class="text-3xl font-bold">${events.filter(e => e.status === 'cancelled').length}</p>
              </div>
              <div class="bg-white/20 rounded-lg p-3">
                <i data-lucide="x" class="w-6 h-6"></i>
              </div>
            </div>
          </div>
          <div class="bg-amber-500 rounded-lg shadow-md p-5 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-amber-100 text-sm font-medium mb-1">À la une</p>
                <p class="text-3xl font-bold">${events.filter(e => e.featured).length}</p>
              </div>
              <div class="bg-white/20 rounded-lg p-3">
                <i data-lucide="star" class="w-6 h-6"></i>
              </div>
            </div>
          </div>
        `;
        $('#events-stats').innerHTML = statsHtml;
        initIcons();
        
        // Filter by search
        const filteredEvents = searchTerm ? events.filter(event => {
          const searchLower = searchTerm.toLowerCase();
          return (
            event.title?.toLowerCase().includes(searchLower) ||
            event.description?.toLowerCase().includes(searchLower) ||
            event.location?.toLowerCase().includes(searchLower)
          );
        }) : events;
        
        const tableHtml = `
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Image</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Titre</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Catégorie</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Lieu</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Statut</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                ${filteredEvents.length === 0 ? `
                  <tr>
                    <td colspan="7" class="px-6 py-12 text-center">
                      <i data-lucide="calendar" class="w-12 h-12 text-gray-400 mx-auto mb-4"></i>
                      <p class="text-gray-600 font-medium">Aucun événement trouvé</p>
                    </td>
                  </tr>
                ` : filteredEvents.map(event => `
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                        <img src="${escapeHtml(event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop')}" 
                             alt="${escapeHtml(event.title)}" 
                             class="w-full h-full object-cover"
                             onerror="this.src='https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop'" />
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="text-sm font-semibold text-gray-900">${escapeHtml(event.title)}</div>
                      ${event.featured ? '<div class="flex items-center gap-1 mt-1"><i data-lucide="star" class="w-4 h-4 text-yellow-500 fill-yellow-500"></i><span class="text-xs text-yellow-600 font-medium">À la une</span></div>' : ''}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                        ${escapeHtml(event.category || 'Événement')}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">${formatDate(event.event_date)}</div>
                      ${event.start_time ? `<div class="text-xs text-gray-500 flex items-center gap-1 mt-1"><i data-lucide="clock" class="w-3 h-3"></i>${event.start_time.substring(0, 5)}${event.end_time ? ` - ${event.end_time.substring(0, 5)}` : ''}</div>` : ''}
                    </td>
                    <td class="px-6 py-4">
                      <div class="text-sm text-gray-900 flex items-center gap-1">
                        <i data-lucide="map-pin" class="w-4 h-4 text-gray-400"></i>
                        ${escapeHtml(event.location)}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-3 py-1 text-xs font-medium rounded-full ${
                        event.status === 'published' ? 'bg-green-100 text-green-800' :
                        event.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                      }">
                        ${event.status === 'published' ? 'Publié' : event.status === 'draft' ? 'Brouillon' : 'Annulé'}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center gap-3">
                        <button onclick="editEvent(${event.id})" class="text-blue-600 hover:text-blue-800" title="Modifier">
                          <i data-lucide="edit" class="w-5 h-5"></i>
                        </button>
                        <button onclick="deleteEvent(${event.id})" class="text-red-600 hover:text-red-800" title="Supprimer">
                          <i data-lucide="trash-2" class="w-5 h-5"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          ${pagination.last_page > 1 ? `
            <div class="mt-6 bg-white rounded-lg shadow-md p-4 border border-gray-200">
              <div class="flex justify-between items-center">
                <div class="text-sm text-gray-600">
                  <span class="font-medium">Page ${pagination.current_page}</span> sur ${pagination.last_page}
                </div>
                <div class="flex items-center gap-2">
                  <button onclick="changeEventsPage(${pagination.current_page - 1})" ${pagination.current_page === 1 ? 'disabled' : ''}
                    class="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
                    Précédent
                  </button>
                  <button onclick="changeEventsPage(${pagination.current_page + 1})" ${pagination.current_page === pagination.last_page ? 'disabled' : ''}
                    class="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
                    Suivant
                  </button>
                </div>
              </div>
            </div>
          ` : ''}
        `;
        
        container.innerHTML = tableHtml;
        initIcons();
      } catch (error) {
        console.error('Error loading events:', error);
        container.innerHTML = '<div class="text-center py-12 text-red-600">Erreur lors du chargement des événements</div>';
      }
    };
    
    // Event listeners
    const searchInput = $('#events-search');
    const categorySelect = $('#events-category');
    const statusSelect = $('#events-status');
    const refreshBtn = $('#refresh-events-btn');
    const resetBtn = $('#reset-events-filters-btn');
    
    let searchTimeout;
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTerm = e.target.value;
        searchTimeout = setTimeout(() => loadEvents(), 300);
      });
    }
    
    if (categorySelect) {
      categorySelect.addEventListener('change', (e) => {
        selectedCategory = e.target.value;
        currentPage = 1;
        loadEvents();
      });
    }
    
    if (statusSelect) {
      statusSelect.addEventListener('change', (e) => {
        selectedStatus = e.target.value;
        currentPage = 1;
        loadEvents();
      });
    }
    
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => loadEvents());
    }
    
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        searchTerm = '';
        selectedCategory = '';
        selectedStatus = 'all';
        currentPage = 1;
        if (searchInput) searchInput.value = '';
        if (categorySelect) categorySelect.value = '';
        if (statusSelect) statusSelect.value = 'all';
        loadEvents();
      });
    }
    
    window.changeEventsPage = (page) => {
      if (page >= 1) {
        currentPage = page;
        loadEvents();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    
    window.editEvent = async (id) => {
      try {
        const res = await apiCall(`/events/${id}`);
        const event = res.data;
        showEventModal(event);
      } catch (error) {
        alert('Erreur lors du chargement de l\'événement: ' + error.message);
      }
    };
    
    window.createEvent = () => {
      showEventModal(null);
    };
    
    window.deleteEvent = async (id) => {
      if (!confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) return;
      try {
        await apiCall(`/events/${id}`, { method: 'DELETE' });
        loadEvents();
      } catch (error) {
        alert('Erreur lors de la suppression');
      }
    };
    
    if ($('#add-event-btn')) {
      $('#add-event-btn').addEventListener('click', () => {
        window.createEvent();
      });
    }
    
    loadEvents();
  };
  
  // ==================== USERS ====================
  const initUsers = () => {
    if (!$('#users-table-container')) return;
    
    let currentPage = 1;
    let perPage = 25;
    let searchTerm = '';
    let selectedRole = '';
    
    const loadUsers = async () => {
      const container = $('#users-table-container');
      if (!container) return;
      
      container.innerHTML = `
        <div class="flex justify-center items-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-900 border-t-transparent"></div>
        </div>
      `;
      
      try {
        const params = new URLSearchParams();
        if (searchTerm) params.append('search', searchTerm);
        if (selectedRole) params.append('role', selectedRole);
        params.append('per_page', perPage.toString());
        params.append('page', currentPage.toString());
        
        const res = await apiCall(`/users?${params.toString()}`);
        const users = res.data || [];
        const pagination = res.pagination || { current_page: 1, last_page: 1, total: 0 };
        
        // Stats
        const statsHtml = `
          <div class="bg-blue-600 rounded-lg shadow-md p-5 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-blue-100 text-sm font-medium mb-1">Total Utilisateurs</p>
                <p class="text-3xl font-bold">${pagination.total}</p>
              </div>
              <div class="bg-white/20 rounded-lg p-3">
                <i data-lucide="user-cog" class="w-6 h-6"></i>
              </div>
            </div>
          </div>
          <div class="bg-red-600 rounded-lg shadow-md p-5 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-red-100 text-sm font-medium mb-1">Administrateurs</p>
                <p class="text-3xl font-bold">${users.filter(u => u.role === 'admin').length}</p>
              </div>
              <div class="bg-white/20 rounded-lg p-3">
                <i data-lucide="shield" class="w-6 h-6"></i>
              </div>
            </div>
          </div>
          <div class="bg-emerald-600 rounded-lg shadow-md p-5 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-emerald-100 text-sm font-medium mb-1">Acteurs</p>
                <p class="text-3xl font-bold">${users.filter(u => u.role === 'actor').length}</p>
              </div>
              <div class="bg-white/20 rounded-lg p-3">
                <i data-lucide="user" class="w-6 h-6"></i>
              </div>
            </div>
          </div>
        `;
        $('#users-stats').innerHTML = statsHtml;
        initIcons();
        
        const tableHtml = `
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-100 border-b-2 border-gray-300">
                <tr>
                  <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">ID</th>
                  <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Nom</th>
                  <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Email</th>
                  <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Rôle</th>
                  <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Acteur lié</th>
                  <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Date de création</th>
                  <th class="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                ${users.length === 0 ? `
                  <tr>
                    <td colspan="7" class="px-6 py-20 text-center">
                      <i data-lucide="user-cog" class="w-16 h-16 text-gray-400 mx-auto mb-4"></i>
                      <p class="text-gray-500 text-lg font-medium">Aucun utilisateur trouvé</p>
                    </td>
                  </tr>
                ` : users.map(user => `
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#${user.id}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">${escapeHtml(user.name)}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-600">${escapeHtml(user.email)}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-3 py-1.5 text-xs font-semibold rounded-full ${
                        user.role === 'admin'
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }">
                        ${user.role === 'admin' ? 'Administrateur' : 'Acteur'}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      ${user.tourism_actor ? `<span class="text-sm text-gray-600">${escapeHtml(user.tourism_actor.name)}</span>` : '<span class="text-sm text-gray-400">Aucun</span>'}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      ${formatDate(user.created_at)}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div class="flex items-center justify-end gap-2">
                        <button onclick="resetUserPassword(${user.id})" class="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg" title="Réinitialiser le mot de passe">
                          <i data-lucide="key" class="w-4 h-4"></i>
                        </button>
                        <button onclick="editUser(${user.id})" class="text-emerald-600 hover:text-emerald-800 p-2 hover:bg-emerald-50 rounded-lg" title="Modifier">
                          <i data-lucide="edit" class="w-4 h-4"></i>
                        </button>
                        <button onclick="deleteUser(${user.id})" class="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg" title="Supprimer">
                          <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          ${pagination.last_page > 1 ? `
            <div class="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div class="text-sm text-gray-700">
                Affichage de <span class="font-medium">${(pagination.current_page - 1) * pagination.per_page + 1}</span> à
                <span class="font-medium">${Math.min(pagination.current_page * pagination.per_page, pagination.total)}</span>
                sur <span class="font-medium">${pagination.total}</span> résultats
              </div>
              <div class="flex items-center gap-2">
                <button onclick="changeUsersPage(${pagination.current_page - 1})" ${pagination.current_page === 1 ? 'disabled' : ''}
                  class="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50">
                  <i data-lucide="chevron-left" class="w-5 h-5"></i>
                </button>
                <span class="px-4 py-2 text-sm font-medium">Page ${pagination.current_page} / ${pagination.last_page}</span>
                <button onclick="changeUsersPage(${pagination.current_page + 1})" ${pagination.current_page === pagination.last_page ? 'disabled' : ''}
                  class="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50">
                  <i data-lucide="chevron-right" class="w-5 h-5"></i>
                </button>
              </div>
            </div>
          ` : ''}
        `;
        
        container.innerHTML = tableHtml;
        initIcons();
      } catch (error) {
        console.error('Error loading users:', error);
        container.innerHTML = '<div class="text-center py-12 text-red-600">Erreur lors du chargement des utilisateurs</div>';
      }
    };
    
    // Event listeners
    const searchInput = $('#users-search');
    const roleSelect = $('#users-role');
    
    let searchTimeout;
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTerm = e.target.value;
        currentPage = 1;
        searchTimeout = setTimeout(() => loadUsers(), 300);
      });
    }
    
    if (roleSelect) {
      roleSelect.addEventListener('change', (e) => {
        selectedRole = e.target.value;
        currentPage = 1;
        loadUsers();
      });
    }
    
    window.changeUsersPage = (page) => {
      if (page >= 1) {
        currentPage = page;
        loadUsers();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    
    window.editUser = async (id) => {
      try {
        const res = await apiCall(`/users/${id}`);
        const user = res.data;
        showUserModal(user);
      } catch (error) {
        alert('Erreur lors du chargement de l\'utilisateur: ' + error.message);
      }
    };
    
    window.createUser = () => {
      showUserModal(null);
    };
    
    window.resetUserPassword = async (id) => {
      if (!confirm('Réinitialiser le mot de passe de cet utilisateur ?')) return;
      try {
        const res = await apiCall(`/users/${id}/reset-password`, { method: 'POST', body: JSON.stringify({}) });
        if (res.generated_password) {
          alert('Nouveau mot de passe: ' + res.generated_password);
        } else {
          alert('Mot de passe réinitialisé avec succès');
        }
      } catch (error) {
        alert('Erreur lors de la réinitialisation');
      }
    };
    
    window.deleteUser = async (id) => {
      if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;
      try {
        await apiCall(`/users/${id}`, { method: 'DELETE' });
        loadUsers();
      } catch (error) {
        alert('Erreur lors de la suppression');
      }
    };
    
    if ($('#add-user-btn')) {
      $('#add-user-btn').addEventListener('click', () => {
        window.createUser();
      });
    }
    
    loadUsers();
  };
  
  // ==================== ACCREDITATIONS ====================
  const initAccreditations = () => {
    if (!$('#accreditations-table-container')) return;
    
    let currentPage = 1;
    let perPage = 25;
    let searchTerm = '';
    
    const loadAccreditations = async () => {
      const container = $('#accreditations-table-container');
      if (!container) return;
      
      container.innerHTML = `
        <div class="flex justify-center items-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-900 border-t-transparent"></div>
        </div>
      `;
      
      try {
        const params = new URLSearchParams();
        params.append('all_status', 'true');
        params.append('accredited', 'true');
        if (searchTerm) params.append('search', searchTerm);
        params.append('per_page', perPage.toString());
        params.append('page', currentPage.toString());
        
        const res = await apiCall(`/tourism-actors?${params.toString()}`);
        const actors = res.data || [];
        const pagination = res.pagination || { current_page: 1, last_page: 1, total: 0 };
        
        const typeLabels = {
          hotel: 'Hôtel',
          restaurant: 'Restaurant',
          travel_agency: 'Agence de Voyage',
          tour_guide: 'Guide Touristique',
          transport: 'Transport',
          attraction: 'Attraction',
          other: 'Autre',
        };
        
        const tableHtml = `
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ville / Région</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Numéro d'accréditation</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                ${actors.length === 0 ? `
                  <tr>
                    <td colspan="5" class="px-6 py-20 text-center">
                      <i data-lucide="award" class="w-16 h-16 text-gray-400 mx-auto mb-4"></i>
                      <p class="text-gray-500 text-lg font-medium">Aucun acteur accrédité trouvé</p>
                    </td>
                  </tr>
                ` : actors.map(actor => `
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">${escapeHtml(actor.name)}</div>
                      ${actor.email ? `<div class="text-sm text-gray-500">${escapeHtml(actor.email)}</div>` : ''}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                        ${typeLabels[actor.type] || actor.type}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${escapeHtml(actor.city)}, ${escapeHtml(actor.region)}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center gap-2">
                        <i data-lucide="award" class="w-5 h-5 text-amber-500"></i>
                        <span class="text-sm font-medium text-amber-600">${escapeHtml(actor.accreditation_number)}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div class="flex items-center gap-2">
                        <a href="/actors/${actor.id}" class="text-blue-600 hover:text-blue-900 flex items-center gap-1">
                          <i data-lucide="eye" class="w-4 h-4"></i>
                          Voir
                        </a>
                        <a href="/admin/actors?edit=${actor.id}" class="text-gray-600 hover:text-gray-900 flex items-center gap-1">
                          <i data-lucide="edit" class="w-4 h-4"></i>
                          Modifier
                        </a>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          ${pagination.last_page > 1 ? `
            <div class="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                <div class="text-sm text-gray-700">
                  Affichage de <span class="font-medium">${(pagination.current_page - 1) * pagination.per_page + 1}</span> à
                  <span class="font-medium">${Math.min(pagination.current_page * pagination.per_page, pagination.total)}</span>
                  sur <span class="font-medium">${pagination.total}</span> résultats
                </div>
                <div class="flex items-center gap-2">
                  <button onclick="changeAccreditationsPage(${pagination.current_page - 1})" ${pagination.current_page === 1 ? 'disabled' : ''}
                    class="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50">
                    <i data-lucide="chevron-left" class="w-5 h-5"></i>
                  </button>
                  <span class="px-4 py-2 text-sm font-medium">Page ${pagination.current_page} / ${pagination.last_page}</span>
                  <button onclick="changeAccreditationsPage(${pagination.current_page + 1})" ${pagination.current_page === pagination.last_page ? 'disabled' : ''}
                    class="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50">
                    <i data-lucide="chevron-right" class="w-5 h-5"></i>
                  </button>
                </div>
              </div>
            </div>
          ` : ''}
        `;
        
        container.innerHTML = tableHtml;
        initIcons();
      } catch (error) {
        console.error('Error loading accreditations:', error);
        container.innerHTML = '<div class="text-center py-12 text-red-600">Erreur lors du chargement des accréditations</div>';
      }
    };
    
    const searchInput = $('#accreditations-search');
    let searchTimeout;
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTerm = e.target.value;
        currentPage = 1;
        searchTimeout = setTimeout(() => loadAccreditations(), 300);
      });
    }
    
    window.changeAccreditationsPage = (page) => {
      if (page >= 1) {
        currentPage = page;
        loadAccreditations();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    
    loadAccreditations();
  };
  
  // ==================== ASSOCIATIONS ====================
  const initAssociations = () => {
    if (!$('#associations-container')) return;
    
    let associationFilter = 'all';
    
    const loadAssociations = async () => {
      const container = $('#associations-container');
      if (!container) return;
      
      container.innerHTML = `
        <div class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-900 border-t-transparent mx-auto mb-4"></div>
          <p class="text-gray-600">Chargement des associations...</p>
        </div>
      `;
      
      try {
        const params = new URLSearchParams();
        params.append('type', 'association');
        params.append('all_status', 'true');
        params.append('per_page', '1000');
        
        const res = await apiCall(`/tourism-actors?${params.toString()}`);
        const actors = res.data || [];
        
        const statusMap = {
          pending: 'pending',
          active: 'approved',
          inactive: 'rejected',
          suspended: 'rejected',
        };
        
        const associations = actors.map(actor => ({
          ...actor,
          status: statusMap[actor.status] || 'pending',
        }));
        
        const filtered = associationFilter === 'all' 
          ? associations 
          : associations.filter(a => a.status === associationFilter);
        
        const html = `
          <div class="space-y-6">
            <div class="bg-white rounded-lg shadow-sm p-4">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-2xl font-bold">Gestion des Associations</h2>
                <div class="flex gap-2">
                  <button onclick="setAssociationFilter('all')" class="px-4 py-2 rounded-lg font-medium ${associationFilter === 'all' ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-700'}">
                    Toutes (${associations.length})
                  </button>
                  <button onclick="setAssociationFilter('pending')" class="px-4 py-2 rounded-lg font-medium ${associationFilter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700'}">
                    En attente (${associations.filter(a => a.status === 'pending').length})
                  </button>
                  <button onclick="setAssociationFilter('approved')" class="px-4 py-2 rounded-lg font-medium ${associationFilter === 'approved' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}">
                    Approuvées (${associations.filter(a => a.status === 'approved').length})
                  </button>
                  <button onclick="setAssociationFilter('rejected')" class="px-4 py-2 rounded-lg font-medium ${associationFilter === 'rejected' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}">
                    Rejetées (${associations.filter(a => a.status === 'rejected').length})
                  </button>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm p-6">
              ${filtered.length === 0 ? `
                <p class="text-gray-600 text-center py-8">Aucune association trouvée</p>
              ` : `
                <div class="space-y-4">
                  ${filtered.map(assoc => `
                    <div class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                          <div class="flex items-center gap-3 mb-2">
                            <i data-lucide="building-2" class="w-5 h-5 text-blue-900"></i>
                            <h3 class="text-xl font-semibold">${escapeHtml(assoc.name)}</h3>
                            <span class="px-3 py-1 rounded-full text-xs font-medium ${
                              assoc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              assoc.status === 'approved' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }">
                              ${assoc.status === 'pending' ? 'En attente' : assoc.status === 'approved' ? 'Approuvé' : 'Rejeté'}
                            </span>
                          </div>
                          <p class="text-gray-600 mb-4">${escapeHtml(assoc.description || '')}</p>
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div class="flex items-center gap-2">
                              <i data-lucide="mail" class="w-4 h-4 text-gray-400"></i>
                              <span class="text-gray-700">${escapeHtml(assoc.email || '')}</span>
                            </div>
                            <div class="flex items-center gap-2">
                              <i data-lucide="phone" class="w-4 h-4 text-gray-400"></i>
                              <span class="text-gray-700">${escapeHtml(assoc.phone || '')}</span>
                            </div>
                            <div class="flex items-center gap-2">
                              <i data-lucide="map-pin" class="w-4 h-4 text-gray-400"></i>
                              <span class="text-gray-700">${escapeHtml(assoc.city)}, ${escapeHtml(assoc.region)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      ${assoc.status === 'pending' ? `
                        <div class="flex gap-3 mt-4 pt-4 border-t border-gray-200">
                          <button onclick="approveAssociation(${assoc.id})" class="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                            <i data-lucide="check-circle" class="w-4 h-4"></i>
                            Approuver
                          </button>
                          <button onclick="rejectAssociation(${assoc.id})" class="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                            <i data-lucide="x" class="w-4 h-4"></i>
                            Rejeter
                          </button>
                        </div>
                      ` : ''}
                    </div>
                  `).join('')}
                </div>
              `}
            </div>
          </div>
        `;
        
        container.innerHTML = html;
        initIcons();
      } catch (error) {
        console.error('Error loading associations:', error);
        container.innerHTML = '<div class="text-center py-12 text-red-600">Erreur lors du chargement des associations</div>';
      }
    };
    
    window.setAssociationFilter = (filter) => {
      associationFilter = filter;
      loadAssociations();
    };
    
    window.approveAssociation = async (id) => {
      if (!confirm('Approuver cette association ?')) return;
      try {
        await apiCall(`/accreditations/${id}/approve-without-badge`, { method: 'POST' });
        alert('Association approuvée. Un email avec les identifiants a été envoyé.');
        loadAssociations();
      } catch (error) {
        alert('Erreur lors de l\'approbation');
      }
    };
    
    window.rejectAssociation = async (id) => {
      if (!confirm('Rejeter cette association ?')) return;
      try {
        await apiCall(`/tourism-actors/${id}`, { 
          method: 'PUT', 
          body: JSON.stringify({ status: 'inactive', verified: false })
        });
        alert('Association rejetée');
        loadAssociations();
      } catch (error) {
        alert('Erreur lors du rejet');
      }
    };
    
    loadAssociations();
  };
  
  // ==================== PENDING ====================
  const initPending = () => {
    if (!$('#pending-container')) return;
    
    let currentFilter = 'all';
    
    const loadPending = async () => {
      const container = $('#pending-container');
      if (!container) return;
      
      container.innerHTML = `
        <div class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-900 border-t-transparent mx-auto mb-4"></div>
          <p class="text-gray-600">Chargement des demandes...</p>
        </div>
      `;
      
      try {
        // Charger toutes les demandes en attente
        const [eventsRes, newsRes, actorsRes, accreditationsRes] = await Promise.all([
          apiCall('/events?status=draft&per_page=1000'),
          apiCall('/news?status=draft&per_page=1000'),
          apiCall('/tourism-actors?status=pending&per_page=1000'),
          apiCall('/accreditation-requests?status=pending&per_page=1000'),
        ]);
        
        const pendingEvents = eventsRes.data || [];
        const pendingNews = newsRes.data || [];
        const pendingActors = actorsRes.data || [];
        const pendingAccreditations = accreditationsRes.data || [];
        
        const totalCount = pendingEvents.length + pendingNews.length + pendingActors.length + pendingAccreditations.length;
        
        const formatDate = (dateString) => {
          if (!dateString) return 'N/A';
          const date = new Date(dateString);
          return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
        };
        
        const html = `
          <div class="space-y-6">
            <!-- Filtres -->
            <div class="bg-white rounded-lg shadow-sm p-4">
              <div class="flex flex-wrap gap-2">
                <button onclick="setPendingFilter('all')" 
                  class="px-4 py-2 rounded-lg font-medium transition-colors ${currentFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">
                  Tous (${totalCount})
                </button>
                <button onclick="setPendingFilter('events')" 
                  class="px-4 py-2 rounded-lg font-medium transition-colors ${currentFilter === 'events' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">
                  Événements (${pendingEvents.length})
                </button>
                <button onclick="setPendingFilter('news')" 
                  class="px-4 py-2 rounded-lg font-medium transition-colors ${currentFilter === 'news' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">
                  Actualités (${pendingNews.length})
                </button>
                <button onclick="setPendingFilter('actors')" 
                  class="px-4 py-2 rounded-lg font-medium transition-colors ${currentFilter === 'actors' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">
                  Acteurs (${pendingActors.length})
                </button>
                <button onclick="setPendingFilter('accreditations')" 
                  class="px-4 py-2 rounded-lg font-medium transition-colors ${currentFilter === 'accreditations' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">
                  Accréditations (${pendingAccreditations.length})
                </button>
              </div>
            </div>
            
            <!-- Événements -->
            <div id="pending-events" class="pending-section ${currentFilter !== 'all' && currentFilter !== 'events' ? 'hidden' : ''}">
              <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
                <i data-lucide="calendar" class="w-5 h-5"></i>
                Événements en Attente (${pendingEvents.length})
              </h2>
              ${pendingEvents.length === 0 ? `
                <div class="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                  <p class="text-gray-600">Aucun événement en attente</p>
                </div>
              ` : `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  ${pendingEvents.map(event => `
                    <div class="bg-white border-2 border-yellow-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                      <div class="flex items-start justify-between mb-3">
                        <div class="flex-1">
                          <h3 class="font-bold text-lg text-gray-900 mb-2 line-clamp-2">${escapeHtml(event.title)}</h3>
                          <p class="text-sm text-gray-600 mb-2">${formatDate(event.event_date)}</p>
                          ${event.location ? `<p class="text-sm text-gray-500 flex items-center gap-1">
                            <i data-lucide="map-pin" class="w-4 h-4"></i>
                            ${escapeHtml(event.location)}
                          </p>` : ''}
                        </div>
                        <span class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">En attente</span>
                      </div>
                      <p class="text-sm text-gray-700 mb-4 line-clamp-3">${escapeHtml(event.description?.substring(0, 150) || 'Aucune description')}...</p>
                      <div class="flex gap-2">
                        <button onclick="approveEvent(${event.id})" 
                          class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
                          Approuver
                        </button>
                        <button onclick="rejectEvent(${event.id})" 
                          class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm">
                          Rejeter
                        </button>
                      </div>
                    </div>
                  `).join('')}
                </div>
              `}
            </div>
            
            <!-- Actualités -->
            <div id="pending-news" class="pending-section ${currentFilter !== 'all' && currentFilter !== 'news' ? 'hidden' : ''}">
              <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
                <i data-lucide="newspaper" class="w-5 h-5"></i>
                Actualités en Attente (${pendingNews.length})
              </h2>
              ${pendingNews.length === 0 ? `
                <div class="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                  <p class="text-gray-600">Aucune actualité en attente</p>
                </div>
              ` : `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  ${pendingNews.map(news => `
                    <div class="bg-white border-2 border-yellow-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                      <div class="flex items-start justify-between mb-3">
                        <div class="flex-1">
                          <h3 class="font-bold text-lg text-gray-900 mb-2 line-clamp-2">${escapeHtml(news.title)}</h3>
                          <p class="text-sm text-gray-600 mb-2">${formatDate(news.created_at)}</p>
                          ${news.author ? `<p class="text-sm text-gray-500">Par ${escapeHtml(news.author)}</p>` : ''}
                        </div>
                        <span class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">En attente</span>
                      </div>
                      <p class="text-sm text-gray-700 mb-4 line-clamp-3">${escapeHtml(news.excerpt?.substring(0, 150) || news.content?.substring(0, 150) || 'Aucun résumé')}...</p>
                      <div class="flex gap-2">
                        <button onclick="approveNews(${news.id})" 
                          class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
                          Approuver
                        </button>
                        <button onclick="rejectNews(${news.id})" 
                          class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm">
                          Rejeter
                        </button>
                      </div>
                    </div>
                  `).join('')}
                </div>
              `}
            </div>
            
            <!-- Acteurs -->
            <div id="pending-actors" class="pending-section ${currentFilter !== 'all' && currentFilter !== 'actors' ? 'hidden' : ''}">
              <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
                <i data-lucide="users" class="w-5 h-5"></i>
                Acteurs en Attente (${pendingActors.length})
              </h2>
              ${pendingActors.length === 0 ? `
                <div class="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                  <p class="text-gray-600">Aucun acteur en attente</p>
                </div>
              ` : `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  ${pendingActors.map(actor => `
                    <div class="bg-white border-2 border-yellow-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                      <div class="flex items-start justify-between mb-3">
                        <div class="flex-1">
                          <h3 class="font-bold text-lg text-gray-900 mb-2">${escapeHtml(actor.name)}</h3>
                          ${actor.name_ar ? `<p class="text-sm text-gray-600 mb-2">${escapeHtml(actor.name_ar)}</p>` : ''}
                          <p class="text-sm text-gray-500 mb-2">${escapeHtml(actor.type || 'N/A')}</p>
                          ${actor.city ? `<p class="text-sm text-gray-500 flex items-center gap-1">
                            <i data-lucide="map-pin" class="w-4 h-4"></i>
                            ${escapeHtml(actor.city)}${actor.region ? `, ${escapeHtml(actor.region)}` : ''}
                          </p>` : ''}
                        </div>
                        <span class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">En attente</span>
                      </div>
                      <p class="text-sm text-gray-700 mb-4 line-clamp-3">${escapeHtml(actor.description?.substring(0, 150) || 'Aucune description')}...</p>
                      <div class="flex gap-2">
                        <button onclick="approveActor(${actor.id})" 
                          class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
                          Approuver
                        </button>
                        <button onclick="rejectActor(${actor.id})" 
                          class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm">
                          Rejeter
                        </button>
                      </div>
                    </div>
                  `).join('')}
                </div>
              `}
            </div>
            
            <!-- Accréditations -->
            <div id="pending-accreditations" class="pending-section ${currentFilter !== 'all' && currentFilter !== 'accreditations' ? 'hidden' : ''}">
              <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
                <i data-lucide="award" class="w-5 h-5"></i>
                Accréditations en Attente (${pendingAccreditations.length})
              </h2>
              ${pendingAccreditations.length === 0 ? `
                <div class="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                  <p class="text-gray-600">Aucune demande d'accréditation en attente</p>
                </div>
              ` : `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  ${pendingAccreditations.map(acc => `
                    <div class="bg-white border-2 border-yellow-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                      <div class="flex items-start justify-between mb-3">
                        <div class="flex-1">
                          <h3 class="font-bold text-lg text-gray-900 mb-2">${escapeHtml(acc.full_name || 'N/A')}</h3>
                          <p class="text-sm text-gray-600 mb-2">${escapeHtml(acc.email || '')}</p>
                          ${acc.phone ? `<p class="text-sm text-gray-500 mb-2">${escapeHtml(acc.phone)}</p>` : ''}
                          ${acc.tourism_actor ? `<p class="text-sm text-gray-700 font-medium">Acteur: ${escapeHtml(acc.tourism_actor.name || 'N/A')}</p>` : ''}
                        </div>
                        <span class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">En attente</span>
                      </div>
                      ${acc.message ? `<p class="text-sm text-gray-700 mb-4 line-clamp-3">${escapeHtml(acc.message)}</p>` : ''}
                      <p class="text-xs text-gray-500 mb-4">Demandé le ${formatDate(acc.created_at)}</p>
                      <div class="flex gap-2">
                        <button onclick="approveAccreditation(${acc.id})" 
                          class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
                          Approuver
                        </button>
                        <button onclick="rejectAccreditation(${acc.id})" 
                          class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm">
                          Rejeter
                        </button>
                      </div>
                    </div>
                  `).join('')}
                </div>
              `}
            </div>
          </div>
        `;
        
        container.innerHTML = html;
        initIcons();
        
        // Fonction de filtrage
        window.setPendingFilter = (filter) => {
          currentFilter = filter;
          const sections = document.querySelectorAll('.pending-section');
          sections.forEach(section => {
            const sectionId = section.id;
            if (filter === 'all') {
              section.classList.remove('hidden');
            } else if (filter === 'events' && sectionId === 'pending-events') {
              section.classList.remove('hidden');
            } else if (filter === 'news' && sectionId === 'pending-news') {
              section.classList.remove('hidden');
            } else if (filter === 'actors' && sectionId === 'pending-actors') {
              section.classList.remove('hidden');
            } else if (filter === 'accreditations' && sectionId === 'pending-accreditations') {
              section.classList.remove('hidden');
            } else {
              section.classList.add('hidden');
            }
          });
          
          // Mettre à jour les boutons de filtre
          const buttons = container.querySelectorAll('button[onclick^="setPendingFilter"]');
          buttons.forEach(btn => {
            const filterType = btn.getAttribute('onclick').match(/setPendingFilter\('(\w+)'\)/)?.[1];
            if (filterType === filter) {
              btn.className = 'px-4 py-2 rounded-lg font-medium transition-colors bg-blue-600 text-white';
            } else {
              btn.className = 'px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200';
            }
          });
        };
        
        window.approveEvent = async (id) => {
          try {
            const result = await apiCall(`/events/${id}`, { method: 'PUT', body: JSON.stringify({ status: 'published' }) });
            alert(result.message || 'Événement approuvé avec succès');
            loadPending();
          } catch (error) {
            console.error('Approve event error:', error);
            alert(error.message || 'Erreur lors de l\'approbation de l\'événement');
          }
        };
        
        window.rejectEvent = async (id) => {
          try {
            const result = await apiCall(`/events/${id}`, { method: 'PUT', body: JSON.stringify({ status: 'cancelled' }) });
            alert(result.message || 'Événement rejeté avec succès');
            loadPending();
          } catch (error) {
            console.error('Reject event error:', error);
            alert(error.message || 'Erreur lors du rejet de l\'événement');
          }
        };
        
        window.approveNews = async (id) => {
          try {
            const result = await apiCall(`/news/${id}`, { method: 'PUT', body: JSON.stringify({ status: 'published' }) });
            alert(result.message || 'Actualité approuvée avec succès');
            loadPending();
          } catch (error) {
            console.error('Approve news error:', error);
            alert(error.message || 'Erreur lors de l\'approbation de l\'actualité');
          }
        };
        
        window.rejectNews = async (id) => {
          try {
            const result = await apiCall(`/news/${id}`, { method: 'PUT', body: JSON.stringify({ status: 'archived' }) });
            alert(result.message || 'Actualité rejetée avec succès');
            loadPending();
          } catch (error) {
            console.error('Reject news error:', error);
            alert(error.message || 'Erreur lors du rejet de l\'actualité');
          }
        };
        
        window.approveActor = async (id) => {
          try {
            const result = await apiCall(`/tourism-actors/${id}`, { method: 'PUT', body: JSON.stringify({ status: 'active' }) });
            alert(result.message || 'Acteur approuvé avec succès');
            loadPending();
          } catch (error) {
            console.error('Approve actor error:', error);
            alert(error.message || 'Erreur lors de l\'approbation de l\'acteur');
          }
        };
        
        window.rejectActor = async (id) => {
          try {
            const result = await apiCall(`/tourism-actors/${id}`, { method: 'PUT', body: JSON.stringify({ status: 'rejected' }) });
            alert(result.message || 'Acteur rejeté avec succès');
            loadPending();
          } catch (error) {
            console.error('Reject actor error:', error);
            alert(error.message || 'Erreur lors du rejet de l\'acteur');
          }
        };
        
        window.approveAccreditation = async (id) => {
          try {
            const result = await apiCall(`/accreditation-requests/${id}/approve`, { method: 'POST' });
            alert(result.message || 'Accréditation approuvée avec succès');
            loadPending();
          } catch (error) {
            console.error('Approve accreditation error:', error);
            alert(error.message || 'Erreur lors de l\'approbation de l\'accréditation');
          }
        };
        
        window.rejectAccreditation = async (id) => {
          try {
            const result = await apiCall(`/accreditation-requests/${id}/reject`, { method: 'POST' });
            alert(result.message || 'Accréditation rejetée avec succès');
            loadPending();
          } catch (error) {
            console.error('Reject accreditation error:', error);
            alert(error.message || 'Erreur lors du rejet de l\'accréditation');
          }
        };
      } catch (error) {
        console.error('Error loading pending:', error);
        container.innerHTML = '<div class="text-center py-12 text-red-600">Erreur lors du chargement</div>';
      }
    };
    
    loadPending();
  };
  
  // ==================== SUSPENDED ====================
  const initSuspended = () => {
    if (!$('#suspended-container')) return;
    
    const loadSuspended = async () => {
      const container = $('#suspended-container');
      if (!container) return;
      
      container.innerHTML = `
        <div class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-900 border-t-transparent mx-auto mb-4"></div>
          <p class="text-gray-600">Chargement des acteurs suspendus...</p>
        </div>
      `;
      
      try {
        const res = await apiCall('/tourism-actors?status=suspended&per_page=1000');
        const actors = res.data || [];
        
        const html = `
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-bold mb-4">Acteurs Suspendus (${actors.length})</h2>
            ${actors.length === 0 ? '<p class="text-gray-600">Aucun acteur suspendu</p>' : `
              <div class="space-y-4">
                ${actors.map(actor => `
                  <div class="border border-red-200 rounded-lg p-4 bg-red-50">
                    <h3 class="font-semibold text-gray-900">${escapeHtml(actor.name)}</h3>
                    <p class="text-sm text-gray-600">${escapeHtml(actor.email || '')} - ${escapeHtml(actor.city)}</p>
                    <button onclick="unsuspendActor(${actor.id})" class="mt-2 px-3 py-1 bg-green-600 text-white rounded text-sm">Réactiver</button>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        `;
        
        container.innerHTML = html;
        initIcons();
        
        window.unsuspendActor = async (id) => {
          if (!confirm('Réactiver cet acteur ?')) return;
          try {
            await apiCall(`/tourism-actors/${id}`, { method: 'PUT', body: JSON.stringify({ status: 'active' }) });
            alert('Acteur réactivé');
            loadSuspended();
          } catch (error) {
            alert('Erreur lors de la réactivation');
          }
        };
      } catch (error) {
        console.error('Error loading suspended:', error);
        container.innerHTML = '<div class="text-center py-12 text-red-600">Erreur lors du chargement</div>';
      }
    };
    
    loadSuspended();
  };
  
  // ==================== STATS ====================
  const initStats = () => {
    if (!$('#stats-container')) return;
    
    const loadStats = async () => {
      const container = $('#stats-container');
      if (!container) return;
      
      container.innerHTML = `
        <div class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-900 border-t-transparent mx-auto mb-4"></div>
          <p class="text-gray-600">Chargement des statistiques...</p>
        </div>
      `;
      
      try {
        const [actorsRes, newsRes, eventsRes, usersRes] = await Promise.all([
          apiCall('/tourism-actors?per_page=1000&all_status=true', {}, true),
          apiCall('/news?per_page=1000&status=all', {}, true),
          apiCall('/events?per_page=1000&status=all', {}, true),
          apiCall('/users?per_page=1000', {}, true),
        ]);
        
        const actors = actorsRes.data || [];
        const news = newsRes.data || [];
        const events = eventsRes.data || [];
        const users = usersRes.data || [];
        
        const html = `
          <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div class="bg-blue-600 rounded-lg shadow-md p-5 text-white">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-blue-100 text-sm font-medium mb-1">Total Acteurs</p>
                    <p class="text-3xl font-bold">${actors.length}</p>
                  </div>
                  <i data-lucide="users" class="w-6 h-6"></i>
                </div>
              </div>
              <div class="bg-emerald-600 rounded-lg shadow-md p-5 text-white">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-emerald-100 text-sm font-medium mb-1">Actualités</p>
                    <p class="text-3xl font-bold">${news.length}</p>
                  </div>
                  <i data-lucide="newspaper" class="w-6 h-6"></i>
                </div>
              </div>
              <div class="bg-amber-600 rounded-lg shadow-md p-5 text-white">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-amber-100 text-sm font-medium mb-1">Événements</p>
                    <p class="text-3xl font-bold">${events.length}</p>
                  </div>
                  <i data-lucide="calendar" class="w-6 h-6"></i>
                </div>
              </div>
              <div class="bg-red-600 rounded-lg shadow-md p-5 text-white">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-red-100 text-sm font-medium mb-1">Utilisateurs</p>
                    <p class="text-3xl font-bold">${users.length}</p>
                  </div>
                  <i data-lucide="user-cog" class="w-6 h-6"></i>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h2 class="text-xl font-bold mb-4">Répartition des Acteurs</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 class="font-semibold mb-2">Par Statut</h3>
                  <div class="space-y-2">
                    <div class="flex justify-between">
                      <span>Actifs</span>
                      <span class="font-bold">${actors.filter(a => a.status === 'active').length}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>En attente</span>
                      <span class="font-bold">${actors.filter(a => a.status === 'pending').length}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>Suspendus</span>
                      <span class="font-bold">${actors.filter(a => a.status === 'suspended').length}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 class="font-semibold mb-2">Par Type</h3>
                  <div class="space-y-2">
                    ${Object.entries(actors.reduce((acc, a) => {
                      acc[a.type] = (acc[a.type] || 0) + 1;
                      return acc;
                    }, {})).map(([type, count]) => `
                      <div class="flex justify-between">
                        <span>${type}</span>
                        <span class="font-bold">${count}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        
        container.innerHTML = html;
        initIcons();
      } catch (error) {
        console.error('Error loading stats:', error);
        container.innerHTML = '<div class="text-center py-12 text-red-600">Erreur lors du chargement</div>';
      }
    };
    
    loadStats();
  };
  
  // ==================== MODAL SYSTEM ====================
  const showModal = (title, content, onClose = null) => {
    // Remove existing modal
    const existing = $('#crud-modal');
    if (existing) existing.remove();
    
    const modal = document.createElement('div');
    modal.id = 'crud-modal';
    modal.className = 'fixed inset-0 z-50 overflow-y-auto';
    modal.innerHTML = `
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onclick="closeModal()"></div>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-2xl font-bold text-gray-900">${escapeHtml(title)}</h3>
              <button onclick="closeModal()" class="text-gray-400 hover:text-gray-600">
                <i data-lucide="x" class="w-6 h-6"></i>
              </button>
            </div>
            <div class="modal-content">
              ${content}
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    initIcons();
    
    if (onClose) {
      window.closeModal = () => {
        modal.remove();
        if (onClose) onClose();
      };
    } else {
      window.closeModal = () => modal.remove();
    }
  };
  
  // ==================== ACTOR MODAL ====================
  const showActorModal = (actor = null) => {
    const isEdit = actor !== null;
    const content = `
      <form id="actor-form" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
            <input type="text" name="name" required value="${actor ? escapeHtml(actor.name || '') : ''}" 
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Type *</label>
            <select name="type" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900">
              <option value="">Sélectionner...</option>
              <option value="hotel" ${actor?.type === 'hotel' ? 'selected' : ''}>Hôtel</option>
              <option value="restaurant" ${actor?.type === 'restaurant' ? 'selected' : ''}>Restaurant</option>
              <option value="travel_agency" ${actor?.type === 'travel_agency' ? 'selected' : ''}>Agence de Voyage</option>
              <option value="tour_guide" ${actor?.type === 'tour_guide' ? 'selected' : ''}>Guide Touristique</option>
              <option value="transport" ${actor?.type === 'transport' ? 'selected' : ''}>Transport</option>
              <option value="attraction" ${actor?.type === 'attraction' ? 'selected' : ''}>Attraction</option>
              <option value="other" ${actor?.type === 'other' ? 'selected' : ''}>Autre</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Adresse *</label>
            <input type="text" name="address" required value="${actor ? escapeHtml(actor.address || '') : ''}" 
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Ville *</label>
            <input type="text" name="city" required value="${actor ? escapeHtml(actor.city || '') : ''}" 
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Région *</label>
            <input type="text" name="region" required value="${actor ? escapeHtml(actor.region || '') : ''}" 
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" name="email" value="${actor ? escapeHtml(actor.email || '') : ''}" 
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input type="text" name="phone" value="${actor ? escapeHtml(actor.phone || '') : ''}" 
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Site Web</label>
            <input type="url" name="website" value="${actor ? escapeHtml(actor.website || '') : ''}" 
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Numéro d'accréditation</label>
            <input type="text" name="accreditation_number" value="${actor ? escapeHtml(actor.accreditation_number || '') : ''}" 
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Statut</label>
            <select name="status" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900">
              <option value="active" ${actor?.status === 'active' ? 'selected' : ''}>Actif</option>
              <option value="pending" ${actor?.status === 'pending' ? 'selected' : ''}>En attente</option>
              <option value="inactive" ${actor?.status === 'inactive' ? 'selected' : ''}>Inactif</option>
              <option value="suspended" ${actor?.status === 'suspended' ? 'selected' : ''}>Suspendu</option>
            </select>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea name="description" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900">${actor ? escapeHtml(actor.description || '') : ''}</textarea>
        </div>
        <div class="flex justify-end gap-3 pt-4 border-t">
          <button type="button" onclick="closeModal()" class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            Annuler
          </button>
          <button type="submit" class="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors">
            ${isEdit ? 'Mettre à jour' : 'Créer'}
          </button>
        </div>
      </form>
    `;
    
    showModal(isEdit ? 'Modifier l\'acteur' : 'Nouvel acteur', content, () => {
      // Reload actors after modal close
      const actorsContainer = $('#actors-table-container');
      if (actorsContainer && window.initActors) {
        // Re-initialize actors page
        setTimeout(() => {
          if (typeof loadActors === 'function') loadActors();
        }, 100);
      }
    });
    
    const form = $('#actor-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enregistrement...';
        
        try {
          if (isEdit) {
            await apiCall(`/tourism-actors/${actor.id}`, {
              method: 'PUT',
              body: JSON.stringify(data)
            });
          } else {
            await apiCall('/tourism-actors', {
              method: 'POST',
              body: JSON.stringify(data)
            });
          }
          closeModal();
          // Reload actors
          const actorsContainer = $('#actors-table-container');
          if (actorsContainer) {
            location.reload();
          }
        } catch (error) {
          alert('Erreur: ' + error.message);
        } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = isEdit ? 'Mettre à jour' : 'Créer';
        }
      });
    }
  };
  
  // ==================== NEWS MODAL ====================
  const showNewsModal = (news = null) => {
    const isEdit = news !== null;
    const content = `
      <form id="news-form" class="space-y-4" enctype="multipart/form-data">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
          <input type="text" name="title" required value="${news ? escapeHtml(news.title || '') : ''}" 
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Extrait *</label>
          <textarea name="excerpt" required rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900">${news ? escapeHtml(news.excerpt || '') : ''}</textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Contenu *</label>
          <textarea name="content" required rows="8" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900">${news ? escapeHtml(news.content || '') : ''}</textarea>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
            <input type="text" name="category" value="${news ? escapeHtml(news.category || '') : ''}" 
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Auteur</label>
            <input type="text" name="author" value="${news ? escapeHtml(news.author || '') : 'MATA'}" 
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Statut</label>
            <select name="status" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900">
              <option value="draft" ${news?.status === 'draft' ? 'selected' : ''}>Brouillon</option>
              <option value="published" ${news?.status === 'published' ? 'selected' : ''}>Publié</option>
              <option value="archived" ${news?.status === 'archived' ? 'selected' : ''}>Archivé</option>
            </select>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Image</label>
          <input type="file" name="image" accept="image/*" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900" />
          ${news?.image ? `<div class="mt-2"><img src="/storage/${news.image}" class="w-32 h-32 object-cover rounded-lg" /></div>` : ''}
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" name="featured" id="news-featured" ${news?.featured ? 'checked' : ''} class="rounded" />
          <label for="news-featured" class="text-sm font-medium text-gray-700">À la une</label>
        </div>
        <div class="flex justify-end gap-3 pt-4 border-t">
          <button type="button" onclick="closeModal()" class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            Annuler
          </button>
          <button type="submit" class="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors">
            ${isEdit ? 'Mettre à jour' : 'Créer'}
          </button>
        </div>
      </form>
    `;
    
    showModal(isEdit ? 'Modifier l\'article' : 'Nouvel article', content, () => {
      // Reload news after modal close
      const newsContainer = $('#news-table-container');
      if (newsContainer) {
        setTimeout(() => location.reload(), 100);
      }
    });
    
    const form = $('#news-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        
        // Handle featured checkbox
        formData.append('featured', $('#news-featured')?.checked ? '1' : '0');
        
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enregistrement...';
        
        try {
          if (isEdit) {
            await apiCall(`/news/${news.id}`, {
              method: 'POST',
              body: formData
            });
          } else {
            await apiCall('/news', {
              method: 'POST',
              body: formData
            });
          }
          closeModal();
          // Reload news
          const newsContainer = $('#news-table-container');
          if (newsContainer) {
            location.reload();
          }
        } catch (error) {
          alert('Erreur: ' + error.message);
        } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = isEdit ? 'Mettre à jour' : 'Créer';
        }
      });
    }
  };
  
  // ==================== EVENT MODAL ====================
  const showEventModal = (event = null) => {
    const isEdit = event !== null;
    const eventDate = event?.event_date ? new Date(event.event_date).toISOString().split('T')[0] : '';
    const content = `
      <form id="event-form" class="space-y-4" enctype="multipart/form-data">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
          <input type="text" name="title" required value="${event ? escapeHtml(event.title || '') : ''}" 
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea name="description" required rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900">${event ? escapeHtml(event.description || '') : ''}</textarea>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
            <select name="category" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900">
              <option value="">Sélectionner...</option>
              <option value="Conférence" ${event?.category === 'Conférence' ? 'selected' : ''}>Conférence</option>
              <option value="Salon" ${event?.category === 'Salon' ? 'selected' : ''}>Salon</option>
              <option value="Formation" ${event?.category === 'Formation' ? 'selected' : ''}>Formation</option>
              <option value="Networking" ${event?.category === 'Networking' ? 'selected' : ''}>Networking</option>
              <option value="Autre" ${event?.category === 'Autre' ? 'selected' : ''}>Autre</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Date de l'événement *</label>
            <input type="date" name="event_date" required value="${eventDate}" 
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Heure de début</label>
            <input type="time" name="start_time" value="${event?.start_time ? event.start_time.substring(0, 5) : ''}" 
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Heure de fin</label>
            <input type="time" name="end_time" value="${event?.end_time ? event.end_time.substring(0, 5) : ''}" 
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Lieu *</label>
            <input type="text" name="location" required value="${event ? escapeHtml(event.location || '') : ''}" 
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre de participants</label>
            <input type="number" name="participants" min="0" value="${event?.participants || ''}" 
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Statut</label>
            <select name="status" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900">
              <option value="draft" ${event?.status === 'draft' ? 'selected' : ''}>Brouillon</option>
              <option value="published" ${event?.status === 'published' ? 'selected' : ''}>Publié</option>
              <option value="cancelled" ${event?.status === 'cancelled' ? 'selected' : ''}>Annulé</option>
            </select>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Image</label>
          <input type="file" name="image" accept="image/*" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900" />
          ${event?.image ? `<div class="mt-2"><img src="/storage/${event.image}" class="w-32 h-32 object-cover rounded-lg" /></div>` : ''}
        </div>
        <div class="flex items-center gap-2">
          <input type="checkbox" name="featured" id="event-featured" ${event?.featured ? 'checked' : ''} class="rounded" />
          <label for="event-featured" class="text-sm font-medium text-gray-700">À la une</label>
        </div>
        <div class="flex justify-end gap-3 pt-4 border-t">
          <button type="button" onclick="closeModal()" class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            Annuler
          </button>
          <button type="submit" class="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors">
            ${isEdit ? 'Mettre à jour' : 'Créer'}
          </button>
        </div>
      </form>
    `;
    
    showModal(isEdit ? 'Modifier l\'événement' : 'Nouvel événement', content, () => {
      // Reload events after modal close
      const eventsContainer = $('#events-table-container');
      if (eventsContainer) {
        setTimeout(() => location.reload(), 100);
      }
    });
    
    const form = $('#event-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        
        // Handle featured checkbox
        formData.append('featured', $('#event-featured')?.checked ? '1' : '0');
        
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enregistrement...';
        
        try {
          if (isEdit) {
            await apiCall(`/events/${event.id}`, {
              method: 'PUT',
              body: formData
            });
          } else {
            await apiCall('/events', {
              method: 'POST',
              body: formData
            });
          }
          closeModal();
          // Reload events
          const eventsContainer = $('#events-table-container');
          if (eventsContainer) {
            location.reload();
          }
        } catch (error) {
          alert('Erreur: ' + error.message);
        } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = isEdit ? 'Mettre à jour' : 'Créer';
        }
      });
    }
  };
  
  // ==================== EXCEL IMPORT MODAL ====================
  const showExcelImportModal = () => {
    let defaultType = 'travel_agency';
    let selectedFile = null;
    
    const content = `
      <div class="space-y-6">
        <!-- Type Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Type d'acteur par défaut <span class="text-red-500">*</span>
          </label>
          <select id="excel-default-type" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900">
            <option value="travel_agency">Agence de Voyage</option>
            <option value="tour_guide">Guide Touristique</option>
            <option value="hotel">Hôtel</option>
            <option value="restaurant">Restaurant</option>
            <option value="transport">Transport</option>
            <option value="attraction">Attraction</option>
            <option value="other">Autre</option>
          </select>
          <p class="text-xs text-gray-500 mt-1">
            Ce type sera appliqué à tous les acteurs du fichier si la colonne "Type" n'est pas présente dans le fichier Excel.
          </p>
        </div>

        <!-- Instructions -->
        <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 class="font-semibold text-blue-900 mb-2">Instructions :</h3>
          <ul class="text-sm text-blue-800 space-y-1 list-disc list-inside" id="excel-instructions">
            <li>Le fichier doit être au format Excel (.xlsx, .xls) ou CSV</li>
            <li>La première ligne doit contenir les en-têtes de colonnes</li>
            <li><strong>Colonnes requises :</strong></li>
            <li class="ml-4">- <strong>Dénomination Sociale</strong> OU <strong>Nom</strong> (ou les deux : <strong>Nom</strong> + <strong>Prénom</strong>)</li>
            <li class="ml-4">- <strong>Ville</strong></li>
            <li><strong>Colonnes optionnelles :</strong></li>
            <li class="ml-4">- <strong>Adresse</strong>, <strong>Type</strong>, <strong>Catégorie</strong>, <strong>Téléphone</strong>, <strong>Email</strong>, <strong>Site Web</strong></li>
            <li class="ml-4">- <strong>Région</strong>, <strong>Description</strong>, <strong>Langue de travail</strong>, <strong>Numéro Accréditation</strong>, <strong>Statut</strong></li>
            <li>La colonne "Type" est optionnelle. Si absente, le type sélectionné ci-dessus sera appliqué.</li>
            <li>Statuts possibles : active, inactive, pending, suspended</li>
          </ul>
          <button
            id="download-template-btn"
            class="mt-3 text-sm text-blue-900 hover:text-blue-700 underline flex items-center gap-1"
          >
            <i data-lucide="file-spreadsheet" class="w-4 h-4"></i>
            Télécharger le modèle Excel
          </button>
        </div>

        <!-- File Upload -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Sélectionner le fichier Excel
          </label>
          <div
            id="excel-file-dropzone"
            class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
          >
            <input
              id="excel-file-input"
              type="file"
              accept=".xlsx,.xls,.csv"
              class="hidden"
            />
            <div id="excel-file-display">
              <i data-lucide="upload" class="w-12 h-12 text-gray-400 mx-auto mb-3"></i>
              <p class="text-gray-600">Cliquez pour sélectionner un fichier</p>
              <p class="text-sm text-gray-500 mt-1">
                Formats acceptés : .xlsx, .xls, .csv
              </p>
            </div>
          </div>
        </div>

        <!-- Messages -->
        <div id="excel-messages"></div>

        <!-- Actions -->
        <div class="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onclick="closeModal()"
            class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Fermer
          </button>
          <button
            id="excel-import-btn"
            class="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            disabled
          >
            <i data-lucide="upload" class="w-4 h-4"></i>
            <span>Importer</span>
          </button>
        </div>
      </div>
    `;
    
    showModal('Importer des acteurs depuis Excel', content, () => {
      // Reload actors after modal close
      const actorsContainer = $('#actors-table-container');
      if (actorsContainer) {
        setTimeout(() => location.reload(), 100);
      }
    });
    
    initIcons();
    
    // Update instructions based on type
    const typeSelect = $('#excel-default-type');
    const instructionsDiv = $('#excel-instructions');
    
    const updateInstructions = () => {
      const type = typeSelect.value;
      let instructions = '';
      
      if (type === 'travel_agency') {
        instructions = `
          <li>Le fichier doit être au format Excel (.xlsx, .xls) ou CSV</li>
          <li>La première ligne doit contenir les en-têtes de colonnes</li>
          <li><strong>Colonnes requises pour les agences :</strong></li>
          <li class="ml-4">- <strong>Dénomination Sociale</strong></li>
          <li class="ml-4">- <strong>Ville</strong></li>
          <li class="ml-4">- <strong>Adresse Agence</strong> (ou <strong>Adresse</strong>)</li>
          <li><strong>Colonnes optionnelles :</strong></li>
          <li class="ml-4">- <strong>Type</strong>, <strong>Catégorie</strong>, <strong>Téléphone</strong>, <strong>Email</strong>, <strong>Site Web</strong>, <strong>Région</strong>, <strong>Description</strong></li>
          <li class="ml-4">- <strong>Langue de travail</strong> (séparées par virgule : ex: "FR, EN, AR")</li>
          <li class="ml-4">- <strong>Numéro Accréditation</strong>, <strong>Statut</strong></li>
        `;
      } else if (type === 'tour_guide') {
        instructions = `
          <li>Le fichier doit être au format Excel (.xlsx, .xls) ou CSV</li>
          <li>La première ligne doit contenir les en-têtes de colonnes</li>
          <li><strong>Colonnes requises pour les guides :</strong></li>
          <li class="ml-4">- <strong>Nom</strong> (nom de famille)</li>
          <li class="ml-4">- <strong>Prénom</strong> (sera combiné avec Nom pour créer le nom complet)</li>
          <li class="ml-4">- <strong>Ville</strong></li>
          <li><strong>Colonnes optionnelles :</strong></li>
          <li class="ml-4">- <strong>Catégorie</strong> (ex: "Guide de Montagne", "Guide du Tourisme", "Accompagnateur du Tourisme")</li>
          <li class="ml-4">- <strong>Langue de travail</strong> (séparées par virgule ou tiret : ex: "FR", "FR, EN", "FR-ANG ALL")</li>
          <li class="ml-4">- <strong>Téléphone</strong>, <strong>Email</strong>, <strong>Région</strong>, <strong>Description</strong></li>
          <li class="ml-4">- <strong>Numéro Accréditation</strong>, <strong>Statut</strong></li>
          <li class="ml-4">- <strong>Adresse</strong> (optionnel, sera générée automatiquement si absente)</li>
        `;
      } else {
        instructions = `
          <li>Le fichier doit être au format Excel (.xlsx, .xls) ou CSV</li>
          <li>La première ligne doit contenir les en-têtes de colonnes</li>
          <li><strong>Colonnes requises :</strong></li>
          <li class="ml-4">- <strong>Dénomination Sociale</strong> OU <strong>Nom</strong> (ou les deux : <strong>Nom</strong> + <strong>Prénom</strong>)</li>
          <li class="ml-4">- <strong>Ville</strong></li>
          <li><strong>Colonnes optionnelles :</strong></li>
          <li class="ml-4">- <strong>Prénom</strong>, <strong>Adresse</strong>, <strong>Type</strong>, <strong>Catégorie</strong></li>
          <li class="ml-4">- <strong>Téléphone</strong>, <strong>Email</strong>, <strong>Site Web</strong>, <strong>Région</strong>, <strong>Description</strong></li>
          <li class="ml-4">- <strong>Langue de travail</strong>, <strong>Numéro Accréditation</strong>, <strong>Statut</strong></li>
        `;
      }
      
      instructions += `
        <li>La colonne "Type" est optionnelle. Si absente, le type sélectionné ci-dessus sera appliqué à tous les acteurs.</li>
        <li>Si la colonne "Type" existe dans le fichier, elle sera utilisée en priorité.</li>
        <li>Statuts possibles : active, inactive, pending, suspended</li>
      `;
      
      instructionsDiv.innerHTML = instructions;
    };
    
    if (typeSelect) {
      typeSelect.addEventListener('change', updateInstructions);
      updateInstructions();
    }
    
    // File input handler
    const fileInput = $('#excel-file-input');
    const fileDropzone = $('#excel-file-dropzone');
    const fileDisplay = $('#excel-file-display');
    const importBtn = $('#excel-import-btn');
    const messagesDiv = $('#excel-messages');
    
    const handleFileSelect = (file) => {
      if (!file) return;
      
      const validExtensions = ['.xlsx', '.xls', '.csv'];
      const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      
      if (!validExtensions.includes(fileExtension)) {
        messagesDiv.innerHTML = `
          <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-sm text-red-600">Format de fichier non supporté. Veuillez utiliser un fichier Excel (.xlsx, .xls) ou CSV.</p>
          </div>
        `;
        selectedFile = null;
        importBtn.disabled = true;
        return;
      }
      
      selectedFile = file;
      fileDisplay.innerHTML = `
        <div class="flex items-center justify-center gap-3">
          <i data-lucide="file-spreadsheet" class="w-8 h-8 text-green-500"></i>
          <div class="text-left">
            <p class="font-medium text-gray-900">${escapeHtml(file.name)}</p>
            <p class="text-sm text-gray-500">${(file.size / 1024).toFixed(2)} KB</p>
          </div>
        </div>
      `;
      importBtn.disabled = false;
      messagesDiv.innerHTML = '';
      initIcons();
    };
    
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        handleFileSelect(e.target.files?.[0]);
      });
    }
    
    if (fileDropzone) {
      fileDropzone.addEventListener('click', () => {
        fileInput?.click();
      });
      
      fileDropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileDropzone.classList.add('border-blue-500', 'bg-blue-50');
      });
      
      fileDropzone.addEventListener('dragleave', () => {
        fileDropzone.classList.remove('border-blue-500', 'bg-blue-50');
      });
      
      fileDropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        fileDropzone.classList.remove('border-blue-500', 'bg-blue-50');
        const file = e.dataTransfer.files[0];
        if (file) {
          handleFileSelect(file);
        }
      });
    }
    
    // Download template
    const downloadTemplateBtn = $('#download-template-btn');
    if (downloadTemplateBtn) {
      downloadTemplateBtn.addEventListener('click', () => {
        const type = typeSelect.value;
        let template = [];
        let filename = 'template_import_acteurs.csv';
        
        if (type === 'travel_agency') {
          template = [
            ['Dénomination Sociale', 'Ville', 'Adresse Agence', 'Type', 'Catégorie', 'Téléphone', 'Email', 'Site Web', 'Région', 'Description', 'Numéro Accréditation', 'Statut', 'Langue de travail'],
            ['AGENCE DE VOYAGES ALSUBHI', 'AGADIR', 'RUE DARAA N° 02 HAY AL QODS', 'travel_agency', 'standard', '+212 5 28 12 34 56', 'contact@alsubhi.ma', 'https://www.alsubhi.ma', 'Souss-Massa', 'Agence de voyages spécialisée', 'MATA-001', 'active', 'FR, AR'],
            ['KAOUTAR TOUR', 'AGADIR', '34 RUE DES ORANGERS', 'travel_agency', 'premium', '+212 5 28 98 76 54', 'info@kaoutartour.ma', 'https://www.kaoutartour.ma', 'Souss-Massa', 'Agence de voyages premium', 'MATA-002', 'active', 'FR, EN, AR'],
          ];
          filename = 'template_import_agences.csv';
        } else if (type === 'tour_guide') {
          template = [
            ['Nom', 'Prénom', 'Ville', 'Type', 'Catégorie', 'Téléphone', 'Email', 'Région', 'Description', 'Numéro Accréditation', 'Statut', 'Langue de travail'],
            ['AABIDI', 'Abdelhay', 'Azilal', 'tour_guide', 'Guide de Montagne', '+212 6 12 34 56 78', 'abdelhay@guide.ma', 'Béni Mellal-Khénifra', 'Guide touristique certifié', 'MATA-G-001', 'active', 'FR'],
            ['AACHA', 'Abdelhak', 'Marrakech', 'tour_guide', 'Guide du Tourisme', '+212 6 23 45 67 89', 'abdelhak@guide.ma', 'Marrakech-Safi', 'Guide professionnel', 'MATA-G-002', 'active', 'FR'],
          ];
          filename = 'template_import_guides.csv';
        } else {
          template = [
            ['Dénomination Sociale', 'Ville', 'Adresse Agence', 'Type', 'Catégorie', 'Téléphone', 'Email', 'Site Web', 'Région', 'Description', 'Numéro Accréditation', 'Statut', 'Langue de travail'],
            ['EXEMPLE ENTREPRISE', 'CASABLANCA', '123 RUE PRINCIPALE', type, 'standard', '+212 5 22 12 34 56', 'contact@exemple.ma', 'https://www.exemple.ma', 'Casablanca-Settat', 'Description de l\'entreprise', 'MATA-001', 'active', 'FR, AR'],
          ];
          filename = 'template_import_acteurs.csv';
        }
        
        const csvContent = template.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
    
    // Import handler
    if (importBtn) {
      importBtn.addEventListener('click', async () => {
        if (!selectedFile) {
          messagesDiv.innerHTML = `
            <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p class="text-sm text-red-600">Veuillez sélectionner un fichier</p>
            </div>
          `;
          return;
        }
        
        importBtn.disabled = true;
        importBtn.innerHTML = '<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> <span>Import en cours...</span>';
        messagesDiv.innerHTML = '';
        
        try {
          const formData = new FormData();
          formData.append('file', selectedFile);
          formData.append('default_type', typeSelect.value);
          
          const response = await apiCall('/tourism-actors/import', {
            method: 'POST',
            body: formData
          });
          
          let resultHtml = `
            <div class="p-4 bg-green-50 border border-green-200 rounded-lg mb-4">
              <p class="text-sm text-green-600 font-medium mb-2">Succès</p>
              <p class="text-sm text-green-600">${escapeHtml(response.message || 'Import réussi')}</p>
            </div>
          `;
          
          if (response.result) {
            const skipped = response.result.skipped || 0;
            resultHtml += `
              <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 class="font-semibold text-gray-900 mb-2">Résultats de l'import :</h4>
                <div class="space-y-2 text-sm">
                  <p class="text-gray-700">
                    <span class="font-medium">Total :</span> ${response.result.total} ligne(s) traitée(s)
                  </p>
                  <div class="grid grid-cols-2 gap-4 mt-3">
                    <div class="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p class="text-green-700 font-semibold text-lg">${response.result.success}</p>
                      <p class="text-green-600 text-xs">Nouveaux acteurs ajoutés</p>
                    </div>
                    <div class="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p class="text-blue-700 font-semibold text-lg">${skipped}</p>
                      <p class="text-blue-600 text-xs">Acteurs déjà existants (mis à jour)</p>
                    </div>
                  </div>
                  ${response.result.errors && response.result.errors.length > 0 ? `
                    <div class="mt-4 pt-4 border-t border-gray-300">
                      <p class="font-medium text-red-600 mb-1">
                        Erreurs (${response.result.errors.length}) :
                      </p>
                      <ul class="list-disc list-inside text-red-600 space-y-1 max-h-40 overflow-y-auto">
                        ${response.result.errors.slice(0, 10).map(err => `<li class="text-xs">${escapeHtml(err)}</li>`).join('')}
                        ${response.result.errors.length > 10 ? `<li class="text-xs italic">... et ${response.result.errors.length - 10} autre(s) erreur(s)</li>` : ''}
                      </ul>
                    </div>
                  ` : ''}
                </div>
              </div>
            `;
          }
          
          messagesDiv.innerHTML = resultHtml;
          
          // Reload actors after successful import
          setTimeout(() => {
            location.reload();
          }, 2000);
          
        } catch (error) {
          let errorMessage = 'Erreur lors de l\'import du fichier';
          
          if (error.message) {
            errorMessage = error.message;
          }
          
          let errorHtml = `
            <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p class="text-sm text-red-600 font-medium mb-2">Erreur</p>
              <div class="text-sm text-red-600 whitespace-pre-line">${escapeHtml(errorMessage)}</div>
            </div>
          `;
          
          messagesDiv.innerHTML = errorHtml;
          importBtn.disabled = false;
          importBtn.innerHTML = '<i data-lucide="upload" class="w-4 h-4"></i> <span>Importer</span>';
          initIcons();
        }
      });
    }
  };
  
  // ==================== USER MODAL ====================
  const showUserModal = (user = null) => {
    const isEdit = user !== null;
    const content = `
      <form id="user-form" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
            <input type="text" name="name" required value="${user ? escapeHtml(user.name || '') : ''}" 
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input type="email" name="email" required value="${user ? escapeHtml(user.email || '') : ''}" 
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Rôle *</label>
            <select name="role" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900">
              <option value="">Sélectionner...</option>
              <option value="admin" ${user?.role === 'admin' ? 'selected' : ''}>Administrateur</option>
              <option value="actor" ${user?.role === 'actor' ? 'selected' : ''}>Acteur</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Mot de passe ${isEdit ? '(laisser vide pour ne pas changer)' : '*'}</label>
            <input type="password" name="password" ${isEdit ? '' : 'required'} 
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900" />
          </div>
        </div>
        <div class="flex justify-end gap-3 pt-4 border-t">
          <button type="button" onclick="closeModal()" class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            Annuler
          </button>
          <button type="submit" class="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors">
            ${isEdit ? 'Mettre à jour' : 'Créer'}
          </button>
        </div>
      </form>
    `;
    
    showModal(isEdit ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur', content, () => {
      // Reload users after modal close
      const usersContainer = $('#users-table-container');
      if (usersContainer) {
        setTimeout(() => location.reload(), 100);
      }
    });
    
    const form = $('#user-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Remove password if empty in edit mode
        if (isEdit && !data.password) {
          delete data.password;
        }
        
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enregistrement...';
        
        try {
          if (isEdit) {
            await apiCall(`/users/${user.id}`, {
              method: 'PUT',
              body: JSON.stringify(data)
            });
          } else {
            const res = await apiCall('/users', {
              method: 'POST',
              body: JSON.stringify(data)
            });
            if (res.generated_password) {
              alert(`Utilisateur créé avec succès!\nMot de passe généré: ${res.generated_password}\n\nVeuillez le noter, il ne sera plus affiché.`);
            }
          }
          closeModal();
          // Reload users
          const usersContainer = $('#users-table-container');
          if (usersContainer) {
            location.reload();
          }
        } catch (error) {
          alert('Erreur: ' + error.message);
        } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = isEdit ? 'Mettre à jour' : 'Créer';
        }
      });
    }
  };
  
  // Détecter la page et initialiser
  const init = () => {
    if (!checkAuth()) return;
    
    initLogout();
    initIcons();
    
    // Détecter quelle page charger - ordre important (plus spécifique en premier)
    if ($('#actors-table-container')) {
      initActors();
    } else if ($('#news-table-container')) {
      initNews();
    } else if ($('#events-table-container')) {
      initEvents();
    } else if ($('#users-table-container')) {
      initUsers();
    } else if ($('#accreditations-table-container')) {
      initAccreditations();
    } else if ($('#associations-container')) {
      initAssociations();
    } else if ($('#pending-container')) {
      initPending();
    } else if ($('#suspended-container')) {
      initSuspended();
    } else if ($('#stats-container')) {
      initStats();
    } else if ($('#dashboard-stats')) {
      initDashboard();
    }
  };
  
  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
