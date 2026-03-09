// frontend/src/components/AlertsPanel.jsx
import { useState, useEffect } from 'react'

const API_URL   = import.meta.env.VITE_API_URL   || 'http://localhost:3001'
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY || 'joj2026admin'

const QUICK_ALERTS = [
  { emoji: '🏅', label: 'Ouverture ce soir', msg: '🏅 *JOJ Dakar 2026* — Cérémonie d\'ouverture ce soir à 18h au Dakar Arena ! 🇸🇳🔥' },
  { emoji: '🥊', label: 'Finale Laamb', msg: '🥊 *Lutte Laamb* — Finale dans 1 heure à l\'Arène Nationale ! 🇸🇳' },
  { emoji: '⚽', label: 'Match Football', msg: '⚽ *Football* — Match Sénégal U18 dans 30 minutes au Stade LSS ! Allez les Lions 🦁' },
  { emoji: '🥇', label: 'Médailles', msg: '🥇 *Médailles* — Sénégal : 3🥇 2🥈 1🥉 — Top performance ! 🇸🇳' },
  { emoji: '🚌', label: 'Transport', msg: '🚌 *Info Transport* — Navettes supplémentaires disponibles depuis Petersen jusqu\'à 23h ce soir.' },
  { emoji: '🌧️', label: 'Météo', msg: '🌧️ *Météo* — Risque de pluie cet après-midi. Prévoir une veste pour les épreuves extérieures !' },
]

export default function AlertsPanel({ onClose }) {
  const [customMsg, setCustomMsg] = useState('')
  const [subscribers, setSubscribers] = useState(0)
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const fetchSubscribers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/stats?key=${ADMIN_KEY}`)
      const data = await res.json()
      setSubscribers(data.waCount || 0)
    } catch (e) {}
  }

  const sendAlert = async (message) => {
    if (!message.trim() || sending) return
    setSending(true)
    setResult(null)

    try {
      const res = await fetch(`${API_URL}/api/alerts/send?key=${ADMIN_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      })
      const data = await res.json()
      setResult(data)
      setHistory(prev => [{
        time: new Date().toLocaleTimeString(),
        msg: message.slice(0, 60) + (message.length > 60 ? '...' : ''),
        sent: data.sent,
        failed: data.failed
      }, ...prev.slice(0, 4)])
      setCustomMsg('')
    } catch (e) {
      setResult({ error: 'Erreur réseau' })
    }
    setSending(false)
  }

  return (
    <div className="map-overlay" onClick={onClose}>
      <div className="dashboard-modal" style={{ maxWidth: 600 }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="map-header">
          <div className="map-header-left">
            <span style={{ fontSize: 24 }}>🔔</span>
            <div>
              <h2 className="map-title">Alertes WhatsApp</h2>
              <p className="map-subtitle">Envoyer des notifications aux abonnés</p>
            </div>
          </div>
          <button className="map-close" onClick={onClose}>✕</button>
        </div>

        <div className="dashboard-body">

          {/* Stats abonnés */}
          <div style={{ display: 'flex', gap: 10 }}>
            <div className="dash-kpi" style={{ flex: 1 }}>
              <span className="dash-kpi-icon">📱</span>
              <div className="dash-kpi-value" style={{ color: '#25D366' }}>{subscribers}</div>
              <div className="dash-kpi-label">Abonnés WhatsApp</div>
            </div>
            <div className="dash-kpi" style={{ flex: 1 }}>
              <span className="dash-kpi-icon">📤</span>
              <div className="dash-kpi-value" style={{ color: '#00897B' }}>{history.length}</div>
              <div className="dash-kpi-label">Alertes envoyées</div>
            </div>
            <div className="dash-kpi" style={{ flex: 1 }}>
              <span className="dash-kpi-icon">⚡</span>
              <div className="dash-kpi-value" style={{ color: '#FFB300' }}>24/7</div>
              <div className="dash-kpi-label">Disponibilité</div>
            </div>
          </div>

          {/* Alertes rapides */}
          <div className="dash-card">
            <h3 className="dash-card-title">⚡ Alertes rapides</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 4 }}>
              {QUICK_ALERTS.map((alert, i) => (
                <button key={i} className="quick-alert-btn"
                  onClick={() => sendAlert(alert.msg)}
                  disabled={sending}>
                  <span style={{ fontSize: 20 }}>{alert.emoji}</span>
                  <span>{alert.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Message personnalisé */}
          <div className="dash-card">
            <h3 className="dash-card-title">✏️ Message personnalisé</h3>
            <textarea
              className="alert-textarea"
              placeholder="Écris ton message d'alerte ici... (supporte *gras* et _italique_ WhatsApp)"
              value={customMsg}
              onChange={e => setCustomMsg(e.target.value)}
              rows={4}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
              <span style={{ fontSize: 12, color: '#9e9e95' }}>
                {customMsg.length} caractères · {subscribers} destinataires
              </span>
              <button
                className="password-submit"
                style={{ width: 'auto', padding: '10px 24px' }}
                onClick={() => sendAlert(customMsg)}
                disabled={sending || !customMsg.trim()}
              >
                {sending ? '⏳ Envoi...' : '📤 Envoyer à tous'}
              </button>
            </div>
          </div>

          {/* Résultat */}
          {result && (
            <div style={{
              padding: '12px 16px',
              borderRadius: 12,
              background: result.error ? 'rgba(230,74,25,0.1)' : 'rgba(0,137,123,0.1)',
              border: `1px solid ${result.error ? '#E64A19' : '#00897B'}`,
              fontSize: 13,
              fontWeight: 600,
              color: result.error ? '#E64A19' : '#00695C'
            }}>
              {result.error
                ? `❌ ${result.error}`
                : `✅ ${result.sent} message(s) envoyé(s) avec succès ! ${result.failed > 0 ? `(${result.failed} échec)` : ''}`
              }
            </div>
          )}

          {/* Historique */}
          {history.length > 0 && (
            <div className="dash-card">
              <h3 className="dash-card-title">🕐 Historique récent</h3>
              {history.map((h, i) => (
                <div key={i} className="activity-row">
                  <span className="activity-time">{h.time}</span>
                  <span className="activity-msg">{h.msg}</span>
                  <span style={{ fontSize: 12, color: '#00897B', fontWeight: 700, flexShrink: 0 }}>
                    ✅ {h.sent}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Info abonnement */}
          <div className="dash-insight" style={{ marginTop: 0 }}>
            💡 Les utilisateurs s'abonnent automatiquement en envoyant leur premier message WhatsApp, ou en tapant <strong>ALERTE</strong>. Ils peuvent se désabonner avec <strong>STOP</strong>.
          </div>

        </div>
      </div>
    </div>
  )
}