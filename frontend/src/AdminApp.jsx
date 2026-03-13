// frontend/src/AdminApp.jsx
import { useState, useEffect } from 'react'

const API_URL   = import.meta.env.VITE_API_URL   || 'http://localhost:3001'
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY || 'joj2026admin'

const QUICK_ALERTS = [
  { emoji: '🏅', label: 'Ouverture ce soir',  msg: '🏅 *JOJ Dakar 2026* — Cérémonie d\'ouverture ce soir à 18h au Dakar Arena ! 🇸🇳🔥' },
  { emoji: '🥊', label: 'Finale Laamb',       msg: '🥊 *Lutte Laamb* — Finale dans 1 heure à l\'Arène Nationale ! 🇸🇳' },
  { emoji: '⚽', label: 'Match Football',      msg: '⚽ *Football* — Match Sénégal U18 dans 30 min au Stade LSS ! Allez les Lions 🦁' },
  { emoji: '🥇', label: 'Médailles',           msg: '🥇 *Médailles* — Sénégal : 3🥇 2🥈 1🥉 — Top performance ! 🇸🇳' },
  { emoji: '🚌', label: 'Transport',           msg: '🚌 *Transport* — Navettes supplémentaires disponibles depuis Petersen jusqu\'à 23h.' },
  { emoji: '🌧️', label: 'Météo',               msg: '🌧️ *Météo* — Risque de pluie cet après-midi. Prévoir une veste !' },
]

