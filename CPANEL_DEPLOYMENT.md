# Guide de Déploiement cPanel - MATA

Ce guide vous explique comment déployer le projet MATA (Laravel + Next.js) dans cPanel.

## 📋 Prérequis cPanel

- Accès SSH à votre serveur cPanel
- PHP >= 8.1 (vérifiable dans "Select PHP Version")
- Composer installé (ou via SSH)
- Node.js >= 18 (via "Node.js Selector" dans cPanel)
- Base de données MySQL créée via "MySQL Databases"

## 🏗️ Structure de Déploiement Recommandée

```
~/public_html/
├── mata.ma/                    # Dossier principal
│   ├── backend/                # Laravel API
│   │   ├── public/            # Point d'entrée Laravel
│   │   └── ...
│   ├── frontend/              # Next.js App
│   │   ├── .next/            # Build Next.js (généré)
│   │   └── ...
│   └── index.php              # Redirection ou landing page
```

## 🚀 Étape 1 : Préparation du Serveur

### 1.1 Créer la Base de Données

1. Connectez-vous à cPanel
2. Allez dans **MySQL Databases**
3. Créez une nouvelle base de données : `mata_db` (ou votre nom)
4. Créez un utilisateur MySQL
5. Ajoutez l'utilisateur à la base de données avec tous les privilèges
6. Notez les identifiants (seront utilisés dans `.env`)

### 1.2 Configurer PHP

1. Allez dans **Select PHP Version**
2. Sélectionnez PHP 8.1 ou supérieur
3. Activez les extensions nécessaires :
   - `php-mbstring`
   - `php-xml`
   - `php-curl`
   - `php-zip`
   - `php-gd`
   - `php-mysql`

### 1.3 Installer Node.js

1. Allez dans **Node.js Selector** (si disponible)
2. Installez Node.js 18.x ou supérieur
3. Notez le chemin d'installation

## 📥 Étape 2 : Télécharger le Code

### Option A : Via Git (Recommandé)

```bash
cd ~/public_html/mata.ma
git pull origin main
```

### Option B : Via File Manager

1. Téléchargez le projet depuis GitHub
2. Extrayez-le dans `~/public_html/mata.ma/`

## ⚙️ Étape 3 : Configuration Backend (Laravel)

### 3.1 Installer les Dépendances Composer

```bash
cd ~/public_html/mata.ma/backend
composer install --no-dev --optimize-autoloader
```

**Note** : Si Composer n'est pas installé globalement :
```bash
curl -sS https://getcomposer.org/installer | php
php composer.phar install --no-dev --optimize-autoloader
```

### 3.2 Configurer le Fichier .env

```bash
cd ~/public_html/mata.ma/backend
cp .env.example .env
nano .env
```

Configurez les variables suivantes :

```env
APP_NAME=MATA
APP_ENV=production
APP_KEY=                    # Généré à l'étape suivante
APP_DEBUG=false
APP_URL=https://mata.ma

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=votre_nom_db
DB_USERNAME=votre_utilisateur_db
DB_PASSWORD=votre_mot_de_passe_db

# Pour les emails (si nécessaire)
MAIL_MAILER=smtp
MAIL_HOST=smtp.votre-hebergeur.com
MAIL_PORT=587
MAIL_USERNAME=votre_email
MAIL_PASSWORD=votre_mot_de_passe
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@mata.ma
MAIL_FROM_NAME="${APP_NAME}"
```

### 3.3 Générer la Clé d'Application

```bash
cd ~/public_html/mata.ma/backend
php artisan key:generate
```

### 3.4 Exécuter les Migrations

```bash
php artisan migrate --force
```

### 3.5 (Optionnel) Remplir avec des Données de Test

```bash
php artisan db:seed --class=TourismActorSeeder
php artisan db:seed --class=SettingSeeder
php artisan db:seed --class=AdminUserSeeder

```

### 3.6 Configurer les Permissions

```bash
cd ~/public_html/mata.ma/backend
chmod -R 755 storage
chmod -R 755 bootstrap/cache
chown -R mata:mata storage bootstrap/cache
```

### 3.7 Créer le Fichier .htaccess pour Laravel

Créez `~/public_html/mata.ma/backend/public/.htaccess` :

```apache
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    # Send Requests To Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
```

## 🎨 Étape 4 : Configuration Frontend (Next.js)

### 4.1 Installer les Dépendances Node.js

```bash
cd ~/public_html/mata.ma/frontend
npm install
```

### 4.2 Créer le Fichier .env.local

```bash
cd ~/public_html/mata.ma/frontend
nano .env.local
```

Ajoutez :

```env
NEXT_PUBLIC_API_URL=https://mata.ma/api
# Ou si votre API est sur un sous-domaine :
# NEXT_PUBLIC_API_URL=https://api.mata.ma/api
```

### 4.3 Build de Production

```bash
cd ~/public_html/mata.ma/frontend
npm run build
```

Cela créera le dossier `.next/` avec les fichiers optimisés.

## 🔧 Étape 5 : Configuration Apache/cPanel

### 5.1 Option A : Laravel comme Point d'Entrée Principal

Si vous voulez que Laravel gère les routes web ET l'API :

