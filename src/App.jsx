import { Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<div style={{ padding: 40, fontFamily: 'sans-serif' }}>fiscalite.my-monkey.fr — scaffold OK</div>} />
    </Routes>
  )
}