// ── COMPOSANT STATS ──
function StatsPanel({ stats }) {
  const total = stats.fr + stats.en + stats.wo || 1
  return (
    <div className="admin-stats-grid">
      {/* KPIs */}
      <div className="admin-kpi-row">
        {[
          { label: 'Questions totales', value: stats.total, icon: '💬', color: 'var(--teal)' },
          { label: 'Utilisateurs',      value: stats.users, icon: '👥', color: 'var(--gold)' },
          { label: 'Via Web',           value: stats.webCount, icon: '🌐', color: '#1565C0' },
          { label: 'Via WhatsApp',      value: stats.waCount, icon: '📱', color: '#2E7D32' },
        ].map((kpi, i) => (
          <div key={i} className="admin-kpi-card">
            <span className="admin-kpi-icon" style={{ background: kpi.color + '22' }}>{kpi.icon}</span>
            <div>
              <div className="admin-kpi-value" style={{ color: kpi.color }}>{kpi.value}</div>
              <div className="admin-kpi-label">{kpi.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Langues */}
      <div className="admin-card">
        <h3 className="admin-card-title">🌍 Répartition des langues</h3>
        <div className="admin-lang-bars">
          {[
            { lang: '🇫🇷 Français', count: stats.fr, color: 'var(--teal)' },
            { lang: '🇬🇧 English',  count: stats.en, color: '#1565C0' },
            { lang: '🇸🇳 Wolof',    count: stats.wo, color: 'var(--gold)' },
          ].map((l, i) => (
            <div key={i} className="admin-lang-row">
              <span className="admin-lang-name">{l.lang}</span>
              <div className="admin-lang-bar-bg">
                <div className="admin-lang-bar-fill"
                  style={{ width: `${Math.round((l.count / total) * 100)}%`, background: l.color }} />
              </div>
              <span className="admin-lang-pct">{Math.round((l.count / total) * 100)}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Activité récente */}
      <div className="admin-card">
        <h3 className="admin-card-title">⚡ Activité récente</h3>
        {stats.recent?.length > 0 ? (
          <div className="admin-recent-list">
            {stats.recent.slice(0, 8).map((r, i) => (
              <div key={i} className="admin-recent-item">
                <span className="admin-recent-channel">{r.channel === 'whatsapp' ? '📱' : '🌐'}</span>
                <span className="admin-recent-msg">{r.message?.slice(0, 40)}...</span>
                <span className="admin-recent-lang">{r.lang === 'fr' ? '🇫🇷' : r.lang === 'en' ? '🇬🇧' : '🇸🇳'}</span>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--gray-500)', fontSize: 13, textAlign: 'center', padding: 20 }}>
            Aucune activité récente
          </p>
        )}
      </div>
    </div>
  )
}

// ── COMPOSANT ALERTES ──
function AlertsPanel() {
  const [customMsg, setCustomMsg] = useState('')
  const [subscribers, setSubscribers] = useState(0)
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])

  useEffect(() => {
    fetch(`${API_URL}/api/alerts/subscribers?key=${ADMIN_KEY}`)
      .then(r => r.json()).then(d => setSubscribers(d.count || 0)).catch(() => {})
  }, [])

  const sendAlert = async (msg) => {
    if (!msg.trim()) return
    setSending(true); setResult(null)
    try {
      const res = await fetch(`${API_URL}/api/alerts/send?key=${ADMIN_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg })
      })
      const data = await res.json()
      setResult({ ok: true, sent: data.sent, failed: data.failed })
      setHistory(h => [{ msg: msg.slice(0, 50), sent: data.sent, time: new Date().toLocaleTimeString() }, ...h.slice(0, 4)])
      setCustomMsg('')
    } catch {
      setResult({ ok: false })
    }
    setSending(false)
    setTimeout(() => setResult(null), 4000)
  }

  return (
    <div className="admin-alerts-grid">
      {/* Abonnés */}
      <div className="admin-card admin-subscribers-card">
        <div className="admin-sub-count">{subscribers}</div>
        <div className="admin-sub-label">📱 Abonnés WhatsApp actifs</div>
      </div>

      {/* Alertes rapides */}
      <div className="admin-card">
        <h3 className="admin-card-title">⚡ Alertes rapides</h3>
        <div className="admin-quick-grid">
          {QUICK_ALERTS.map((alert, i) => (
            <button key={i} className="admin-quick-btn"
              onClick={() => sendAlert(alert.msg)} disabled={sending}>
              <span className="admin-quick-emoji">{alert.emoji}</span>
              <span>{alert.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Message personnalisé */}
      <div className="admin-card">
        <h3 className="admin-card-title">✏️ Message personnalisé</h3>
        <textarea
          className="admin-textarea"
          placeholder="Tapez votre message WhatsApp ici...\n*gras* _italique_"
          value={customMsg}
          onChange={e => setCustomMsg(e.target.value)}
          rows={4}
        />
        <div className="admin-textarea-footer">
          <span style={{ fontSize: 12, color: 'var(--gray-500)' }}>{customMsg.length}/1000 chars</span>
          <button className="admin-send-btn"
            onClick={() => sendAlert(customMsg)}
            disabled={sending || !customMsg.trim()}>
            {sending ? '⏳ Envoi...' : `📤 Envoyer à ${subscribers} abonnés`}
          </button>
        </div>
        {result && (
          <div className={`admin-result ${result.ok ? 'admin-result-ok' : 'admin-result-err'}`}>
            {result.ok ? `✅ Envoyé à ${result.sent} abonnés` : '❌ Erreur lors de l\'envoi'}
          </div>
        )}
      </div>

      {/* Historique */}
      {history.length > 0 && (
        <div className="admin-card">
          <h3 className="admin-card-title">📋 Historique des envois</h3>
          {history.map((h, i) => (
            <div key={i} className="admin-history-item">
              <span className="admin-history-msg">"{h.msg}..."</span>
              <span className="admin-history-meta">✅ {h.sent} envoyés · {h.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── APP ADMIN PRINCIPALE ──
export default function AdminApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [activeTab, setActiveTab] = useState('stats')
  const [stats, setStats] = useState({
    total: 0, users: 0, fr: 0, en: 0, wo: 0,
    webCount: 0, waCount: 0, avgResponse: '0.8',
    successRate: 94, categories: {}, recent: []
  })

  useEffect(() => {
    if (sessionStorage.getItem('joj_admin') === 'true') setIsLoggedIn(true)
  }, [])

  useEffect(() => {
    if (!isLoggedIn) return
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}/api/stats?key=${ADMIN_KEY}`)
        if (res.ok) setStats(await res.json())
      } catch {}
    }
    fetchStats()
    const iv = setInterval(fetchStats, 5000)
    return () => clearInterval(iv)
  }, [isLoggedIn])

  const handleLogin = () => {
    if (password === 'joj2026') {
      setIsLoggedIn(true)
      sessionStorage.setItem('joj_admin', 'true')
      setError(false)
    } else {
      setError(true); setPassword('')
      setTimeout(() => setError(false), 2000)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    sessionStorage.removeItem('joj_admin')
  }

  // ── LOGIN ──
  if (!isLoggedIn) return (
    <div className="admin-login-root">
      <div className="admin-login-card">
        <div className="admin-login-logo">
          <img src="/lion.png" alt="JOJ" style={{ width: 56, height: 56, objectFit: 'contain' }} />
        </div>
        <h1 className="admin-login-title">Espace Admin</h1>
        <p className="admin-login-sub">JOJ Dakar 2026 — Accès réservé</p>
        <input
          className={`admin-login-input ${error ? 'admin-input-error' : ''}`}
          type="password"
          placeholder="🔐 Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          autoFocus
        />
        {error && <p className="admin-error-msg">❌ Mot de passe incorrect</p>}
        <button className="admin-login-btn" onClick={handleLogin}>Accéder →</button>
        <a href="/" className="admin-back-link">← Retour au chatbot</a>
      </div>
    </div>
  )

  // ── PANNEAU ADMIN ──
  return (
    <div className="admin-root">
      <header className="admin-header">
        <div className="admin-header-left">
          <img src="/lion.png" alt="JOJ" style={{ width: 34, height: 34, objectFit: 'contain' }} />
          <div>
            <h1 className="admin-title">Panneau Admin</h1>
            <span className="admin-subtitle">JOJ Dakar 2026</span>
          </div>
        </div>
        <div className="admin-header-right">
          <a href="/" className="admin-nav-btn">🤖 Chatbot</a>
          <button className="admin-logout-btn" onClick={handleLogout}>🚪 Déco</button>
        </div>
      </header>

      <div className="admin-tabs">
        <button className={`admin-tab ${activeTab === 'stats'  ? 'admin-tab-active' : ''}`}
          onClick={() => setActiveTab('stats')}>📊 Statistiques</button>
        <button className={`admin-tab ${activeTab === 'alerts' ? 'admin-tab-active' : ''}`}
          onClick={() => setActiveTab('alerts')}>🔔 Alertes WhatsApp</button>
      </div>

      <div className="admin-content">
        {activeTab === 'stats'  && <StatsPanel stats={stats} />}
        {activeTab === 'alerts' && <AlertsPanel />}
      </div>
    </div>
  )
}