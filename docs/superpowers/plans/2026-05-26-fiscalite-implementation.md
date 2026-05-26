# fiscalite.my-monkey.fr Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build fiscalite.my-monkey.fr — site bilingue FR/EN de calculateurs fiscaux français (Net/Brut, IR, Rupture conventionnelle) en Vite 6 + React 19.

**Architecture:** SPA client-side avec HashRouter, inline styles partout, composants partagés (Nav, Footer, Seo, CookieBanner, LegalNote), logique fiscale isolée dans `src/lib/fiscalCalc.js` testée avec Vitest.

**Tech Stack:** Vite 6, React 19, React Router v7, lucide-react, Vitest

---

## Structure des fichiers

```
fiscalite-poc/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   ├── favicon.svg
│   ├── manifest.webmanifest
│   ├── robots.txt
│   ├── sitemap.xml
│   └── sitemap.xsl
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── lib/
    │   ├── fiscalCalc.js
    │   └── fiscalCalc.test.js
    ├── components/
    │   ├── Nav.jsx
    │   ├── Footer.jsx
    │   ├── Seo.jsx
    │   ├── CookieBanner.jsx
    │   └── LegalNote.jsx
    └── pages/
        ├── Home.jsx
        ├── NetBrut.jsx
        ├── SimulateurIR.jsx
        ├── RuptureConventionnelle.jsx
        ├── MentionsLegales.jsx
        └── PolitiqueConfidentialite.jsx
```

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/index.css`

**Context:** Le répertoire `C:\Users\kilya\Documents\___DEVTEST\fiscalite-poc` existe déjà avec un dossier `docs/`. Node n'est pas dans le PATH PowerShell — utiliser bash avec `export PATH="/c/Program Files/nodejs:$PATH"` avant tout `npm`. Le projet utilise HashRouter (SPA sans config serveur).

- [ ] **Step 1 : Créer `package.json`**

```json
{
  "name": "fiscalite-poc",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.0.0",
    "lucide-react": "^0.513.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.3.5",
    "vitest": "^3.0.0"
  }
}
```

- [ ] **Step 2 : Créer `vite.config.js`**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: { environment: 'node' },
})
```

- [ ] **Step 3 : Créer `index.html`**

```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fiscalité française — Calculateurs</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="manifest" href="/manifest.webmanifest" />
    <meta name="theme-color" content="#f9f7f4" />
    <meta name="description" content="Calculateurs fiscaux français gratuits : Net/Brut, Simulateur IR, Rupture conventionnelle." />
    <meta property="og:title" content="Fiscalité française — Calculateurs" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://fiscalite.my-monkey.fr/" />
    <meta property="og:image" content="https://fiscalite.my-monkey.fr/og/default.png" />
    <meta name="twitter:card" content="summary_large_image" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 4 : Créer `src/main.jsx`**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
```

- [ ] **Step 5 : Créer `src/App.jsx` (squelette — sera complété en Task 10)**

```jsx
import { Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<div style={{ padding: 40, fontFamily: 'sans-serif' }}>fiscalite.my-monkey.fr — scaffold OK</div>} />
    </Routes>
  )
}
```

- [ ] **Step 6 : Créer `src/index.css`**

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: #f9f7f4;
  color: #1a1a2e;
  font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

@media (max-width: 680px) {
  .grid-3 { grid-template-columns: 1fr !important; }
  .grid-2 { grid-template-columns: 1fr !important; }
  .hide-mobile { display: none !important; }
}
```

- [ ] **Step 7 : Installer les dépendances**

```bash
export PATH="/c/Program Files/nodejs:$PATH"
cd /c/Users/kilya/Documents/___DEVTEST/fiscalite-poc
npm install
```

Expected: `node_modules/` créé, `package-lock.json` généré.

- [ ] **Step 8 : Vérifier que le dev server démarre**

```bash
export PATH="/c/Program Files/nodejs:$PATH"
cd /c/Users/kilya/Documents/___DEVTEST/fiscalite-poc
npm run dev -- --port 5174
```

Expected: `Local: http://localhost:5174/` affiché. Ouvrir dans le navigateur → message "scaffold OK". Couper avec Ctrl+C.

- [ ] **Step 9 : Git init et premier commit**

```bash
cd /c/Users/kilya/Documents/___DEVTEST/fiscalite-poc
git init
echo "node_modules/" > .gitignore
echo "dist/" >> .gitignore
echo ".env" >> .gitignore
git add package.json vite.config.js index.html src/ .gitignore
git commit -m "chore: scaffold vite + react project"
```

---

### Task 2: Bibliothèque de calcul fiscal (`fiscalCalc.js`)

**Files:**
- Create: `src/lib/fiscalCalc.test.js`
- Create: `src/lib/fiscalCalc.js`

**Context:** Toute la logique fiscale est isolée ici — fonctions pures, aucun import React. Barème IR 2024, cotisations salariales 22%, charges patronales 42%, PASS 2024 = 46 368 €. Vitest est dans les devDependencies.

