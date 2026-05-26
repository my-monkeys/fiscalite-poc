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
