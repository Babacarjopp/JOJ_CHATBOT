// frontend/src/components/OfflineBanner.jsx
import { useState, useEffect } from 'react'

export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  const [wasOffline, setWasOffline] = useState(false)
  const [showBack, setShowBack] = useState(false)

  useEffect(() => {
    const goOffline = () => {
      setIsOffline(true)
      setWasOffline(true)
      setShowBack(false)
    }

    const goOnline = () => {
      setIsOffline(false)
      if (wasOffline) {
        setShowBack(true)
        setTimeout(() => setShowBack(false), 3000)
      }
    }

    window.addEventListener('offline', goOffline)
    window.addEventListener('online', goOnline)
    return () => {
      window.removeEventListener('offline', goOffline)
      window.removeEventListener('online', goOnline)
    }
  }, [wasOffline])

  if (!isOffline && !showBack) return null

  return (
    <div className={`offline-banner ${isOffline ? 'offline-banner-off' : 'offline-banner-on'}`}>
      {isOffline ? (
        <>
          <span className="offline-icon">📡</span>
          <div>
            <div className="offline-title">Pas de connexion</div>
            <div className="offline-sub">Vérifiez votre réseau — les réponses sont en attente</div>
          </div>
          <div className="offline-dot-pulse">
            <span /><span /><span />
          </div>
        </>
      ) : (
        <>
          <span className="offline-icon">✅</span>
          <div className="offline-title">Connexion rétablie !</div>
        </>
      )}
    </div>
  )
}