- [ ] **Step 1 : Écrire les tests (fichier d'abord)**

Créer `src/lib/fiscalCalc.test.js` :

```js
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
    // 20000 - 11294 = 8706 dans la tranche 11% → 8706 * 0.11 = 957.66 → 958
    expect(computeIR(20000, 1).irTotal).toBe(958)
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
    // 12000*0.25*10 + 12000*(1/3)*20 = 30000 + 80000 = 110000 > 92736
    const r = computeRC(12000, 30)
    expect(r.partieExoneree).toBe(92736)
    expect(r.partieImposable).toBe(17264)
  })
})
```

- [ ] **Step 2 : Lancer les tests — vérifier qu'ils échouent**

```bash
export PATH="/c/Program Files/nodejs:$PATH"
cd /c/Users/kilya/Documents/___DEVTEST/fiscalite-poc
npm test
```

Expected: Tous les tests FAIL avec `Cannot find module './fiscalCalc'`.

- [ ] **Step 3 : Implémenter `src/lib/fiscalCalc.js`**

```js
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
```

- [ ] **Step 4 : Lancer les tests — vérifier qu'ils passent**

```bash
export PATH="/c/Program Files/nodejs:$PATH"
cd /c/Users/kilya/Documents/___DEVTEST/fiscalite-poc
npm test
```

Expected: `17 passed` (tous verts), aucun FAIL.

- [ ] **Step 5 : Commit**

```bash
cd /c/Users/kilya/Documents/___DEVTEST/fiscalite-poc
git add src/lib/
git commit -m "feat: fiscal calculation library with tests"
```

---

### Task 3: Composants partagés

**Files:**
- Create: `src/components/Nav.jsx`
- Create: `src/components/Footer.jsx`
- Create: `src/components/Seo.jsx`
- Create: `src/components/CookieBanner.jsx`
- Create: `src/components/LegalNote.jsx`

**Context:** Inline styles uniquement (sauf media queries dans index.css). Palette : bg `#f9f7f4`, surface `#ffffff`, border `#e8e4de`, text `#1a1a2e`, muted `#6b7280`, faint `#9ca3af`, accent `#059669`, accent-light `#d1fae5`. Le CookieBanner utilise la clé localStorage `fiscalite_cookie_consent`.

- [ ] **Step 1 : Créer `src/components/Nav.jsx`**

```jsx
import { Link } from 'react-router-dom'
import { Calculator } from 'lucide-react'

export default function Nav({ lang = 'fr' }) {
  return (
    <nav style={{ background: '#f9f7f4', borderBottom: '1px solid #e8e4de', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
      <Link to={lang === 'en' ? '/en/' : '/'} style={{ display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
        <Calculator size={14} color="#059669" />
        <span style={{ color: '#1a1a2e', fontWeight: 700, fontSize: 14, letterSpacing: '-.02em' }}>
          fiscalite<span style={{ color: '#059669' }}>·</span>
        </span>
      </Link>
      <div style={{ display: 'flex', gap: 4 }}>
        <Link to="/" style={{ padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: lang === 'fr' ? 600 : 400, color: lang === 'fr' ? '#059669' : '#6b7280', background: lang === 'fr' ? '#d1fae5' : 'transparent', textDecoration: 'none' }}>FR</Link>
        <Link to="/en/" style={{ padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: lang === 'en' ? 600 : 400, color: lang === 'en' ? '#059669' : '#6b7280', background: lang === 'en' ? '#d1fae5' : 'transparent', textDecoration: 'none' }}>EN</Link>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2 : Créer `src/components/Footer.jsx`**

```jsx
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: '#f9f7f4', borderTop: '1px solid #e8e4de', padding: '20px', marginTop: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
      <div style={{ display: 'flex', gap: 16 }}>
        <Link to="/mentions-legales" style={{ color: '#9ca3af', fontSize: 11, textDecoration: 'none' }}>Mentions légales</Link>
        <Link to="/politique-confidentialite" style={{ color: '#9ca3af', fontSize: 11, textDecoration: 'none' }}>Confidentialité</Link>
      </div>
      <div style={{ color: '#9ca3af', fontSize: 11 }}>
        © 2026 — propulsé par{' '}
        <a href="https://my-monkey.fr" target="_blank" rel="noopener noreferrer" style={{ color: '#6b7280', textDecoration: 'none' }}>my-monkey.fr</a>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3 : Créer `src/components/Seo.jsx`**

```jsx
import { useEffect } from 'react'

export default function Seo({ title, description, canonical, hreflangFr, hreflangEn, jsonLd, ogImage }) {
  useEffect(() => {
    document.title = title
    setMeta('description', description)
    setMeta('og:title', title, true)
    setMeta('og:description', description, true)
    setMeta('og:url', canonical, true)
    if (ogImage) setMeta('og:image', ogImage, true)
    setLink('canonical', canonical)
    if (hreflangFr) setHreflang('fr', hreflangFr)
    if (hreflangEn) setHreflang('en', hreflangEn)
    if (jsonLd) setJsonLd(jsonLd)
    return () => { document.querySelectorAll('[data-seo-cleanup]').forEach(el => el.remove()) }
  }, [title, description, canonical, hreflangFr, hreflangEn, jsonLd, ogImage])
  return null
}

function setMeta(name, content, property = false) {
  const attr = property ? 'property' : 'name'
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); el.dataset.seoCleanup = '1'; document.head.appendChild(el) }
  el.content = content
}

function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) { el = document.createElement('link'); el.rel = rel; el.dataset.seoCleanup = '1'; document.head.appendChild(el) }
  el.href = href
}

function setHreflang(lang, href) {
  let el = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`)
  if (!el) { el = document.createElement('link'); el.rel = 'alternate'; el.setAttribute('hreflang', lang); el.dataset.seoCleanup = '1'; document.head.appendChild(el) }
  el.href = href
}

