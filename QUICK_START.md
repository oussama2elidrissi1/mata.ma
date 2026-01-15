# Guide de Démarrage Rapide - MATA

## 🚀 Démarrage en 5 minutes

### 1. Backend (Laravel)

```bash
# Aller dans le dossier backend
cd backend

# Installer les dépendances
composer install

# Copier le fichier d'environnement
cp .env.example .env

# Générer la clé d'application
php artisan key:generate

# Configurer votre base de données dans .env
# DB_DATABASE=mata
# DB_USERNAME=root
# DB_PASSWORD=votre_mot_de_passe

# Exécuter les migrations
php artisan migrate

# (Optionnel) Remplir avec des données de test
php artisan db:seed --class=TourismActorSeeder

# Démarrer le serveur
php artisan serve
```

✅ Backend disponible sur: http://localhost:8000

### 2. Frontend (Next.js)

```bash
# Aller dans le dossier frontend
cd frontend

# Installer les dépendances
npm install

# Créer le fichier .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local

# Démarrer le serveur de développement
npm run dev
```

✅ Frontend disponible sur: http://localhost:3000

## 📋 Fonctionnalités Implémentées

### Backend
- ✅ API REST complète pour les acteurs du tourisme
- ✅ Modèle TourismActor avec tous les champs nécessaires
- ✅ Migration de base de données
- ✅ Contrôleur API avec filtres et recherche
- ✅ Seeder pour données de test
- ✅ Configuration CORS pour Next.js

### Frontend
- ✅ Interface moderne et professionnelle
- ✅ Page d'accueil avec recherche et filtres
- ✅ Cartes d'acteurs avec design élégant
- ✅ Page de détail pour chaque acteur
- ✅ Filtres par type, région, ville
- ✅ Recherche textuelle
- ✅ Design responsive
- ✅ Header et Footer professionnels

## 🎨 Design

L'interface utilise:
- **Tailwind CSS** pour le styling
- **Framer Motion** pour les animations (prêt à utiliser)
- **Lucide React** pour les icônes
- **Gradient moderne** avec couleurs primaires et secondaires
- **Design responsive** pour mobile et desktop

## 📝 Types d'Acteurs Supportés

- 🏨 Hôtel
- 🍽️ Restaurant
- ✈️ Agence de Voyage
- 🗺️ Guide Touristique
- 🚌 Transport
- 🎯 Attraction
- 📦 Autre

## 🔍 Exemples de Requêtes API

### Liste des acteurs
```
GET http://localhost:8000/api/tourism-actors
```

### Recherche
```
GET http://localhost:8000/api/tourism-actors?search=hotel
```

### Filtres
```
GET http://localhost:8000/api/tourism-actors?type=hotel&region=Marrakech-Safi&verified=true
```

### Détails d'un acteur
```
GET http://localhost:8000/api/tourism-actors/1
```

## 🛠️ Prochaines Étapes

1. **Authentification**: Ajouter Laravel Sanctum
2. **Upload d'images**: Configurer le stockage des logos et photos
3. **Carte interactive**: Intégrer Google Maps ou Leaflet
4. **Système d'avis**: Ajouter les commentaires et notes
5. **Panneau admin**: Interface d'administration
6. **Export PDF**: Générer des rapports
7. **Notifications**: Système de notifications email

## 📚 Documentation

- [Guide d'Installation Complet](./INSTALLATION.md)
- [README Principal](./README.md)

## 🐛 Dépannage

### Erreur CORS
Vérifiez que `FRONTEND_URL` dans `.env` correspond à votre URL frontend.

### Erreur de connexion à la base de données
Vérifiez vos identifiants dans le fichier `.env`.

### Erreur 404 sur les routes API
Assurez-vous que le serveur Laravel est bien démarré sur le port 8000.

## 💡 Astuces

- Utilisez `php artisan tinker` pour tester les modèles
- Les données de test incluent des acteurs dans plusieurs villes marocaines
- Le design est entièrement personnalisable via Tailwind CSS
