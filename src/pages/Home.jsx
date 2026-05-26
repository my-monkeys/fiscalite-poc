import { Link } from 'react-router-dom'
import { Wallet, BarChart2, FileText } from 'lucide-react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Seo from '../components/Seo'

const BASE = 'https://fiscalite.my-monkey.fr'

const copy = {
  fr: {
    title: 'Fiscalité française — Calculateurs gratuits',
    description: 'Calculateurs fiscaux français gratuits : Net/Brut, Simulateur IR, Rupture conventionnelle. Résultats immédiats.',
    h1: 'Fiscalité française',
    sub: 'Des calculateurs simples pour mieux comprendre votre situation fiscale.',
    tools: [
      { icon: Wallet,    label: 'Net / Brut',                  desc: 'Calculez votre salaire net, coût employeur et charges selon votre statut.', to: '/net-brut' },
      { icon: BarChart2, label: 'Simulateur IR',                desc: 'Estimez votre impôt sur le revenu selon le barème 2024.', to: '/simulateur-ir' },
      { icon: FileText,  label: 'Rupture conventionnelle',      desc: "Calculez votre indemnité légale et la part exonérée d'impôt.", to: '/rupture-conventionnelle' },
    ],
  },
  en: {
    title: 'French Tax Calculators — Free Tools',
    description: 'Free French tax calculators: Net/Gross salary, Income Tax Simulator, Severance Pay. Instant results.',
    h1: 'French Tax Tools',
    sub: 'Simple calculators to better understand your tax situation in France.',
    tools: [
      { icon: Wallet,    label: 'Net / Gross',    desc: 'Calculate your net salary, employer cost, and social contributions.', to: '/en/net-gross' },
      { icon: BarChart2, label: 'Income Tax',     desc: 'Estimate your income tax using the 2024 French tax brackets.', to: '/en/income-tax' },
      { icon: FileText,  label: 'Severance Pay',  desc: 'Calculate your legal severance and tax-exempt portion.', to: '/en/severance' },
    ],
  },
}

export default function Home({ lang = 'fr' }) {
  const c = copy[lang]
  const frPath = '/'
  const enPath = '/en/'
  const canonical = `${BASE}${lang === 'en' ? enPath : frPath}`

  return (
    <>
      <Seo
        title={c.title}
        description={c.description}
        canonical={canonical}
        hreflangFr={`${BASE}${frPath}`}
        hreflangEn={`${BASE}${enPath}`}
      />
      <Nav lang={lang} />
      <main style={{ maxWidth: 860, margin: '0 auto', padding: '48px 20px' }}>
        <h1 style={{ color: '#1a1a2e', fontSize: 28, fontWeight: 800, letterSpacing: '-.03em', marginBottom: 8 }}>{c.h1}</h1>
        <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 40 }}>{c.sub}</p>
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {c.tools.map(({ icon: Icon, label, desc, to }) => (
            <Link
              key={to}
              to={to}
              style={{ textDecoration: 'none', display: 'block', background: '#ffffff', border: '1px solid #e8e4de', borderRadius: 10, padding: 20, transition: 'box-shadow .15s, transform .15s' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,.08)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = '' }}
            >
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                <Icon size={18} color="#059669" />
              </div>
              <div style={{ color: '#1a1a2e', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{label}</div>
              <div style={{ color: '#6b7280', fontSize: 12, lineHeight: 1.5 }}>{desc}</div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
