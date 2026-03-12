import { useState, useEffect } from 'react'
import ChatWindow from './components/ChatWindow'
import LanguageSelector from './components/LanguageSelector'
import MapView from './components/MapView'
import Dashboard from './components/Dashboard'
import AlertsPanel from './components/AlertsPanel'
import './App.css'

const API_URL   = import.meta.env.VITE_API_URL   || 'http://localhost:3001'
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY || 'joj2026admin'

export default function App() {
  const [lang, setLang] = useState('auto')
  const [showMap, setShowMap] = useState(false)
  const [focusVenueId, setFocusVenueId] = useState(null)
  const [showDash, setShowDash] = useState(false)
  const [showAlerts, setShowAlerts] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [passwordTarget, setPasswordTarget] = useState(null)
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [stats, setStats] = useState({
    total: 0, users: 0, fr: 0, en: 0, wo: 0,
    webCount: 0, waCount: 0, avgResponse: '0.8',
    successRate: 94, categories: {}, recent: []
  })

  useEffect(() => {
    if (!showDash) return
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}/api/stats?key=${ADMIN_KEY}`)
        if (!res.ok) return
        const data = await res.json()
        setStats(data)
      } catch (e) {}
    }
    fetchStats()
    const interval = setInterval(fetchStats, 5000)
    return () => clearInterval(interval)
  }, [showDash])

  const openWithPassword = (target) => {
    setPasswordTarget(target)
    setPasswordInput('')
    setPasswordError(false)
    setShowPasswordModal(true)
  }

  const handlePasswordSubmit = () => {
    if (passwordInput === 'joj2026') {
      setShowPasswordModal(false)
      setPasswordInput('')
      setPasswordError(false)
      if (passwordTarget === 'stats') setShowDash(true)
      if (passwordTarget === 'alerts') setShowAlerts(true)
    } else {
      setPasswordError(true)
      setPasswordInput('')
    }
  }

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
            <button className="map-btn" onClick={() => openWithPassword('stats')}>📊 Stats</button>
            <button className="map-btn" onClick={() => openWithPassword('alerts')}>🔔 Alertes</button>
            <LanguageSelector lang={lang} onChange={setLang} />
          </div>
        </header>

        <ChatWindow lang={lang} onOpenVenue={(id) => { setFocusVenueId(id); setShowMap(true) }} />

        <footer className="app-footer">
          <span>Powered by</span>
          <span className="footer-badge">🏅 JOJ Dakar 2026</span>
          <span className="footer-dot">·</span>
          <span className="footer-badge">🇸🇳 Sénégal</span>
        </footer>
      </div>

      {/* Modal mot de passe */}
      {showPasswordModal && (
        <div className="map-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="password-modal" onClick={e => e.stopPropagation()}>
            <div className="password-icon">
              {passwordTarget === 'alerts' ? '🔔' : '🔐'}
            </div>
            <h2 className="password-title">Accès Admin</h2>
            <p className="password-subtitle">
              {passwordTarget === 'alerts'
                ? 'Accès au panneau d\'alertes WhatsApp'
                : 'Accès au dashboard analytics'}
            </p>
            <input
              className={`password-input ${passwordError ? 'password-error' : ''}`}
              type="password"
              placeholder="Mot de passe..."
              value={passwordInput}
              onChange={e => { setPasswordInput(e.target.value); setPasswordError(false) }}
              onKeyDown={e => {
                if (e.key === 'Enter') handlePasswordSubmit()
                if (e.key === 'Escape') setShowPasswordModal(false)
              }}
              autoFocus
            />
            {passwordError && <p className="password-error-msg">❌ Mot de passe incorrect</p>}
            <div className="password-actions">
              <button className="password-cancel" onClick={() => setShowPasswordModal(false)}>Annuler</button>
              <button className="password-submit" onClick={handlePasswordSubmit}>Accéder →</button>
            </div>
          </div>
        </div>
      )}

      {showMap    && <MapView      onClose={() => { setShowMap(false); setFocusVenueId(null) }} focusVenueId={focusVenueId} />}
      {showDash   && <Dashboard    onClose={() => setShowDash(false)} stats={stats} />}
      {showAlerts && <AlertsPanel  onClose={() => setShowAlerts(false)} />}
    </div>
  )
}