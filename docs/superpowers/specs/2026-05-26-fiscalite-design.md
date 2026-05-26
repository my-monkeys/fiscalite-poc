# fiscalite.my-monkey.fr — Design Spec

## Overview

Site web bilingue (FR/EN) de calculateurs fiscaux français, déployé sur `fiscalite.my-monkey.fr`. Nouveau repo indépendant `fiscalite-poc`. Design light/premium distinct du dark theme de compound.

**Objectif :** Offrir 3 outils fiscaux pratiques avec une interface claire et professionnelle, financés par AdSense, atteignant un public FR et EN.

---

## Architecture & Stack

- **Framework :** Vite 6 + React 19, React Router v7 (SPA client-side uniquement, `HashRouter`)
- **Styles :** Inline styles uniquement dans les JSX. Exceptions : `index.css` pour les media queries responsives (`@media (max-width: 680px)`) avec des classNames simples.
- **Internationalisation :** Objet `copy` par composant avec clés `fr`/`en`. Prop `lang` passée depuis App.jsx. Pas de librairie i18n externe.
- **Routing :**
  - `/` → Home FR
  - `/net-brut` → Calculateur Net/Brut FR
  - `/simulateur-ir` → Simulateur IR FR
  - `/rupture-conventionnelle` → Calculateur RC FR
  - `/en/` → Home EN
  - `/en/net-gross` → Net/Gross calculator EN
  - `/en/income-tax` → Income tax simulator EN
  - `/en/severance` → Severance pay calculator EN
  - `/mentions-legales` → Mentions légales (FR uniquement)
  - `/politique-confidentialite` → Politique de confidentialité (FR uniquement)
- **Déploiement :** Même pipeline que compound — `bash tar czf` depuis le répertoire parent → `gh release create` → webhook O2switch

---

## Palette de couleurs

```
bg:           #f9f7f4   (fond page)
surface:      #ffffff   (cartes, inputs)
border:       #e8e4de   (séparateurs, bordures)
text:         #1a1a2e   (texte principal)
muted:        #6b7280   (labels, texte secondaire)
faint:        #9ca3af   (placeholders, hints)
accent:       #059669   (CTA, valeurs positives, résultats clés)
accent-light: #d1fae5   (fond badge accent)
accent-dark:  #047857   (hover accent)
red:          #dc2626   (valeurs négatives, erreurs)
```

---

## Composants partagés

### `src/components/Nav.jsx`
Barre de navigation fixe en haut. Logo "fiscalite·" à gauche (couleur accent). Switcher langue FR/EN à droite (lien vers l'équivalent dans l'autre langue). Fond `#f9f7f4`, bordure bottom `#e8e4de`.

### `src/components/Footer.jsx`
Fond `#f9f7f4`, bordure top `#e8e4de`. Liens légaux (mentions légales, politique de confidentialité). "propulsé par my-monkey.fr" avec lien. Copyright 2026.

### `src/components/Seo.jsx`
Gère `<title>`, `<meta description>`, `<link rel="canonical">`, balises Open Graph, hreflang, et un slot JSON-LD principal. Réutilise le pattern de compound.

### `src/components/CookieBanner.jsx`
Bandeau fixe en bas. Clé localStorage `fiscalite_cookie_consent`. Texte : mentionne cookies publicitaires Google AdSense. Boutons Accepter / Refuser. Fond blanc, bordure top `#e8e4de`. Disparaît au consentement.

### `src/components/LegalNote.jsx`
Une ligne de disclaimer financier sous chaque calculateur. Texte gris muted, `font-size: 11px`. FR + EN selon prop `lang`.

### `src/lib/fiscalCalc.js`
Toutes les fonctions de calcul fiscal pur (pas de UI), réutilisables par les 3 pages :
- `grossToNet(gross)` / `netToGross(net)` — salarié
- `aeToNet(ca, category)` — auto-entrepreneur (3 catégories)
- `computeIR(revenuImposable, parts)` — barème 2024
- `computeRC(salaireBrut, anciennete)` — indemnité rupture conventionnelle

---

## Page d'accueil (`src/pages/Home.jsx`)

Header sobre : titre "Fiscalité française" / "French Tax Tools", sous-titre descriptif.

3 cartes outils disposées en grille (1 colonne mobile, 3 colonnes desktop) :
- **Net / Brut** — icône Wallet, description courte, lien vers `/net-brut`
- **Simulateur IR** — icône BarChart2, description courte, lien vers `/simulateur-ir`
- **Rupture conventionnelle** — icône FileText, description courte, lien vers `/rupture-conventionnelle`