function setJsonLd(data) {
  let el = document.querySelector('script[type="application/ld+json"]')
  if (!el) { el = document.createElement('script'); el.type = 'application/ld+json'; el.dataset.seoCleanup = '1'; document.head.appendChild(el) }
  el.textContent = JSON.stringify(data)
}
```

- [ ] **Step 4 : Créer `src/components/CookieBanner.jsx`**

```jsx
import { useState } from 'react'

const KEY = 'fiscalite_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(() => !localStorage.getItem(KEY))
  if (!visible) return null

  function handle(choice) {
    localStorage.setItem(KEY, choice)
    setVisible(false)
  }

  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#ffffff', borderTop: '1px solid #e8e4de', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, zIndex: 100, fontSize: 12, color: '#6b7280' }}>
      <span>Ce site utilise des cookies publicitaires (Google AdSense) pour financer son accès gratuit.</span>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => handle('refused')} style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #e8e4de', background: 'transparent', color: '#6b7280', cursor: 'pointer', fontSize: 12 }}>Refuser</button>
        <button onClick={() => handle('accepted')} style={{ padding: '6px 14px', borderRadius: 6, border: 'none', background: '#059669', color: '#ffffff', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>Accepter</button>
      </div>
    </div>
  )
}
```

- [ ] **Step 5 : Créer `src/components/LegalNote.jsx`**

```jsx
const text = {
  fr: 'Les résultats sont fournis à titre indicatif. Consultez un expert-comptable pour une situation personnalisée.',
  en: 'Results are for informational purposes only. Consult a chartered accountant for personalised advice.',
}

export default function LegalNote({ lang = 'fr' }) {
  return (
    <p style={{ color: '#9ca3af', fontSize: 11, marginTop: 24, paddingTop: 16, borderTop: '1px solid #e8e4de' }}>
      {text[lang]}
    </p>
  )
}
```

- [ ] **Step 6 : Commit**

```bash
cd /c/Users/kilya/Documents/___DEVTEST/fiscalite-poc
git add src/components/
git commit -m "feat: shared components (Nav, Footer, Seo, CookieBanner, LegalNote)"
```

---

### Task 4: Page d'accueil

**Files:**
- Create: `src/pages/Home.jsx`

**Context:** 3 cartes outils en grille (3 colonnes desktop, 1 mobile via className `grid-3`). Hover lift via onMouseEnter/onMouseLeave. Bilingue FR/EN via prop `lang`.

- [ ] **Step 1 : Créer `src/pages/Home.jsx`**

```jsx
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
        ogImage={`${BASE}/og/default.png`}
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
```

- [ ] **Step 2 : Brancher temporairement dans App.jsx pour tester visuellement**

Remplacer le contenu de `src/App.jsx` par :

```jsx
import { Routes, Route } from 'react-router-dom'
import CookieBanner from './components/CookieBanner'
import Home from './pages/Home'

export default function App() {
  return (
    <>
      <CookieBanner />
      <Routes>
        <Route path="/" element={<Home lang="fr" />} />
        <Route path="/en/" element={<Home lang="en" />} />
      </Routes>
    </>
  )
}
```

- [ ] **Step 3 : Vérifier visuellement**

```bash
export PATH="/c/Program Files/nodejs:$PATH"
cd /c/Users/kilya/Documents/___DEVTEST/fiscalite-poc
npm run dev -- --port 5174
```

Ouvrir `http://localhost:5174/` → 3 cartes visibles, design light, Nav avec FR/EN. Naviguer sur `http://localhost:5174/#/en/` → cartes en anglais. Couper.

- [ ] **Step 4 : Commit**

```bash
cd /c/Users/kilya/Documents/___DEVTEST/fiscalite-poc
git add src/pages/Home.jsx src/App.jsx
git commit -m "feat: home page FR/EN with tool cards"
```

---

### Task 5: Calculateur Net / Brut

**Files:**
- Create: `src/pages/NetBrut.jsx`

**Context:** Toggle salarié/AE. Salarié : input montant + toggle direction brut↔net + toggle période mensuel/annuel. AE : input CA + select catégorie (bic-marchand, bic-service, bnc). Résultats en temps réel (pas de bouton valider). Imports depuis `fiscalCalc.js` : `grossToNet`, `netToGross`, `employerCost`, `aeToNet`.

- [ ] **Step 1 : Créer `src/pages/NetBrut.jsx`**

```jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Seo from '../components/Seo'
import LegalNote from '../components/LegalNote'
import { grossToNet, netToGross, employerCost, aeToNet } from '../lib/fiscalCalc'

const BASE = 'https://fiscalite.my-monkey.fr'

const copy = {
  fr: {
    title: 'Calculateur Net / Brut — Salaire & Auto-entrepreneur 2024',
    description: 'Convertissez salaire brut en net, calculez le coût employeur et les charges auto-entrepreneur (BIC, BNC). Données 2024.',
    h1: 'Net / Brut',
    salarie: 'Salarié',
    ae: 'Auto-entrepreneur',
    montant: 'Montant',
    brut: 'Brut → Net',
    net: 'Net → Brut',
    mensuel: 'Mensuel',
    annuel: 'Annuel',
    ca: "Chiffre d'affaires",
    categorie: 'Catégorie',
    cats: { 'bic-marchand': 'BIC marchand (12.3%)', 'bic-service': 'BIC service (21.2%)', 'bnc': 'BNC (23.1%)' },
    netPercu: 'Net perçu', cotisations: 'Cotisations salariales', coutEmployeur: 'Coût employeur', charges: 'Charges AE',
    back: '← Retour',
  },
  en: {
    title: 'Net / Gross Salary Calculator France 2024',
    description: 'Convert gross to net salary, calculate employer cost and self-employed contributions (BIC, BNC). 2024 figures.',
    h1: 'Net / Gross',
    salarie: 'Employee',
    ae: 'Self-employed',
    montant: 'Amount',
    brut: 'Gross → Net',
    net: 'Net → Gross',
    mensuel: 'Monthly',
    annuel: 'Annual',
    ca: 'Revenue',
    categorie: 'Category',
    cats: { 'bic-marchand': 'BIC retail (12.3%)', 'bic-service': 'BIC service (21.2%)', 'bnc': 'BNC (23.1%)' },
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
      <Seo title={c.title} description={c.description} canonical={canonical} hreflangFr={`${BASE}${frPath}`} hreflangEn={`${BASE}${enPath}`} jsonLd={jsonLd} ogImage={`${BASE}/og/default.png`} />
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
                  <label style={labelStyle}>Direction</label>
                  <ToggleGroup options={[['brut', c.brut], ['net', c.net]]} value={direction} onChange={setDirection} />
                </div>
                <div>
                  <label style={labelStyle}>Période</label>
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
```

- [ ] **Step 2 : Ajouter la route dans App.jsx**

```jsx
import { Routes, Route } from 'react-router-dom'
import CookieBanner from './components/CookieBanner'
import Home from './pages/Home'
import NetBrut from './pages/NetBrut'

export default function App() {
  return (
    <>
      <CookieBanner />
      <Routes>
        <Route path="/" element={<Home lang="fr" />} />
        <Route path="/en/" element={<Home lang="en" />} />
        <Route path="/net-brut" element={<NetBrut lang="fr" />} />
        <Route path="/en/net-gross" element={<NetBrut lang="en" />} />
      </Routes>
    </>
  )
}
```

- [ ] **Step 3 : Tester visuellement**

```bash
export PATH="/c/Program Files/nodejs:$PATH"
cd /c/Users/kilya/Documents/___DEVTEST/fiscalite-poc
npm run dev -- --port 5174
```

Ouvrir `http://localhost:5174/#/net-brut`. Vérifier :
- Saisir 3000 en mode Brut → net ≈ 2 340 €, coût employeur ≈ 4 260 €
- Toggle sur Net → saisir 2340 → brut ≈ 3 000 €
- Toggle AE → saisir 5000, BIC service → net ≈ 3 940 €
- Passer en EN via `http://localhost:5174/#/en/net-gross` → labels en anglais. Couper.

- [ ] **Step 4 : Commit**

```bash
cd /c/Users/kilya/Documents/___DEVTEST/fiscalite-poc
git add src/pages/NetBrut.jsx src/App.jsx
git commit -m "feat: net/brut calculator (salarié + AE)"
```

---

### Task 6: Simulateur IR

**Files:**
- Create: `src/pages/SimulateurIR.jsx`
- Modify: `src/App.jsx`

**Context:** Input revenu + checkbox abattement 10% (min 495€, max 14 171€) + boutons parts (1/1.5/2/2.5/3). Affiche IR total, taux moyen, taux marginal, tableau détail par tranche. Import `computeIR` depuis `fiscalCalc.js`.

- [ ] **Step 1 : Créer `src/pages/SimulateurIR.jsx`**

```jsx
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
    title: 'Simulateur Impôt sur le Revenu 2024 — Barème IR France',
    description: 'Estimez votre impôt sur le revenu 2024 : barème par tranches, quotient familial, taux moyen et marginal.',
    h1: 'Simulateur IR 2024',
    revenu: 'Revenu net imposable (€)',
    abattLabel: 'Appliquer abattement forfaitaire 10% (salariés)',
    parts: 'Quotient familial (parts)',
    irTotal: 'Impôt total', tauxMoyen: 'Taux moyen', tauxMarginal: 'Taux marginal',
    tranche: 'Tranche', base: 'Base imposable', impot: 'Impôt',
    back: '← Retour',
  },
  en: {
    title: '2024 French Income Tax Simulator — IR Calculator',
    description: 'Estimate your 2024 French income tax: tax brackets, family quotient, average and marginal rates.',
    h1: 'Income Tax 2024',
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
    const ded = Math.min(Math.max(revenuVal * 0.1, 495), 14171)
    revenuImposable = revenuVal - ded
  }

  const result = revenuImposable > 0 ? computeIR(revenuImposable, parts) : null
  const fmt = v => Math.round(v).toLocaleString('fr-FR') + ' €'
  const pct = v => (v * 100).toFixed(1) + ' %'

  const jsonLd = { '@context': 'https://schema.org', '@type': 'WebApplication', name: c.h1, description: c.description, url: canonical, applicationCategory: 'FinanceApplication' }

  return (
    <>
      <Seo title={c.title} description={c.description} canonical={canonical} hreflangFr={`${BASE}${frPath}`} hreflangEn={`${BASE}${enPath}`} jsonLd={jsonLd} ogImage={`${BASE}/og/default.png`} />
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
```

