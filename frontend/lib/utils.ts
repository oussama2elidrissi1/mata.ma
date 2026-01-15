/**
 * Convertit une valeur en nombre et la formate avec une décimale
 * @param value - La valeur à convertir (peut être number, string ou null)
 * @returns La valeur formatée avec une décimale, ou "0.0" si invalide
 */
export function formatRating(value: number | string | null | undefined): string {
  if (value === null || value === undefined || value === '') {
    return '0.0'
  }
  const num = Number(value)
  if (isNaN(num)) {
    return '0.0'
  }
  return num.toFixed(1)
}

/**
 * Vérifie si un rating est valide et supérieur à 0
 * @param value - La valeur à vérifier
 * @returns true si le rating est valide et > 0
 */
export function isValidRating(value: number | string | null | undefined): boolean {
  if (value === null || value === undefined || value === '') {
    return false
  }
  const num = Number(value)
  return !isNaN(num) && num > 0
}
