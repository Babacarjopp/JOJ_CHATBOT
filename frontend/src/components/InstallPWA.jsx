// frontend/src/components/InstallPWA.jsx
import { useState, useEffect } from 'react'

export default function InstallPWA() {
  const [prompt, setPrompt] = useState(null)
  const [installed, setInstalled] = useState(false)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Déjà installé ?
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true)
      return
    }

    // Capturer l'event d'installation
    const handler = (e) => {
      e.preventDefault()
      setPrompt(e)
      // Afficher le banner après 30s ou 3 messages
      setTimeout(() => setShowBanner(true), 30000)
    }

    window.addEventListener('beforeinstallprompt', handler)
    window.addEventListener('appinstalled', () => {
      setInstalled(true)
      setShowBanner(false)
      setPrompt(null)
    })

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!prompt) return
    prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === 'accepted') {
      setInstalled(true)
      setShowBanner(false)
    }
    setPrompt(null)
  }

  // Ne rien afficher si installé ou pas de prompt
  if (installed || !prompt || !showBanner) return null

  return (
    <div className="pwa-banner">
      <div className="pwa-banner-left">
        <img src="/lion.png" alt="JOJ" className="pwa-banner-icon" />
        <div>
          <div className="pwa-banner-title">Installer JOJ Assistant</div>
          <div className="pwa-banner-sub">Accès rapide depuis votre écran d'accueil</div>
        </div>
      </div>
      <div className="pwa-banner-actions">
        <button className="pwa-dismiss" onClick={() => setShowBanner(false)}>✕</button>
        <button className="pwa-install-btn" onClick={handleInstall}>
          📲 Installer
        </button>
      </div>
    </div>
  )
}