- [ ] **Step 2 : Mettre à jour `src/App.jsx`**

```jsx
import { Routes, Route } from 'react-router-dom'
import CookieBanner from './components/CookieBanner'
import Home from './pages/Home'
import NetBrut from './pages/NetBrut'
import SimulateurIR from './pages/SimulateurIR'

export default function App() {
  return (
    <>
      <CookieBanner />
      <Routes>
        <Route path="/" element={<Home lang="fr" />} />
        <Route path="/en/" element={<Home lang="en" />} />
        <Route path="/net-brut" element={<NetBrut lang="fr" />} />
        <Route path="/en/net-gross" element={<NetBrut lang="en" />} />
        <Route path="/simulateur-ir" element={<SimulateurIR lang="fr" />} />
        <Route path="/en/income-tax" element={<SimulateurIR lang="en" />} />
      </Routes>
    </>
  )
}
```

- [ ] **Step 3 : Tester visuellement**

```bash
export PATH="/c/Program Files/nodejs:$PATH"
cd /c/Users/kilya/Documents/___DEVTEST/fiscalite-poc
npm run dev -- --port 5174
```

Ouvrir `http://localhost:5174/#/simulateur-ir`. Vérifier :
- Saisir 40 000 → IR ≈ 4 457 €, taux moyen ≈ 11.1%, taux marginal 30%
- Cocher abattement → IR doit baisser
- Passer à 2 parts → IR plus faible. Couper.

- [ ] **Step 4 : Commit**

```bash
cd /c/Users/kilya/Documents/___DEVTEST/fiscalite-poc
git add src/pages/SimulateurIR.jsx src/App.jsx
git commit -m "feat: income tax simulator with bracket breakdown"
```

---

### Task 7: Rupture conventionnelle

**Files:**
- Create: `src/pages/RuptureConventionnelle.jsx`
- Modify: `src/App.jsx`

**Context:** Inputs : salaire brut mensuel moyen + ancienneté (années + mois séparés). Résultats : indemnité brute, part exonérée, part imposable. Import `computeRC` depuis `fiscalCalc.js`. PASS 2024 = 46 368 €, exonération max = 92 736 €.

- [ ] **Step 1 : Créer `src/pages/RuptureConventionnelle.jsx`**

```jsx
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
      <Seo title={c.title} description={c.description} canonical={canonical} hreflangFr={`${BASE}${frPath}`} hreflangEn={`${BASE}${enPath}`} jsonLd={jsonLd} ogImage={`${BASE}/og/default.png`} />
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
```

- [ ] **Step 2 : Mettre à jour `src/App.jsx`**

```jsx
import { Routes, Route } from 'react-router-dom'
import CookieBanner from './components/CookieBanner'
import Home from './pages/Home'
import NetBrut from './pages/NetBrut'
import SimulateurIR from './pages/SimulateurIR'
import RuptureConventionnelle from './pages/RuptureConventionnelle'

export default function App() {
  return (
    <>
      <CookieBanner />
      <Routes>
        <Route path="/" element={<Home lang="fr" />} />
        <Route path="/en/" element={<Home lang="en" />} />
        <Route path="/net-brut" element={<NetBrut lang="fr" />} />
        <Route path="/en/net-gross" element={<NetBrut lang="en" />} />
        <Route path="/simulateur-ir" element={<SimulateurIR lang="fr" />} />
        <Route path="/en/income-tax" element={<SimulateurIR lang="en" />} />
        <Route path="/rupture-conventionnelle" element={<RuptureConventionnelle lang="fr" />} />
        <Route path="/en/severance" element={<RuptureConventionnelle lang="en" />} />
      </Routes>
    </>
  )
}
```

- [ ] **Step 3 : Tester visuellement**

```bash
export PATH="/c/Program Files/nodejs:$PATH"
cd /c/Users/kilya/Documents/___DEVTEST/fiscalite-poc
npm run dev -- --port 5174
```

Ouvrir `http://localhost:5174/#/rupture-conventionnelle`. Vérifier :
- Saisir salaire 3 000, ancienneté 5 ans → indemnité = 3 750 €, tout exonéré
- Saisir salaire 12 000, ancienneté 30 ans → indemnité = 110 000 €, exonéré = 92 736 €, imposable = 17 264 €. Couper.

- [ ] **Step 4 : Commit**

```bash
cd /c/Users/kilya/Documents/___DEVTEST/fiscalite-poc
git add src/pages/RuptureConventionnelle.jsx src/App.jsx
git commit -m "feat: severance pay calculator"
```

---

### Task 8: Pages légales + App.jsx final

**Files:**
- Create: `src/pages/MentionsLegales.jsx`
- Create: `src/pages/PolitiqueConfidentialite.jsx`
- Modify: `src/App.jsx` (version finale complète)

**Context:** Pages légales FR uniquement. Contact : technique@evarisk.com. Hébergement O2switch. PASS sur les cookies AdSense.

