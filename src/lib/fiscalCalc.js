const TAUX_COTISATIONS_SALARIALES = 0.22  // approximation 2024 (réel ≈ 23-24%, varie selon la situation)
const TAUX_CHARGES_PATRONALES = 0.42       // approximation 2024 (réel ≈ 40-45%)

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

const TRANCHES = [
  { min: 0,      max: 11294,   rate: 0    },
  { min: 11294,  max: 28797,   rate: 0.11 },
  { min: 28797,  max: 82341,   rate: 0.30 },
  { min: 82341,  max: 177106,  rate: 0.41 },
  { min: 177106, max: Infinity, rate: 0.45 },
]

const PLAFOND_DEMI_PART_2024 = 879.5  // 1 759€ / 2 per half-part (art. 197 CGI)

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

  // Apply quotient familial cap (art. 197 CGI): max 879.5€ reduction per extra half-part
  if (parts > 1) {
    const extraHalfParts = (parts - 1) * 2
    const ir1Part = Math.round(irBaseBracketed(revenuImposable))
    const maxReduction = extraHalfParts * PLAFOND_DEMI_PART_2024
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

const PASS_2024 = 46368

// Simplified estimate: uses only the 2×PASS cap (92 736€ in 2024) as the exoneration ceiling.
// The full legal formula (art. L1237-19 et art. 80 duodecies CGI) also considers:
//   - 50% of total indemnity, and
//   - 1× annual gross salary.
// The exoneration is capped at the highest of those three limits.
// For this public simulator, using 2×PASS alone is a reasonable approximation for most cases.
export function computeRC(salaireBrut, anciennete) {
  const EXONERATION_MAX = 2 * PASS_2024

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
