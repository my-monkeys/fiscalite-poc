import { Link } from 'react-router-dom'
import { Wallet, BarChart2, FileText, Zap, Shield, BarChart } from 'lucide-react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Seo from '../components/Seo'

const BASE = 'https://fiscalite.my-monkey.fr'

const copy = {
  fr: {
    title: 'Fiscalité française — Calculateurs gratuits 2026',
    description: 'Calculateurs fiscaux français gratuits : Net/Brut, Simulateur IR, Rupture conventionnelle. Résultats immédiats.',
    badge: 'Données 2026 · 100 % gratuit',
    h1: 'Comprenez votre fiscalité française en quelques secondes',
    sub: 'Convertisseur Net/Brut, simulateur IR et calculateur de rupture conventionnelle — des résultats clairs, sans inscription.',
    trust: ['Barème 2026 officiel', 'Sans inscription', 'Calcul dans le navigateur'],
    toolsLabel: 'Nos outils',
    cta: 'Calculer',
    tools: [
      {
        icon: Wallet,
        label: 'Net / Brut',
        desc: 'Passez de brut en net ou net en brut. Calculez le coût employeur et les charges auto-entrepreneur.',
        to: '/net-brut',
      },
      {
        icon: BarChart2,
        label: 'Simulateur IR',
        desc: 'Estimez votre impôt sur le revenu selon le barème 2026. Quotient familial, taux moyen et marginal.',
        to: '/simulateur-ir',
      },
      {
        icon: FileText,
        label: 'Rupture conventionnelle',
        desc: "Calculez votre indemnité légale et la part exonérée d'impôt selon votre ancienneté.",
        to: '/rupture-conventionnelle',
      },
    ],
    features: [
      { icon: BarChart, label: 'Barème officiel 2026', desc: 'Tranches IR 2025, PASS 2025, taux micro-entrepreneur à jour.' },
      { icon: Zap,      label: 'Résultats immédiats',  desc: 'Calcul instantané au fil de la saisie, sans valider de formulaire.' },
      { icon: Shield,   label: 'Données privées',      desc: 'Aucune donnée transmise — tout reste dans votre navigateur.' },
    ],
    simulLabel: 'Simulateur d\'embauche',
    simulTitle: 'Estimez le coût d\'une embauche',
    simulSub: 'Choisissez un type de contrat pour en savoir plus, puis utilisez le simulateur URSSAF ci-dessous.',
    iframeTitle: 'Simulateur d\'embauche URSSAF',
  },
  en: {
    title: 'French Tax Calculators — Free Tools 2026',
    description: 'Free French tax calculators: Net/Gross salary, Income Tax Simulator, Severance Pay. Instant results.',
    badge: '2026 data · 100% free',
    h1: 'Understand your French taxes in seconds',
    sub: 'Net/Gross converter, income tax simulator, and severance pay calculator — instant results, no sign-up required.',
    trust: ['Official 2026 brackets', 'No registration', 'Runs in your browser'],
    toolsLabel: 'Our tools',
    cta: 'Calculate',
    tools: [
      {
        icon: Wallet,
        label: 'Net / Gross',
        desc: 'Convert gross to net or net to gross. Calculate employer cost and self-employed contributions.',
        to: '/en/net-gross',
      },
      {
        icon: BarChart2,
        label: 'Income Tax',
        desc: 'Estimate your income tax using the 2026 French brackets. Family quotient, average and marginal rates.',
        to: '/en/income-tax',
      },
      {
        icon: FileText,
        label: 'Severance Pay',
        desc: 'Calculate your legal severance and the tax-exempt portion based on your length of service.',
        to: '/en/severance',
      },
    ],
    features: [
      { icon: BarChart, label: 'Official 2026 brackets', desc: '2025 IR thresholds, PASS 2025, up-to-date self-employed rates.' },
      { icon: Zap,      label: 'Instant results',        desc: 'Results update as you type — no form submission needed.' },
      { icon: Shield,   label: 'Private data',           desc: 'Nothing is sent anywhere — all calculations stay in your browser.' },
    ],
    simulLabel: 'Hiring cost simulator',
    simulTitle: 'Estimate the cost of hiring',
    simulSub: 'Select a contract type to learn more, then use the URSSAF simulator below.',
    iframeTitle: 'URSSAF hiring cost simulator',
  },
}