- [ ] **Step 1 : Créer `src/pages/MentionsLegales.jsx`**

```jsx
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Seo from '../components/Seo'

const BASE = 'https://fiscalite.my-monkey.fr'

const sections = [
  { title: 'Éditeur du site', items: ['my-monkey', 'Montpellier, France', 'Contact : technique@evarisk.com'] },
  { title: 'Directeur de la publication', items: ['my-monkey'] },
  { title: 'Hébergement', items: ['O2switch', 'Chemin des Pardiaux, 63000 Clermont-Ferrand', 'https://www.o2switch.fr'] },
  { title: 'Propriété intellectuelle', items: ["Le contenu de ce site est protégé par le droit d'auteur. Toute reproduction sans autorisation expresse est interdite."] },
  { title: 'Limitation de responsabilité', items: ["Les calculateurs proposés fournissent des estimations à titre indicatif uniquement. Ils ne constituent pas un conseil fiscal, comptable ou juridique. L'utilisateur est seul responsable de l'utilisation qu'il fait des résultats obtenus."] },
]

export default function MentionsLegales() {
  return (
    <>
      <Seo
        title="Mentions légales — fiscalite.my-monkey.fr"
        description="Mentions légales du site fiscalite.my-monkey.fr : éditeur, hébergeur, contact."
        canonical={`${BASE}/mentions-legales`}
        ogImage={`${BASE}/og/default.png`}
      />
      <Nav lang="fr" />
      <main style={{ maxWidth: 640, margin: '0 auto', padding: '32px 20px', color: '#1a1a2e' }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 32, letterSpacing: '-.03em' }}>Mentions légales</h1>
        {sections.map(({ title, items }) => (
          <section key={title} style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: '#1a1a2e' }}>{title}</h2>
            {items.map(item => <p key={item} style={{ color: '#6b7280', fontSize: 13, marginBottom: 4, lineHeight: 1.6 }}>{item}</p>)}
          </section>
        ))}
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2 : Créer `src/pages/PolitiqueConfidentialite.jsx`**

```jsx
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Seo from '../components/Seo'

const BASE = 'https://fiscalite.my-monkey.fr'

const sections = [
  { title: 'Données collectées', items: ["Ce site ne collecte pas de données personnelles directement. Les calculateurs fonctionnent entièrement dans votre navigateur (côté client).", "Google AdSense peut collecter des données à des fins publicitaires (cookies tiers)."] },
  { title: 'Cookies publicitaires', items: ["Ce site utilise Google AdSense pour afficher des publicités. Google peut utiliser des cookies pour personnaliser les annonces en fonction de vos centres d'intérêt.", "Vous pouvez refuser ces cookies via le bandeau de consentement ou en consultant : https://adssettings.google.com"] },
  { title: 'Durée de conservation', items: ["Les cookies Google AdSense sont conservés jusqu'à 13 mois selon les politiques de Google.", "Le choix de consentement (clé localStorage fiscalite_cookie_consent) est conservé dans votre navigateur jusqu'à effacement de votre historique."] },
  { title: 'Vos droits (RGPD)', items: ["Conformément au RGPD (UE 2016/679), vous disposez d'un droit d'accès, de rectification et de suppression de vos données.", "Pour exercer vos droits : technique@evarisk.com", "Vous pouvez également vous adresser à la CNIL : https://www.cnil.fr"] },
]

export default function PolitiqueConfidentialite() {
  return (
    <>
      <Seo
        title="Politique de confidentialité — fiscalite.my-monkey.fr"
        description="Politique de confidentialité de fiscalite.my-monkey.fr : cookies AdSense, données personnelles, droits RGPD."
        canonical={`${BASE}/politique-confidentialite`}
        ogImage={`${BASE}/og/default.png`}
      />
      <Nav lang="fr" />
      <main style={{ maxWidth: 640, margin: '0 auto', padding: '32px 20px', color: '#1a1a2e' }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 32, letterSpacing: '-.03em' }}>Politique de confidentialité</h1>
        {sections.map(({ title, items }) => (
          <section key={title} style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: '#1a1a2e' }}>{title}</h2>
            {items.map(item => <p key={item} style={{ color: '#6b7280', fontSize: 13, marginBottom: 4, lineHeight: 1.6 }}>{item}</p>)}
          </section>
        ))}
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3 : App.jsx version finale**

```jsx
import { Routes, Route } from 'react-router-dom'
import CookieBanner from './components/CookieBanner'
import Home from './pages/Home'
import NetBrut from './pages/NetBrut'
import SimulateurIR from './pages/SimulateurIR'
import RuptureConventionnelle from './pages/RuptureConventionnelle'
import MentionsLegales from './pages/MentionsLegales'
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite'

export default function App() {
  return (
    <>
      <CookieBanner />
      <Routes>
        <Route path="/" element={<Home lang="fr" />} />
        <Route path="/en/" element={<Home lang="en" />} />
        <Route path="/net-brut" element={<NetBrut lang="fr" />} />
        <Route path="/en/net-gross" element={<NetBrut lang="en" />} />
        <Route path="/simulateur-ir" element={<SimulateurIR lang="fr" />} />
        <Route path="/en/income-tax" element={<SimulateurIR lang="en" />} />
        <Route path="/rupture-conventionnelle" element={<RuptureConventionnelle lang="fr" />} />
        <Route path="/en/severance" element={<RuptureConventionnelle lang="en" />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
      </Routes>
    </>
  )
}
```

