export function grossToNet(gross) {
  return gross * 0.78
}

export function netToGross(net) {
  return net / 0.78
}

export function employerCost(gross) {
  return gross * 1.42
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

export function computeIR(revenuImposable, parts = 1) {
  const revenuParPart = revenuImposable / parts
  let irParPart = 0
  const detail = []

  for (const t of TRANCHES) {
    if (revenuParPart <= t.min) break
    const base = Math.min(revenuParPart, t.max) - t.min
    const impot = base * t.rate
    irParPart += impot
    if (t.rate > 0) detail.push({ rate: t.rate, base: Math.round(base * parts), impot: Math.round(impot * parts) })
  }

  const irTotal = Math.round(irParPart * parts)
  const tauxMoyen = revenuImposable > 0 ? irTotal / revenuImposable : 0

  let tauxMarginal = 0
  for (const t of TRANCHES) {
    if (revenuParPart > t.min) tauxMarginal = t.rate
  }

  return { irTotal, tauxMoyen, tauxMarginal, detail }
}

const PASS_2024 = 46368

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
