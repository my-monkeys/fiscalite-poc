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
