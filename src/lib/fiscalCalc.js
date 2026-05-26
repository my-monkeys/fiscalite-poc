const TAUX_COTISATIONS_SALARIALES = 0.22  // approximation (réel ≈ 23-24%, varie selon la situation)
const TAUX_CHARGES_PATRONALES = 0.42       // approximation (réel ≈ 40-45%)

export function grossToNet(gross) {
  return gross * (1 - TAUX_COTISATIONS_SALARIALES)
}

export function netToGross(net) {
  return net / (1 - TAUX_COTISATIONS_SALARIALES)
}

export function employerCost(gross) {
  return gross * (1 + TAUX_CHARGES_PATRONALES)
}

const AE_RATES = {
  'bic-marchand': 0.123,
  'bic-service': 0.212,
  'bnc': 0.231,
}

export function aeToNet(ca, category) {
  const rate = AE_RATES[category] ?? 0.212
  return ca * (1 - rate)
}

// Barème IR 2025 (revenus 2024, déclarés au printemps 2025) — loi de finances 2025
// Indexé +1,8% par rapport à 2024. Valeurs 2026 à confirmer avec la loi de finances 2026.
const TRANCHES = [
  { min: 0,      max: 11497,   rate: 0    },
  { min: 11497,  max: 29315,   rate: 0.11 },
  { min: 29315,  max: 83823,   rate: 0.30 },
  { min: 83823,  max: 180294,  rate: 0.41 },
  { min: 180294, max: Infinity, rate: 0.45 },
]

// Plafond du quotient familial 2025 : 1 791€/demi-part (art. 197 CGI)
// La formule utilise extraHalfParts = (parts-1)*2, d'où 1791/2 = 895.5
const PLAFOND_DEMI_PART = 895.5

function irBaseBracketed(revenuParPart) {
  let total = 0
  for (const t of TRANCHES) {
    if (revenuParPart <= t.min) break
    total += (Math.min(revenuParPart, t.max) - t.min) * t.rate
  }
  return total
}

export function computeIR(revenuImposable, parts = 1) {
  const revenuParPart = revenuImposable / parts
  const irParPart = irBaseBracketed(revenuParPart)

  // Build detail from the per-part calculation
  const detail = []
  for (const t of TRANCHES) {
    if (revenuParPart <= t.min) break
    const base = Math.min(revenuParPart, t.max) - t.min
    const impot = base * t.rate
    if (t.rate > 0) detail.push({ rate: t.rate, base: Math.round(base * parts), impot: Math.round(impot * parts) })
  }

  let irTotal = Math.round(irParPart * parts)

  // Apply quotient familial cap (art. 197 CGI): max 895.5€ reduction per extra half-part
  if (parts > 1) {
    const extraHalfParts = (parts - 1) * 2
    const ir1Part = Math.round(irBaseBracketed(revenuImposable))
    const maxReduction = extraHalfParts * PLAFOND_DEMI_PART
    const actualReduction = ir1Part - irTotal
    if (actualReduction > maxReduction) {
      irTotal = Math.round(ir1Part - maxReduction)
    }
  }

  const tauxMoyen = revenuImposable > 0 ? irTotal / revenuImposable : 0

  let tauxMarginal = 0
  for (const t of TRANCHES) {
    if (revenuParPart > t.min) tauxMarginal = t.rate
  }

  return { irTotal, tauxMoyen, tauxMarginal, detail }
}

// PASS 2025 : 47 100€ — Plafond Annuel de la Sécurité Sociale
// PASS 2026 à confirmer avec la loi de financement de la sécurité sociale 2026.
const PASS = 47100

// Simplified estimate: uses only the 2×PASS cap as the exoneration ceiling.
// The full legal formula (art. L1237-19 et art. 80 duodecies CGI) also considers:
//   - 50% of total indemnity, and
//   - 1× annual gross salary.
// The exoneration is capped at the highest of those three limits.
// For this public simulator, using 2×PASS alone is a reasonable approximation for most cases.
export function computeRC(salaireBrut, anciennete) {
  const EXONERATION_MAX = 2 * PASS

  let indemnite
  if (anciennete <= 10) {
    indemnite = salaireBrut * 0.25 * anciennete
  } else {
    indemnite = salaireBrut * 0.25 * 10 + salaireBrut * (1 / 3) * (anciennete - 10)
  }

  const partieExoneree = Math.min(indemnite, EXONERATION_MAX)
  const partieImposable = Math.max(0, indemnite - EXONERATION_MAX)

  return {
    indemnite: Math.round(indemnite),
    partieExoneree: Math.round(partieExoneree),
    partieImposable: Math.round(partieImposable),
  }
}
