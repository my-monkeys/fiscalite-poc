# Simulateur d'embauche — Home Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter une section "Simulateur d'embauche" sur la home avec 5 badges de types de contrat (liens info externes) et l'iframe URSSAF.

**Architecture:** Modification d'un seul fichier `src/pages/Home.jsx` — ajout des clés i18n dans `copy`, d'une constante `contracts`, et d'une section JSX. Une règle CSS mobile est ajoutée dans `src/index.css` pour la hauteur de l'iframe.

**Tech Stack:** React 18, React Router DOM, inline styles (convention du projet), Lucide React (icônes non utilisées ici)

---

## File Map

| Fichier | Action | Responsabilité |
|---------|--------|----------------|
| `src/pages/Home.jsx` | Modifier | Ajouter i18n, constante contracts, section JSX |
| `src/index.css` | Modifier | Ajouter règle mobile pour hauteur iframe |

---

### Task 1 : Ajouter les clés i18n dans `copy`

**Files:**
- Modify: `src/pages/Home.jsx` (objet `copy`, lignes ~9-80)

- [ ] **Step 1 : Ajouter les clés FR dans `copy.fr`**

Dans `src/pages/Home.jsx`, à la fin du bloc `fr: { ... }` (avant la virgule fermante du bloc `fr`), ajouter :

```js
    simulLabel: 'Simulateur d\'embauche',
    simulTitle: 'Estimez le coût d\'une embauche',
    simulSub: 'Choisissez un type de contrat pour en savoir plus, puis utilisez le simulateur URSSAF ci-dessous.',
    iframeTitle: 'Simulateur d\'embauche URSSAF',
```

- [ ] **Step 2 : Ajouter les clés EN dans `copy.en`**

Dans `src/pages/Home.jsx`, à la fin du bloc `en: { ... }` (avant la virgule fermante du bloc `en`), ajouter :

```js
    simulLabel: 'Hiring cost simulator',
    simulTitle: 'Estimate the cost of hiring',
    simulSub: 'Select a contract type to learn more, then use the URSSAF simulator below.',
    iframeTitle: 'URSSAF hiring cost simulator',
```

- [ ] **Step 3 : Vérifier que le fichier compile sans erreur**

```bash
npm run build 2>&1 | tail -5
```

Résultat attendu : `✓ built in` (aucune erreur TypeScript / JSX)

- [ ] **Step 4 : Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat: add i18n keys for simulateur embauche section"
```

---

### Task 2 : Ajouter la constante `contracts`

**Files:**
- Modify: `src/pages/Home.jsx` (après la définition de `copy`, avant `export default`)

- [ ] **Step 1 : Insérer la constante `contracts` après la fermeture de `copy`**

Dans `src/pages/Home.jsx`, ajouter ces lignes juste après la ligne `}` qui ferme l'objet `copy` (ligne ~80) :

```js
const contracts = [
  { label: 'CDI',                  infoUrl: 'https://www.service-public.fr/particuliers/vosdroits/F1906' },
  { label: 'CDD',                  infoUrl: 'https://www.service-public.fr/particuliers/vosdroits/F34' },
  { label: 'Apprentissage',        infoUrl: 'https://www.alternance.emploi.gouv.fr/contrat-apprentissage' },
  { label: 'Professionnalisation', infoUrl: 'https://travail-emploi.gouv.fr/formation-professionnelle/mise-en-oeuvre-des-dispositifs-de-formation/article/le-contrat-de-professionnalisation' },
  { label: 'Stage',                infoUrl: 'https://www.service-public.fr/particuliers/vosdroits/F16734' },
]
```

Les labels sont identiques en FR et EN (sigles français universels), donc la constante est hors de `copy`.

- [ ] **Step 2 : Vérifier que le fichier compile sans erreur**

```bash
npm run build 2>&1 | tail -5
```

Résultat attendu : `✓ built in` (aucune erreur)

- [ ] **Step 3 : Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat: add contracts constant for simulateur embauche"
```

---

### Task 3 : Insérer la section JSX dans `Home.jsx`

**Files:**
- Modify: `src/pages/Home.jsx` (JSX retourné par `Home`, entre `</main>` et `<Footer />`)

- [ ] **Step 1 : Localiser le point d'insertion**

Dans `src/pages/Home.jsx`, trouver cette séquence (vers la fin du JSX retourné) :

```jsx
      </main>

      <Footer />
```

- [ ] **Step 2 : Insérer la section entre `</main>` et `<Footer />`**

Remplacer la séquence ci-dessus par :

