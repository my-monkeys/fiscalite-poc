import { useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Seo from '../components/Seo'
import LegalNote from '../components/LegalNote'
import { computeRC } from '../lib/fiscalCalc'

const BASE = 'https://fiscalite.my-monkey.fr'

const copy = {
  fr: {
    title: 'Calculateur Rupture Conventionnelle 2024 — Indemnité légale',
    description: 'Calculez votre indemnité de rupture conventionnelle, la part exonérée et imposable. Barème légal 2024, PASS inclus.',
    h1: 'Rupture conventionnelle',
    salaire: 'Salaire brut mensuel moyen (12 derniers mois)',
    ans: 'Ancienneté — années',
    mois: 'Ancienneté — mois supplémentaires',
    indemnite: 'Indemnité brute',
    exoneree: 'Part exonérée',
    imposable: 'Part imposable',
    note: 'Exonération limitée à 2 × PASS 2024 = 92 736 €. Indemnité ≤ 10 ans : ¼ salaire/an ; > 10 ans : ⅓ salaire/an (tranche supérieure).',
    back: '← Retour',
  },
  en: {
    title: 'French Severance Pay Calculator 2024 — Rupture Conventionnelle',
    description: 'Calculate your severance pay (rupture conventionnelle), tax-exempt and taxable portions. 2024 French legal scale.',
    h1: 'Severance Pay',
    salaire: 'Average monthly gross salary (last 12 months)',
    ans: 'Years of service',
    mois: 'Additional months',
    indemnite: 'Gross severance',
    exoneree: 'Tax-exempt portion',
    imposable: 'Taxable portion',
    note: 'Exemption capped at 2 × PASS 2024 = €92,736. ≤10 years: ¼ month/year; >10 years: ⅓ month/year (above 10).',
    back: '← Back',
  },
}

const inputStyle = { width: '100%', padding: '9px 12px', border: '1px solid #e8e4de', borderRadius: 6, fontSize: 14, color: '#1a1a2e', background: '#f9f7f4', outline: 'none' }

export default function RuptureConventionnelle({ lang = 'fr' }) {
  const c = copy[lang]
  const frPath = '/rupture-conventionnelle'
  const enPath = '/en/severance'
  const canonical = `${BASE}${lang === 'en' ? enPath : frPath}`

  const [salaire, setSalaire] = useState('')
  const [ans, setAns] = useState('')
  const [mois, setMois] = useState('')

  const salaireVal = parseFloat(salaire) || 0
  const anciennete = (parseInt(ans) || 0) + (parseInt(mois) || 0) / 12
  const result = salaireVal > 0 && anciennete > 0 ? computeRC(salaireVal, anciennete) : null
  const fmt = v => Math.round(v).toLocaleString('fr-FR') + ' €'

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
            <label style={{ display: 'block', color: '#6b7280', fontSize: 11, marginBottom: 4 }}>{c.salaire}</label>
            <input type="number" value={salaire} onChange={e => setSalaire(e.target.value)} placeholder="0" style={inputStyle} />
          </div>

          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label style={{ display: 'block', color: '#6b7280', fontSize: 11, marginBottom: 4 }}>{c.ans}</label>
              <input type="number" value={ans} onChange={e => setAns(e.target.value)} placeholder="0" min="0" style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#6b7280', fontSize: 11, marginBottom: 4 }}>{c.mois}</label>
              <input type="number" value={mois} onChange={e => setMois(e.target.value)} placeholder="0" min="0" max="11" style={inputStyle} />
            </div>
          </div>

          {result && (
            <div style={{ borderTop: '1px solid #e8e4de', paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                [c.indemnite, fmt(result.indemnite), '#1a1a2e'],
                [c.exoneree,  fmt(result.partieExoneree), '#059669'],
                [c.imposable, fmt(result.partieImposable), result.partieImposable > 0 ? '#dc2626' : '#6b7280'],
              ].map(([label, value, color]) => (
                <div key={label} style={{ background: '#f9f7f4', borderRadius: 8, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ color: '#6b7280', fontSize: 12 }}>{label}</div>
                  <div style={{ color, fontSize: 16, fontWeight: 700 }}>{value}</div>
                </div>
              ))}
              <p style={{ color: '#9ca3af', fontSize: 11, marginTop: 4 }}>{c.note}</p>
            </div>
          )}
        </div>
        <LegalNote lang={lang} />
      </main>
      <Footer />
    </>
  )
}
