@extends('layouts.app')

@section('content')
<div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-red-950 to-red-800 text-white py-20 mt-16">
        <div class="max-w-7xl mx-auto px-4 text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-6" data-i18n="contactPageTitle">
                Contactez-nous
            </h1>
            <p class="text-xl text-red-100 max-w-2xl mx-auto" data-i18n="contactPageSubtitle">
                Une question ? Une suggestion ? Notre équipe est à votre écoute
            </p>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="py-16">
        <div class="max-w-7xl mx-auto px-4">
            <!-- Contact Info Cards -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                <div class="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
                    <div class="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4" style="background-color: rgba(204, 0, 0, 0.1);">
                        <i data-lucide="mail" class="w-6 h-6" style="color: #CC0000;"></i>
                    </div>
                    <h3 class="font-semibold text-lg mb-2" data-i18n="contactEmailTitle">Email</h3>
                    <a href="#" class="text-gray-600 hover:text-red-600 transition-colors" id="contact-email">
                        contact@mata.ma
                    </a>
                </div>

                <div class="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
                    <div class="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4" style="background-color: rgba(204, 0, 0, 0.1);">
                        <i data-lucide="phone" class="w-6 h-6" style="color: #CC0000;"></i>
                    </div>
                    <h3 class="font-semibold text-lg mb-2" data-i18n="contactPhoneTitle">Téléphone</h3>
                    <a href="#" class="text-gray-600 hover:text-red-600 transition-colors" id="contact-phone">
                        +212 5 22 12 34 56
                    </a>
                </div>

                <div class="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
                    <div class="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4" style="background-color: rgba(204, 0, 0, 0.1);">
                        <i data-lucide="map-pin" class="w-6 h-6" style="color: #CC0000;"></i>
                    </div>
                    <h3 class="font-semibold text-lg mb-2" data-i18n="contactAddressTitle">Adresse</h3>
                    <p class="text-gray-600" id="contact-address">
                        Rabat, Maroc
                    </p>
                </div>
            </div>

            <!-- Form and FAQ -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Contact Form -->
                <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                    <h2 class="text-2xl font-bold mb-6" data-i18n="contactFormTitle">Envoyez-nous un message</h2>
                    <form id="contact-form" class="space-y-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2" data-i18n="contactFormName">
                                Nom complet
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                class="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:border-red-600 transition-all"
                                data-i18n-placeholder="contactFormNamePlaceholder"
                                placeholder="Votre nom"
                            />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2" data-i18n="contactFormEmail">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                class="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:border-red-600 transition-all"
                                data-i18n-placeholder="contactFormEmailPlaceholder"
                                placeholder="votre@email.ma"
                            />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2" data-i18n="contactFormSubject">
                                Sujet
                            </label>
                            <input
                                type="text"
                                name="subject"
                                required
                                class="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:border-red-600 transition-all"
                                data-i18n-placeholder="contactFormSubjectPlaceholder"
                                placeholder="Objet de votre message"
                            />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2" data-i18n="contactFormMessage">
                                Message
                            </label>
                            <textarea
                                name="message"
                                required
                                rows="6"
                                class="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:border-red-600 transition-all resize-none"
                                data-i18n-placeholder="contactFormMessagePlaceholder"
                                placeholder="Votre message..."
                            ></textarea>
                        </div>

                        <div id="contact-form-message" class="hidden"></div>

                        <button 
                            type="submit" 
                            id="contact-submit-btn"
                            class="w-full px-6 py-3 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                            style="background-color: #CC0000;"
                        >
                            <i data-lucide="send" class="w-5 h-5"></i>
                            <span data-i18n="contactFormSubmit">Envoyer le message</span>
                        </button>
                    </form>
                </div>

                <!-- FAQ Section -->
                <div class="space-y-6">
                    <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                        <h2 class="text-2xl font-bold mb-6" data-i18n="contactFaqTitle">Questions fréquentes</h2>
                        <div class="space-y-6">
                            <div>
                                <h3 class="font-semibold text-lg mb-2 flex items-start space-x-2">
                                    <i data-lucide="message-square" class="w-5 h-5 mt-1 flex-shrink-0" style="color: #CC0000;"></i>
                                    <span data-i18n="contactFaqProfileQuestion">Comment puis-je créer un profil professionnel ?</span>
                                </h3>
                                <p class="text-gray-600 pl-7" data-i18n="contactFaqProfileAnswer">
                                    Créez un compte gratuit puis complétez votre profil avec vos informations professionnelles. Notre équipe vérifiera les informations avant publication.
                                </p>
                            </div>

                            <div>
                                <h3 class="font-semibold text-lg mb-2 flex items-start space-x-2">
                                    <i data-lucide="message-square" class="w-5 h-5 mt-1 flex-shrink-0" style="color: #CC0000;"></i>
                                    <span data-i18n="contactFaqServicesQuestion">Les services sont-ils gratuits ?</span>
                                </h3>
                                <p class="text-gray-600 pl-7" data-i18n="contactFaqServicesAnswer">
                                    L'inscription et la consultation de l'annuaire sont entièrement gratuites. Des options premium sont disponibles pour plus de visibilité.
                                </p>
                            </div>

                            <div>
                                <h3 class="font-semibold text-lg mb-2 flex items-start space-x-2">
                                    <i data-lucide="message-square" class="w-5 h-5 mt-1 flex-shrink-0" style="color: #CC0000;"></i>
                                    <span data-i18n="contactFaqVerificationQuestion">Comment sont vérifiées les informations ?</span>
                                </h3>
                                <p class="text-gray-600 pl-7" data-i18n="contactFaqVerificationAnswer">
                                    Notre équipe vérifie manuellement chaque profil et demande des justificatifs pour garantir l'authenticité des informations.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-100" style="background-color: rgba(204, 0, 0, 0.05);">
                        <h3 class="font-semibold text-lg mb-3" data-i18n="contactHelpTitle">Besoin d'aide immédiate ?</h3>
                        <p class="text-gray-700 mb-4" data-i18n="contactHelpDesc">
                            Notre équipe support est disponible du lundi au vendredi de 9h à 18h
                        </p>
                        <a 
                            href="tel:+212522123456" 
                            class="inline-flex items-center space-x-2 px-6 py-3 text-white rounded-lg font-medium transition-colors"
                            style="background-color: #CC0000;"
                        >
                            <i data-lucide="phone" class="w-5 h-5"></i>
                            <span data-i18n="contactHelpCall">Appelez-nous</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

