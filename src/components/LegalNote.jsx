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
