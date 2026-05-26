import { Routes, Route } from 'react-router-dom'
import CookieBanner from './components/CookieBanner'
import Home from './pages/Home'
import NetBrut from './pages/NetBrut'
import SimulateurIR from './pages/SimulateurIR'
import RuptureConventionnelle from './pages/RuptureConventionnelle'

export default function App() {
  return (
    <>
      <CookieBanner />
      <Routes>
        <Route path="/" element={<Home lang="fr" />} />
        <Route path="/en/" element={<Home lang="en" />} />
        <Route path="/net-brut" element={<NetBrut lang="fr" />} />
        <Route path="/en/net-gross" element={<NetBrut lang="en" />} />
        <Route path="/simulateur-ir" element={<SimulateurIR lang="fr" />} />
        <Route path="/en/income-tax" element={<SimulateurIR lang="en" />} />
        <Route path="/rupture-conventionnelle" element={<RuptureConventionnelle lang="fr" />} />
        <Route path="/en/severance" element={<RuptureConventionnelle lang="en" />} />
      </Routes>
    </>
  )
}
