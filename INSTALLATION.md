# Guide d'Installation - MATA

## Prérequis

- PHP >= 8.1
- Composer
- Node.js >= 18
- MySQL/PostgreSQL
- Git

## Installation Backend (Laravel)

### 1. Installer les dépendances

```bash
cd backend
composer install
```

### 2. Configuration de l'environnement

```bash
cp .env.example .env
php artisan key:generate
```

### 3. Configurer la base de données

Éditez le fichier `.env` et configurez votre base de données:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=mata
DB_USERNAME=root
DB_PASSWORD=votre_mot_de_passe
```

### 4. Exécuter les migrations

```bash
php artisan migrate
```

### 5. (Optionnel) Remplir la base de données avec des données de test

```bash
php artisan db:seed --class=TourismActorSeeder
```

### 6. Démarrer le serveur

```bash
php artisan serve
```

Le backend sera accessible sur `http://localhost:8000`

## Installation Frontend (Next.js)

### 1. Installer les dépendances

```bash
cd frontend
npm install
```

### 2. Configuration de l'environnement

Créez un fichier `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 3. Démarrer le serveur de développement

```bash
npm run dev
```

Le frontend sera accessible sur `http://localhost:3000`

## Structure des URLs API

### Acteurs du Tourisme

- `GET /api/tourism-actors` - Liste des acteurs (avec filtres)
- `GET /api/tourism-actors/{id}` - Détails d'un acteur
- `GET /api/tourism-actors/regions/list` - Liste des régions
- `GET /api/tourism-actors/cities/list` - Liste des villes

### Paramètres de recherche

- `search` - Recherche textuelle
- `type` - Type d'acteur (hotel, restaurant, etc.)
- `region` - Région
- `city` - Ville
- `verified` - Acteurs vérifiés uniquement (true/false)
- `status` - Statut (active, inactive, pending, suspended)
- `per_page` - Nombre de résultats par page (défaut: 15)
- `sort_by` - Champ de tri (défaut: created_at)
- `sort_order` - Ordre de tri (asc/desc, défaut: desc)

## Exemples de requêtes

### Recherche simple
```
GET /api/tourism-actors?search=hotel
```

### Filtres multiples
```
GET /api/tourism-actors?type=hotel&region=Marrakech-Safi&verified=true
```

### Pagination
```
GET /api/tourism-actors?per_page=20&page=2
```

## Prochaines étapes

1. Configurer l'authentification (Laravel Sanctum)
2. Ajouter la gestion des images
3. Implémenter la carte interactive
4. Ajouter le système de commentaires/avis
5. Créer le panneau d'administration
