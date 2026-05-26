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
