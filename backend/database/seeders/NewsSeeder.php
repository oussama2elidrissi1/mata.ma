<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\News;
use Carbon\Carbon;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $news = [
            [
                'title' => 'MATA lance une nouvelle initiative pour le tourisme durable au Maroc',
                'excerpt' => 'L\'organisation MATA annonce le lancement d\'un programme ambitieux visant à promouvoir le tourisme durable et responsable à travers tout le Maroc.',
                'content' => "L'organisation MATA (Moroccan Accredited Tourism Actors) est fière d'annoncer le lancement d'une nouvelle initiative majeure pour le développement du tourisme durable au Maroc.\n\nCette initiative s'inscrit dans la continuité de notre engagement en faveur d'un tourisme responsable qui respecte l'environnement, préserve le patrimoine culturel et bénéficie aux communautés locales.\n\nLe programme comprend plusieurs axes d'action :\n- Formation des professionnels du tourisme aux pratiques durables\n- Certification des établissements respectueux de l'environnement\n- Promotion des circuits touristiques écoresponsables\n- Soutien aux initiatives locales de développement durable\n\nNous invitons tous les acteurs du secteur touristique à rejoindre cette initiative et à contribuer à un avenir plus durable pour le tourisme marocain.",
                'category' => 'Initiative',
                'author' => 'MATA',
                'image' => 'https://images.unsplash.com/photo-1504711434969-e33886180f91?w=800&h=400&fit=crop',
                'featured' => true,
                'status' => 'published',
                'published_at' => Carbon::now()->subDays(2),
            ],
            [
                'title' => 'Nouveau partenariat stratégique avec les opérateurs touristiques européens',
                'excerpt' => 'MATA signe un accord de partenariat historique avec plusieurs organisations touristiques européennes pour renforcer la coopération et promouvoir le Maroc comme destination de choix.',
                'content' => "Dans le cadre de son expansion internationale, MATA a conclu un partenariat stratégique majeur avec plusieurs organisations touristiques européennes de premier plan.\n\nCe partenariat vise à :\n- Faciliter les échanges entre les professionnels du tourisme marocains et européens\n- Promouvoir le Maroc comme destination touristique de qualité\n- Développer des circuits touristiques transnationaux\n- Partager les meilleures pratiques du secteur\n\nCette collaboration représente une étape importante dans le développement du tourisme marocain et renforce la position du Maroc sur la scène touristique internationale.",
                'category' => 'Partenariat',
                'author' => 'MATA',
                'image' => 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop',
                'featured' => true,
                'status' => 'published',
                'published_at' => Carbon::now()->subDays(5),
            ],
            [
                'title' => 'Formation continue : Nouvelles sessions disponibles pour les guides touristiques',
                'excerpt' => 'MATA propose de nouvelles sessions de formation continue pour les guides touristiques, couvrant les dernières tendances et les meilleures pratiques du secteur.',
                'content' => "MATA annonce l'ouverture de nouvelles sessions de formation continue destinées aux guides touristiques accrédités.\n\nCes formations couvrent :\n- Les nouvelles réglementations du secteur touristique\n- Les techniques de communication interculturelle\n- La gestion des groupes et la sécurité\n- Les nouvelles technologies au service du tourisme\n- Le développement durable dans le tourisme\n\nLes sessions sont organisées dans plusieurs villes du Maroc et sont accessibles à tous les guides accrédités MATA. Les inscriptions sont ouvertes dès maintenant.",
                'category' => 'Formation',
                'author' => 'MATA',
                'image' => 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
                'featured' => false,
                'status' => 'published',
                'published_at' => Carbon::now()->subDays(7),
            ],
            [
                'title' => 'Salon du Tourisme 2024 : MATA présente ses nouveaux services',
                'excerpt' => 'MATA participera au prochain Salon International du Tourisme avec un stand dédié à la présentation de ses nouveaux services et initiatives.',
                'content' => "MATA sera présente au Salon International du Tourisme 2024 qui se tiendra à Casablanca du 15 au 17 mars prochain.\n\nSur notre stand, vous pourrez découvrir :\n- Nos nouveaux services d'accréditation\n- Les dernières initiatives en faveur du tourisme durable\n- Les opportunités de partenariat\n- Les formations disponibles pour les professionnels\n\nNotre équipe sera disponible pour répondre à toutes vos questions et vous présenter comment MATA peut vous accompagner dans votre développement professionnel.\n\nNous vous attendons nombreux sur notre stand !",
                'category' => 'Événement',
                'author' => 'MATA',
                'image' => 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
                'featured' => false,
                'status' => 'published',
                'published_at' => Carbon::now()->subDays(10),
            ],
            [
                'title' => 'Mise à jour de la plateforme : Nouvelles fonctionnalités disponibles',
                'excerpt' => 'La plateforme MATA a été mise à jour avec de nouvelles fonctionnalités pour améliorer l\'expérience utilisateur et faciliter la gestion des accréditations.',
                'content' => "Nous sommes heureux d'annoncer la mise à jour majeure de la plateforme MATA avec de nombreuses nouvelles fonctionnalités.\n\nParmi les améliorations :\n- Interface utilisateur modernisée et plus intuitive\n- Système de recherche amélioré\n- Gestion simplifiée des accréditations\n- Tableau de bord personnalisé pour chaque utilisateur\n- Notifications en temps réel\n- Export de données facilité\n\nCes améliorations visent à rendre la plateforme plus accessible et plus efficace pour tous les acteurs du tourisme accrédités MATA.",
                'category' => 'Technologie',
                'author' => 'MATA',
                'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
                'featured' => false,
                'status' => 'published',
                'published_at' => Carbon::now()->subDays(12),
            ],
            [
                'title' => 'Appel à candidatures : Programme de mentorat pour les nouveaux acteurs',
                'excerpt' => 'MATA lance un nouveau programme de mentorat destiné aux nouveaux acteurs du tourisme pour les accompagner dans leur développement professionnel.',
                'content' => "MATA lance un programme de mentorat innovant pour accompagner les nouveaux acteurs du tourisme dans leur développement professionnel.\n\nCe programme offre :\n- Un accompagnement personnalisé par des professionnels expérimentés\n- Des sessions de coaching régulières\n- L'accès à un réseau de mentors qualifiés\n- Des ressources et outils de développement\n- Des opportunités de networking\n\nLes candidatures sont ouvertes jusqu'au 30 mars 2024. Tous les acteurs accrédités MATA peuvent postuler.",
                'category' => 'Programme',
                'author' => 'MATA',
                'image' => 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop',
                'featured' => false,
                'status' => 'published',
                'published_at' => Carbon::now()->subDays(15),
            ],
        ];

        foreach ($news as $article) {
            News::create($article);
        }
    }
}