- [ ] **Step 4 : Tester visuellement les pages légales**

```bash
export PATH="/c/Program Files/nodejs:$PATH"
cd /c/Users/kilya/Documents/___DEVTEST/fiscalite-poc
npm run dev -- --port 5174
```

Ouvrir `http://localhost:5174/#/mentions-legales` → sections lisibles, liens Footer visibles.
Ouvrir `http://localhost:5174/#/politique-confidentialite` → idem. Couper.

- [ ] **Step 5 : Commit**

```bash
cd /c/Users/kilya/Documents/___DEVTEST/fiscalite-poc
git add src/pages/MentionsLegales.jsx src/pages/PolitiqueConfidentialite.jsx src/App.jsx
git commit -m "feat: legal pages + complete App routing"
```

---

### Task 9: Assets statiques

**Files:**
- Create: `public/favicon.svg`
- Create: `public/manifest.webmanifest`
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`
- Create: `public/sitemap.xsl`

**Context:** Thème light pour le sitemap XSL (inverse de compound). Domaine `https://fiscalite.my-monkey.fr` = 30 caractères → path commence en position 31. Palette sitemap : bg `#f9f7f4`, surface `#ffffff`, border `#e8e4de`, text `#1a1a2e`, accent `#059669`.

- [ ] **Step 1 : Créer `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#059669"/>
  <text x="16" y="22" font-family="monospace" font-size="15" font-weight="bold" fill="white" text-anchor="middle">%</text>
</svg>
```

- [ ] **Step 2 : Créer `public/manifest.webmanifest`**

```json
{
  "name": "Fiscalité française",
  "short_name": "Fiscalite",
  "description": "Calculateurs fiscaux français : Net/Brut, IR, Rupture conventionnelle",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#f9f7f4",
  "theme_color": "#f9f7f4",
  "icons": [
    { "src": "/favicon.svg", "sizes": "any", "type": "image/svg+xml" }
  ]
}
```

- [ ] **Step 3 : Créer `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://fiscalite.my-monkey.fr/sitemap.xml
```

- [ ] **Step 4 : Créer `public/sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <url>
    <loc>https://fiscalite.my-monkey.fr/</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="https://fiscalite.my-monkey.fr/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://fiscalite.my-monkey.fr/en/"/>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://fiscalite.my-monkey.fr/en/</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="https://fiscalite.my-monkey.fr/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://fiscalite.my-monkey.fr/en/"/>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url><loc>https://fiscalite.my-monkey.fr/net-brut</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://fiscalite.my-monkey.fr/simulateur-ir</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://fiscalite.my-monkey.fr/rupture-conventionnelle</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://fiscalite.my-monkey.fr/en/net-gross</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://fiscalite.my-monkey.fr/en/income-tax</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://fiscalite.my-monkey.fr/en/severance</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>

</urlset>
```

