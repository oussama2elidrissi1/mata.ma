(() => {
  const $ = (sel, root = document) => root.querySelector(sel);

  // Fonction de traduction (utilise i18n si disponible)
  const t = (key, fallback = null) => {
    if (window.i18n && typeof window.i18n.t === 'function') {
      return window.i18n.t(key, fallback);
    }
    return fallback || key;
  };

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

  const formatDateFr = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  };

  const getMonthNameFr = (dateString) => {
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return "";
    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    return monthNames[d.getMonth()] ?? "";
  };

  async function fetchJson(url) {
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    const payload = await res.json().catch(() => null);
    if (!res.ok) throw new Error((payload && payload.message) || `Erreur HTTP ${res.status}`);
    if (!payload || payload.success === false) throw new Error((payload && payload.message) || "Erreur API");
    return payload;
  }

  // ----------------------
  // News
  // ----------------------
  async function initNewsList() {
    const root = $("#news-list");
    if (!root) return;
    const endpoint = root.dataset.endpoint || "/api/news?status=published&per_page=50&sort_by=published_at&sort_direction=desc";

    try {
      const payload = await fetchJson(endpoint);
      const items = Array.isArray(payload.data) ? payload.data : [];

      if (items.length === 0) {
        root.innerHTML = `<div class="text-center text-slate-600">Aucun article disponible.</div>`;
        return;
      }

      const featured = items[0];
      const others = items.slice(1);

      const featuredHtml = `
        <div class="mb-12">
          <a href="/news/${encodeURIComponent(featured.id)}" class="block group">
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div class="grid grid-cols-1 lg:grid-cols-2">
                <div class="relative h-96 lg:h-auto overflow-hidden">
                  <img
                    src="${escapeHtml(featured.image)}"
                    alt="${escapeHtml(featured.title)}"
                    class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    onerror="this.src='https://images.unsplash.com/photo-1504711434969-e33886180f91?w=800&h=400&fit=crop'"
                  />
                  <div class="absolute top-4 left-4">
                    <span class="px-3 py-1 bg-amber-500 text-white text-xs font-medium rounded-full">
                      ${escapeHtml(featured.category || "Actualité")}
                    </span>
                  </div>
                </div>
                <div class="p-8 lg:p-12 flex flex-col justify-center">
                  <div class="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <div class="flex items-center space-x-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                      <span>${escapeHtml(formatDateFr(featured.published_at || featured.created_at))}</span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                      <span>${escapeHtml(featured.author || "MATA")}</span>
                    </div>
                  </div>
                  <h2 class="text-3xl font-serif font-bold mb-4 group-hover:text-primary transition-colors duration-300" style="color: #333333;">
                    ${escapeHtml(featured.title)}
                  </h2>
                  <p class="text-gray-600 mb-6 line-clamp-3">
                    ${escapeHtml(featured.excerpt || "")}
                  </p>
                  <div class="flex items-center space-x-2 text-primary font-medium group-hover:text-primary/80 transition-colors duration-300" style="color: #CC0000;">
                    <span>Lire la suite</span>
                    <svg class="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      `;

      const cards = others.map((a) => `
        <a href="/news/${encodeURIComponent(a.id)}" class="block group">
          <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
            <div class="relative h-48 overflow-hidden bg-gray-200">
              ${a.image ? `
                <img
                  src="${escapeHtml(a.image)}"
                  alt="${escapeHtml(a.title)}"
                  class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  onerror="this.src='https://images.unsplash.com/photo-1504711434969-e33886180f91?w=800&h=400&fit=crop'"
                />
              ` : `
                <div class="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <span class="text-gray-500 text-xs">Image non disponible</span>
                </div>
              `}
              <div class="absolute top-4 left-4">
                <span class="px-3 py-1 bg-primary text-white text-xs font-medium rounded-full" style="background-color: #CC0000;">
                  ${escapeHtml(a.category || "Actualité")}
                </span>
              </div>
            </div>
            <div class="p-6 flex-grow flex flex-col">
              <div class="flex items-center space-x-4 text-xs text-gray-600 mb-3">
                <div class="flex items-center space-x-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  <span>${escapeHtml(formatDateFr(a.published_at || a.created_at))}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                  <span>${escapeHtml(a.author || "MATA")}</span>
                </div>
              </div>
              <h3 class="text-xl font-serif font-bold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2" style="color: #333333;">
                ${escapeHtml(a.title)}
              </h3>
              <p class="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
                ${escapeHtml(a.excerpt || "")}
              </p>
              <div class="flex items-center space-x-2 text-primary font-medium text-sm group-hover:text-primary/80 transition-colors duration-300" style="color: #CC0000;">
                <span>Lire la suite</span>
                <svg class="w-3 h-3 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </div>
            </div>
          </div>
        </a>
      `).join("");

      root.innerHTML = featuredHtml + `
        ${others.length > 0 ? `
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${cards}
          </div>
        ` : ""}
        ${items.length === 0 ? `
          <div class="text-center py-12">
            <p class="text-gray-600 text-lg">Aucun article disponible pour le moment</p>
          </div>
        ` : ""}
      `;
    } catch (e) {
      root.innerHTML = `<div class="text-center text-red-600">Erreur: ${escapeHtml(e.message || "chargement impossible")}</div>`;
    }
  }

  async function initNewsDetail() {
    const root = $("#news-detail");
    if (!root) return;
    const id = root.dataset.id;
    if (!id) return;

    try {
      const payload = await fetchJson(`/api/news/${encodeURIComponent(id)}`);
      const a = payload.data;

      const paragraphs = String(a.content || "")
        .split("\n")
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p) => `<p class="text-base leading-7 text-slate-700 mb-4">${escapeHtml(p)}</p>`)
        .join("");

      root.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <article class="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
              <!-- Hero Image -->
              <div class="relative h-72 md:h-96 bg-gray-200 overflow-hidden">
                ${a.image ? `
                  <img
                    src="${escapeHtml(a.image)}"
                    alt="${escapeHtml(a.title)}"
                    class="w-full h-full object-cover"
                    onerror="this.src='https://images.unsplash.com/photo-1504711434969-e33886180f91?w=800&h=400&fit=crop'"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                ` : `
                  <div class="w-full h-full bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center">
                    <svg class="w-24 h-24 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                    </svg>
                  </div>
                `}
                ${a.featured ? `
                  <div class="absolute top-4 right-4 px-3 py-1 bg-yellow-500 text-white rounded-full text-xs font-semibold flex items-center gap-1">
                    <svg class="w-4 h-4 fill-current" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    À la une
                  </div>
                ` : ""}
                <div class="absolute bottom-8 left-8 right-8">
                  <span class="px-3 py-1 bg-amber-500 text-white text-xs font-medium rounded-full mb-4 inline-block">
                    ${escapeHtml(a.category || "Actualité")}
                  </span>
                  <h1 class="text-4xl font-serif font-bold text-white drop-shadow-lg">
                    ${escapeHtml(a.title)}
                  </h1>
                </div>
              </div>

              <!-- Content -->
              <div class="p-8 lg:p-12">
                <div class="flex items-center justify-between mb-8 pb-8 border-b border-gray-200">
                  <div class="flex items-center space-x-6 text-sm text-gray-600">
                    <div class="flex items-center space-x-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                      <span>${escapeHtml(formatDateFr(a.published_at || a.created_at))}</span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                      <span>${escapeHtml(a.author || "MATA")}</span>
                    </div>
                  </div>
                  <button
                    onclick="shareNews()"
                    class="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-300"
                    style="color: #CC0000;"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
                    <span class="text-sm">Partager</span>
                  </button>
                </div>

                <div class="prose max-w-none">
                  <p class="text-xl text-gray-700 leading-relaxed mb-8">
                    ${escapeHtml(a.excerpt || "")}
                  </p>
                  <div class="text-gray-700 leading-relaxed space-y-4">
                    ${paragraphs}
                  </div>
                </div>
              </div>
            </article>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Author Card -->
            <div class="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
              <h3 class="text-lg font-bold mb-4" style="color: #333333;">Auteur</h3>
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                </div>
                <div>
                  <div class="font-semibold text-slate-900">${escapeHtml(a.author || "MATA")}</div>
                  <div class="text-sm text-slate-600">Équipe MATA</div>
                </div>
              </div>
            </div>

            <!-- Share Card -->
            <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-lg border border-red-200 p-6">
              <h3 class="text-lg font-bold mb-3" style="color: #CC0000;">Partager l'article</h3>
              <p class="text-sm text-gray-700 mb-4">Partagez cet article avec vos proches</p>
              <button onclick="shareNews()" class="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold">
                Partager
              </button>
            </div>
          </div>
        </div>
      `;

      // Share function
      window.shareNews = async () => {
        try {
          const url = window.location.href;
          if (navigator.share) {
            await navigator.share({ title: a.title, text: a.excerpt, url });
          } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(url);
            alert("Lien copié dans le presse-papiers");
          } else {
            prompt("Copiez ce lien :", url);
          }
        } catch (_) {}
      };
    } catch (e) {
      root.innerHTML = `
        <div class="bg-white rounded-xl border border-slate-200 p-8 text-center">
          <div class="text-2xl font-serif font-bold mb-3">Article introuvable</div>
          <p class="text-slate-600 mb-4">L'article que vous recherchez n'existe pas ou a été supprimé.</p>
          <a href="/news" class="inline-block px-5 py-3 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors">Retour aux actualités</a>
        </div>
      `;
    }
  }

  async function initNewsRelated() {
    const root = $("#news-related");
    if (!root) return;
    const excludeId = root.dataset.excludeId;

    try {
      const payload = await fetchJson(`/api/news?status=published&per_page=6&sort_by=published_at&sort_direction=desc`);
      const items = (Array.isArray(payload.data) ? payload.data : []).filter((x) => String(x.id) !== String(excludeId)).slice(0, 3);

      if (items.length === 0) {
        root.innerHTML = `<div class="text-slate-600">Aucun article connexe disponible.</div>`;
        return;
      }

      root.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${items.map((a) => `
            <a href="/news/${encodeURIComponent(a.id)}" class="block group">
              <div class="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div class="relative h-44 bg-gradient-to-br from-red-600 to-amber-600 overflow-hidden">
                  ${a.image ? `
                    <img src="${escapeHtml(a.image)}" alt="${escapeHtml(a.title)}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                         onerror="this.src='https://images.unsplash.com/photo-1504711434969-e33886180f91?w=800&h=400&fit=crop'" />
                  ` : `
                    <div class="w-full h-full flex items-center justify-center">
                      <svg class="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                      </svg>
                    </div>
                  `}
                  ${a.featured ? `
                    <div class="absolute top-3 right-3">
                      <span class="px-2 py-1 rounded-full text-xs font-semibold text-white bg-yellow-500">À la une</span>
                    </div>
                  ` : ""}
                </div>
                <div class="p-5">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                      ${escapeHtml(a.category || "Actualité")}
                    </span>
                  </div>
                  <h3 class="font-semibold text-lg mb-2 line-clamp-2" style="color: #333333;">${escapeHtml(a.title)}</h3>
                  <p class="text-sm text-gray-600 mb-3 line-clamp-2">${escapeHtml(a.excerpt || "")}</p>
                  <div class="flex items-center gap-2 text-xs text-gray-500">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    <span>${formatDateFr(a.published_at || a.created_at)}</span>
                  </div>
                  <div class="mt-3 text-sm font-medium text-red-600 group-hover:text-red-800">Lire la suite →</div>
                </div>
              </div>
            </a>
          `).join("")}
        </div>
      `;
    } catch (e) {
      root.innerHTML = `<div class="text-slate-600">Impossible de charger les articles connexes.</div>`;
    }
  }

  // ----------------------
  // Events
  // ----------------------
  async function initEventsList() {
    const root = $("#events-list");
    if (!root) return;

    const categoryEl = $("#events-category");
    const monthEl = $("#events-month");
    let currentCategory = "Tous";

    // Listen for category changes from buttons
    window.addEventListener("categoryChange", (e) => {
      currentCategory = e.detail.category;
      load();
    });

    const load = async () => {
      root.innerHTML = `<div class="text-center py-12"><p class="text-gray-600 text-lg">Chargement des événements...</p></div>`;
      const category = currentCategory || (categoryEl ? categoryEl.value : "Tous");
      const month = monthEl ? monthEl.value : "Tous";

      const params = new URLSearchParams();
      params.set("status", "published");
      params.set("upcoming", "true");
      params.set("per_page", "50");
      params.set("sort_by", "event_date");
      params.set("sort_direction", "asc");
      if (category && category !== "Tous") params.set("category", category);

      try {
        const payload = await fetchJson(`/api/events?${params.toString()}`);
        let items = Array.isArray(payload.data) ? payload.data : [];
        if (month && month !== "Tous") {
          items = items.filter((ev) => getMonthNameFr(ev.event_date) === month);
        }

        if (items.length === 0) {
          root.innerHTML = `<div class="text-center text-slate-600">Aucun événement trouvé.</div>`;
          return;
        }

        const formatEventDate = (dateString) => {
          const date = new Date(dateString);
          const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
          return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
        };

        const formatEventTime = (ev) => {
          if (ev.start_time && ev.end_time) {
            return `${ev.start_time} - ${ev.end_time}`;
          }
          if (ev.start_time) {
            return ev.start_time;
          }
          return null;
        };

        root.innerHTML = `
          <div class="mb-6 flex items-center justify-between">
            <p class="text-gray-600">
              <span class="font-semibold text-gray-900">${items.length}</span> événements à venir
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            ${items.map((ev) => `
              <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div class="relative w-full h-48">
                  <img
                    src="${escapeHtml(ev.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop')}"
                    alt="${escapeHtml(ev.title)}"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="p-6">
                  <div class="flex items-center space-x-2 mb-3">
                    <span class="px-3 py-1 bg-primary bg-opacity-10 text-primary text-xs font-medium rounded-full" style="background-color: rgba(204, 0, 0, 0.1); color: #CC0000;">
                      ${escapeHtml(ev.category || "Autre")}
                    </span>
                    ${ev.featured ? `
                      <span class="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                        À la une
                      </span>
                    ` : ""}
                  </div>
                  <h3 class="font-serif font-semibold text-xl mb-2">${escapeHtml(ev.title)}</h3>
                  <p class="text-gray-600 text-sm mb-4 line-clamp-2">${escapeHtml(ev.description || "")}</p>
                  
                  <div class="space-y-2 text-sm text-gray-600">
                    <div class="flex items-center space-x-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                      <span>${formatEventDate(ev.event_date)}</span>
                    </div>
                    ${formatEventTime(ev) ? `
                      <div class="flex items-center space-x-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        <span>${formatEventTime(ev)}</span>
                      </div>
                    ` : ""}
                    <div class="flex items-center space-x-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                      <span>${escapeHtml(ev.location || "")}</span>
                    </div>
                    ${ev.participants > 0 ? `
                      <div class="flex items-center space-x-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                        <span>${ev.participants} participants</span>
                      </div>
                    ` : ""}
                  </div>

                  <a href="/events/${encodeURIComponent(ev.id)}" class="block w-full mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-md hover:shadow-lg text-center" style="background-color: #CC0000;">
                    S'inscrire
                  </a>
                </div>
              </div>
            `).join("")}
          </div>
          ${items.length === 0 ? `
            <div class="text-center py-12">
              <p class="text-gray-600 text-lg">Aucun événement trouvé pour ces critères</p>
            </div>
          ` : ""}
        `;
      } catch (e) {
        root.innerHTML = `<div class="text-center text-red-600">Erreur: ${escapeHtml(e.message || "chargement impossible")}</div>`;
      }
    };

    if (categoryEl) categoryEl.addEventListener("change", load);
    if (monthEl) monthEl.addEventListener("change", load);
    await load();
  }

  async function initEventDetail() {
    const root = $("#event-detail");
    if (!root) return;
    const id = root.dataset.id;
    if (!id) return;

    try {
      const payload = await fetchJson(`/api/events/${encodeURIComponent(id)}`);
      const ev = payload.data;

      const formatEventDate = (dateString) => {
        const date = new Date(dateString);
        const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
      };

      const formatTime = (timeString) => {
        if (!timeString) return '';
        return timeString.substring(0, 5);
      };

      root.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <article class="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
              <!-- Hero Image -->
              <div class="relative h-72 md:h-96 bg-slate-200 overflow-hidden">
                ${ev.image ? `
                  <img src="${escapeHtml(ev.image)}" alt="${escapeHtml(ev.title)}" class="w-full h-full object-cover" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                ` : `
                  <div class="w-full h-full bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center">
                    <svg class="w-24 h-24 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
                `}
                ${ev.featured ? `
                  <div class="absolute top-4 right-4 px-3 py-1 bg-yellow-500 text-white rounded-full text-xs font-semibold flex items-center gap-1">
                    <svg class="w-4 h-4 fill-current" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    À la une
                  </div>
                ` : ""}
                <div class="absolute bottom-8 left-8 right-8">
                  <span class="px-3 py-1 bg-amber-500 text-white text-xs font-medium rounded-full mb-4 inline-block">
                    ${escapeHtml(ev.category || "Événement")}
                  </span>
                  <h1 class="text-4xl font-serif font-bold text-white drop-shadow-lg">
                    ${escapeHtml(ev.title)}
                  </h1>
                </div>
              </div>

              <!-- Content -->
              <div class="p-6 md:p-10">
                <div class="flex items-center justify-between mb-8 pb-8 border-b border-gray-200">
                  <div class="flex items-center space-x-6 text-sm text-gray-600">
                    <div class="flex items-center space-x-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                      <span class="font-medium">${formatEventDate(ev.event_date)}</span>
                    </div>
                    ${ev.start_time ? `
                      <div class="flex items-center space-x-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        <span>${formatTime(ev.start_time)}${ev.end_time ? ` - ${formatTime(ev.end_time)}` : ''}</span>
                      </div>
                    ` : ""}
                    ${ev.location ? `
                      <div class="flex items-center space-x-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        <span>${escapeHtml(ev.location)}</span>
                      </div>
                    ` : ""}
                    ${ev.participants > 0 ? `
                      <div class="flex items-center space-x-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                        <span>${ev.participants} participants</span>
                      </div>
                    ` : ""}
                  </div>
                  <button onclick="shareEvent()" class="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors" style="color: #CC0000;">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
                    <span class="text-sm">Partager</span>
                  </button>
                </div>

                <div class="prose max-w-none">
                  <div class="text-xl text-gray-700 leading-relaxed mb-8">
                    ${escapeHtml(ev.description || "")}
                  </div>
                </div>
              </div>
            </article>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Quick Info Card -->
            <div class="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
              <h3 class="text-lg font-bold mb-4" style="color: #333333;">Informations</h3>
              <div class="space-y-4">
                <div>
                  <div class="text-sm text-slate-500 mb-1">Date</div>
                  <div class="font-medium text-slate-900">${formatEventDate(ev.event_date)}</div>
                </div>
                ${ev.start_time ? `
                  <div>
                    <div class="text-sm text-slate-500 mb-1">Heure</div>
                    <div class="font-medium text-slate-900">${formatTime(ev.start_time)}${ev.end_time ? ` - ${formatTime(ev.end_time)}` : ''}</div>
                  </div>
                ` : ""}
                ${ev.location ? `
                  <div>
                    <div class="text-sm text-slate-500 mb-1">Lieu</div>
                    <div class="font-medium text-slate-900">${escapeHtml(ev.location)}</div>
                  </div>
                ` : ""}
                ${ev.participants > 0 ? `
                  <div>
                    <div class="text-sm text-slate-500 mb-1">Participants</div>
                    <div class="font-medium text-slate-900">${ev.participants} personnes</div>
                  </div>
                ` : ""}
              </div>
            </div>

            <!-- Action Card -->
            <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-lg border border-red-200 p-6 text-center">
              <h3 class="text-lg font-bold mb-3" style="color: #CC0000;">Participer à l'événement</h3>
              <p class="text-sm text-gray-700 mb-4">Rejoignez-nous pour cet événement exceptionnel</p>
              <button onclick="registerEvent(${ev.id})" class="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold shadow-md">
                S'inscrire
              </button>
            </div>
          </div>
        </div>
      `;

      // Share function
      window.shareEvent = async () => {
        try {
          const url = window.location.href;
          const title = ev.title;
          if (navigator.share) {
            await navigator.share({ title, text: ev.description || '', url });
          } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(url);
            alert("Lien copié dans le presse-papiers");
          } else {
            prompt("Copiez ce lien :", url);
          }
        } catch (_) {}
      };

      window.registerEvent = (id) => {
        alert('Inscription à l\'événement #' + id + ' - Fonctionnalité à venir');
      };

      // Load related events
      loadRelatedEvents(id, ev.category);
    } catch (e) {
      root.innerHTML = `
        <div class="bg-white rounded-xl border border-slate-200 p-8 text-center">
          <div class="text-2xl font-serif font-bold mb-3">Événement introuvable</div>
          <p class="text-slate-600 mb-4">L'événement que vous recherchez n'existe pas ou a été supprimé.</p>
          <a href="/events" class="inline-block px-5 py-3 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors">Retour aux événements</a>
        </div>
      `;
    }
  }

  async function loadRelatedEvents(excludeId, category) {
    const root = $("#related-events");
    if (!root) return;

    try {
      const params = new URLSearchParams();
      params.append("status", "published");
      params.append("upcoming", "true");
      params.append("per_page", "6");
      if (category) params.append("category", category);

      const payload = await fetchJson(`/api/events?${params.toString()}`);
      const allEvents = Array.isArray(payload.data) ? payload.data : [];
      const related = allEvents.filter(e => String(e.id) !== String(excludeId)).slice(0, 3);

      if (related.length === 0) {
        root.innerHTML = `<div class="text-slate-600">Aucun événement similaire disponible.</div>`;
        return;
      }

      const formatEventDate = (dateString) => {
        const date = new Date(dateString);
        const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
        return `${date.getDate()} ${months[date.getMonth()]}`;
      };

      root.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${related.map((event) => `
            <a href="/events/${encodeURIComponent(event.id)}" class="block group">
              <div class="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div class="relative h-44 bg-gradient-to-br from-red-600 to-amber-600 overflow-hidden">
                  ${event.image ? `
                    <img src="${escapeHtml(event.image)}" alt="${escapeHtml(event.title)}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  ` : `
                    <div class="w-full h-full flex items-center justify-center">
                      <svg class="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                    </div>
                  `}
                  ${event.featured ? `
                    <div class="absolute top-3 right-3">
                      <span class="px-2 py-1 rounded-full text-xs font-semibold text-white bg-yellow-500">À la une</span>
                    </div>
                  ` : ""}
                </div>
                <div class="p-5">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                      ${escapeHtml(event.category || "Événement")}
                    </span>
                  </div>
                  <h3 class="font-semibold text-lg mb-2 line-clamp-2" style="color: #333333;">${escapeHtml(event.title)}</h3>
                  <p class="text-sm text-gray-600 mb-3 line-clamp-2">${escapeHtml(event.description?.substring(0, 100) || "")}...</p>
                  <div class="flex items-center gap-2 text-sm text-gray-500">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    <span>${formatEventDate(event.event_date)}</span>
                  </div>
                  <div class="mt-3 text-sm font-medium text-red-600 group-hover:text-red-800">En savoir plus →</div>
                </div>
              </div>
            </a>
          `).join("")}
        </div>
      `;
    } catch (e) {
      root.innerHTML = `<div class="text-slate-600">Impossible de charger les événements similaires.</div>`;
    }
  }

  // ----------------------
  // Actors
  // ----------------------
  function getUrlState() {
    const params = new URLSearchParams(window.location.search);
    return {
      search: params.get("search") || "",
      type: params.get("type") || "",
      accredited: params.get("accredited") === "true",
      page: Math.max(1, parseInt(params.get("page") || "1", 10) || 1),
      perPage: [12, 24, 48].includes(parseInt(params.get("per_page") || "12", 10)) ? parseInt(params.get("per_page") || "12", 10) : 12,
    };
  }

  function setUrlState(next) {
    const params = new URLSearchParams();
    if (next.search) params.set("search", next.search);
    if (next.type) params.set("type", next.type);
    if (next.accredited) params.set("accredited", "true");
    if (next.perPage) params.set("per_page", String(next.perPage));
    if (next.page && next.page !== 1) params.set("page", String(next.page));
    const qs = params.toString();
    const url = `/actors${qs ? `?${qs}` : ""}`;
    window.history.pushState({}, "", url);
  }

  function renderActorsPagination(container, pagination, onPage) {
    if (!container) return;
    if (!pagination || pagination.last_page <= 1) {
      container.innerHTML = "";
      return;
    }
    const cur = pagination.current_page;
    const last = pagination.last_page;

    const btn = (label, page, disabled = false) => `
      <button ${disabled ? "disabled" : ""} data-page="${page}"
        class="px-3 py-2 text-sm rounded-lg border border-slate-300 ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-50"}">
        ${label}
      </button>
    `;

    let pages = [];
    const add = (p) => pages.push(p);
    if (last <= 7) {
      for (let i = 1; i <= last; i++) add(i);
    } else if (cur <= 3) {
      add(1); add(2); add(3); add(4); add(5); pages.push("..."); add(last);
    } else if (cur >= last - 2) {
      add(1); pages.push("..."); for (let i = last - 4; i <= last; i++) add(i);
    } else {
      add(1); pages.push("..."); add(cur - 1); add(cur); add(cur + 1); pages.push("..."); add(last);
    }

    container.innerHTML = `
      <div class="flex items-center justify-center gap-2">
        ${btn("←", cur - 1, cur === 1)}
        ${pages.map((p) => p === "..."
          ? `<span class="px-2 text-slate-500">…</span>`
          : `<button data-page="${p}" class="px-3 py-2 text-sm rounded-lg ${p === cur ? "bg-slate-900 text-white" : "border border-slate-300 hover:bg-slate-50"}">${p}</button>`
        ).join("")}
        ${btn("→", cur + 1, cur === last)}
      </div>
    `;

    container.querySelectorAll("button[data-page]").forEach((b) => {
      b.addEventListener("click", () => {
        const p = parseInt(b.getAttribute("data-page"), 10);
        if (!Number.isFinite(p)) return;
        onPage(p);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  async function initActorsList() {
    const listEl = $("#actors-list");
    if (!listEl) return;

    const form = $("#actors-filters");
    const searchEl = $("#actors-search");
    const typeEl = $("#actors-type");
    const accreditedEl = $("#actors-accredited");
    const perPageEl = $("#actors-per-page");
    const countEl = $("#actors-count");
    const paginationEl = $("#actors-pagination");

    const syncControlsFromUrl = () => {
      const state = getUrlState();
      if (searchEl) searchEl.value = state.search;
      if (typeEl) typeEl.value = state.type;
      if (accreditedEl) accreditedEl.checked = state.accredited;
      if (perPageEl) perPageEl.value = String(state.perPage);
      return state;
    };

    const load = async (state) => {
      listEl.innerHTML = `<div class="text-center text-slate-600">Chargement…</div>`;
      if (countEl) countEl.textContent = "—";

      const params = new URLSearchParams();
      if (state.search) params.set("search", state.search);
      if (state.type) params.set("type", state.type);
      if (state.accredited) params.set("accredited", "true");
      params.set("per_page", String(state.perPage));
      params.set("page", String(state.page));

      try {
        const payload = await fetchJson(`/api/tourism-actors?${params.toString()}`);
        const items = Array.isArray(payload.data) ? payload.data : [];
        const pg = payload.pagination || { current_page: state.page, last_page: 1, per_page: state.perPage, total: items.length };

        if (countEl) {
          const start = (pg.current_page - 1) * pg.per_page + (pg.total > 0 ? 1 : 0);
          const end = Math.min(pg.current_page * pg.per_page, pg.total);
          countEl.textContent = pg.total > 0 ? `Affichage ${start}-${end} sur ${pg.total}` : "0 résultat";
        }

        if (items.length === 0) {
          listEl.innerHTML = `<div class="text-center text-slate-600 bg-white rounded-xl border border-slate-200 p-10">Aucun résultat.</div>`;
          renderActorsPagination(paginationEl, pg, () => {});
          return;
        }

        listEl.innerHTML = `
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${items.map((a) => {
              const badge = a.accreditation_number ? "Accrédité" : "Standard";
              const badgeClass = a.accreditation_number ? "bg-amber-500" : "bg-red-600";
              return `
                <a href="/actors/${encodeURIComponent(a.id)}" class="block group">
                  <div class="bg-white rounded-xl shadow border border-slate-100 overflow-hidden hover:shadow-lg transition">
                    <div class="h-44 bg-slate-200 overflow-hidden relative">
                      ${a.logo ? `<img src="${escapeHtml(a.logo)}" alt="${escapeHtml(a.name)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />` : `<div class="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900"></div>`}
                      <div class="absolute top-3 right-3">
                        <span class="px-2 py-1 rounded-full text-xs font-semibold text-white ${badgeClass}">${badge}</span>
                      </div>
                    </div>
                    <div class="p-5">
                      <div class="text-lg font-bold">${escapeHtml(a.name)}</div>
                      ${a.name_ar ? `<div class="text-sm text-slate-600 mt-1">${escapeHtml(a.name_ar)}</div>` : ""}
                      <div class="text-sm text-slate-600 mt-2">${escapeHtml(a.city || "")}${a.region ? `, ${escapeHtml(a.region)}` : ""}</div>
                      ${a.description ? `<div class="text-sm text-slate-600 mt-2 line-clamp-2">${escapeHtml(a.description)}</div>` : ""}
                      <div class="mt-4 text-sm font-medium text-slate-900">Voir le profil →</div>
                    </div>
                  </div>
                </a>
              `;
            }).join("")}
          </div>
        `;

        renderActorsPagination(paginationEl, pg, (page) => {
          const next = { ...state, page };
          setUrlState(next);
          syncControlsFromUrl();
          load(next);
        });
      } catch (e) {
        listEl.innerHTML = `<div class="text-center text-red-600">Erreur: ${escapeHtml(e.message || "chargement impossible")}</div>`;
      }
    };

    let state = syncControlsFromUrl();
    await load(state);

    window.addEventListener("popstate", async () => {
      state = syncControlsFromUrl();
      await load(state);
    });

    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const next = {
          search: (searchEl && searchEl.value || "").trim(),
          type: (typeEl && typeEl.value) || "",
          accredited: !!(accreditedEl && accreditedEl.checked),
          perPage: perPageEl ? parseInt(perPageEl.value, 10) || 12 : state.perPage,
          page: 1,
        };
        setUrlState(next);
        state = syncControlsFromUrl();
        await load(state);
      });
    }

    if (perPageEl) {
      perPageEl.addEventListener("change", async () => {
        const next = { ...getUrlState(), perPage: parseInt(perPageEl.value, 10) || 12, page: 1 };
        setUrlState(next);
        state = syncControlsFromUrl();
        await load(state);
      });
    }
  }

  async function initActorDetail() {
    const root = $("#actor-detail");
    if (!root) return;
    const id = root.dataset.id;
    if (!id) return;

    try {
      const payload = await fetchJson(`/api/tourism-actors/${encodeURIComponent(id)}`);
      const a = payload.data;

      const typeLabels = {
        hotel: 'Hôtel',
        restaurant: 'Restaurant',
        travel_agency: 'Agence de Voyage',
        tour_guide: 'Guide Touristique',
        transport: 'Transport',
        attraction: 'Attraction',
        other: 'Autre',
      };

      const chips = (arr) => Array.isArray(arr) && arr.length
        ? `<div class="flex flex-wrap gap-2 mt-2">${arr.map((x) => `<span class="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">${escapeHtml(x)}</span>`).join("")}</div>`
        : "";

      const ratingStars = isValidRating(a.rating)
        ? Array.from({ length: 5 }, (_, i) => {
            const filled = i < Math.floor(Number(a.rating));
            return `<svg class="w-5 h-5 ${filled ? "text-yellow-400 fill-current" : "text-gray-300"}" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
          }).join("")
        : "";

      root.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Header Card -->
            <div class="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
              <!-- Hero Image -->
              <div class="relative h-64 md:h-80 bg-gradient-to-br from-red-600 via-red-700 to-amber-600 overflow-hidden">
                ${a.logo ? `
                  <img src="${escapeHtml(a.logo)}" alt="${escapeHtml(a.name)}" class="w-full h-full object-cover" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                ` : `
                  <div class="w-full h-full flex items-center justify-center">
                    <svg class="w-24 h-24 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                  </div>
                `}
                ${a.accreditation_number ? `
                  <div class="absolute top-4 right-4 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold shadow-lg" style="background-color: #CC0000;">
                    <svg class="w-4 h-4 fill-current" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <span>Accrédité MATA</span>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </div>
                ` : ""}
                ${a.verified ? `
                  <div class="absolute top-4 left-4 bg-white rounded-full p-2 shadow-lg">
                    <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </div>
                ` : ""}
                <div class="absolute bottom-6 left-6 right-6">
                  <h1 class="text-3xl md:text-4xl font-serif font-bold text-white mb-2 drop-shadow-lg">
                    ${escapeHtml(a.name)}
                  </h1>
                  ${a.name_ar ? `<div class="text-white/90 text-lg mb-2 drop-shadow">${escapeHtml(a.name_ar)}</div>` : ""}
                  <div class="flex items-center gap-4 text-white/90 text-sm">
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                      <span>${escapeHtml(a.city || "")}${a.region ? `, ${escapeHtml(a.region)}` : ""}</span>
                    </div>
                    <span class="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                      ${typeLabels[a.type] || a.type}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Content -->
              <div class="p-6 md:p-10">
                ${ratingStars ? `
                  <div class="flex items-center gap-2 mb-4">
                    ${ratingStars}
                    <span class="text-lg font-semibold text-gray-700">${Number(a.rating).toFixed(1)}</span>
                  </div>
                ` : ""}

                ${a.description ? `
                  <div class="mb-8">
                    <h2 class="text-xl font-bold mb-4" style="color: #333333;">À propos</h2>
                    <div class="text-slate-700 leading-7 whitespace-pre-line">${escapeHtml(a.description)}</div>
                  </div>
                ` : ""}

                <!-- Contact Information -->
                <div class="mb-8">
                  <h2 class="text-xl font-bold mb-4" style="color: #333333;">Informations de Contact</h2>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${a.address ? `
                      <div class="flex items-start gap-3">
                        <div class="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        </div>
                        <div>
                          <div class="text-sm text-slate-500 mb-1">Adresse</div>
                          <div class="font-medium text-slate-900">${escapeHtml(a.address)}</div>
                        </div>
                      </div>
                    ` : ""}
                    ${a.phone ? `
                      <div class="flex items-start gap-3">
                        <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                          <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                        </div>
                        <div>
                          <div class="text-sm text-slate-500 mb-1">Téléphone</div>
                          <a href="tel:${escapeHtml(a.phone)}" class="font-medium text-slate-900 hover:text-red-600">${escapeHtml(a.phone)}</a>
                        </div>
                      </div>
                    ` : ""}
                    ${a.email ? `
                      <div class="flex items-start gap-3">
                        <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                          <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        </div>
                        <div>
                          <div class="text-sm text-slate-500 mb-1">Email</div>
                          <a href="mailto:${escapeHtml(a.email)}" class="font-medium text-slate-900 hover:text-red-600 break-all">${escapeHtml(a.email)}</a>
                        </div>
                      </div>
                    ` : ""}
                    ${a.website ? `
                      <div class="flex items-start gap-3">
                        <div class="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                          <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
                        </div>
                        <div>
                          <div class="text-sm text-slate-500 mb-1">Site Web</div>
                          <a href="${escapeHtml(a.website)}" target="_blank" rel="noreferrer" class="font-medium text-blue-600 hover:text-blue-800 break-all">${escapeHtml(a.website)}</a>
                        </div>
                      </div>
                    ` : ""}
                  </div>
                </div>

                <!-- Services & Languages -->
                ${a.services ? `
                  <div class="mb-6">
                    <h2 class="text-xl font-bold mb-4" style="color: #333333;">Services</h2>
                    ${chips(a.services)}
                  </div>
                ` : ""}
                ${a.languages ? `
                  <div class="mb-6">
                    <h2 class="text-xl font-bold mb-4" style="color: #333333;">Langues</h2>
                    ${chips(a.languages)}
                  </div>
                ` : ""}

                ${a.accreditation_number ? `
                  <div class="mt-8 pt-8 border-t border-slate-200">
                    <div class="flex items-center gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <svg class="w-6 h-6 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
                      <div>
                        <div class="font-semibold text-amber-900">Accréditation MATA</div>
                        <div class="text-sm text-amber-700">Numéro: ${escapeHtml(a.accreditation_number)}</div>
                      </div>
                    </div>
                  </div>
                ` : ""}
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Quick Actions -->
            <div class="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
              <h3 class="text-lg font-bold mb-4" style="color: #333333;">Actions Rapides</h3>
              <div class="space-y-3">
                ${a.phone ? `
                  <a href="tel:${escapeHtml(a.phone)}" class="flex items-center gap-3 w-full px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    <span class="font-medium text-green-700">Appeler</span>
                  </a>
                ` : ""}
                ${a.email ? `
                  <a href="mailto:${escapeHtml(a.email)}" class="flex items-center gap-3 w-full px-4 py-3 bg-blue-50 hover:bg-red-100 rounded-lg transition-colors">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    <span class="font-medium text-red-700">Envoyer un email</span>
                  </a>
                ` : ""}
                ${a.website ? `
                  <a href="${escapeHtml(a.website)}" target="_blank" rel="noreferrer" class="flex items-center gap-3 w-full px-4 py-3 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors">
                    <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
                    <span class="font-medium text-amber-700">Visiter le site</span>
                  </a>
                ` : ""}
                <button onclick="shareActor()" class="flex items-center gap-3 w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                  <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
                  <span class="font-medium text-slate-700">Partager</span>
                </button>
              </div>
            </div>

            <!-- Accreditation Badge or Request Button -->
            ${a.accreditation_number ? `
              <div class="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl shadow-lg border border-amber-200 p-6 text-center">
                <div class="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
                </div>
                <h3 class="text-lg font-bold text-amber-900 mb-2">Accrédité MATA</h3>
                <p class="text-sm text-amber-700 mb-3">Cet acteur a été certifié par MATA</p>
                <div class="text-xs font-mono font-semibold text-amber-900 bg-white/50 px-3 py-2 rounded">
                  ${escapeHtml(a.accreditation_number)}
                </div>
              </div>
            ` : (!a.user_id ? `
              <div id="accreditation-request-section" class="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl shadow-lg border border-amber-200 p-6">
                <div id="accreditation-pending" class="hidden">
                  <div class="flex items-start gap-3 text-amber-800">
                    <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <div>
                      <p class="font-semibold text-sm mb-1">Demande en cours</p>
                      <p class="text-xs text-amber-700 leading-relaxed">
                        Une demande d'accréditation est déjà en attente de validation.
                      </p>
                    </div>
                  </div>
                </div>
                <button onclick="openAccreditationModal(${a.id}, '${escapeHtml(a.name)}')" id="accreditation-request-btn"
                  class="w-full mt-4 px-6 py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-200 font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
                  Demander l'accréditation
                </button>
              </div>
            ` : "")}
          </div>
        </div>
      `;

      // Share function
      window.shareActor = async () => {
        try {
          const url = window.location.href;
          const title = a.name;
          if (navigator.share) {
            await navigator.share({ title, text: a.description || '', url });
          } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(url);
            alert("Lien copié dans le presse-papiers");
          } else {
            prompt("Copiez ce lien :", url);
          }
        } catch (_) {}
      };

      // Load related actors
      loadRelatedActors(id, a.type, a.region);

      // Check for pending accreditation request
      if (!a.accreditation_number && !a.user_id) {
        checkPendingAccreditationRequest(id);
      }
    } catch (e) {
      root.innerHTML = `
        <div class="bg-white rounded-xl border border-slate-200 p-8 text-center">
          <div class="text-2xl font-serif font-bold mb-3">Acteur introuvable</div>
          <p class="text-slate-600 mb-4">L'acteur que vous recherchez n'existe pas ou a été supprimé.</p>
          <a href="/actors" class="inline-block px-5 py-3 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors">Retour aux acteurs</a>
        </div>
      `;
    }
  }

  // Accreditation Request Functions
  let currentActorId = null;
  let currentActorName = '';

  async function checkPendingAccreditationRequest(actorId) {
    try {
      const response = await fetch(`/api/accreditation-requests?tourism_actor_id=${actorId}&status=pending`, {
        headers: { Accept: 'application/json' }
      });
      const data = await response.json();
      const hasPending = data.data && Array.isArray(data.data) && data.data.length > 0;

      const pendingEl = document.getElementById('accreditation-pending');
      const btnEl = document.getElementById('accreditation-request-btn');

      if (hasPending && pendingEl && btnEl) {
        pendingEl.classList.remove('hidden');
        btnEl.classList.add('hidden');
      }
    } catch (e) {
      console.error('Error checking pending request:', e);
    }
  }

  function openAccreditationModal(actorId, actorName) {
    currentActorId = actorId;
    currentActorName = actorName;
    const modal = document.getElementById('accreditation-modal');
    const nameEl = document.getElementById('modal-actor-name');
    if (modal && nameEl) {
      nameEl.textContent = actorName;
      modal.classList.remove('hidden');
    }
  }

  function closeAccreditationModal() {
    const modal = document.getElementById('accreditation-modal');
    if (modal) {
      modal.classList.add('hidden');
      document.getElementById('accreditation-form').reset();
      document.getElementById('accreditation-error').classList.add('hidden');
      document.getElementById('accreditation-success').classList.add('hidden');
      document.getElementById('accreditation-file-display').innerHTML = `
        <svg class="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
        </svg>
        <p class="text-gray-600">Cliquez pour sélectionner un fichier</p>
        <p class="text-sm text-gray-500 mt-1">Formats acceptés: PDF, DOC, DOCX, JPG, PNG (max. 10MB)</p>
      `;
    }
  }

  window.openAccreditationModal = openAccreditationModal;
  window.closeAccreditationModal = closeAccreditationModal;

  // File input handler
  document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('accreditation-document');
    const fileDisplay = document.getElementById('accreditation-file-display');

    if (fileInput && fileDisplay) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (file) {
          const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/jpg', 'image/png'];
          const maxSize = 10 * 1024 * 1024; // 10MB

          if (!validTypes.includes(file.type)) {
            alert('Format de fichier non supporté. Formats acceptés: PDF, DOC, DOCX, JPG, PNG');
            fileInput.value = '';
            return;
          }

          if (file.size > maxSize) {
            alert('Le fichier est trop volumineux. Taille maximale: 10MB');
            fileInput.value = '';
            return;
          }

          fileDisplay.innerHTML = `
            <div class="flex items-center justify-center gap-3">
              <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              <div class="text-left">
                <p class="font-medium text-gray-900">${file.name}</p>
                <p class="text-sm text-gray-500">${(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
          `;
        }
      });
    }

    // Form submission
    const form = document.getElementById('accreditation-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const errorEl = document.getElementById('accreditation-error');
        const successEl = document.getElementById('accreditation-success');
        const submitBtn = document.getElementById('accreditation-submit-btn');
        const submitText = document.getElementById('accreditation-submit-text');

        errorEl.classList.add('hidden');
        successEl.classList.add('hidden');

        const file = fileInput?.files?.[0];
        if (!file) {
          errorEl.querySelector('p').textContent = 'Veuillez télécharger le document d\'accréditation';
          errorEl.classList.remove('hidden');
          return;
        }

        const formData = new FormData();
        formData.append('tourism_actor_id', currentActorId);
        formData.append('full_name', document.getElementById('accreditation-full-name').value);
        formData.append('email', document.getElementById('accreditation-email').value);
        formData.append('phone', document.getElementById('accreditation-phone').value || '');
        formData.append('position', document.getElementById('accreditation-position').value || '');
        formData.append('identity_document_type', document.getElementById('accreditation-identity-type').value);
        formData.append('identity_document_number', document.getElementById('accreditation-identity-number').value);
        formData.append('accreditation_document', file);
        formData.append('message', document.getElementById('accreditation-message').value || '');

        const accreditationNumber = document.getElementById('accreditation-number').value;
        if (accreditationNumber) {
          formData.append('accreditation_number', accreditationNumber);
        }

        submitBtn.disabled = true;
        submitText.innerHTML = '<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white inline-block mr-2"></div> Envoi en cours...';

        try {
          const response = await fetch('/api/accreditation-requests', {
            method: 'POST',
            body: formData,
            headers: {
              'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
            }
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || data.errors?.accreditation_document?.[0] || 'Erreur lors de la soumission de la demande');
          }

          successEl.querySelector('p').textContent = 'Demande soumise avec succès ! Vous recevrez une confirmation par email.';
          successEl.classList.remove('hidden');

          setTimeout(() => {
            closeAccreditationModal();
            if (currentActorId) {
              checkPendingAccreditationRequest(currentActorId);
            }
          }, 2000);
        } catch (err) {
          errorEl.querySelector('p').textContent = err.message || 'Erreur lors de la soumission de la demande';
          errorEl.classList.remove('hidden');

          if (err.message.includes('déjà') || err.message.includes('en attente')) {
            setTimeout(() => {
              closeAccreditationModal();
              if (currentActorId) {
                checkPendingAccreditationRequest(currentActorId);
              }
            }, 3000);
          }
        } finally {
          submitBtn.disabled = false;
          submitText.textContent = 'Soumettre la demande';
        }
      });
    }
  });

  async function loadRelatedActors(excludeId, type, region) {
    const root = $("#related-actors");
    if (!root) return;

    try {
      const params = new URLSearchParams();
      params.append("status", "active");
      params.append("per_page", "6");
      if (type) params.append("type", type);
      if (region) params.append("region", region);

      const payload = await fetchJson(`/api/tourism-actors?${params.toString()}`);
      const allActors = Array.isArray(payload.data) ? payload.data : [];
      const related = allActors.filter(a => String(a.id) !== String(excludeId)).slice(0, 3);

      if (related.length === 0) {
        root.innerHTML = `<div class="text-slate-600">Aucun acteur similaire disponible.</div>`;
        return;
      }

      const typeLabels = {
        hotel: 'Hôtel',
        restaurant: 'Restaurant',
        travel_agency: 'Agence de Voyage',
        tour_guide: 'Guide Touristique',
        transport: 'Transport',
        attraction: 'Attraction',
        other: 'Autre',
      };

      root.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${related.map((actor) => `
            <a href="/actors/${encodeURIComponent(actor.id)}" class="block group">
              <div class="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div class="relative h-44 bg-gradient-to-br from-red-600 to-amber-600 overflow-hidden">
                  ${actor.logo ? `
                    <img src="${escapeHtml(actor.logo)}" alt="${escapeHtml(actor.name)}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  ` : `
                    <div class="w-full h-full flex items-center justify-center">
                      <svg class="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                      </svg>
                    </div>
                  `}
                  ${actor.accreditation_number ? `
                    <div class="absolute top-3 right-3">
                      <span class="px-2 py-1 rounded-full text-xs font-semibold text-white bg-amber-500">Accrédité</span>
                    </div>
                  ` : ""}
                </div>
                <div class="p-5">
                  <div class="text-lg font-bold mb-1" style="color: #333333;">${escapeHtml(actor.name)}</div>
                  <div class="text-sm text-slate-600 mb-2">${typeLabels[actor.type] || actor.type}</div>
                  <div class="text-sm text-slate-600">${escapeHtml(actor.city || "")}${actor.region ? `, ${escapeHtml(actor.region)}` : ""}</div>
                  <div class="mt-3 text-sm font-medium text-blue-600 group-hover:text-blue-800">Voir le profil →</div>
                </div>
              </div>
            </a>
          `).join("")}
        </div>
      `;
    } catch (e) {
      root.innerHTML = `<div class="text-slate-600">Impossible de charger les acteurs similaires.</div>`;
    }
  }

  // ----------------------
  // Premium Actors (Home)
  // ----------------------
  async function initPremiumActors() {
    const root = $("#premium-actors");
    if (!root) return;

    try {
      const params = new URLSearchParams();
      params.append("accredited", "true");
      params.append("status", "active");
      params.append("per_page", "20");
      params.append("sort_by", "rating");
      params.append("sort_order", "desc");

      const payload = await fetchJson(`/api/tourism-actors?${params.toString()}`);
      const allActors = Array.isArray(payload.data) ? payload.data : [];
      const accreditedActors = allActors.filter((a) => a.accreditation_number);
      const actors = accreditedActors.slice(0, 3);

      if (actors.length === 0) {
        root.innerHTML = `
          <div class="text-center py-12">
            <p class="text-lg" style="color: #333333;">
              Aucun acteur accrédité disponible pour le moment
            </p>
          </div>
        `;
        return;
      }

      root.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          ${actors.map((actor) => {
            const ratingStars = isValidRating(actor.rating)
              ? Array.from({ length: 5 }, (_, i) => {
                  const filled = i < Math.floor(Number(actor.rating));
                  return `<svg class="w-5 h-5 ${filled ? "text-yellow-400 fill-current" : "text-gray-300"}" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
                }).join("")
              : "";

            return `
              <div class="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                <div class="relative h-64 bg-gradient-to-br from-red-600 to-blue-500 overflow-hidden">
                  ${actor.logo ? `<img src="${escapeHtml(actor.logo)}" alt="${escapeHtml(actor.name)}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />` : `<div class="w-full h-full flex items-center justify-center"><svg class="w-24 h-24 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg></div>`}
                  ${actor.accreditation_number ? `
                    <div class="absolute top-4 right-4 text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm font-semibold" style="background-color: #CC0000;">
                      <svg class="w-4 h-4 fill-current" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      <span>Accrédité</span>
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                  ` : ""}
                </div>
                <div class="p-6">
                  <h3 class="text-2xl font-bold mb-2" style="color: #333333;">${escapeHtml(actor.name)}</h3>
                  ${actor.name_ar ? `<p class="text-lg mb-4" style="color: #333333;">${escapeHtml(actor.name_ar)}</p>` : ""}
                  ${ratingStars ? `<div class="flex items-center gap-1 mb-4">${ratingStars}</div>` : ""}
                  ${actor.description ? `<p class="mb-4 line-clamp-2" style="color: #333333;">${escapeHtml(actor.description)}</p>` : ""}
                  <div class="flex items-center gap-2 mb-6" style="color: #333333;">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    <span>${escapeHtml(actor.city || "")}${actor.region ? `, ${escapeHtml(actor.region)}` : ""}</span>
                  </div>
                  <a href="/actors/${actor.id}" class="block w-full text-center px-6 py-3 text-white rounded-lg transition-colors font-semibold" style="background-color: #CC0000;">
                    Voir le profil
                  </a>
                </div>
              </div>
            `;
          }).join("")}
        </div>
        ${actors.length > 0 ? `
          <div class="text-center mt-12">
            <a href="/actors" class="inline-block px-8 py-4 text-white rounded-lg transition-colors font-semibold text-lg" style="background-color: #CC0000;">
              Voir Tous les Acteurs
            </a>
          </div>
        ` : ""}
      `;
    } catch (e) {
      root.innerHTML = `
        <div class="text-center py-12">
          <p class="text-lg text-red-600">Erreur lors du chargement des acteurs</p>
        </div>
      `;
    }
  }

  function isValidRating(rating) {
    if (!rating) return false;
    const num = Number(rating);
    return !isNaN(num) && num >= 0 && num <= 5;
  }

  // ----------------------
  // Boot
  // ----------------------
  document.addEventListener("DOMContentLoaded", async () => {
    await initNewsList();
    await initNewsDetail();
    await initNewsRelated();
    await initEventsList();
    await initEventDetail();
    await initActorsList();
    await initActorDetail();
    await initPremiumActors();
  });
})();

