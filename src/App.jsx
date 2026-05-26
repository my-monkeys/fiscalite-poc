import { Routes, Route } from 'react-router-dom'
import CookieBanner from './components/CookieBanner'
import Home from './pages/Home'

export default function App() {
  return (
    <>
      <CookieBanner />
      <Routes>
        <Route path="/" element={<Home lang="fr" />} />
        <Route path="/en/" element={<Home lang="en" />} />
      </Routes>
    </>
  )
}
