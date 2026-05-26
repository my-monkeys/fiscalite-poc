import { Routes, Route } from 'react-router-dom'
import CookieBanner from './components/CookieBanner'
import Home from './pages/Home'
import NetBrut from './pages/NetBrut'

export default function App() {
  return (
    <>
      <CookieBanner />
      <Routes>
        <Route path="/" element={<Home lang="fr" />} />
        <Route path="/en/" element={<Home lang="en" />} />
        <Route path="/net-brut" element={<NetBrut lang="fr" />} />
        <Route path="/en/net-gross" element={<NetBrut lang="en" />} />
      </Routes>
    </>
  )
}
