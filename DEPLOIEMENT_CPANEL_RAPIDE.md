# 🚀 Guide Rapide - Déploiement cPanel

## Étapes Essentielles

### 1️⃣ Préparation (cPanel)

1. **Créer la base de données MySQL** dans cPanel
2. **Sélectionner PHP 8.1+** dans "Select PHP Version"
3. **Installer Node.js 18+** via "Node.js Selector" (si disponible)

### 2️⃣ Télécharger le Code

```bash
cd ~/public_html/mata.ma
git pull origin main
```

### 3️⃣ Backend Laravel

```bash
cd ~/public_html/mata.ma/backend

# Installer Composer (si pas déjà installé)
curl -sS https://getcomposer.org/installer | php

# Installer les dépendances
php composer.phar install --no-dev --optimize-autoloader

# Configurer .env
cp .env.example .env
nano .env  # Configurez DB_DATABASE, DB_USERNAME, DB_PASSWORD

# Générer la clé
php artisan key:generate

# Migrations
php artisan migrate --force

# Permissions
chmod -R 755 storage bootstrap/cache
```

### 4️⃣ Frontend Next.js

```bash
cd ~/public_html/mata.ma/frontend

# Installer les dépendances
npm install

# Créer .env.local
echo "NEXT_PUBLIC_API_URL=https://mata.ma/api" > .env.local

# Build
npm run build
```

### 5️⃣ Configuration cPanel

#### Option A : Laravel comme API (Sous-domaine)

1. Créez un sous-domaine `api.mata.ma`
2. Pointez-le vers `~/public_html/mata.ma/backend/public`
3. Dans `frontend/.env.local` : `NEXT_PUBLIC_API_URL=https://api.mata.ma/api`

#### Option B : Next.js Standalone avec PM2

```bash
# Installer PM2
npm install -g pm2

# Démarrer Next.js
cd ~/public_html/mata.ma/frontend
pm2 start npm --name "mata-frontend" -- start
pm2 save
pm2 startup
```

### 6️⃣ Vérification

- ✅ API : `https://api.mata.ma/api/tourism-actors`
- ✅ Frontend : `https://mata.ma`

## 🔧 Configuration .env (Backend)

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://mata.ma

DB_CONNECTION=mysql
DB_HOST=localhost
DB_DATABASE=votre_db
DB_USERNAME=votre_user
DB_PASSWORD=votre_password
```

## 📝 Commandes Utiles

```bash
# Voir les logs Laravel
tail -f ~/public_html/mata.ma/backend/storage/logs/laravel.log

# Redémarrer Next.js
pm2 restart mata-frontend

# Mettre à jour le projet
cd ~/public_html/mata.ma
git pull origin main
cd backend && php artisan migrate --force && php artisan config:cache
cd ../frontend && npm install && npm run build && pm2 restart mata-frontend
```

## ⚠️ Problèmes Courants

**Erreur 500** → Vérifiez les permissions `storage` et `bootstrap/cache`

**Next.js ne démarre pas** → Vérifiez que Node.js est installé : `node -v`

**CORS errors** → Configurez `backend/config/cors.php`

---

📚 **Guide complet** : Voir `CPANEL_DEPLOYMENT.md`
