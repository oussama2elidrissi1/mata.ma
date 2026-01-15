# MATA - Moroccan Accredited Tourism Actors Directory

**Annuaire des Acteurs du Tourisme Accrédités au Maroc**

Un système complet de gestion et de recherche d'acteurs du tourisme accrédités au Maroc, construit avec Laravel (backend) et Next.js (frontend).

## 🎯 Fonctionnalités Principales

- ✅ **Recherche avancée** : Recherche textuelle dans les noms, descriptions et localisations
- ✅ **Filtres multiples** : Par type, région, ville, statut de vérification
- ✅ **Interface moderne** : Design professionnel et responsive
- ✅ **API REST complète** : Backend Laravel avec endpoints documentés
- ✅ **Gestion des accréditations** : Suivi des numéros et dates d'accréditation
- ✅ **Système de vérification** : Badge pour les acteurs vérifiés
- ✅ **Multi-langue** : Support français et arabe

## 🏗️ Architecture

- **Backend**: Laravel 10+ (API REST)
- **Frontend**: Next.js 14+ (React 18+)
- **Base de données**: MySQL/PostgreSQL
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 📁 Structure du Projet

```
annuaire/
├── backend/              # Laravel API
│   ├── app/
│   │   ├── Models/
│   │   ├── Http/Controllers/Api/
│   │   └── ...
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   └── routes/
├── frontend/            # Next.js Application
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── types/
├── README.md
├── INSTALLATION.md
└── QUICK_START.md
```

## 🚀 Installation Rapide

Consultez le [Guide de Démarrage Rapide](./QUICK_START.md) pour une installation en 5 minutes.

### Prérequis

- PHP >= 8.1
- Composer
- Node.js >= 18
- MySQL/PostgreSQL

### Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
# Configurez votre base de données dans .env
php artisan migrate
php artisan db:seed --class=TourismActorSeeder  # Optionnel
php artisan serve
```

### Frontend

```bash
cd frontend
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local
npm run dev
```

## 📚 Documentation

- [Guide de Démarrage Rapide](./QUICK_START.md) - Pour démarrer rapidement
- [Guide d'Installation Complet](./INSTALLATION.md) - Instructions détaillées

## 🎨 Types d'Acteurs Supportés

- 🏨 Hôtels
- 🍽️ Restaurants
- ✈️ Agences de Voyage
- 🗺️ Guides Touristiques
- 🚌 Transports
- 🎯 Attractions
- 📦 Autres

## 🔌 API Endpoints

### Acteurs du Tourisme

- `GET /api/tourism-actors` - Liste des acteurs (avec filtres)
- `GET /api/tourism-actors/{id}` - Détails d'un acteur
- `GET /api/tourism-actors/regions/list` - Liste des régions
- `GET /api/tourism-actors/cities/list` - Liste des villes

### Paramètres de Recherche

- `search` - Recherche textuelle
- `type` - Type d'acteur
- `region` - Région
- `city` - Ville
- `verified` - Acteurs vérifiés (true/false)
- `per_page` - Résultats par page

## 🛠️ Technologies Utilisées

### Backend
- Laravel 10+
- Laravel Sanctum (authentification)
- MySQL/PostgreSQL

### Frontend
- Next.js 14+
- React 18+
- TypeScript
- Tailwind CSS
- Axios
- Framer Motion

## 📝 Licence

MIT

## 👥 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📧 Contact

Pour toute question, contactez-nous à contact@mata.ma