```jsx
      </main>

      {/* ── Simulateur d'embauche ────────────────────────────── */}
      <div style={{ background: '#ffffff', borderTop: '1px solid #e8e4de' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '56px 20px' }}>

          <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: 11, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 12 }}>
            {c.simulLabel}
          </p>

          <h2 style={{ color: '#1a1a2e', fontSize: 22, fontWeight: 800, letterSpacing: '-.03em', textAlign: 'center', marginBottom: 12 }}>
            {c.simulTitle}
          </h2>

          <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.6, textAlign: 'center', maxWidth: 540, margin: '0 auto 28px' }}>
            {c.simulSub}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 28 }}>
            {contracts.map(({ label, infoUrl }) => (
              <span key={label} style={{ background: '#f9f7f4', border: '1px solid #e8e4de', borderRadius: 20, padding: '6px 14px', color: '#1a1a2e', fontWeight: 600, fontSize: 13, display: 'inline-flex', alignItems: 'center' }}>
                {label}
                <a href={infoUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#059669', fontSize: 14, marginLeft: 6, lineHeight: 1, textDecoration: 'none' }}>ⓘ</a>
              </span>
            ))}
          </div>

          <iframe
            src="https://mon-entreprise.urssaf.fr/iframes/simulateur-embauche?integratorUrl=https%3A%2F%2Fcode.travail.gouv.fr%2Foutils%2Fsimulateur-embauche&lang=fr"
            title={c.iframeTitle}
            loading="lazy"
            className="simul-iframe"
            style={{ width: '100%', height: 600, border: '1px solid #e8e4de', borderRadius: 10, display: 'block' }}
          />

        </div>
      </div>

      <Footer />
```

- [ ] **Step 3 : Vérifier que le fichier compile sans erreur**

```bash
npm run build 2>&1 | tail -5
```

Résultat attendu : `✓ built in`

- [ ] **Step 4 : Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat: add simulateur embauche section on home page"
```

---

### Task 4 : Ajouter la règle CSS mobile pour l'iframe

**Files:**
- Modify: `src/index.css` (bloc `@media (max-width: 680px)` existant)

- [ ] **Step 1 : Ajouter la règle `.simul-iframe` dans le media query existant**

Dans `src/index.css`, le bloc media query existant ressemble à :

```css
@media (max-width: 680px) {
  .grid-3 { grid-template-columns: 1fr !important; }
  .grid-2 { grid-template-columns: 1fr !important; }
  .hero-h1 { font-size: 30px !important; }
  .trust-row { flex-direction: column !important; align-items: center !important; gap: 12px !important; }
  .hide-mobile { display: none !important; }
}
```

Ajouter la ligne `.simul-iframe` à la fin, avant la `}` fermante :

```css
@media (max-width: 680px) {
  .grid-3 { grid-template-columns: 1fr !important; }
  .grid-2 { grid-template-columns: 1fr !important; }
  .hero-h1 { font-size: 30px !important; }
  .trust-row { flex-direction: column !important; align-items: center !important; gap: 12px !important; }
  .hide-mobile { display: none !important; }
  .simul-iframe { height: 700px !important; }
}
```

- [ ] **Step 2 : Vérifier que le build passe**

```bash
npm run build 2>&1 | tail -5
```

Résultat attendu : `✓ built in`

- [ ] **Step 3 : Commit**

```bash
git add src/index.css
git commit -m "feat: mobile height for simulateur embauche iframe"
```

---

### Task 5 : Vérification manuelle dans le navigateur

Il n'existe pas de setup de tests de composants dans ce projet (seuls des tests unitaires `fiscalCalc.test.js`). La vérification se fait manuellement.

**Files:** aucun

- [ ] **Step 1 : Lancer le serveur de dev**

```bash
npm run dev
```

Ouvrir `http://localhost:5173` dans le navigateur.

- [ ] **Step 2 : Vérifier la section sur la home FR**

Checklist visuelle sur `http://localhost:5173/` :
- La section apparaît **après** la grille des 3 outils et **avant** le footer
- Le label gris majuscule "SIMULATEUR D'EMBAUCHE" s'affiche
- Le titre "Estimez le coût d'une embauche" s'affiche
- Les 5 badges s'affichent : CDI, CDD, Apprentissage, Professionnalisation, Stage
- Chaque badge a un ⓘ vert cliquable (ouvre un lien externe dans un nouvel onglet)
- L'iframe URSSAF se charge (peut prendre quelques secondes)

- [ ] **Step 3 : Vérifier la home EN**

Aller sur `http://localhost:5173/en/` :
- Le label affiche "HIRING COST SIMULATOR"
- Le titre affiche "Estimate the cost of hiring"
- Les badges et l'iframe sont identiques (labels FR = universels)

- [ ] **Step 4 : Vérifier le responsive mobile**

Ouvrir les DevTools (F12) → mode responsive → largeur 375px :
- Les badges passent en multi-lignes (flex wrap)
- L'iframe a une hauteur de 700px

- [ ] **Step 5 : Vérifier les liens info**

Cliquer sur le ⓘ de chaque badge et vérifier que la page officielle s'ouvre dans un nouvel onglet :
- CDI → service-public.fr
- CDD → service-public.fr
- Apprentissage → alternance.emploi.gouv.fr
- Professionnalisation → travail-emploi.gouv.fr
- Stage → service-public.fr
