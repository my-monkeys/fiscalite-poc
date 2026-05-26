import { describe, it, expect } from 'vitest'
import { grossToNet, netToGross, employerCost, aeToNet, computeIR, computeRC } from './fiscalCalc'

describe('grossToNet', () => {
  it('retire 22% du brut', () => {
    expect(grossToNet(1000)).toBeCloseTo(780)
  })
  it('retourne 0 pour 0', () => {
    expect(grossToNet(0)).toBe(0)
  })
})

describe('netToGross', () => {
  it('est l\'inverse de grossToNet', () => {
    expect(netToGross(grossToNet(2000))).toBeCloseTo(2000)
  })
})

describe('employerCost', () => {
  it('ajoute 42% sur le brut', () => {
    expect(employerCost(1000)).toBeCloseTo(1420)
  })
})

describe('aeToNet', () => {
  it('applique 12.3% pour bic-marchand', () => {
    expect(aeToNet(1000, 'bic-marchand')).toBeCloseTo(877)
  })
  it('applique 21.2% pour bic-service', () => {
    expect(aeToNet(1000, 'bic-service')).toBeCloseTo(788)
  })
  it('applique 23.1% pour bnc', () => {
    expect(aeToNet(1000, 'bnc')).toBeCloseTo(769)
  })
})

describe('computeIR', () => {
  it('retourne 0 pour revenu sous le seuil', () => {
    expect(computeIR(10000).irTotal).toBe(0)
  })
  it('calcule correctement dans la tranche 11%', () => {
    // 20000 - 11497 = 8503 dans la tranche 11% → 8503 * 0.11 = 935.33 → 935
    expect(computeIR(20000, 1).irTotal).toBe(935)
  })
  it('applique le quotient familial (2 parts)', () => {
    // revenuParPart = 20000 / 2 = 10000, sous le seuil → 0
    expect(computeIR(20000, 2).irTotal).toBe(0)
  })
  it('retourne le bon taux marginal dans la tranche 30%', () => {
    expect(computeIR(50000, 1).tauxMarginal).toBe(0.30)
  })
  it('detail contient les tranches imposées uniquement', () => {
    const r = computeIR(30000, 1)
    expect(r.detail.length).toBeGreaterThan(0)
    expect(r.detail[0].rate).toBe(0.11)
  })
  it('applique le plafond du quotient familial (art. 197 CGI)', () => {
    // Pour 80000€ à 2.5 parts, la réduction via quotient ne peut dépasser
    // 895.5€ × (2.5 - 1) × 2 = 895.5 × 3 = 2686.5€
    const ir1Part = computeIR(80000, 1).irTotal
    const ir2p5Parts = computeIR(80000, 2.5).irTotal
    const reduction = ir1Part - ir2p5Parts
    expect(reduction).toBeLessThanOrEqual(2686.5)
    // La réduction doit quand même être positive (le quotient joue un rôle)
    expect(reduction).toBeGreaterThan(0)
  })
})

describe('computeRC', () => {
  it('indemnité ≤ 10 ans : 1/4 par an', () => {
    // 3000 * 0.25 * 5 = 3750
    expect(computeRC(3000, 5).indemnite).toBe(3750)
  })
  it('indemnité > 10 ans : tranche 1/3 au-delà', () => {
    // 3000*0.25*10 + 3000*(1/3)*2 = 7500 + 2000 = 9500
    expect(computeRC(3000, 12).indemnite).toBe(9500)
  })
  it('tout exonéré si indemnité < 2×PASS', () => {
    const r = computeRC(2000, 2) // 1000 << 92736
    expect(r.partieImposable).toBe(0)
    expect(r.partieExoneree).toBe(r.indemnite)
  })
  it('découpe correctement si indemnité > 2×PASS', () => {
    // 12000*0.25*10 + 12000*(1/3)*20 = 30000 + 80000 = 110000 > 94200
    const r = computeRC(12000, 30)
    expect(r.partieExoneree).toBe(94200)
    expect(r.partieImposable).toBe(15800)
  })
})