const contracts = [
  { label: 'CDI',                  infoUrl: 'https://www.service-public.fr/particuliers/vosdroits/F1906' },
  { label: 'CDD',                  infoUrl: 'https://www.service-public.fr/particuliers/vosdroits/F34' },
  { label: 'Apprentissage',        infoUrl: 'https://www.alternance.emploi.gouv.fr/contrat-apprentissage' },
  { label: 'Professionnalisation', infoUrl: 'https://travail-emploi.gouv.fr/formation-professionnelle/mise-en-oeuvre-des-dispositifs-de-formation/article/le-contrat-de-professionnalisation' },
  { label: 'Stage',                infoUrl: 'https://www.service-public.fr/particuliers/vosdroits/F16734' },
]

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

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section style={{ textAlign: 'center', padding: '80px 20px 72px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>

          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#d1fae5', borderRadius: 20, padding: '5px 14px', marginBottom: 28, fontSize: 12, fontWeight: 600, color: '#059669' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#059669', display: 'inline-block', flexShrink: 0 }} />
            {c.badge}
          </div>

          {/* H1 */}
          <h1 className="hero-h1" style={{ color: '#1a1a2e', fontSize: 44, fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.08, marginBottom: 20 }}>
            {c.h1}
          </h1>

          {/* Sub */}
          <p style={{ color: '#6b7280', fontSize: 16, lineHeight: 1.65, marginBottom: 36, maxWidth: 560, margin: '0 auto 36px' }}>
            {c.sub}
          </p>

          {/* Trust row */}
          <div className="trust-row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
            {c.trust.map(t => (
              <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6b7280', fontSize: 13 }}>
                <span style={{ color: '#059669', fontWeight: 700, fontSize: 15, lineHeight: 1 }}>✓</span>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features strip ───────────────────────────────────── */}
      <div style={{ background: '#ffffff', borderTop: '1px solid #e8e4de', borderBottom: '1px solid #e8e4de' }}>
        <div className="grid-3" style={{ maxWidth: 860, margin: '0 auto', padding: '32px 20px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {c.features.map(({ icon: Icon, label, desc }) => (
            <div key={label} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={16} color="#059669" />
              </div>
              <div>
                <div style={{ color: '#1a1a2e', fontWeight: 700, fontSize: 13, marginBottom: 3 }}>{label}</div>
                <div style={{ color: '#6b7280', fontSize: 12, lineHeight: 1.5 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tools ────────────────────────────────────────────── */}
      <main style={{ maxWidth: 860, margin: '0 auto', padding: '56px 20px 80px' }}>
        <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: 11, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 28 }}>
          {c.toolsLabel}
        </p>
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {c.tools.map(({ icon: Icon, label, desc, to }) => (
            <Link
              key={to}
              to={to}
              style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', background: '#ffffff', border: '1px solid #e8e4de', borderRadius: 12, padding: '28px 24px', transition: 'box-shadow .15s, transform .15s' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,.08)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = '' }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 10, background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <Icon size={20} color="#059669" />
              </div>
              <div style={{ color: '#1a1a2e', fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{label}</div>
              <div style={{ color: '#6b7280', fontSize: 13, lineHeight: 1.6, flex: 1 }}>{desc}</div>
              <div style={{ color: '#059669', fontSize: 13, fontWeight: 600, marginTop: 20, display: 'flex', alignItems: 'center', gap: 4 }}>
                {c.cta} <span style={{ fontSize: 15 }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </>
  )
}