1. Dans cPanel, allez dans **Subdomains** ou **Addon Domains**
2. Configurez le domaine `mata.ma` pour pointer vers `~/public_html/mata.ma/backend/public`

### 5.2 Option B : Next.js comme Frontend, Laravel comme API

#### Configuration pour Next.js (Frontend Principal)

1. Configurez `mata.ma` pour pointer vers `~/public_html/mata.ma/frontend`

2. Créez un fichier `~/public_html/mata.ma/frontend/.htaccess` :

```apache
RewriteEngine On
RewriteBase /

# Handle Next.js
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]

# Ou si Next.js est en mode standalone
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

#### Configuration pour API Laravel (Sous-domaine)

1. Créez un sous-domaine `api.mata.ma` dans cPanel
2. Pointez-le vers `~/public_html/mata.ma/backend/public`

3. Mettez à jour `.env.local` du frontend :
```env
NEXT_PUBLIC_API_URL=https://api.mata.ma/api
```

### 5.3 Option C : Next.js Standalone (Recommandé pour Production)

Next.js peut être exporté en mode standalone :

1. Modifiez `frontend/next.config.js` :

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // ... autres configs
}

module.exports = nextConfig
```

2. Build et démarrez :

```bash
cd ~/public_html/mata.ma/frontend
npm run build
npm start
```

3. Utilisez un gestionnaire de processus comme PM2 :

```bash
npm install -g pm2
cd ~/public_html/mata.ma/frontend
pm2 start npm --name "mata-frontend" -- start
pm2 save
pm2 startup
```

## 🔄 Étape 6 : Configuration Cron Jobs (si nécessaire)

Pour les tâches planifiées Laravel :

1. Dans cPanel, allez dans **Cron Jobs**
2. Ajoutez une tâche :

```bash
* * * * * cd ~/public_html/mata.ma/backend && php artisan schedule:run >> /dev/null 2>&1
```

## 🚀 Étape 7 : Démarrer les Services

### Backend Laravel

Laravel fonctionne via PHP-FPM dans cPanel, pas besoin de démarrage manuel si configuré correctement.

### Frontend Next.js

Si vous utilisez Next.js en mode serveur :

```bash
cd ~/public_html/mata.ma/frontend
pm2 start npm --name "mata-frontend" -- start
```

Ou créez un script de démarrage dans cPanel :

1. Allez dans **Setup Node.js App**
2. Créez une nouvelle application :
   - **Node.js Version** : 18.x
   - **Application Root** : `~/public_html/mata.ma/frontend`
   - **Application URL** : `mata.ma` (ou votre domaine)
   - **Application Startup File** : `server.js` (ou laissez vide si Next.js)

## ✅ Étape 8 : Vérification

1. **Backend API** : Visitez `https://mata.ma/api/tourism-actors` (ou votre URL API)
2. **Frontend** : Visitez `https://mata.ma`
3. Vérifiez les logs :
   - Laravel : `~/public_html/mata.ma/backend/storage/logs/laravel.log`
   - Next.js : Vérifiez les logs PM2 ou cPanel

## 🔒 Sécurité

### Fichiers à Protéger

Assurez-vous que ces fichiers ne sont pas accessibles publiquement :

```bash
# Dans ~/public_html/mata.ma/backend/.htaccess
<Files .env>
    Order allow,deny
    Deny from all
</Files>
```

### Permissions Recommandées

```bash
# Fichiers : 644
# Dossiers : 755
# storage et bootstrap/cache : 775
find ~/public_html/mata.ma/backend -type f -exec chmod 644 {} \;
find ~/public_html/mata.ma/backend -type d -exec chmod 755 {} \;
chmod -R 775 ~/public_html/mata.ma/backend/storage
chmod -R 775 ~/public_html/mata.ma/backend/bootstrap/cache
```

## 🐛 Dépannage

### Erreur 500

1. Vérifiez les logs Laravel : `backend/storage/logs/laravel.log`
2. Vérifiez les permissions des dossiers `storage` et `bootstrap/cache`
3. Vérifiez que `.env` est correctement configuré

### Next.js ne démarre pas

1. Vérifiez que Node.js est installé : `node -v`
2. Vérifiez les logs PM2 : `pm2 logs mata-frontend`
3. Vérifiez que le port n'est pas déjà utilisé

### Problèmes de CORS

Dans `backend/config/cors.php`, configurez :

```php
'allowed_origins' => ['https://mata.ma'],
```

## 📝 Notes Importantes

- **Ne jamais** commiter le fichier `.env` (il est dans `.gitignore`)
- **Toujours** utiliser `APP_DEBUG=false` en production
- **Optimiser** Laravel en production : `php artisan config:cache` et `php artisan route:cache`
- **Surveiller** les logs régulièrement
- **Sauvegarder** régulièrement la base de données

## 🔄 Mise à Jour

Pour mettre à jour le projet :

```bash
cd ~/public_html/mata.ma
git pull origin main

# Backend
cd backend
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan config:cache
php artisan route:cache

# Frontend
cd ../frontend
npm install
npm run build
pm2 restart mata-frontend
```

---

**Besoin d'aide ?** Consultez les logs ou contactez le support technique.