- [ ] **Step 5 : Créer `public/sitemap.xsl`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="s xhtml">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="fr">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Sitemap — fiscalite.my-monkey.fr</title>
        <style>
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: #f9f7f4; color: #1a1a2e; font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif; font-size: 13px; line-height: 1.5; }
          .wrap { max-width: 860px; margin: 0 auto; padding: 48px 24px 80px; }
          .logo { display: inline-flex; align-items: center; gap: 7px; margin-bottom: 28px; color: #059669; font-size: 14px; font-weight: 700; }
          .logo-dot { width: 8px; height: 8px; border-radius: 50%; background: #059669; opacity: .7; }
          h1 { color: #1a1a2e; font-size: 22px; font-weight: 700; letter-spacing: -.03em; margin-bottom: 6px; }
          .meta { color: #9ca3af; font-size: 11px; display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
          .count { background: #d1fae5; border: 1px solid #a7f3d0; color: #059669; border-radius: 20px; padding: 2px 10px; font-size: 11px; }
          table { width: 100%; border-collapse: collapse; background: #ffffff; border: 1px solid #e8e4de; border-radius: 10px; overflow: hidden; }
          thead tr { border-bottom: 1px solid #e8e4de; }
          th { color: #9ca3af; font-size: 10px; text-transform: uppercase; letter-spacing: .07em; font-weight: 500; padding: 12px 16px; text-align: left; }
          tbody tr { border-bottom: 1px solid #f0ece6; transition: background .12s; }
          tbody tr:last-child { border-bottom: none; }
          tbody tr:hover { background: #f9f7f4; }
          td { padding: 10px 16px; vertical-align: middle; }
          td.url { font-family: 'SF Mono', 'Fira Mono', 'Consolas', monospace; font-size: 12px; }
          td.url a { color: #1a1a2e; text-decoration: none; display: flex; align-items: center; gap: 8px; }
          td.url a:hover { color: #059669; }
          .path-domain { color: #9ca3af; }
          .path-slug { color: #1a1a2e; }
          .badge { display: inline-block; border-radius: 4px; padding: 2px 7px; font-size: 10px; font-weight: 500; }
          .prio-high { background: #d1fae5; color: #059669; }
          .prio-mid  { background: #e0f2fe; color: #0284c7; }
          .prio-low  { background: #f9f7f4; color: #9ca3af; border: 1px solid #e8e4de; }
          .freq { color: #9ca3af; font-size: 11px; }
          footer { margin-top: 40px; color: #9ca3af; font-size: 11px; display: flex; align-items: center; justify-content: space-between; }
          footer a { color: #9ca3af; text-decoration: none; }
          footer a:hover { color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="wrap">
          <div class="logo"><div class="logo-dot"/>fiscalite·</div>
          <h1>Plan du site</h1>
          <div class="meta">
            <span>fiscalite.my-monkey.fr</span>
            <span class="count"><xsl:value-of select="count(s:urlset/s:url)"/> URLs</span>
          </div>

          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Priorité</th>
                <th>Fréquence</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="s:urlset/s:url">
                <xsl:sort select="s:priority" order="descending" data-type="number"/>
                <tr>
                  <td class="url">
                    <a href="{s:loc}">
                      <span class="path-domain">fiscalite.my-monkey.fr</span>
                      <span class="path-slug">
                        <xsl:choose>
                          <xsl:when test="string-length(s:loc) > 30">
                            <xsl:value-of select="substring(s:loc, 31)"/>
                          </xsl:when>
                          <xsl:otherwise>/</xsl:otherwise>
                        </xsl:choose>
                      </span>
                    </a>
                  </td>
                  <td>
                    <xsl:choose>
                      <xsl:when test="s:priority >= 0.9">
                        <span class="badge prio-high"><xsl:value-of select="s:priority"/></span>
                      </xsl:when>
                      <xsl:when test="s:priority >= 0.8">
                        <span class="badge prio-mid"><xsl:value-of select="s:priority"/></span>
                      </xsl:when>
                      <xsl:otherwise>
                        <span class="badge prio-low"><xsl:value-of select="s:priority"/></span>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                  <td class="freq"><xsl:value-of select="s:changefreq"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>

          <footer>
            <span>© 2026 fiscalite — my-monkey</span>
            <a href="/">← Retour au site</a>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
```

- [ ] **Step 6 : Commit**

```bash
cd /c/Users/kilya/Documents/___DEVTEST/fiscalite-poc
git add public/
git commit -m "feat: static assets (favicon, manifest, robots, sitemap)"
```

---

### Task 10: Build de production + vérification finale

**Files:**
- No new files

**Context:** Vérification que le build Vite produit un `dist/` sans erreur, que toutes les routes fonctionnent, et que les tests passent toujours.

- [ ] **Step 1 : Relancer les tests**

```bash
export PATH="/c/Program Files/nodejs:$PATH"
cd /c/Users/kilya/Documents/___DEVTEST/fiscalite-poc
npm test
```

Expected: `17 passed`, aucun FAIL.

- [ ] **Step 2 : Build de production**

```bash
export PATH="/c/Program Files/nodejs:$PATH"
cd /c/Users/kilya/Documents/___DEVTEST/fiscalite-poc
npm run build
```

Expected: `dist/` créé, aucune erreur ou warning critique. La sortie doit montrer les chunks JS/CSS générés.

- [ ] **Step 3 : Vérification visuelle complète via dev server**

```bash
export PATH="/c/Program Files/nodejs:$PATH"
cd /c/Users/kilya/Documents/___DEVTEST/fiscalite-poc
npm run dev -- --port 5174
```

Vérifier les routes suivantes dans le navigateur :
- `http://localhost:5174/` → Home FR, 3 cartes, CookieBanner visible
- `http://localhost:5174/#/en/` → Home EN
- `http://localhost:5174/#/net-brut` → Calculateur, saisir 3000 brut → net 2340 €
- `http://localhost:5174/#/simulateur-ir` → IR, saisir 50000 → IR ≈ 9 514 €, taux marginal 30%
- `http://localhost:5174/#/rupture-conventionnelle` → RC, saisir 3000 / 5 ans → indemnité 3 750 €
- `http://localhost:5174/#/mentions-legales` → page légale visible
- `http://localhost:5174/#/politique-confidentialite` → page légale visible
- `http://localhost:5174/#/en/net-gross`, `/#/en/income-tax`, `/#/en/severance` → labels EN

Couper le dev server.

- [ ] **Step 4 : Commit final**

```bash
cd /c/Users/kilya/Documents/___DEVTEST/fiscalite-poc
git add -A
git commit -m "chore: verified production build OK"
```

---

## Notes de déploiement

Le déploiement suit le même pipeline que compound-poc :

```bash
# Depuis le répertoire parent ___DEVTEST, en bash
export PATH="/c/Program Files/nodejs:$PATH"
cd /c/Users/kilya/Documents/___DEVTEST/fiscalite-poc
npm run build

cd /c/Users/kilya/Documents/___DEVTEST
tar czf fiscalite-poc-v0.1.0.tar.gz fiscalite-poc/dist fiscalite-poc/package.json
cp fiscalite-poc-v0.1.0.tar.gz /c/Users/kilya/Documents/___DEVTEST/
```

Puis en PowerShell :
```powershell
cd C:\Users\kilya\Documents\___DEVTEST
gh release create v0.1.0 fiscalite-poc-v0.1.0.tar.gz --repo <repo> --title "v0.1.0" --notes "Initial release"
```
