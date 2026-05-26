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
