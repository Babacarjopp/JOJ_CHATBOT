import './App.css'
import { useState } from 'react'
import ChatWindow from './components/ChatWindow'
import LanguageSelector from './components/LanguageSelector'

export default function App() {
  const [lang, setLang] = useState('auto')

  return (
    <div className="app-root">
      {/* Animated background */}
      <div className="bg-pattern" />
      <div className="bg-glow" />

      <div className="app-container">
        {/* Header */}
        <header className="app-header">
          <div className="header-left">
            <div className="logo-ring">
              <span className="logo-emoji">🦁</span>
            </div>
            <div className="header-titles">
              <h1 className="app-title">JOJ Assistant</h1>
              <span className="app-subtitle">Dakar 2026 · Youth Olympic Games</span>
            </div>
          </div>
          <LanguageSelector lang={lang} onChange={setLang} />
        </header>

        {/* Chat */}
        <ChatWindow lang={lang} />

        {/* Footer */}
        <footer className="app-footer">
          <span>Powered by</span>
          <span className="footer-badge">🏅 JOJ Dakar 2026</span>
          <span className="footer-dot">·</span>
          <span className="footer-badge">🇸🇳 Sénégal</span>
        </footer>
      </div>
    </div>
  )
}