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
      ecosystem: 'Écosystème',
      jobs: 'Emploi',
      about: 'À Propos',
      contact: 'Contacter',
      admin: 'Admin',
      readMore: 'Lire la suite',
      backToNews: 'Retour aux actualités',
      share: 'Partager',
      relatedArticles: 'Articles Connexes',
      
      // Hero
      heroTitle: 'Annuaire des Acteurs du Tourisme Accrédités au Maroc',
      heroSubtitle: 'Développez votre visibilité et renforcez votre crédibilité commerciale au sein du réseau national des entreprises touristiques au Maroc.',
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
      
      // Home Page Sections
      latestAccreditedActors: 'Derniers Acteurs <span style="color: #CC0000;">Accrédités</span>',
      latestAccreditedActorsSubtitle: 'Découvrez les professionnels du tourisme accrédités et certifiés par MATA.',
      newsAndAnnouncements: 'Actualités & Annonces Officielles',
      newsAndAnnouncementsSubtitle: 'Suivez les dernières informations, annonces et mises à jour du réseau MATA.',
      viewAllActors: 'Voir Tous les Acteurs',
      readArticle: 'Lire l\'article',
      loadingAccreditedActors: 'Chargement des acteurs accrédités...',
      loadingNews: 'Chargement des actualités...',
      noAccreditedActors: 'Aucun acteur accrédité pour le moment.',
      noNews: 'Aucune actualité pour le moment.',
      mataServiceBusiness: 'mata.ma au service de votre businesse',
      accreditedActorsOnly: 'Accrédités uniquement',
      
      // Join Page
      joinPageTitle: 'Adhérer à notre réseau',
      joinPageSubtitle: 'Rejoignez notre communauté d\'acteurs du tourisme et développez votre activité',
      accountType: 'Type de compte',
      actorsAccount: 'Acteurs',
      actorsAccountDesc: 'Pour les professionnels du tourisme (hôtels, restaurants, guides, etc.)',
      associationAccount: 'Representation professionnelle et acteurs publics',
      associationAccountDesc: 'Pour les Representation professionnelle et acteurs publics',
      joinProcessTitle: 'Processus d\'Adhésion',
      
      // Accreditation Page
      accreditationSystemTitle: 'Système d\'Accréditation MATA',
      accreditationSystemSubtitle: 'Un processus simple et transparent pour obtenir votre accréditation et rejoindre notre réseau de professionnels certifiés du tourisme marocain',
      accreditationProcessTitle: 'Processus d\'Accréditation',
      accreditationProcessSubtitle: 'Suivez ces étapes simples pour obtenir votre accréditation MATA',
      step1: 'Étape 1',
      step2: 'Étape 2',
      step3: 'Étape 3',
      step4: 'Étape 4',
      step5: 'Étape 5',
      step6: 'Étape 6',
      findProfile: 'Trouvez Votre Profil',
      findProfileDesc: 'Recherchez votre établissement dans notre annuaire en ligne. Si votre profil existe déjà (ajouté par l\'administration), vous pouvez directement demander l\'accréditation.',
      requestAccreditationStep: 'Demander l\'Accréditation',
      requestAccreditationStepDesc: 'Cliquez sur "Demander l\'accréditation" sur votre page de profil. Remplissez le formulaire avec vos informations personnelles, votre pièce d\'identité et téléchargez votre document d\'accréditation.',
      verificationStep: 'Vérification',
      verificationStepDesc: 'Notre équipe examine votre demande et vérifie les documents fournis.',
      confirmationStep: 'Confirmation de Réception',
      confirmationStepDesc: 'Vous recevrez un email de confirmation confirmant que votre demande a bien été reçue et est en cours d\'examen par notre équipe.',
      evaluationStep: 'Évaluation par l\'Administration',
      evaluationStepDesc: 'Notre équipe d\'administration examine votre demande, vérifie vos documents et évalue votre établissement selon nos critères de qualité.',
      validationStep: 'Validation et Création de Compte',
      validationStepDesc: 'Si votre demande est approuvée, vous recevrez un email avec vos identifiants de connexion (email et mot de passe) pour accéder à votre espace personnel.',
      profileManagementStep: 'Gestion de Votre Profil',
      profileManagementStepDesc: 'Une fois connecté, vous pourrez gérer votre profil, mettre à jour vos informations et accéder à toutes les fonctionnalités de la plateforme MATA.',
      accreditationReady: 'Prêt à Obtenir Votre Accréditation ?',
      identityInformation: 'Information d\'identité',
      identityInformationDesc: 'Numero (CIN), passeport ou autre pièce d\'identité officielle valide.',
      
      // Ecosystem Page
      ecosystemPageTitle: 'Écosystème MATA',
      ecosystemPageSubtitle: 'Un réseau collaboratif dynamique qui rassemble les acteurs du tourisme marocain pour créer de la valeur et promouvoir l\'excellence.',
      ecosystemIntro: 'L\'écosystème MATA représente un réseau collaboratif complet qui connecte les différents acteurs du secteur touristique marocain. Notre mission est de créer un environnement propice à l\'innovation, au partage de connaissances et au développement durable du tourisme au Maroc.',
      ecosystemAccreditedActors: 'Acteurs Accrédités',
      ecosystemAccreditedActorsDesc: 'Un réseau de professionnels vérifiés et certifiés, garantissant qualité et professionnalisme dans le secteur touristique marocain.',
      ecosystemStrategicPartners: 'Partenaires Stratégiques',
      ecosystemStrategicPartnersDesc: 'Des collaborations avec des institutions, organisations et entreprises pour renforcer l\'écosystème touristique marocain.',
      ecosystemTraining: 'Formation & Développement',
      ecosystemTrainingDesc: 'Des programmes de formation continue et de développement des compétences pour les professionnels du tourisme.',
      ecosystemInnovation: 'Innovation & Recherche',
      ecosystemInnovationDesc: 'Promotion de l\'innovation et de la recherche dans le secteur touristique pour améliorer continuellement les pratiques.',
      ecosystemSustainability: 'Développement Durable',
      ecosystemSustainabilityDesc: 'Engagement en faveur d\'un tourisme durable et responsable qui respecte l\'environnement et les communautés locales.',
      ecosystemEvents: 'Événements & Networking',
      ecosystemEventsDesc: 'Organisation d\'événements, conférences et rencontres pour favoriser les échanges et le networking entre les acteurs.',
      joinEcosystem: 'Rejoignez l\'Écosystème MATA',
      joinEcosystemDesc: 'Faites partie d\'un réseau dynamique qui transforme le secteur touristique marocain. Découvrez les opportunités de collaboration et de croissance.',
      joinMATA: 'Adhérer à MATA',
      
      // Jobs Page
      jobsSystemTitle: 'Plateforme Emploi & Carrières MATA',
      jobsSystemSubtitle: 'Une plateforme simple et transparente pour connecter les talents aux opportunités dans le secteur touristique marocain',
      jobsPageTitle: 'Emploi & Carrières',
      jobsPageSubtitle: 'Découvrez les opportunités d\'emploi dans le secteur touristique marocain et développez votre carrière avec MATA.',
      jobsIntro: 'MATA connecte les talents aux opportunités dans le secteur touristique marocain. Que vous soyez un professionnel expérimenté ou à la recherche de votre premier emploi, notre plateforme vous aide à trouver la position idéale qui correspond à vos compétences et aspirations.',
      jobsHospitality: 'Hôtellerie & Restauration',
      jobsHospitalityDesc: 'Postes dans les hôtels, riads, restaurants et établissements d\'hébergement touristique.',
      jobsTravelAgencies: 'Agences de Voyage',
      jobsTravelAgenciesDesc: 'Opportunités dans les agences de voyage, tour-opérateurs et services de réservation.',
      jobsTourGuide: 'Guide Touristique',
      jobsTourGuideDesc: 'Postes pour guides touristiques certifiés et accompagnateurs de voyage.',
      jobsEventManagement: 'Événementiel & Animation',
      jobsEventManagementDesc: 'Carrières dans l\'organisation d\'événements, l\'animation et les activités touristiques.',
      jobsMarketing: 'Marketing & Communication',
      jobsMarketingDesc: 'Postes en marketing digital, communication et promotion touristique.',
      jobsTraining: 'Formation & Management',
      jobsTrainingDesc: 'Opportunités dans la formation professionnelle et le management du tourisme.',
      howItWorks: 'Comment ça fonctionne ?',
      createProfile: 'Créez votre profil',
      createProfileDesc: 'Inscrivez-vous et complétez votre profil avec vos compétences et expériences.',
      exploreOffers: 'Explorez les offres',
      exploreOffersDesc: 'Parcourez les opportunités d\'emploi correspondant à votre profil et vos aspirations.',
      apply: 'Postulez',
      applyDesc: 'Candidature directement auprès des employeurs membres de l\'écosystème MATA.',
      readyToStart: 'Prêt à démarrer votre carrière ?',
      readyToStartDesc: 'Rejoignez notre réseau de professionnels et accédez aux meilleures opportunités d\'emploi dans le secteur touristique marocain.',
      contactUs: 'Nous Contacter',
      candidateButton: 'Candidat : Déposez votre CV',
      recruiterButton: 'Recruteur : Publiez une annonce',
      candidateRegisterTitle: 'Créer un compte candidat',
      candidateDashboardTitle: 'Mon Espace Candidat',
      candidateDashboardSubtitle: 'Gérez votre CV et consultez les offres d\'emploi',
      myCV: 'Mon CV',
      noCV: 'Aucun CV enregistré',
      createCV: 'Créer mon CV',
      editCV: 'Modifier mon CV',
      downloadCV: 'Télécharger mon CV',
      cvStatus: 'Statut:',
      jobOffers: 'Offres d\'emploi',
      myApplications: 'Mes Candidatures',
      register: 'S\'inscrire',
      confirmPassword: 'Confirmer le mot de passe',
      candidateLoginTitle: 'Connexion Candidat',
      candidateLoginSubtitle: 'Connectez-vous pour accéder à votre espace candidat',
      emailPlaceholder: 'Votre email',
      passwordPlaceholder: 'Votre mot de passe',
      backToJobs: 'Retour aux offres',
      noAccount: 'Pas encore de compte ?',
      createAccount: 'Créer un compte',
      alreadyHaveAccount: 'Déjà un compte ?',
      deleteCV: 'Supprimer mon CV',
      logout: 'Déconnexion',
      login: 'Se connecter',
      candidateAuthTitle: 'Espace Candidat',
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
      ecosystem: 'Ecosystem',
      jobs: 'Jobs',
      about: 'About',
      contact: 'Contact',
      admin: 'Admin',
      readMore: 'Read more',
      backToNews: 'Back to news',
      share: 'Share',
      relatedArticles: 'Related Articles',
      
      // Hero
      heroTitle: 'Directory of Accredited Tourism Actors in Morocco',
      heroSubtitle: 'Develop your visibility and strengthen your commercial credibility within the national network of tourism companies in Morocco.',
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
      
      // Home Page Sections
      latestAccreditedActors: 'Latest <span style="color: #CC0000;">Accredited</span> Actors',
      latestAccreditedActorsSubtitle: 'Discover tourism professionals accredited and certified by MATA.',
      newsAndAnnouncements: 'News & Official Announcements',
      newsAndAnnouncementsSubtitle: 'Follow the latest information, announcements and updates from the MATA network.',
      viewAllActors: 'View All Actors',
      readArticle: 'Read article',
      loadingAccreditedActors: 'Loading accredited actors...',
      loadingNews: 'Loading news...',
      noAccreditedActors: 'No accredited actors at the moment.',
      noNews: 'No news at the moment.',
      mataServiceBusiness: 'mata.ma at the service of your business',
      accreditedActorsOnly: 'Accredited only',
      
      // Join Page
      joinPageTitle: 'Join our network',
      joinPageSubtitle: 'Join our community of tourism actors and grow your business',
      accountType: 'Account type',
      actorsAccount: 'Actors',
      actorsAccountDesc: 'For tourism professionals (hotels, restaurants, guides, etc.)',
      associationAccount: 'Professional representation and public actors',
      associationAccountDesc: 'For professional representation and public actors',
      joinProcessTitle: 'Join Process',
      
      // Accreditation Page
      accreditationSystemTitle: 'MATA Accreditation System',
      accreditationSystemSubtitle: 'A simple and transparent process to obtain your accreditation and join our network of certified Moroccan tourism professionals',
      accreditationProcessTitle: 'Accreditation Process',
      accreditationProcessSubtitle: 'Follow these simple steps to obtain your MATA accreditation',
      step1: 'Step 1',
      step2: 'Step 2',
      step3: 'Step 3',
      step4: 'Step 4',
      step5: 'Step 5',
      step6: 'Step 6',
      findProfile: 'Find Your Profile',
      findProfileDesc: 'Search for your establishment in our online directory. If your profile already exists (added by administration), you can directly request accreditation.',
      requestAccreditationStep: 'Request Accreditation',
      requestAccreditationStepDesc: 'Click on "Request accreditation" on your profile page. Fill out the form with your personal information, your identity document and upload your accreditation document.',
      verificationStep: 'Verification',
      verificationStepDesc: 'Our team reviews your request and verifies the documents provided.',
      confirmationStep: 'Confirmation of Receipt',
      confirmationStepDesc: 'You will receive a confirmation email confirming that your request has been received and is being reviewed by our team.',
      evaluationStep: 'Administration Evaluation',
      evaluationStepDesc: 'Our administration team reviews your request, verifies your documents and evaluates your establishment according to our quality criteria.',
      validationStep: 'Validation and Account Creation',
      validationStepDesc: 'If your request is approved, you will receive an email with your login credentials (email and password) to access your personal space.',
      profileManagementStep: 'Profile Management',
      profileManagementStepDesc: 'Once logged in, you can manage your profile, update your information and access all MATA platform features.',
      accreditationReady: 'Ready to Get Your Accreditation?',
      identityInformation: 'Identity information',
      identityInformationDesc: 'National identity card (CIN), passport or other valid official identity document.',
      
      // Ecosystem Page
      ecosystemPageTitle: 'MATA Ecosystem',
      ecosystemPageSubtitle: 'A dynamic collaborative network that brings together Moroccan tourism actors to create value and promote excellence.',
      ecosystemIntro: 'The MATA ecosystem represents a complete collaborative network that connects the different actors of the Moroccan tourism sector. Our mission is to create an environment conducive to innovation, knowledge sharing and sustainable development of tourism in Morocco.',
      ecosystemAccreditedActors: 'Accredited Actors',
      ecosystemAccreditedActorsDesc: 'A network of verified and certified professionals, guaranteeing quality and professionalism in the Moroccan tourism sector.',
      ecosystemStrategicPartners: 'Strategic Partners',
      ecosystemStrategicPartnersDesc: 'Collaborations with institutions, organizations and companies to strengthen the Moroccan tourism ecosystem.',
      ecosystemTraining: 'Training & Development',
      ecosystemTrainingDesc: 'Continuing education and skills development programs for tourism professionals.',
      ecosystemInnovation: 'Innovation & Research',
      ecosystemInnovationDesc: 'Promotion of innovation and research in the tourism sector to continuously improve practices.',
      ecosystemSustainability: 'Sustainable Development',
      ecosystemSustainabilityDesc: 'Commitment to sustainable and responsible tourism that respects the environment and local communities.',
      ecosystemEvents: 'Events & Networking',
      ecosystemEventsDesc: 'Organization of events, conferences and meetings to promote exchanges and networking between actors.',
      joinEcosystem: 'Join the MATA Ecosystem',
      joinEcosystemDesc: 'Be part of a dynamic network that transforms the Moroccan tourism sector. Discover collaboration and growth opportunities.',
      joinMATA: 'Join MATA',
      
      // Jobs Page
      jobsSystemTitle: 'MATA Jobs & Careers Platform',
      jobsSystemSubtitle: 'A simple and transparent platform to connect talent with opportunities in the Moroccan tourism sector',
      jobsPageTitle: 'Jobs & Careers',
      jobsPageSubtitle: 'Discover job opportunities in the Moroccan tourism sector and develop your career with MATA.',
      jobsIntro: 'MATA connects talent to opportunities in the Moroccan tourism sector. Whether you are an experienced professional or looking for your first job, our platform helps you find the ideal position that matches your skills and aspirations.',
      jobsHospitality: 'Hospitality & Catering',
      jobsHospitalityDesc: 'Positions in hotels, riads, restaurants and tourist accommodation establishments.',
      jobsTravelAgencies: 'Travel Agencies',
      jobsTravelAgenciesDesc: 'Opportunities in travel agencies, tour operators and booking services.',
      jobsTourGuide: 'Tourist Guide',
      jobsTourGuideDesc: 'Positions for certified tourist guides and travel companions.',
      jobsEventManagement: 'Event Management & Animation',
      jobsEventManagementDesc: 'Careers in event organization, animation and tourist activities.',
      jobsMarketing: 'Marketing & Communication',
      jobsMarketingDesc: 'Positions in digital marketing, communication and tourism promotion.',
      jobsTraining: 'Training & Management',
      jobsTrainingDesc: 'Opportunities in professional training and tourism management.',
      howItWorks: 'How it works?',
      createProfile: 'Create your profile',
      createProfileDesc: 'Sign up and complete your profile with your skills and experiences.',
      exploreOffers: 'Explore offers',
      exploreOffersDesc: 'Browse job opportunities matching your profile and aspirations.',
      apply: 'Apply',
      applyDesc: 'Apply directly to employers who are members of the MATA ecosystem.',
      readyToStart: 'Ready to start your career?',
      readyToStartDesc: 'Join our network of professionals and access the best job opportunities in the Moroccan tourism sector.',
      contactUs: 'Contact Us',
      candidateButton: 'Candidate: Submit your CV',
      recruiterButton: 'Recruiter: Publish a job',
      candidateRegisterTitle: 'Create candidate account',
      candidateDashboardTitle: 'My Candidate Space',
      candidateDashboardSubtitle: 'Manage your CV and browse job offers',
      myCV: 'My CV',
      noCV: 'No CV saved',
      createCV: 'Create my CV',
      editCV: 'Edit my CV',
      downloadCV: 'Download my CV',
      cvStatus: 'Status:',
      jobOffers: 'Job Offers',
      myApplications: 'My Applications',
      register: 'Register',
      confirmPassword: 'Confirm password',
      candidateLoginTitle: 'Candidate Login',
      candidateLoginSubtitle: 'Log in to access your candidate space',
      emailPlaceholder: 'Your email',
      passwordPlaceholder: 'Your password',
      backToJobs: 'Back to offers',
      noAccount: 'Don\'t have an account yet?',
      createAccount: 'Create an account',
      alreadyHaveAccount: 'Already have an account?',
      deleteCV: 'Delete my CV',
      logout: 'Logout',
      login: 'Login',
      candidateAuthTitle: 'Candidate Space',
      uploadCVPDF: 'Upload my CV PDF',
      replaceCV: 'Replace CV file',
      cvFileInfo: 'CV File:',
      selectPDFFile: 'Select your CV file (PDF)',
      clickToUpload: 'Click to upload or drag and drop',
      fileFormat: 'PDF, DOC or DOCX (max 5MB)',
      fileMaxSize: 'Maximum size: 5MB',
      pdfOnly: 'PDF only (max 5MB)',
      upload: 'Upload',
      remove: 'Remove',
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
      ecosystem: 'النظام البيئي',
      jobs: 'الوظائف',
      about: 'من نحن',
      contact: 'اتصل بنا',
      admin: 'الإدارة',
      readMore: 'اقرأ المزيد',
      backToNews: 'العودة إلى الأخبار',
      share: 'مشاركة',
      relatedArticles: 'مقالات ذات صلة',
      
      // Hero
      heroTitle: 'دليل الفاعلين السياحيين المعتمدين في المغرب',
      heroSubtitle: 'طوروا رؤيتكم وقووا مصداقيتكم التجارية ضمن الشبكة الوطنية لشركات السياحة في المغرب.',
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
      
      // Home Page Sections
      latestAccreditedActors: 'آخر الفاعلين <span style="color: #CC0000;">المعتمدين</span>',
      latestAccreditedActorsSubtitle: 'اكتشفوا محترفي السياحة المعتمدين والمعتمدين من MATA.',
      newsAndAnnouncements: 'الأخبار والإعلانات الرسمية',
      newsAndAnnouncementsSubtitle: 'تابعوا آخر المعلومات والإعلانات والتحديثات من شبكة MATA.',
      viewAllActors: 'عرض جميع الفاعلين',
      readArticle: 'قراءة المقال',
      loadingAccreditedActors: 'جاري تحميل الفاعلين المعتمدين...',
      loadingNews: 'جاري تحميل الأخبار...',
      noAccreditedActors: 'لا يوجد فاعلون معتمدون في الوقت الحالي.',
      noNews: 'لا توجد أخبار في الوقت الحالي.',
      mataServiceBusiness: 'mata.ma في خدمة أعمالك',
      accreditedActorsOnly: 'المعتمدون فقط',
      
      // Join Page
      joinPageTitle: 'انضم إلى شبكتنا',
      joinPageSubtitle: 'انضم إلى مجتمعنا من الفاعلين السياحيين ونمّ أعمالك',
      accountType: 'نوع الحساب',
      actorsAccount: 'الفاعلون',
      actorsAccountDesc: 'للمهنيين في مجال السياحة (فنادق، مطاعم، مرشدون، إلخ)',
      associationAccount: 'التمثيل المهني والفاعلون العموميون',
      associationAccountDesc: 'للتمثيل المهني والفاعلون العموميون',
      joinProcessTitle: 'عملية الانضمام',
      
      // Accreditation Page
      accreditationSystemTitle: 'نظام اعتماد MATA',
      accreditationSystemSubtitle: 'عملية بسيطة وشفافة للحصول على اعتمادك والانضمام إلى شبكتنا من محترفي السياحة المعتمدين في المغرب',
      accreditationProcessTitle: 'عملية الاعتماد',
      accreditationProcessSubtitle: 'اتبع هذه الخطوات البسيطة للحصول على اعتماد MATA',
      step1: 'الخطوة 1',
      step2: 'الخطوة 2',
      step3: 'الخطوة 3',
      step4: 'الخطوة 4',
      step5: 'الخطوة 5',
      step6: 'الخطوة 6',
      findProfile: 'ابحث عن ملفك الشخصي',
      findProfileDesc: 'ابحث عن مؤسستك في دليلنا الإلكتروني. إذا كان ملفك الشخصي موجودًا بالفعل (تمت إضافته من قبل الإدارة)، يمكنك طلب الاعتماد مباشرة.',
      requestAccreditationStep: 'طلب الاعتماد',
      requestAccreditationStepDesc: 'انقر على "طلب الاعتماد" في صفحة ملفك الشخصي. املأ النموذج بمعلوماتك الشخصية ووثيقة هويتك وقم بتحميل وثيقة الاعتماد الخاصة بك.',
      verificationStep: 'التحقق',
      verificationStepDesc: 'يفحص فريقنا طلبك ويتحقق من المستندات المقدمة.',
      confirmationStep: 'تأكيد الاستلام',
      confirmationStepDesc: 'ستتلقى بريدًا إلكترونيًا للتأكيد يؤكد أن طلبك قد تم استلامه وهو قيد المراجعة من قبل فريقنا.',
      evaluationStep: 'التقييم من قبل الإدارة',
      evaluationStepDesc: 'يفحص فريق الإدارة لدينا طلبك، ويتحقق من مستنداتك ويقيم مؤسستك وفقًا لمعايير الجودة الخاصة بنا.',
      validationStep: 'التحقق وإنشاء الحساب',
      validationStepDesc: 'إذا تمت الموافقة على طلبك، ستتلقى بريدًا إلكترونيًا يحتوي على بيانات تسجيل الدخول الخاصة بك (البريد الإلكتروني وكلمة المرور) للوصول إلى مساحتك الشخصية.',
      profileManagementStep: 'إدارة ملفك الشخصي',
      profileManagementStepDesc: 'بمجرد تسجيل الدخول، يمكنك إدارة ملفك الشخصي وتحديث معلوماتك والوصول إلى جميع ميزات منصة MATA.',
      accreditationReady: 'هل أنت مستعد للحصول على اعتمادك؟',
      identityInformation: 'معلومات الهوية',
      identityInformationDesc: 'رقم (CIN)، جواز السفر أو وثيقة هوية رسمية أخرى صالحة.',
      
      // Ecosystem Page
      ecosystemPageTitle: 'النظام البيئي MATA',
      ecosystemPageSubtitle: 'شبكة تعاونية ديناميكية تجمع الفاعلين السياحيين المغاربة لخلق القيمة وتعزيز التميز.',
      ecosystemIntro: 'يمثل النظام البيئي MATA شبكة تعاونية كاملة تربط الفاعلين المختلفين في قطاع السياحة المغربي. مهمتنا هي خلق بيئة مواتية للابتكار وتبادل المعرفة والتنمية المستدامة للسياحة في المغرب.',
      ecosystemAccreditedActors: 'الفاعلون المعتمدون',
      ecosystemAccreditedActorsDesc: 'شبكة من المهنيين المتحققين والمعتمدين، مما يضمن الجودة والاحترافية في قطاع السياحة المغربي.',
      ecosystemStrategicPartners: 'الشركاء الاستراتيجيون',
      ecosystemStrategicPartnersDesc: 'تعاون مع المؤسسات والمنظمات والشركات لتعزيز النظام البيئي السياحي المغربي.',
      ecosystemTraining: 'التدريب والتطوير',
      ecosystemTrainingDesc: 'برامج التعليم المستمر وتطوير المهارات للمهنيين في مجال السياحة.',
      ecosystemInnovation: 'الابتكار والبحث',
      ecosystemInnovationDesc: 'تعزيز الابتكار والبحث في قطاع السياحة لتحسين الممارسات باستمرار.',
      ecosystemSustainability: 'التنمية المستدامة',
      ecosystemSustainabilityDesc: 'الالتزام بالسياحة المستدامة والمسؤولة التي تحترم البيئة والمجتمعات المحلية.',
      ecosystemEvents: 'الأحداث والتواصل',
      ecosystemEventsDesc: 'تنظيم الفعاليات والمؤتمرات واللقاءات لتعزيز التبادل والتواصل بين الفاعلين.',
      joinEcosystem: 'انضم إلى النظام البيئي MATA',
      joinEcosystemDesc: 'كن جزءًا من شبكة ديناميكية تحول قطاع السياحة المغربي. اكتشف فرص التعاون والنمو.',
      joinMATA: 'انضم إلى MATA',
      
      // Jobs Page
      jobsSystemTitle: 'منصة الوظائف والمسارات المهنية MATA',
      jobsSystemSubtitle: 'منصة بسيطة وشفافة لربط المواهب بالفرص في قطاع السياحة المغربي',
      jobsPageTitle: 'الوظائف والمسارات المهنية',
      jobsPageSubtitle: 'اكتشفوا فرص العمل في قطاع السياحة المغربي وطوروا مساركم المهني مع MATA.',
      jobsIntro: 'يربط MATA المواهب بالفرص في قطاع السياحة المغربي. سواء كنت محترفًا ذا خبرة أو تبحث عن وظيفتك الأولى، تساعدك منصتنا في العثور على الوظيفة المثالية التي تطابق مهاراتك وتطلعاتك.',
      jobsHospitality: 'الفندقة والمطاعم',
      jobsHospitalityDesc: 'الوظائف في الفنادق والرياض والمطاعم ومؤسسات الإيواء السياحي.',
      jobsTravelAgencies: 'وكالات السفر',
      jobsTravelAgenciesDesc: 'الفرص في وكالات السفر وشركات السياحة وخدمات الحجز.',
      jobsTourGuide: 'المرشد السياحي',
      jobsTourGuideDesc: 'الوظائف للمرشدين السياحيين المعتمدين ومرافقي السفر.',
      jobsEventManagement: 'تنظيم الفعاليات والأنشطة',
      jobsEventManagementDesc: 'المسارات المهنية في تنظيم الفعاليات والأنشطة والأنشطة السياحية.',
      jobsMarketing: 'التسويق والاتصال',
      jobsMarketingDesc: 'الوظائف في التسويق الرقمي والاتصال والترويج السياحي.',
      jobsTraining: 'التدريب والإدارة',
      jobsTrainingDesc: 'الفرص في التدريب المهني وإدارة السياحة.',
      howItWorks: 'كيف يعمل؟',
      createProfile: 'أنشئ ملفك الشخصي',
      createProfileDesc: 'سجل وأكمل ملفك الشخصي بمهاراتك وتجاربك.',
      exploreOffers: 'استكشف العروض',
      exploreOffersDesc: 'تصفح فرص العمل التي تطابق ملفك الشخصي وتطلعاتك.',
      apply: 'تقديم الطلب',
      applyDesc: 'تقديم الطلب مباشرة إلى أصحاب العمل الأعضاء في النظام البيئي MATA.',
      readyToStart: 'هل أنت مستعد لبدء مسيرتك المهنية؟',
      readyToStartDesc: 'انضم إلى شبكتنا من المهنيين واحصل على أفضل فرص العمل في قطاع السياحة المغربي.',
      contactUs: 'اتصل بنا',
      candidateButton: 'مرشح: قدم سيرتك الذاتية',
      recruiterButton: 'مسؤول التوظيف: انشر إعلان',
      candidateRegisterTitle: 'إنشاء حساب مرشح',
      candidateDashboardTitle: 'مساحتي كمرشح',
      candidateDashboardSubtitle: 'إدارة سيرتك الذاتية واستعراض عروض العمل',
      myCV: 'سيرتي الذاتية',
      noCV: 'لا يوجد سيرة ذاتية محفوظة',
      createCV: 'إنشاء سيرتي الذاتية',
      editCV: 'تعديل سيرتي الذاتية',
      downloadCV: 'تحميل سيرتي الذاتية',
      cvStatus: 'الحالة:',
      jobOffers: 'عروض العمل',
      myApplications: 'طلباتي',
      register: 'التسجيل',
      confirmPassword: 'تأكيد كلمة المرور',
      candidateLoginTitle: 'تسجيل الدخول كمرشح',
      candidateLoginSubtitle: 'قم بتسجيل الدخول للوصول إلى مساحتك كمرشح',
      emailPlaceholder: 'بريدك الإلكتروني',
      passwordPlaceholder: 'كلمة المرور',
      backToJobs: 'العودة إلى العروض',
      noAccount: 'ليس لديك حساب بعد؟',
      createAccount: 'إنشاء حساب',
      alreadyHaveAccount: 'لديك حساب بالفعل؟',
      deleteCV: 'حذف سيرتي الذاتية',
      logout: 'تسجيل الخروج',
      login: 'تسجيل الدخول',
      candidateAuthTitle: 'مساحة المرشح',
      uploadCVPDF: 'رفع سيرتي الذاتية PDF',
      replaceCV: 'استبدال ملف السيرة الذاتية',
      cvFileInfo: 'ملف السيرة الذاتية:',
      selectPDFFile: 'اختر ملف سيرتك الذاتية (PDF)',
      clickToUpload: 'انقر للتحميل أو اسحب وأفلت',
      fileFormat: 'PDF أو DOC أو DOCX (حد أقصى 5 ميجابايت)',
      fileMaxSize: 'الحجم الأقصى: 5 ميجابايت',
      pdfOnly: 'PDF فقط (حد أقصى 5 ميجابايت)',
      upload: 'تحميل',
      remove: 'إزالة',
      
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
    
    // Recharger les traductions dans la page IMMÉDIATEMENT
    updatePageTranslations();
    
    // Déclencher un événement pour notifier les autres scripts
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    
    // Forcer une deuxième mise à jour après un court délai pour être sûr
    setTimeout(() => {
      updatePageTranslations();
    }, 50);
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
    
    let updatedCount = 0;
    
    // Mettre à jour tous les éléments avec data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      
      const translation = t(key);
      
      // Ne pas mettre à jour si la traduction est la même que la clé ET que la traduction n'existe pas
      if (translation === key) {
        const hasTranslation = translations[lang] && translations[lang][key];
        if (!hasTranslation) {
          return; // Traduction manquante, ignorer
        }
      }
      
      try {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          if (el.hasAttribute('placeholder') || el.hasAttribute('data-i18n-placeholder')) {
            el.placeholder = translation;
          } else {
            el.value = translation;
          }
          updatedCount++;
        } else if (el.tagName === 'OPTION') {
          // Pour les options de select, mettre à jour le texte
          el.textContent = translation;
          updatedCount++;
        } else {
          // Si la traduction contient du HTML (comme <span>), utiliser innerHTML
          // Sinon, utiliser textContent pour éviter les problèmes de sécurité
          if (translation && typeof translation === 'string' && translation.includes('<') && translation.includes('>')) {
            el.innerHTML = translation;
          } else {
            el.textContent = translation || '';
          }
          updatedCount++;
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'élément:', key, error);
      }
    });
    
    // Mettre à jour les placeholders avec data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key) {
        el.placeholder = t(key);
        updatedCount++;
      }
    });
    
    // Mettre à jour les attributs title et aria-label
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (key) {
        el.title = t(key);
        updatedCount++;
      }
    });
    
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      if (key) {
        el.setAttribute('aria-label', t(key));
        updatedCount++;
      }
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
