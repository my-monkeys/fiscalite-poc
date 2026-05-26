import { useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Seo from '../components/Seo'
import LegalNote from '../components/LegalNote'
import { grossToNet, netToGross, employerCost, aeToNet } from '../lib/fiscalCalc'

const BASE = 'https://fiscalite.my-monkey.fr'

const copy = {
  fr: {
    title: 'Calculateur Net / Brut — Salaire & Auto-entrepreneur 2026',
    description: 'Convertissez salaire brut en net, calculez le coût employeur et les charges auto-entrepreneur (BIC, BNC). Données 2026.',
    h1: 'Net / Brut',
    salarie: 'Salarié',
    ae: 'Auto-entrepreneur',
    montant: 'Montant',
    direction: 'Direction',
    periode: 'Période',
    brut: 'Brut → Net',
    net: 'Net → Brut',
    mensuel: 'Mensuel',
    annuel: 'Annuel',
    ca: "Chiffre d'affaires",
    categorie: 'Catégorie',
    cats: { 'bic-marchand': 'BIC marchand 12,3 %', 'bic-service': 'BIC service 21,2 %', 'bnc': 'BNC 23,1 %' },
    netPercu: 'Net perçu', cotisations: 'Cotisations salariales', coutEmployeur: 'Coût employeur', charges: 'Charges AE',
    back: '← Retour',
  },
  en: {
    title: 'Net / Gross Salary Calculator France 2026',
    description: 'Convert gross to net salary, calculate employer cost and self-employed contributions (BIC, BNC). 2026 figures.',
    h1: 'Net / Gross',
    salarie: 'Employee',
    ae: 'Self-employed',
    montant: 'Amount',
    direction: 'Direction',
    periode: 'Period',
    brut: 'Gross → Net',
    net: 'Net → Gross',
    mensuel: 'Monthly',
    annuel: 'Annual',
    ca: 'Revenue',
    categorie: 'Category',
    cats: { 'bic-marchand': 'BIC retail 12.3%', 'bic-service': 'BIC service 21.2%', 'bnc': 'BNC 23.1%' },
    netPercu: 'Net received', cotisations: 'Employee contributions', coutEmployeur: 'Employer cost', charges: 'SE contributions',
    back: '← Back',
  },
}

const inputStyle = { width: '100%', padding: '9px 12px', border: '1px solid #e8e4de', borderRadius: 6, fontSize: 14, color: '#1a1a2e', background: '#f9f7f4', outline: 'none' }
const labelStyle = { display: 'block', color: '#6b7280', fontSize: 11, marginBottom: 4 }

function ResultCard({ label, value, color }) {
  return (
    <div style={{ background: '#f9f7f4', borderRadius: 8, padding: '10px 14px' }}>
      <div style={{ color: '#6b7280', fontSize: 11, marginBottom: 2 }}>{label}</div>
      <div style={{ color, fontSize: 18, fontWeight: 700 }}>{value}</div>
    </div>
  )
}

function ToggleGroup({ options, value, onChange }) {
  return (
    <div style={{ display: 'flex', border: '1px solid #e8e4de', borderRadius: 6, overflow: 'hidden' }}>
      {options.map(([val, label]) => (
        <button key={val} onClick={() => onChange(val)}
          style={{ flex: 1, padding: '8px 10px', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: value === val ? 600 : 400, background: value === val ? '#d1fae5' : '#ffffff', color: value === val ? '#059669' : '#6b7280', whiteSpace: 'nowrap' }}>
          {label}
        </button>
      ))}
    </div>
  )
}

export default function NetBrut({ lang = 'fr' }) {
  const c = copy[lang]
  const frPath = '/net-brut'
  const enPath = '/en/net-gross'
  const canonical = `${BASE}${lang === 'en' ? enPath : frPath}`

  const [mode, setMode] = useState('salarie')
  const [direction, setDirection] = useState('brut')
  const [periode, setPeriode] = useState('mensuel')
  const [montant, setMontant] = useState('')
  const [categorie, setCategorie] = useState('bic-service')
  const [ca, setCa] = useState('')

  const fmt = v => Math.round(v).toLocaleString('fr-FR') + ' €'

  // Résultats salarié
  let res = null
  const val = parseFloat(montant) || 0
  if (mode === 'salarie' && val > 0) {
    const factor = periode === 'annuel' ? 1 / 12 : 1
    const brut = direction === 'brut' ? val * factor : netToGross(val * factor)
    const net = grossToNet(brut)
    const cout = employerCost(brut)
    const scale = periode === 'annuel' ? 12 : 1
    res = { net: net * scale, cotis: (brut - net) * scale, brut: brut * scale, cout: cout * scale }
  }

  // Résultats AE
  let aeRes = null
  const caVal = parseFloat(ca) || 0
  if (mode === 'ae' && caVal > 0) {
    const net = aeToNet(caVal, categorie)
    aeRes = { net, charges: caVal - net }
  }

  const jsonLd = { '@context': 'https://schema.org', '@type': 'WebApplication', name: c.h1, description: c.description, url: canonical, applicationCategory: 'FinanceApplication' }

  return (
    <>
      <Seo title={c.title} description={c.description} canonical={canonical} hreflangFr={`${BASE}${frPath}`} hreflangEn={`${BASE}${enPath}`} jsonLd={jsonLd} />
      <Nav lang={lang} />
      <main style={{ maxWidth: 640, margin: '0 auto', padding: '32px 20px' }}>
        <Link to={lang === 'en' ? '/en/' : '/'} style={{ color: '#9ca3af', fontSize: 12, textDecoration: 'none', display: 'inline-block', marginBottom: 20 }}>{c.back}</Link>
        <h1 style={{ color: '#1a1a2e', fontSize: 22, fontWeight: 800, letterSpacing: '-.03em', marginBottom: 24 }}>{c.h1}</h1>

        {/* Mode toggle */}
        <div style={{ display: 'flex', background: '#f9f7f4', border: '1px solid #e8e4de', borderRadius: 8, padding: 3, gap: 3, marginBottom: 20, width: 'fit-content' }}>
          {[['salarie', c.salarie], ['ae', c.ae]].map(([v, label]) => (
            <button key={v} onClick={() => setMode(v)}
              style={{ padding: '6px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: mode === v ? 600 : 400, background: mode === v ? '#ffffff' : 'transparent', color: mode === v ? '#1a1a2e' : '#6b7280', boxShadow: mode === v ? '0 1px 3px rgba(0,0,0,.06)' : 'none' }}>
              {label}
            </button>
          ))}
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e8e4de', borderRadius: 10, padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {mode === 'salarie' ? (
            <>
              <div>
                <label style={labelStyle}>{c.montant}</label>
                <input type="number" value={montant} onChange={e => setMontant(e.target.value)} placeholder="0" style={inputStyle} />
              </div>
              <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div>
                  <label style={labelStyle}>{c.direction}</label>
                  <ToggleGroup options={[['brut', c.brut], ['net', c.net]]} value={direction} onChange={setDirection} />
                </div>
                <div>
                  <label style={labelStyle}>{c.periode}</label>
                  <ToggleGroup options={[['mensuel', c.mensuel], ['annuel', c.annuel]]} value={periode} onChange={setPeriode} />
                </div>
              </div>
              {res && (
                <div style={{ borderTop: '1px solid #e8e4de', paddingTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <ResultCard label={c.netPercu}     value={fmt(res.net)}   color="#059669" />
                  <ResultCard label={c.cotisations}  value={fmt(res.cotis)} color="#dc2626" />
                  <ResultCard label="Brut"            value={fmt(res.brut)}  color="#1a1a2e" />
                  <ResultCard label={c.coutEmployeur} value={fmt(res.cout)}  color="#6b7280" />
                </div>
              )}
            </>
          ) : (
            <>
              <div>
                <label style={labelStyle}>{c.ca}</label>
                <input type="number" value={ca} onChange={e => setCa(e.target.value)} placeholder="0" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>{c.categorie}</label>
                <select value={categorie} onChange={e => setCategorie(e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer' }}>
                  {Object.entries(c.cats).map(([v, label]) => <option key={v} value={v}>{label}</option>)}
                </select>
              </div>
              {aeRes && (
                <div style={{ borderTop: '1px solid #e8e4de', paddingTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <ResultCard label={c.netPercu} value={fmt(aeRes.net)}     color="#059669" />
                  <ResultCard label={c.charges}  value={fmt(aeRes.charges)} color="#dc2626" />
                </div>
              )}
            </>
          )}
        </div>
        <LegalNote lang={lang} />
      </main>
      <Footer />
    </>
  )
}