Cartes : fond `#ffffff`, bordure `#e8e4de`, border-radius 10px, hover lift léger (box-shadow). Pas d'animations complexes — hover CSS suffisant.

---

## Calculateur Net / Brut (`src/pages/NetBrut.jsx`)

**Logique (dans `fiscalCalc.js`) :**
- Salarié brut → net : cotisations salariales ≈ 22% du brut (simplifié, hors cas particuliers)
- Salarié net → brut : brut = net / (1 - 0.22)
- Coût employeur = brut × 1.42
- Auto-entrepreneur : 3 catégories — BIC marchand 12.3%, BIC service 21.2%, BNC 23.1% (taux 2024)

**UI :**
- Toggle "Salarié / Auto-entrepreneur"
- Salarié : input montant + toggle Brut↔Net + sélecteur période (mensuel/annuel)
- AE : input CA + radio catégorie (BIC marchand / BIC service / BNC)
- Résultats : carte avec les valeurs clés en accent (net perçu, cotisations, coût employeur)
- LegalNote en bas

---

## Simulateur IR (`src/pages/SimulateurIR.jsx`)

**Logique (dans `fiscalCalc.js`) :**
Barème 2024 (revenus 2023) :
- 0 % jusqu'à 11 294 €
- 11 % de 11 294 € à 28 797 €
- 30 % de 28 797 € à 82 341 €
- 41 % de 82 341 € à 177 106 €
- 45 % au-delà de 177 106 €

Abattement forfaitaire 10% sur salaires (min 495€, max 14 171€). Quotient familial : diviser revenu par nombre de parts, calculer IR, multiplier.

**UI :**
- Input revenu net imposable (ou brut avec toggle abattement automatique)
- Sélecteur parts fiscales (1, 1.5, 2, 2.5, 3...)
- Résultats : IR total, taux moyen, taux marginal, détail par tranche sous forme de tableau
- LegalNote en bas

---

## Rupture conventionnelle (`src/pages/RuptureConventionnelle.jsx`)

**Logique (dans `fiscalCalc.js`) :**
- Salaire de référence = moyenne des 12 derniers mois (ou 3 derniers si plus favorable)
- Indemnité légale minimum :
  - Années ≤ 10 : 1/4 de mois de salaire par année
  - Années > 10 : 1/3 de mois de salaire par année (tranche au-delà de 10 ans uniquement ; les 10 premières restent à 1/4)
- Exonération fiscale et sociale dans la limite de 2 × PASS (Plafond Annuel Sécurité Sociale 2024 = 46 368€ → 2 × PASS = 92 736€)
- Partie exonérée = min(indemnité, 2×PASS)
- Partie imposable = max(0, indemnité - 2×PASS)

**UI :**
- Inputs : salaire mensuel brut moyen, ancienneté (années et mois)
- Résultats : indemnité brute, partie exonérée, partie imposable, IR estimé sur partie imposable
- LegalNote en bas

---

## Pages légales

### `src/pages/MentionsLegales.jsx`
- Éditeur : my-monkey, Montpellier
- Contact : technique@evarisk.com
- Hébergement : O2switch
- Directeur publication : my-monkey

### `src/pages/PolitiqueConfidentialite.jsx`
- RGPD : données collectées, durée conservation, droits utilisateurs
- Google AdSense : cookies publicitaires, opt-out
- Lien CNIL

---

## SEO

Chaque page outil a :
- `<title>` et `<meta description>` distincts FR/EN
- `<link rel="canonical">` vers l'URL canonique
- Balises hreflang FR/EN
- JSON-LD `WebApplication` ou `FAQPage` selon la page
- `sitemap.xml` statique dans `public/` avec toutes les URLs
- `sitemap.xsl` pour rendu stylisé (même pattern que compound, palette light)

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
│   ├── sitemap.xml
│   ├── sitemap.xsl
│   └── robots.txt
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── lib/
    │   └── fiscalCalc.js
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

## Contraintes techniques

- Node.js non dans PATH PowerShell → utiliser `export PATH="/c/Program Files/nodejs:$PATH"` dans bash avant `npm`
- HashRouter (SPA sans config serveur)
- Inline styles partout sauf media queries dans index.css
- Pas de librairie d'animations — transitions CSS simples uniquement
- Pas de state management externe (useState/useRef suffisent)
