import { useState, useEffect } from 'react'
import ChatWindow from './components/ChatWindow'
import LanguageSelector from './components/LanguageSelector'
import MapView from './components/MapView'
import InstallPWA from './components/InstallPWA'
import QuizPanel from './components/QuizPanel'
import './App.css'

const API_URL   = import.meta.env.VITE_API_URL   || 'http://localhost:3001'

export default function App() {
  const [lang, setLang] = useState('auto')
  const [showMap, setShowMap] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [focusVenueId, setFocusVenueId] = useState(null)








  return (
    <div className="app-root">
      <div className="bg-pattern" />
      <div className="bg-glow" />

      <div className="app-container">
        <header className="app-header">
          <div className="header-left">
            <div className="logo-ring">
              <img src="/lion.png" alt="JOJ 2026" style={{width:"100%",height:"100%",objectFit:"contain",borderRadius:"50%"}} />
            </div>
            <div className="header-titles">
              <h1 className="app-title">JOJ Assistant</h1>
              <span className="app-subtitle">Dakar 2026 · Youth Olympic Games</span>
            </div>
          </div>
          <div className="header-right">
            <button className="map-btn" onClick={() => setShowMap(true)}>🗺️ Carte</button>
            <button className="map-btn quiz-btn" onClick={() => setShowQuiz(true)}>🏅 Quiz</button>
            <LanguageSelector lang={lang} onChange={setLang} />
          </div>
        </header>

        <ChatWindow lang={lang} onOpenVenue={(id) => { setFocusVenueId(id); setShowMap(true) }} />

        <InstallPWA />
        <footer className="app-footer">
          <span>Powered by</span>
          <span className="footer-badge">🏅 JOJ Dakar 2026</span>
          <span className="footer-dot">·</span>
          <span className="footer-badge">🇸🇳 Sénégal</span>
        </footer>
      </div>



      {showQuiz   && <QuizPanel   onClose={() => setShowQuiz(false)} lang={lang} />}
      {showMap    && <MapView      onClose={() => { setShowMap(false); setFocusVenueId(null) }} focusVenueId={focusVenueId} />}
    </div>
  )
}