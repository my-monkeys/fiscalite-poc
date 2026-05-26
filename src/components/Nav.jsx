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
