import { useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Seo from '../components/Seo'
import LegalNote from '../components/LegalNote'
import { computeIR } from '../lib/fiscalCalc'

const BASE = 'https://fiscalite.my-monkey.fr'

const copy = {
  fr: {
    title: 'Simulateur Impôt sur le Revenu 2026 — Barème IR France',
    description: 'Estimez votre impôt sur le revenu 2026 : barème par tranches, quotient familial, taux moyen et marginal.',
    h1: 'Simulateur IR 2026',
    revenu: 'Revenu net imposable (€)',
    abattLabel: 'Appliquer abattement forfaitaire 10% (salariés)',
    parts: 'Quotient familial (parts)',
    irTotal: 'Impôt total', tauxMoyen: 'Taux moyen', tauxMarginal: 'Taux marginal',
    tranche: 'Tranche', base: 'Base imposable', impot: 'Impôt',
    back: '← Retour',
  },
  en: {
    title: '2026 French Income Tax Simulator — IR Calculator',
    description: 'Estimate your 2026 French income tax: tax brackets, family quotient, average and marginal rates.',
    h1: 'Income Tax 2026',
    revenu: 'Net taxable income (€)',
    abattLabel: 'Apply 10% flat deduction (employees)',
    parts: 'Family quotient (parts)',
    irTotal: 'Total tax', tauxMoyen: 'Average rate', tauxMarginal: 'Marginal rate',
    tranche: 'Bracket', base: 'Taxable base', impot: 'Tax',
    back: '← Back',
  },
}

const PARTS_OPTIONS = [1, 1.5, 2, 2.5, 3]

export default function SimulateurIR({ lang = 'fr' }) {
  const c = copy[lang]
  const frPath = '/simulateur-ir'
  const enPath = '/en/income-tax'
  const canonical = `${BASE}${lang === 'en' ? enPath : frPath}`

  const [revenu, setRevenu] = useState('')
  const [abattement, setAbattement] = useState(false)
  const [parts, setParts] = useState(1)

  const revenuVal = parseFloat(revenu) || 0
  let revenuImposable = revenuVal
  if (abattement && revenuVal > 0) {
    const ded = Math.min(Math.max(revenuVal * 0.1, 504), 14426)
    revenuImposable = revenuVal - ded
  }

  const result = revenuImposable > 0 ? computeIR(revenuImposable, parts) : null
  const fmt = v => Math.round(v).toLocaleString('fr-FR') + ' €'
  const pct = v => (v * 100).toFixed(1) + ' %'

  const jsonLd = { '@context': 'https://schema.org', '@type': 'WebApplication', name: c.h1, description: c.description, url: canonical, applicationCategory: 'FinanceApplication' }

  return (
    <>
      <Seo title={c.title} description={c.description} canonical={canonical} hreflangFr={`${BASE}${frPath}`} hreflangEn={`${BASE}${enPath}`} jsonLd={jsonLd} />
      <Nav lang={lang} />
      <main style={{ maxWidth: 640, margin: '0 auto', padding: '32px 20px' }}>
        <Link to={lang === 'en' ? '/en/' : '/'} style={{ color: '#9ca3af', fontSize: 12, textDecoration: 'none', display: 'inline-block', marginBottom: 20 }}>{c.back}</Link>
        <h1 style={{ color: '#1a1a2e', fontSize: 22, fontWeight: 800, letterSpacing: '-.03em', marginBottom: 24 }}>{c.h1}</h1>

        <div style={{ background: '#ffffff', border: '1px solid #e8e4de', borderRadius: 10, padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ display: 'block', color: '#6b7280', fontSize: 11, marginBottom: 4 }}>{c.revenu}</label>
            <input type="number" value={revenu} onChange={e => setRevenu(e.target.value)} placeholder="0"
              style={{ width: '100%', padding: '9px 12px', border: '1px solid #e8e4de', borderRadius: 6, fontSize: 14, color: '#1a1a2e', background: '#f9f7f4', outline: 'none' }} />
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 12, color: '#6b7280' }}>
            <input type="checkbox" checked={abattement} onChange={e => setAbattement(e.target.checked)} style={{ accentColor: '#059669' }} />
            {c.abattLabel}
          </label>

          <div>
            <label style={{ display: 'block', color: '#6b7280', fontSize: 11, marginBottom: 6 }}>{c.parts}</label>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {PARTS_OPTIONS.map(p => (
                <button key={p} onClick={() => setParts(p)}
                  style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #e8e4de', cursor: 'pointer', fontSize: 12, fontWeight: parts === p ? 600 : 400, background: parts === p ? '#d1fae5' : '#ffffff', color: parts === p ? '#059669' : '#6b7280' }}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          {result && (
            <>
              <div style={{ borderTop: '1px solid #e8e4de', paddingTop: 14, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {[
                  [c.irTotal,       fmt(result.irTotal),           '#1a1a2e'],
                  [c.tauxMoyen,     pct(result.tauxMoyen),         '#059669'],
                  [c.tauxMarginal,  pct(result.tauxMarginal),      '#059669'],
                ].map(([label, value, color]) => (
                  <div key={label} style={{ background: '#f9f7f4', borderRadius: 8, padding: '10px 14px' }}>
                    <div style={{ color: '#6b7280', fontSize: 11, marginBottom: 2 }}>{label}</div>
                    <div style={{ color, fontSize: 15, fontWeight: 700 }}>{value}</div>
                  </div>
                ))}
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead>
                  <tr>
                    {[c.tranche, c.base, c.impot].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '6px 8px', color: '#9ca3af', fontWeight: 500, borderBottom: '1px solid #e8e4de' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.detail.map((d, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f9f7f4' }}>
                      <td style={{ padding: '6px 8px', color: '#6b7280' }}>{(d.rate * 100).toFixed(0)} %</td>
                      <td style={{ padding: '6px 8px', color: '#1a1a2e' }}>{fmt(d.base)}</td>
                      <td style={{ padding: '6px 8px', color: '#1a1a2e', fontWeight: 600 }}>{fmt(d.impot)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
        <LegalNote lang={lang} />
      </main>
      <Footer />
    </>
  )
}
