@extends('layouts.app')

@section('content')
<div class="bg-gradient-to-b from-slate-50 to-white min-h-screen">
    <div class="mx-auto max-w-7xl px-4 py-12">
        <!-- Hero Section -->
        <div class="text-center mb-16">
            <h1 class="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4" data-i18n="partnersLink">
                Partenaires
            </h1>
            <p class="text-lg text-slate-600 max-w-3xl mx-auto" data-i18n="partnersSubtitle">
                Nous collaborons avec des organisations nationales et internationales pour promouvoir l'excellence du tourisme
            </p>
        </div>

        <!-- Partners Content -->
        <div id="partners-content" class="space-y-16">
            <!-- Loading State -->
            <div class="text-center text-slate-600" id="partners-loading">
                <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-900 border-t-transparent mx-auto mb-4"></div>
                <p data-i18n="loading">Chargement...</p>
            </div>
        </div>

        <!-- Become Partner CTA -->
        <div class="mt-20 rounded-2xl shadow-2xl p-12 text-center" style="background: linear-gradient(135deg, #CC0000 0%, #B30000 100%); color: white;">
            <h2 class="text-3xl font-bold mb-6" data-i18n="becomePartner">
                Devenez Partenaire
            </h2>
            <p class="text-xl mb-8 text-white opacity-90 max-w-2xl mx-auto" data-i18n="becomePartnerDesc">
                Rejoignez notre réseau de partenaires et contribuez au développement du tourisme
            </p>
            <a href="{{ route('join') }}" class="inline-block px-8 py-3 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors" data-i18n="joinLink">
                Nous Rejoindre
            </a>
        </div>
    </div>
</div>

