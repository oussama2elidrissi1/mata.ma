# Guide d'utilisation du système de traduction i18n

## Langues supportées
- **Français (fr)** - Langue par défaut
- **Anglais (en)**
- **Arabe (ar)**

## Utilisation dans les vues Blade

### 1. Attribut `data-i18n` pour le texte
```html
<h1 data-i18n="heroTitle">Titre par défaut</h1>
<p data-i18n="heroSubtitle">Sous-titre par défaut</p>
```

### 2. Attribut `data-i18n-placeholder` pour les placeholders
```html
<input type="text" data-i18n-placeholder="searchPlaceholder" placeholder="Rechercher..." />
```

### 3. Utilisation en JavaScript
```javascript
// Utiliser la fonction t() disponible globalement via window.i18n
const text = window.i18n.t('home');
const translated = window.i18n.t('heroTitle');

// Ou utiliser la fonction t() dans app.js
const text = t('contact');
```

### 4. Changer la langue
```javascript
// Changer la langue
window.i18n.setLanguage('en'); // ou 'ar' ou 'fr'

// Obtenir la langue actuelle
const currentLang = window.i18n.getCurrentLanguage(); // 'fr', 'en', ou 'ar'
```

## Clés de traduction disponibles

### Navigation
- `home`, `directory`, `events`, `accreditation`, `joinLink`, `news`, `partnersLink`, `about`, `contact`

### Actions communes
- `loading`, `save`, `edit`, `delete`, `close`, `confirm`, `yes`, `no`, `error`, `success`, `back`
- `search`, `filter`, `all`, `showMore`, `showLess`, `readMore`, `viewDetails`

### Informations
- `contact`, `phone`, `email`, `website`, `address`, `description`, `services`, `languages`, `location`, `date`, `time`

### Statuts
- `status`, `active`, `inactive`, `pending`, `approved`, `rejected`, `published`, `draft`, `archived`, `cancelled`

## Exemple complet

```html
<!-- Dans une vue Blade -->
<div>
    <h1 data-i18n="heroTitle">Titre par défaut</h1>
    <input type="text" data-i18n-placeholder="searchPlaceholder" />
    <button data-i18n="searchButton">Rechercher</button>
</div>

<script>
    // Le système mettra automatiquement à jour tous les éléments avec data-i18n
    // Vous pouvez aussi changer la langue manuellement :
    document.getElementById('lang-btn').addEventListener('click', () => {
        window.i18n.setLanguage('en');
    });
</script>
```

## Sélecteur de langue

Le sélecteur de langue est automatiquement inclus dans le header. Il permet de changer entre FR, EN et AR.

La langue sélectionnée est sauvegardée dans `localStorage` et persiste entre les sessions.
