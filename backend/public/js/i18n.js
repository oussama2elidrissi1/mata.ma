(() => {
  'use strict';

  // Traductions complètes
  const translations = {
    fr: {
      // Navigation
      home: 'Accueil',
      directory: 'Annuaire',
      events: 'Événements',
      accreditation: 'Accréditation',
      joinLink: 'Adhérer',
      news: 'Actualités',
      partnersLink: 'Partenaires',
      about: 'À Propos',
      contact: 'Contact',
      admin: 'Admin',
      readMore: 'Lire la suite',
      backToNews: 'Retour aux actualités',
      share: 'Partager',
      relatedArticles: 'Articles Connexes',
      
      // Hero
      heroTitle: 'Annuaire des Acteurs du Tourisme Accrédités au Maroc',
      heroSubtitle: 'Découvrez les professionnels du tourisme certifiés MATA pour une expérience marocaine authentique et de qualité',
      searchPlaceholder: 'Rechercher un acteur touristique...',
      searchButton: 'Rechercher',
      platformSubtitle: 'La plateforme de référence pour les professionnels du tourisme. Trouvez, collaborez, grandissez.',
      
      // Categories
      hotelsRiads: 'Hôtels & Riads',
      restaurants: 'Restaurants',
      touristGuides: 'Guides Touristiques',
      travelAgencies: 'Agences de Voyage',
      hotel: 'Hôtel',
      restaurant: 'Restaurant',
      transport: 'Transport',
      attraction: 'Attraction',
      other: 'Autre',
      allTypes: 'Tous les types',
      city: 'Ville',
      
      // Filters
      filters: 'Filtres',
      reset: 'Réinitialiser',
      category: 'Catégorie',
      allCategories: 'Toutes les catégories',
      region: 'Région',
      allRegions: 'Toutes les régions',
      type: 'Type',
      certifications: 'Certifications',
      verifiedActors: 'Acteurs vérifiés',
      accreditationType: 'Accréditation',
      premium: 'Premium',
      standard: 'Standard',
      luxury: 'Luxury',
      budget: 'Budget',
      
      // Results
      results: 'Résultats',
      noResults: 'Aucun résultat trouvé',
      viewProfile: 'Voir le profil',
      
      // Actor Detail
      contactButton: 'Contacter',
      requestAccreditation: 'Demander l\'accréditation',
      aboutSection: 'À propos',
      keyInfo: 'Informations clés',
      memberSince: 'Membre depuis',
      certificationsLabel: 'Certifications',
      services: 'Services proposés',
      gallery: 'Galerie',
      needHelp: 'Besoin d\'aide?',
      contactDirectly: 'Contactez directement ce professionnel pour plus d\'informations',
      sendMessage: 'Envoyer un message',
      
      // Accreditation Request
      accreditationRequest: 'Demande d\'Accréditation',
      fullName: 'Nom complet',
      email: 'Email',
      phone: 'Téléphone',
      position: 'Poste / Fonction',
      identityDocumentType: 'Type de pièce d\'identité',
      identityDocumentNumber: 'Numéro de pièce d\'identité',
      accreditationDocument: 'Document d\'accréditation (fourni par l\'État)',
      accreditationNumber: 'Numéro d\'accréditation (si vous en avez un)',
      message: 'Message (optionnel)',
      submitRequest: 'Soumettre la demande',
      cancel: 'Annuler',
      
      // Common
      loading: 'Chargement...',
      save: 'Enregistrer',
      edit: 'Modifier',
      delete: 'Supprimer',
      close: 'Fermer',
      confirm: 'Confirmer',
      yes: 'Oui',
      no: 'Non',
      error: 'Erreur',
      success: 'Succès',
      back: 'Retour',
      search: 'Rechercher',
      filter: 'Filtrer',
      all: 'Tous',
      showMore: 'Voir plus',
      showLess: 'Voir moins',
      readMore: 'Lire la suite',
      viewDetails: 'Voir les détails',
      contact: 'Contacter',
      phone: 'Téléphone',
      email: 'Email',
      website: 'Site web',
      address: 'Adresse',
      description: 'Description',
      services: 'Services',
      languages: 'Langues',
      location: 'Localisation',
      date: 'Date',
      time: 'Heure',
      category: 'Catégorie',
      status: 'Statut',
      active: 'Actif',
      inactive: 'Inactif',
      pending: 'En attente',
      approved: 'Approuvé',
      rejected: 'Rejeté',
      published: 'Publié',
      draft: 'Brouillon',
      archived: 'Archivé',
      cancelled: 'Annulé',
      
      // About Page
      aboutPageTitle: 'À propos de MATA',
      aboutPageSubtitle: 'Nous sommes la plateforme de référence pour les professionnels du tourisme, offrant un annuaire vérifié, des ressources de qualité et un réseau collaboratif dynamique.',
      aboutStatsProfessionals: 'Professionnels inscrits',
      aboutStatsCities: 'Villes couvertes',
      aboutStatsResources: 'Ressources disponibles',
      aboutStatsEvents: 'Événements par an',
      aboutMission: 'Notre Mission',
      aboutMissionDesc: 'Créer une plateforme de référence pour centraliser et valoriser les acteurs du tourisme, favorisant la collaboration et le partage de connaissances.',
      aboutCommunity: 'Notre Communauté',
      aboutCommunityDesc: 'Plus de 2500 professionnels du tourisme nous font confiance pour développer leur réseau et accéder à des ressources de qualité.',
      aboutCommitment: 'Notre Engagement',
      aboutCommitmentDesc: 'Garantir la fiabilité et la qualité des informations partagées à travers un processus de vérification rigoureux.',
      aboutVision: 'Notre Vision',
      aboutVisionDesc: 'Devenir la référence incontournable pour tous les professionnels du secteur touristique au Maroc et à l\'international.',
      aboutHistoryTitle: 'Notre Histoire',
      aboutHistoryDesc: 'Créée en 2023, MATA est née de la volonté de créer un espace centralisé et fiable pour les professionnels du tourisme. Face à la fragmentation des informations et au manque de plateformes dédiées, nous avons développé une solution complète permettant aux acteurs du secteur de se connecter, de partager leurs expériences et d\'accéder à des ressources de qualité.',
      aboutValuesTitle: 'Nos Valeurs',
      aboutValueReliability: 'Fiabilité',
      aboutValueCollaboration: 'Collaboration',
      aboutValueInnovation: 'Innovation',
      aboutTeamTitle: 'Notre Équipe',
      aboutTeamDirector: 'Directrice Générale',
      aboutTeamTechnical: 'Responsable Technique',
      aboutTeamCommunity: 'Responsable Communauté',
      aboutTeamContent: 'Responsable Contenu',
      aboutJoinUsTitle: 'Rejoignez-nous',
      aboutJoinUsDesc: 'Faites partie de la plus grande communauté de professionnels du tourisme au Maroc',
      aboutJoinUsButton: 'Créer un compte gratuit',
      
      // Contact Page
      contactPageTitle: 'Contactez-nous',
      contactPageSubtitle: 'Une question ? Une suggestion ? Notre équipe est à votre écoute',
      contactEmailTitle: 'Email',
      contactPhoneTitle: 'Téléphone',
      contactAddressTitle: 'Adresse',
      contactFormTitle: 'Envoyez-nous un message',
      contactFormName: 'Nom complet',
      contactFormNamePlaceholder: 'Votre nom',
      contactFormEmail: 'Email',
      contactFormEmailPlaceholder: 'votre@email.ma',
      contactFormSubject: 'Sujet',
      contactFormSubjectPlaceholder: 'Objet de votre message',
      contactFormMessage: 'Message',
      contactFormMessagePlaceholder: 'Votre message...',
      contactFormSubmit: 'Envoyer le message',
      contactFormSending: 'Envoi en cours...',
      contactFormSuccess: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
      contactFormError: 'Une erreur s\'est produite lors de l\'envoi. Veuillez réessayer.',
      contactFaqTitle: 'Questions fréquentes',
      contactFaqProfileQuestion: 'Comment puis-je créer un profil professionnel ?',
      contactFaqProfileAnswer: 'Créez un compte gratuit puis complétez votre profil avec vos informations professionnelles. Notre équipe vérifiera les informations avant publication.',
      contactFaqServicesQuestion: 'Les services sont-ils gratuits ?',
      contactFaqServicesAnswer: 'L\'inscription et la consultation de l\'annuaire sont entièrement gratuites. Des options premium sont disponibles pour plus de visibilité.',
      contactFaqVerificationQuestion: 'Comment sont vérifiées les informations ?',
      contactFaqVerificationAnswer: 'Notre équipe vérifie manuellement chaque profil et demande des justificatifs pour garantir l\'authenticité des informations.',
      contactHelpTitle: 'Besoin d\'aide immédiate ?',
      contactHelpDesc: 'Notre équipe support est disponible du lundi au vendredi de 9h à 18h',
      contactHelpCall: 'Appelez-nous',
    },
    en: {
      // Navigation
      home: 'Home',
      directory: 'Directory',
      events: 'Events',
      accreditation: 'Accreditation',
      joinLink: 'Join',
      news: 'News',
      partnersLink: 'Partners',
      about: 'About',
      contact: 'Contact',
      admin: 'Admin',
      readMore: 'Read more',
      backToNews: 'Back to news',
      share: 'Share',
      relatedArticles: 'Related Articles',
      
      // Hero
      heroTitle: 'Directory of Accredited Tourism Actors in Morocco',
      heroSubtitle: 'Discover MATA certified tourism professionals for an authentic and quality Moroccan experience',
      searchPlaceholder: 'Search for a tourism actor...',
      searchButton: 'Search',
      platformSubtitle: 'The reference platform for tourism professionals. Find, collaborate, grow.',
      
      // Categories
      hotelsRiads: 'Hotels & Riads',
      restaurants: 'Restaurants',
      touristGuides: 'Tourist Guides',
      travelAgencies: 'Travel Agencies',
      hotel: 'Hotel',
      restaurant: 'Restaurant',
      transport: 'Transport',
      attraction: 'Attraction',
      other: 'Other',
      allTypes: 'All types',
      city: 'City',
      
      // Filters
      filters: 'Filters',
      reset: 'Reset',
      category: 'Category',
      allCategories: 'All categories',
      region: 'Region',
      allRegions: 'All regions',
      type: 'Type',
      certifications: 'Certifications',
      verifiedActors: 'Verified actors',
      accreditationType: 'Accreditation',
      premium: 'Premium',
      standard: 'Standard',
      luxury: 'Luxury',
      budget: 'Budget',
      
      // Results
      results: 'Results',
      noResults: 'No results found',
      viewProfile: 'View profile',
      
      // Actor Detail
      contactButton: 'Contact',
      requestAccreditation: 'Request Accreditation',
      aboutSection: 'About',
      keyInfo: 'Key Information',
      memberSince: 'Member since',
      certificationsLabel: 'Certifications',
      services: 'Services Offered',
      gallery: 'Gallery',
      needHelp: 'Need help?',
      contactDirectly: 'Contact this professional directly for more information',
      sendMessage: 'Send a message',
      
      // Accreditation Request
      accreditationRequest: 'Accreditation Request',
      fullName: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      position: 'Position / Function',
      identityDocumentType: 'Identity Document Type',
      identityDocumentNumber: 'Identity Document Number',
      accreditationDocument: 'Accreditation Document (provided by State)',
      accreditationNumber: 'Accreditation Number (if you have one)',
      message: 'Message (optional)',
      submitRequest: 'Submit Request',
      cancel: 'Cancel',
      
      // Common
      loading: 'Loading...',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      close: 'Close',
      confirm: 'Confirm',
      yes: 'Yes',
      no: 'No',
      error: 'Error',
      success: 'Success',
      back: 'Back',
      search: 'Search',
      filter: 'Filter',
      all: 'All',
      showMore: 'Show more',
      showLess: 'Show less',
      readMore: 'Read more',
      viewDetails: 'View details',
      contact: 'Contact',
      phone: 'Phone',
      email: 'Email',
      website: 'Website',
      address: 'Address',
      description: 'Description',
      services: 'Services',
      languages: 'Languages',
      location: 'Location',
      date: 'Date',
      time: 'Time',
      category: 'Category',
      status: 'Status',
      active: 'Active',
      inactive: 'Inactive',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      published: 'Published',
      draft: 'Draft',
      archived: 'Archived',
      cancelled: 'Cancelled',
      
      // About Page
      aboutPageTitle: 'About MATA',
      aboutPageSubtitle: 'We are the reference platform for tourism professionals, offering a verified directory, quality resources and a dynamic collaborative network.',
      aboutStatsProfessionals: 'Registered Professionals',
      aboutStatsCities: 'Cities Covered',
      aboutStatsResources: 'Available Resources',
      aboutStatsEvents: 'Events per Year',
      aboutMission: 'Our Mission',
      aboutMissionDesc: 'Create a reference platform to centralize and enhance tourism actors, fostering collaboration and knowledge sharing.',
      aboutCommunity: 'Our Community',
      aboutCommunityDesc: 'More than 2500 tourism professionals trust us to develop their network and access quality resources.',
      aboutCommitment: 'Our Commitment',
      aboutCommitmentDesc: 'Guarantee the reliability and quality of shared information through a rigorous verification process.',
      aboutVision: 'Our Vision',
      aboutVisionDesc: 'Become the essential reference for all tourism sector professionals in Morocco and internationally.',
      aboutHistoryTitle: 'Our History',
      aboutHistoryDesc: 'Created in 2023, MATA was born from the desire to create a centralized and reliable space for tourism professionals. Faced with information fragmentation and lack of dedicated platforms, we have developed a complete solution allowing sector actors to connect, share their experiences and access quality resources.',
      aboutValuesTitle: 'Our Values',
      aboutValueReliability: 'Reliability',
      aboutValueCollaboration: 'Collaboration',
      aboutValueInnovation: 'Innovation',
      aboutTeamTitle: 'Our Team',
      aboutTeamDirector: 'General Director',
      aboutTeamTechnical: 'Technical Manager',
      aboutTeamCommunity: 'Community Manager',
      aboutTeamContent: 'Content Manager',
      aboutJoinUsTitle: 'Join Us',
      aboutJoinUsDesc: 'Be part of the largest community of tourism professionals in Morocco',
      aboutJoinUsButton: 'Create a free account',
      
      // Contact Page
      contactPageTitle: 'Contact Us',
      contactPageSubtitle: 'Have a question? A suggestion? Our team is here to help',
      contactEmailTitle: 'Email',
      contactPhoneTitle: 'Phone',
      contactAddressTitle: 'Address',
      contactFormTitle: 'Send us a message',
      contactFormName: 'Full Name',
      contactFormNamePlaceholder: 'Your name',
      contactFormEmail: 'Email',
      contactFormEmailPlaceholder: 'your@email.com',
      contactFormSubject: 'Subject',
      contactFormSubjectPlaceholder: 'Subject of your message',
      contactFormMessage: 'Message',
      contactFormMessagePlaceholder: 'Your message...',
      contactFormSubmit: 'Send message',
      contactFormSending: 'Sending...',
      contactFormSuccess: 'Your message has been sent successfully. We will respond as soon as possible.',
      contactFormError: 'An error occurred while sending. Please try again.',
      contactFaqTitle: 'Frequently Asked Questions',
      contactFaqProfileQuestion: 'How can I create a professional profile?',
      contactFaqProfileAnswer: 'Create a free account and then complete your profile with your professional information. Our team will verify the information before publication.',
      contactFaqServicesQuestion: 'Are the services free?',
      contactFaqServicesAnswer: 'Registration and directory consultation are completely free. Premium options are available for more visibility.',
      contactFaqVerificationQuestion: 'How is information verified?',
      contactFaqVerificationAnswer: 'Our team manually verifies each profile and requests supporting documents to guarantee the authenticity of the information.',
      contactHelpTitle: 'Need immediate help?',
      contactHelpDesc: 'Our support team is available Monday to Friday from 9am to 6pm',
      contactHelpCall: 'Call us',
    },
    ar: {
      // Navigation
      home: 'الرئيسية',
      directory: 'الدليل',
      events: 'الأحداث',
      accreditation: 'الاعتماد',
      joinLink: 'انضم',
      news: 'الأخبار',
      partnersLink: 'الشركاء',
      about: 'من نحن',
      contact: 'اتصل بنا',
      admin: 'الإدارة',
      readMore: 'اقرأ المزيد',
      backToNews: 'العودة إلى الأخبار',
      share: 'مشاركة',
      relatedArticles: 'مقالات ذات صلة',
      
      // Hero
      heroTitle: 'دليل الفاعلين السياحيين المعتمدين في المغرب',
      heroSubtitle: 'اكتشفوا محترفي السياحة المعتمدين من MATA لتجربة مغربية أصيلة وجودة',
      searchPlaceholder: 'ابحث عن فاعل سياحي...',
      searchButton: 'بحث',
      platformSubtitle: 'المنصة المرجعية لمحترفي السياحة. ابحث، تعاون، نم.',
      
      // Categories
      hotelsRiads: 'فنادق ورياض',
      restaurants: 'مطاعم',
      touristGuides: 'مرشدون سياحيون',
      travelAgencies: 'وكالات السفر',
      hotel: 'فندق',
      restaurant: 'مطعم',
      transport: 'نقل',
      attraction: 'جذب',
      other: 'أخرى',
      allTypes: 'جميع الأنواع',
      city: 'المدينة',
      
      // Filters
      filters: 'المرشحات',
      reset: 'إعادة تعيين',
      category: 'الفئة',
      allCategories: 'جميع الفئات',
      region: 'المنطقة',
      allRegions: 'جميع المناطق',
      type: 'النوع',
      certifications: 'الشهادات',
      verifiedActors: 'الفاعلون المتحققون',
      accreditationType: 'الاعتماد',
      premium: 'مميز',
      standard: 'عادي',
      luxury: 'فاخر',
      budget: 'اقتصادي',
      
      // Results
      results: 'النتائج',
      noResults: 'لم يتم العثور على نتائج',
      viewProfile: 'عرض الملف الشخصي',
      
      // Actor Detail
      contactButton: 'اتصل',
      requestAccreditation: 'طلب الاعتماد',
      aboutSection: 'حول',
      keyInfo: 'معلومات رئيسية',
      memberSince: 'عضو منذ',
      certificationsLabel: 'الشهادات',
      services: 'الخدمات المقدمة',
      gallery: 'معرض الصور',
      needHelp: 'تحتاج مساعدة؟',
      contactDirectly: 'اتصل بهذا المحترف مباشرة لمزيد من المعلومات',
      sendMessage: 'إرسال رسالة',
      
      // Accreditation Request
      accreditationRequest: 'طلب الاعتماد',
      fullName: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      position: 'المنصب / الوظيفة',
      identityDocumentType: 'نوع وثيقة الهوية',
      identityDocumentNumber: 'رقم وثيقة الهوية',
      accreditationDocument: 'وثيقة الاعتماد (المقدمة من الدولة)',
      accreditationNumber: 'رقم الاعتماد (إن وجد)',
      message: 'رسالة (اختياري)',
      submitRequest: 'إرسال الطلب',
      cancel: 'إلغاء',
      
      // Contact Page
      contactPageTitle: 'اتصل بنا',
      contactPageSubtitle: 'هل لديك سؤال؟ اقتراح؟ فريقنا في خدمتك',
      contactEmailTitle: 'البريد الإلكتروني',
      contactPhoneTitle: 'الهاتف',
      contactAddressTitle: 'العنوان',
      contactFormTitle: 'أرسل لنا رسالة',
      contactFormName: 'الاسم الكامل',
      contactFormNamePlaceholder: 'اسمك',
      contactFormEmail: 'البريد الإلكتروني',
      contactFormEmailPlaceholder: 'بريدك@الإلكتروني.ما',
      contactFormSubject: 'الموضوع',
      contactFormSubjectPlaceholder: 'موضوع رسالتك',
      contactFormMessage: 'الرسالة',
      contactFormMessagePlaceholder: 'رسالتك...',
      contactFormSubmit: 'إرسال الرسالة',
      contactFormSending: 'جاري الإرسال...',
      contactFormSuccess: 'تم إرسال رسالتك بنجاح. سنرد عليك في أقرب وقت ممكن.',
      contactFormError: 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.',
      contactFaqTitle: 'الأسئلة الشائعة',
      contactFaqProfileQuestion: 'كيف يمكنني إنشاء ملف تعريف مهني؟',
      contactFaqProfileAnswer: 'أنشئ حسابًا مجانيًا ثم أكمل ملفك الشخصي بمعلوماتك المهنية. سيتحقق فريقنا من المعلومات قبل النشر.',
      contactFaqServicesQuestion: 'هل الخدمات مجانية؟',
      contactFaqServicesAnswer: 'التسجيل واستشارة الدليل مجانيان تمامًا. تتوفر خيارات مميزة لمزيد من الرؤية.',
      contactFaqVerificationQuestion: 'كيف يتم التحقق من المعلومات؟',
      contactFaqVerificationAnswer: 'يتحقق فريقنا يدويًا من كل ملف شخصي ويطلب المستندات الداعمة لضمان صحة المعلومات.',
      contactHelpTitle: 'تحتاج مساعدة فورية؟',
      contactHelpDesc: 'فريق الدعم لدينا متاح من الاثنين إلى الجمعة من 9 صباحًا إلى 6 مساءً',
      contactHelpCall: 'اتصل بنا',
      
      // About Page
      aboutPageTitle: 'حول MATA',
      aboutPageSubtitle: 'نحن المنصة المرجعية للمهنيين في مجال السياحة، نقدم دليلاً موثقاً وموارد عالية الجودة وشبكة تعاونية ديناميكية.',
      aboutStatsProfessionals: 'المهنيون المسجلون',
      aboutStatsCities: 'المدن المغطاة',
      aboutStatsResources: 'الموارد المتاحة',
      aboutStatsEvents: 'الأحداث سنوياً',
      aboutMission: 'مهمتنا',
      aboutMissionDesc: 'إنشاء منصة مرجعية لمركزة وتعزيز الفاعلين في مجال السياحة، وتعزيز التعاون وتبادل المعرفة.',
      aboutCommunity: 'مجتمعنا',
      aboutCommunityDesc: 'أكثر من 2500 من المهنيين في مجال السياحة يثقون بنا لتطوير شبكتهم والوصول إلى موارد عالية الجودة.',
      aboutCommitment: 'التزامنا',
      aboutCommitmentDesc: 'ضمان موثوقية وجودة المعلومات المشتركة من خلال عملية تحقق صارمة.',
      aboutVision: 'رؤيتنا',
      aboutVisionDesc: 'أن نصبح المرجع الأساسي لجميع المهنيين في قطاع السياحة في المغرب ودولياً.',
      aboutHistoryTitle: 'تاريخنا',
      aboutHistoryDesc: 'تم إنشاء MATA في عام 2023 من رغبة في إنشاء مساحة مركزية وموثوقة للمهنيين في مجال السياحة. في مواجهة تفتت المعلومات ونقص المنصات المخصصة، قمنا بتطوير حل كامل يسمح للفاعلين في القطاع بالاتصال ومشاركة تجاربهم والوصول إلى موارد عالية الجودة.',
      aboutValuesTitle: 'قيمنا',
      aboutValueReliability: 'الموثوقية',
      aboutValueCollaboration: 'التعاون',
      aboutValueInnovation: 'الابتكار',
      aboutTeamTitle: 'فريقنا',
      aboutTeamDirector: 'المديرة العامة',
      aboutTeamTechnical: 'المسؤول التقني',
      aboutTeamCommunity: 'مسؤول المجتمع',
      aboutTeamContent: 'مسؤول المحتوى',
      aboutJoinUsTitle: 'انضم إلينا',
      aboutJoinUsDesc: 'كن جزءاً من أكبر مجتمع للمهنيين في مجال السياحة في المغرب',
      aboutJoinUsButton: 'إنشاء حساب مجاني',
      
      // Common
      loading: 'جاري التحميل...',
      save: 'حفظ',
      edit: 'تعديل',
      delete: 'حذف',
      close: 'إغلاق',
      confirm: 'تأكيد',
      yes: 'نعم',
      no: 'لا',
      error: 'خطأ',
      success: 'نجاح',
      back: 'رجوع',
      search: 'بحث',
      filter: 'تصفية',
      all: 'الكل',
      showMore: 'عرض المزيد',
      showLess: 'عرض أقل',
      readMore: 'اقرأ المزيد',
      viewDetails: 'عرض التفاصيل',
      contact: 'اتصل',
      phone: 'الهاتف',
      email: 'البريد الإلكتروني',
      website: 'الموقع الإلكتروني',
      address: 'العنوان',
      description: 'الوصف',
      services: 'الخدمات',
      languages: 'اللغات',
      location: 'الموقع',
      date: 'التاريخ',
      time: 'الوقت',
      category: 'الفئة',
      status: 'الحالة',
      active: 'نشط',
      inactive: 'غير نشط',
      pending: 'قيد الانتظار',
      approved: 'موافق عليه',
      rejected: 'مرفوض',
      published: 'منشور',
      draft: 'مسودة',
      archived: 'مؤرشف',
      cancelled: 'ملغي',
    }
  };

  // Fonction pour obtenir la langue actuelle
  const getCurrentLanguage = () => {
    const saved = localStorage.getItem('language');
    if (saved && ['fr', 'en', 'ar'].includes(saved)) {
      return saved;
    }
    return 'fr'; // Français par défaut
  };

  // Fonction pour définir la langue
  const setLanguage = (lang) => {
    if (!['fr', 'en', 'ar'].includes(lang)) {
      lang = 'fr';
    }
    localStorage.setItem('language', lang);
    
    // Mettre à jour la direction du document
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // Déclencher un événement pour notifier les autres scripts
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    
    // Recharger les traductions dans la page
    updatePageTranslations();
  };

  // Fonction de traduction
  const t = (key, fallback = null) => {
    const lang = getCurrentLanguage();
    const keys = key.split('.');
    let value = translations[lang];
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        // Fallback vers le français
        value = translations.fr;
        for (const k2 of keys) {
          value = value?.[k2];
        }
        break;
      }
    }
    
    if (typeof value === 'object' && value !== null) {
      return fallback || key;
    }
    
    return typeof value === 'string' ? value : (fallback || key);
  };

  // Mettre à jour toutes les traductions dans la page
  const updatePageTranslations = () => {
    const lang = getCurrentLanguage();
    
    // Mettre à jour tous les éléments avec data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = t(key);
      
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        if (el.hasAttribute('placeholder') || el.hasAttribute('data-i18n-placeholder')) {
          el.placeholder = translation;
        } else {
          el.value = translation;
        }
      } else if (el.tagName === 'OPTION') {
        // Pour les options de select, mettre à jour le texte
        el.textContent = translation;
      } else {
        el.textContent = translation;
      }
    });
    
    // Mettre à jour les placeholders avec data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = t(key);
    });
    
    // Mettre à jour les attributs title et aria-label
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      el.title = t(key);
    });
    
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      el.setAttribute('aria-label', t(key));
    });
  };

  // Initialiser la langue au chargement
  const initLanguage = () => {
    const lang = getCurrentLanguage();
    setLanguage(lang);
  };

  // Exposer les fonctions globalement
  window.i18n = {
    t,
    setLanguage,
    getCurrentLanguage,
    updatePageTranslations,
    initLanguage,
  };

  // Initialiser au chargement du DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguage);
  } else {
    initLanguage();
  }

  // Écouter les changements de langue
  window.addEventListener('languageChanged', () => {
    updatePageTranslations();
  });
})();