<script>
(() => {
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);
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

    const partners = [
        {
            id: 1,
            name: 'Ministère du Tourisme',
            nameEn: 'Ministry of Tourism',
            nameAr: 'وزارة السياحة',
            type: 'institutional',
            logo: 'https://via.placeholder.com/200x100/1A365D/FFFFFF?text=Ministère+Tourisme',
            website: 'www.tourisme.gov.ma'
        },
        {
            id: 2,
            name: 'Office National Marocain du Tourisme',
            nameEn: 'Moroccan National Tourism Office',
            nameAr: 'المكتب الوطني المغربي للسياحة',
            type: 'institutional',
            logo: 'https://via.placeholder.com/200x100/C05621/FFFFFF?text=ONMT',
            website: 'www.visitmorocco.com'
        },
        {
            id: 3,
            name: 'Confédération Nationale du Tourisme',
            nameEn: 'National Tourism Confederation',
            nameAr: 'الاتحاد الوطني للسياحة',
            type: 'professional',
            logo: 'https://via.placeholder.com/200x100/D69E2E/1A365D?text=CNT',
            website: 'www.cnt.ma'
        },
        {
            id: 4,
            name: 'Organisation Mondiale du Tourisme',
            nameEn: 'World Tourism Organization',
            nameAr: 'المنظمة العالمية للسياحة',
            type: 'international',
            logo: 'https://via.placeholder.com/200x100/2C5282/FFFFFF?text=UNWTO',
            website: 'www.unwto.org'
        },
        {
            id: 5,
            name: 'Fédération Nationale de l\'Hôtellerie',
            nameEn: 'National Hotel Federation',
            nameAr: 'الاتحاد الوطني للفنادق',
            type: 'professional',
            logo: 'https://via.placeholder.com/200x100/38A169/FFFFFF?text=FNH',
            website: 'www.fnh.ma'
        },
        {
            id: 6,
            name: 'Association des Guides Touristiques',
            nameEn: 'Tourist Guides Association',
            nameAr: 'جمعية المرشدين السياحيين',
            type: 'professional',
            logo: 'https://via.placeholder.com/200x100/DD6B20/FFFFFF?text=AGT',
            website: 'www.guides-maroc.ma'
        },
        {
            id: 7,
            name: 'Chambre de Commerce Internationale',
            nameEn: 'International Chamber of Commerce',
            nameAr: 'غرفة التجارة الدولية',
            type: 'international',
            logo: 'https://via.placeholder.com/200x100/1A365D/FFFFFF?text=CCI',
            website: 'www.iccwbo.org'
        },
        {
            id: 8,
            name: 'Réseau des Villes Touristiques',
            nameEn: 'Tourist Cities Network',
            nameAr: 'شبكة المدن السياحية',
            type: 'institutional',
            logo: 'https://via.placeholder.com/200x100/C05621/FFFFFF?text=RVT',
            website: 'www.villes-tourisme.ma'
        }
    ];

    const partnerTypes = [
        { id: 'institutional', label: 'Institutionnels', labelEn: 'Institutional', labelAr: 'مؤسسي', icon: 'handshake' },
        { id: 'professional', label: 'Professionnels', labelEn: 'Professional', labelAr: 'مهني', icon: 'users' },
        { id: 'international', label: 'Internationaux', labelEn: 'International', labelAr: 'دولي', icon: 'globe' }
    ];

    const getCurrentLanguage = () => {
        if (window.i18n) {
            return window.i18n.getCurrentLanguage();
        }
        return 'fr';
    };

    const getPartnerName = (partner) => {
        const lang = getCurrentLanguage();
        if (lang === 'en') return partner.nameEn || partner.name;
        if (lang === 'ar') return partner.nameAr || partner.name;
        return partner.name;
    };

    const getTypeLabel = (type) => {
        const lang = getCurrentLanguage();
        const typeObj = partnerTypes.find(t => t.id === type.id);
        if (!typeObj) return type.id;
        if (lang === 'en') return typeObj.labelEn;
        if (lang === 'ar') return typeObj.labelAr;
        return typeObj.label;
    };

    const renderIcon = (iconName) => {
        const icons = {
            handshake: '<i data-lucide="handshake" class="w-6 h-6"></i>',
            users: '<i data-lucide="users" class="w-6 h-6"></i>',
            globe: '<i data-lucide="globe" class="w-6 h-6"></i>'
        };
        return icons[iconName] || icons.handshake;
    };

    const renderPartners = () => {
        const container = $('#partners-content');
        if (!container) return;

        const lang = getCurrentLanguage();
        let html = '';

        partnerTypes.forEach((type, typeIndex) => {
            const typePartners = partners.filter(p => p.type === type.id);
            if (typePartners.length === 0) return;

            html += `
                <div class="mb-16">
                    <div class="flex items-center space-x-3 mb-8">
                        <div class="w-12 h-12 rounded-full flex items-center justify-center" style="background-color: rgba(204, 0, 0, 0.1); color: #CC0000;">
                            ${renderIcon(type.icon)}
                        </div>
                        <h2 class="text-3xl font-bold" style="color: #CC0000;">
                            ${escapeHtml(getTypeLabel(type))}
                        </h2>
                    </div>

                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        ${typePartners.map(partner => `
                            <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 group">
                                <div class="flex flex-col items-center text-center">
                                    <div class="w-full h-24 flex items-center justify-center mb-4 bg-gray-50 rounded-lg group-hover:bg-red-50 transition-colors duration-300">
                                        <img
                                            src="${escapeHtml(partner.logo)}"
                                            alt="${escapeHtml(getPartnerName(partner))}"
                                            class="max-w-full max-h-full object-contain p-2"
                                            onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 100%22%3E%3Ctext x=%2210%22 y=%2250%22 font-size=%2220%22 fill=%22%23CC0000%22%3E${escapeHtml(partner.name)}%3C/text%3E%3C/svg%3E'"
                                        />
                                    </div>
                                    <h3 class="text-sm font-semibold mb-2 line-clamp-2" style="color: #CC0000;">
                                        ${escapeHtml(getPartnerName(partner))}
                                    </h3>
                                    ${partner.website ? `
                                        <a
                                            href="https://${escapeHtml(partner.website)}"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="text-xs text-gray-600 hover:text-red-600 transition-colors duration-300"
                                        >
                                            ${escapeHtml(partner.website)}
                                        </a>
                                    ` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
        
        // Initialize Lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    };

    // Initialize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(renderPartners, 100);
        });
    } else {
        setTimeout(renderPartners, 100);
    }

    // Re-render on language change
    window.addEventListener('languageChanged', () => {
        renderPartners();
    });
})();
</script>
@endsection
