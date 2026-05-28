# Spec — Section Simulateur d'embauche sur la Home

**Date :** 2026-05-28  
**Statut :** Approuvé

---

## Objectif

Ajouter une section "Simulateur d'embauche" directement sur la page d'accueil (`Home.jsx`), en dessous de la grille des outils existants. Cette section intègre l'iframe URSSAF du simulateur de coût d'embauche et présente les 5 types de contrats (CDI, CDD, Apprentissage, Professionnalisation, Stage) avec des liens d'information vers des pages officielles.

---

## Placement

- Fichier : `src/pages/Home.jsx`
- Position : après `<main>` (grille des outils), avant `<Footer />`
- Présent dans les deux langues : `fr` et `en`

---

## Contenu de la section

### Labels (fr / en)

| Clé | FR | EN |
|-----|----|----|
| `sectionLabel` | `Simulateur d'embauche` | `Hiring cost simulator` |
| `sectionTitle` | `Estimez le coût d'une embauche` | `Estimate the cost of hiring` |
| `sectionSub` | `Choisissez un type de contrat pour en savoir plus, puis utilisez le simulateur URSSAF ci-dessous.` | `Select a contract type to learn more, then use the URSSAF simulator below.` |
| `iframeTitle` | `Simulateur d'embauche URSSAF` | `URSSAF hiring cost simulator` |

### Types de contrats et liens info

| Type | Lien info |
|------|-----------|
| CDI | `https://www.service-public.fr/particuliers/vosdroits/F1906` |
| CDD | `https://www.service-public.fr/particuliers/vosdroits/F34` |
| Apprentissage | `https://www.alternance.emploi.gouv.fr/contrat-apprentissage` |
| Professionnalisation | `https://travail-emploi.gouv.fr/formation-professionnelle/mise-en-oeuvre-des-dispositifs-de-formation/article/le-contrat-de-professionnalisation` |
| Stage | `https://www.service-public.fr/particuliers/vosdroits/F16734` |

Tous les liens s'ouvrent avec `target="_blank" rel="noopener noreferrer"`.

### URL de l'iframe

```
https://mon-entreprise.urssaf.fr/iframes/simulateur-embauche?integratorUrl=https%3A%2F%2Fcode.travail.gouv.fr%2Foutils%2Fsimulateur-embauche&lang=fr
```

---

## Design visuel

### Conteneur global
- `maxWidth: 860px`, centré, `padding: 56px 20px`
- `background: #ffffff`, `borderTop: 1px solid #e8e4de`

### Label de section
- Style identique au label "Nos outils" : `color: #9ca3af`, `fontSize: 11px`, `fontWeight: 600`, `letterSpacing: .1em`, `textTransform: uppercase`, `marginBottom: 12px`, `textAlign: center`

### Titre
- `color: #1a1a2e`, `fontSize: 22px`, `fontWeight: 800`, `letterSpacing: -.03em`, `textAlign: center`, `marginBottom: 12px`

### Sous-titre
- `color: #6b7280`, `fontSize: 14px`, `lineHeight: 1.6`, `textAlign: center`, `marginBottom: 28px`, `maxWidth: 540px`, centré

### Badges de contrats
- Rangée en `display: flex`, `flexWrap: wrap`, `gap: 10px`, `justifyContent: center`, `marginBottom: 28px`
- Chaque badge : `background: #f9f7f4`, `border: 1px solid #e8e4de`, `borderRadius: 20px`, `padding: 6px 14px`
- Texte : `color: #1a1a2e`, `fontWeight: 600`, `fontSize: 13px`
- Icône ⓘ : couleur `#059669`, `fontSize: 14px`, `marginLeft: 6px`, lien externe (pas le badge entier)

### Iframe
- `width: 100%`, hauteur `600px` desktop / `700px` mobile (media query)
- `border: 1px solid #e8e4de`, `borderRadius: 10px`
- Attributs : `loading="lazy"`, `title` localisé

---

## Implémentation

### Modifications de fichiers

**`src/pages/Home.jsx`** :
1. Ajouter les nouvelles clés i18n dans l'objet `copy` (fr + en)
2. Ajouter la constante `contracts` (tableau avec `label`, `infoUrl`)
3. Insérer la section JSX entre `</main>` et `<Footer />`

Aucun nouveau fichier à créer — tout tient dans `Home.jsx`.

---

## Hors scope

- Aucune route nouvelle (`/simulateur-embauche` n'est pas créée)
- Aucun filtrage de l'iframe selon le type de contrat sélectionné
- Aucune traduction des liens info (les pages officielles FR n'ont pas d'équivalent EN standardisé)
