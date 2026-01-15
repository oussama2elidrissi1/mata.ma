export const REGIONS = [
  'Casablanca-Settat',
  'Rabat-Salé-Kénitra',
  'Fès-Meknès',
  'Marrakech-Safi',
  'Tanger-Tétouan-Al Hoceïma',
  'Oriental',
  'Béni Mellal-Khénifra',
  'Souss-Massa',
  'Guelmim-Oued Noun',
  'Laâyoune-Sakia El Hamra',
  'Dakhla-Oued Ed-Dahab',
] as const

export const ACTOR_TYPES = [
  { value: 'hotel', label: 'Hôtel', icon: '🏨' },
  { value: 'restaurant', label: 'Restaurant', icon: '🍽️' },
  { value: 'travel_agency', label: 'Agence de Voyage', icon: '✈️' },
  { value: 'tour_guide', label: 'Guide Touristique', icon: '🗺️' },
  { value: 'transport', label: 'Transport', icon: '🚌' },
  { value: 'attraction', label: 'Attraction', icon: '🎯' },
  { value: 'other', label: 'Autre', icon: '📦' },
] as const

export const CATEGORIES = [
  { value: 'luxury', label: 'Luxe', color: 'purple' },
  { value: 'premium', label: 'Premium', color: 'blue' },
  { value: 'standard', label: 'Standard', color: 'green' },
  { value: 'budget', label: 'Économique', color: 'yellow' },
] as const

export const STATUS_LABELS = {
  active: 'Actif',
  inactive: 'Inactif',
  pending: 'En attente',
  suspended: 'Suspendu',
} as const
