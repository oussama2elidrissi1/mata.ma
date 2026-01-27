#!/bin/bash

# Script de déploiement automatique pour cPanel
# Usage: ./deploy-cpanel.sh

set -e

echo "🚀 Déploiement MATA sur cPanel..."
echo ""

# Couleurs pour les messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Vérifier qu'on est dans le bon répertoire
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo -e "${RED}❌ Erreur: Ce script doit être exécuté depuis la racine du projet${NC}"
    exit 1
fi

# 1. Backend - Installation des dépendances
echo -e "${YELLOW}📦 Installation des dépendances Composer (backend)...${NC}"
cd backend
if [ -f "composer.phar" ]; then
    php composer.phar install --no-dev --optimize-autoloader
else
    composer install --no-dev --optimize-autoloader
fi

# 2. Backend - Configuration .env
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚙️  Création du fichier .env...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✅ Fichier .env créé. Veuillez le configurer manuellement.${NC}"
fi

# 3. Backend - Générer la clé d'application
echo -e "${YELLOW}🔑 Génération de la clé d'application...${NC}"
php artisan key:generate --force

# 4. Backend - Migrations
echo -e "${YELLOW}🗄️  Exécution des migrations...${NC}"
php artisan migrate --force

# 5. Backend - Cache de configuration
echo -e "${YELLOW}⚡ Optimisation de Laravel...${NC}"
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 6. Backend - Permissions
echo -e "${YELLOW}🔒 Configuration des permissions...${NC}"
chmod -R 755 storage
chmod -R 755 bootstrap/cache

cd ..

# 7. Frontend - Installation des dépendances
echo -e "${YELLOW}📦 Installation des dépendances npm (frontend)...${NC}"
cd frontend
npm install

# 8. Frontend - Build de production
echo -e "${YELLOW}🏗️  Build de production Next.js...${NC}"
npm run build

cd ..

echo ""
echo -e "${GREEN}✅ Déploiement terminé avec succès!${NC}"
echo ""
echo "📝 Prochaines étapes:"
echo "1. Configurez le fichier backend/.env avec vos paramètres de base de données"
echo "2. Configurez le fichier frontend/.env.local avec votre URL API"
echo "3. Configurez votre domaine dans cPanel pour pointer vers le bon répertoire"
echo "4. (Optionnel) Exécutez les seeders: cd backend && php artisan db:seed"
echo ""
echo "📚 Consultez CPANEL_DEPLOYMENT.md pour plus de détails"