<script>
(() => {
    const $ = (sel) => document.querySelector(sel);
    const form = $('#contact-form');
    const submitBtn = $('#contact-submit-btn');
    const messageDiv = $('#contact-form-message');

    // Load contact settings
    (async () => {
        try {
            const response = await fetch('/api/settings?group=contact');
            const result = await response.json();
            if (result.success && result.data) {
                const settings = {};
                result.data.forEach(s => {
                    settings[s.key] = s;
                });

                const getCurrentLang = () => {
                    if (window.i18n) return window.i18n.getCurrentLanguage();
                    return 'fr';
                };

                const lang = getCurrentLang();
                const valueKey = `value_${lang}`;

                if (settings.contact_email) {
                    const email = settings.contact_email[valueKey] || settings.contact_email.value_fr || 'contact@mata.ma';
                    const emailEl = $('#contact-email');
                    if (emailEl) {
                        emailEl.textContent = email;
                        emailEl.href = `mailto:${email}`;
                    }
                }

                if (settings.contact_phone) {
                    const phone = settings.contact_phone[valueKey] || settings.contact_phone.value_fr || '+212 5 22 12 34 56';
                    const phoneEl = $('#contact-phone');
                    if (phoneEl) {
                        phoneEl.textContent = phone;
                        phoneEl.href = `tel:${phone.replace(/\s/g, '')}`;
                    }
                }

                if (settings.contact_address) {
                    const address = settings.contact_address[valueKey] || settings.contact_address.value_fr || 'Rabat, Maroc';
                    const addressEl = $('#contact-address');
                    if (addressEl) {
                        addressEl.textContent = address;
                    }
                }
            }
        } catch (error) {
            console.error('Error loading contact settings:', error);
        }
    })();

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> <span data-i18n="contactFormSending">Envoi en cours...</span>';
            if (window.lucide) window.lucide.createIcons();
            
            messageDiv.classList.add('hidden');

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    messageDiv.className = 'p-4 bg-green-50 border border-green-200 rounded-lg text-green-700';
                    messageDiv.textContent = window.i18n?.t('contactFormSuccess') || 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.';
                    messageDiv.classList.remove('hidden');
                    form.reset();
                } else {
                    throw new Error(result.message || 'Erreur lors de l\'envoi');
                }
            } catch (error) {
                messageDiv.className = 'p-4 bg-red-50 border border-red-200 rounded-lg text-red-700';
                messageDiv.textContent = window.i18n?.t('contactFormError') || 'Une erreur s\'est produite lors de l\'envoi. Veuillez réessayer.';
                messageDiv.classList.remove('hidden');
                console.error('Error:', error);
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i data-lucide="send" class="w-5 h-5"></i> <span data-i18n="contactFormSubmit">Envoyer le message</span>';
                if (window.lucide) window.lucide.createIcons();
            }
        });
    }

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }
})();
</script>
@endsection
