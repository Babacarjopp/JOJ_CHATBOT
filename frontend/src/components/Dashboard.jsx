// frontend/src/components/Dashboard.jsx
import { useState, useEffect, useRef } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// Graphique barres simple sans lib externe
function BarChart({ data, color }) {
  const max = Math.max(...data.map(d => d.value), 1)
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80, padding: '0 4px' }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 10, color: '#9e9e95', fontWeight: 600 }}>{d.value}</span>
          <div style={{
            width: '100%',
            height: `${Math.max((d.value / max) * 60, 4)}px`,
            background: color,
            borderRadius: '6px 6px 0 0',
            transition: 'height 0.5s ease',
            minHeight: 4
          }} />
          <span style={{ fontSize: 10, color: '#9e9e95', fontWeight: 700 }}>{d.label}</span>
        </div>
      ))}
    </div>
  )
}

// Cercle de progression
function DonutStat({ value, total, color, label, icon }) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0
  const r = 28, circumference = 2 * Math.PI * r
  const dash = (pct / 100) * circumference

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <svg width={72} height={72} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={36} cy={36} r={r} fill="none" stroke="#f0f0ec" strokeWidth={7} />
        <circle cx={36} cy={36} r={r} fill="none" stroke={color} strokeWidth={7}
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.8s ease' }}
        />
      </svg>
      <div style={{ marginTop: -54, fontSize: 20, lineHeight: 1 }}>{icon}</div>
      <div style={{ fontSize: 18, fontWeight: 800, color: '#1a1a18', marginTop: 8 }}>{pct}%</div>
      <div style={{ fontSize: 11, color: '#9e9e95', fontWeight: 600, textAlign: 'center' }}>{label}<br />{value} msgs</div>
    </div>
  )
}

export default function Dashboard({ onClose, stats }) {
  const [animated, setAnimated] = useState(false)
  const [liveCount, setLiveCount] = useState(stats.total)

  useEffect(() => {
    setTimeout(() => setAnimated(true), 100)
    // Simuler compteur live
    const interval = setInterval(() => {
      setLiveCount(prev => prev + Math.floor(Math.random() * 2))
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const total = stats.total || 1
  const langData = [
    { label: '🇫🇷 FR', value: stats.fr || 0, color: '#00897B' },
    { label: '🇬🇧 EN', value: stats.en || 0, color: '#1565C0' },
    { label: '🇸🇳 WO', value: stats.wo || 0, color: '#FFB300' },
  ]

  const categoryData = [
    { label: '📍', value: stats.categories?.lieux || 0 },
    { label: '🗓️', value: stats.categories?.dates || 0 },
    { label: '🏅', value: stats.categories?.sports || 0 },
    { label: '🎟️', value: stats.categories?.billets || 0 },
    { label: '🚍', value: stats.categories?.transport || 0 },
  ]

  return (
    <div className="map-overlay" onClick={onClose}>
      <div className="dashboard-modal" onClick={e => e.stopPropagation()}
        style={{ opacity: animated ? 1 : 0, transform: animated ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.3s ease' }}>

        {/* Header */}
        <div className="map-header">
          <div className="map-header-left">
            <span style={{ fontSize: 24 }}>📊</span>
            <div>
              <h2 className="map-title">Dashboard Analytics</h2>
              <p className="map-subtitle">Statistiques en temps réel · JOJ Assistant</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              background: 'rgba(255,255,255,0.2)', borderRadius: 20,
              padding: '4px 12px', fontSize: 12, color: 'white', fontWeight: 700,
              display: 'flex', alignItems: 'center', gap: 6
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%', background: '#4ade80',
                display: 'inline-block', animation: 'pulse-dot 1.5s infinite'
              }} />
              LIVE
            </div>
            <button className="map-close" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* Contenu */}
        <div className="dashboard-body">

          {/* KPI Cards */}
          <div className="dash-grid-4">
            <div className="dash-kpi">
              <span className="dash-kpi-icon">💬</span>
              <div className="dash-kpi-value" style={{ color: '#00897B' }}>{liveCount}</div>
              <div className="dash-kpi-label">Questions posées</div>
            </div>
            <div className="dash-kpi">
              <span className="dash-kpi-icon">👥</span>
              <div className="dash-kpi-value" style={{ color: '#1565C0' }}>{stats.users || 0}</div>
              <div className="dash-kpi-label">Utilisateurs</div>
            </div>
            <div className="dash-kpi">
              <span className="dash-kpi-icon">⚡</span>
              <div className="dash-kpi-value" style={{ color: '#FFB300' }}>{stats.avgResponse || '0.8'}s</div>
              <div className="dash-kpi-label">Temps moyen</div>
            </div>
            <div className="dash-kpi">
              <span className="dash-kpi-icon">✅</span>
              <div className="dash-kpi-value" style={{ color: '#2E7D32' }}>{stats.successRate || '94'}%</div>
              <div className="dash-kpi-label">Taux succès</div>
            </div>
          </div>

          {/* Langues + Catégories */}
          <div className="dash-grid-2">

            {/* Langues */}
            <div className="dash-card">
              <h3 className="dash-card-title">🌍 Répartition des langues</h3>
              <div style={{ display: 'flex', justifyContent: 'space-around', padding: '12px 0' }}>
                {langData.map((l, i) => (
                  <DonutStat key={i}
                    value={l.value} total={total}
                    color={l.color} label={l.label}
                    icon={l.label.split(' ')[0]}
                  />
                ))}
              </div>
              <div className="dash-insight">
                🇸🇳 Le Wolof représente {total > 0 ? Math.round(((stats.wo || 0) / total) * 100) : 0}% — uniquement possible avec JOJ Assistant !
              </div>
            </div>

            {/* Catégories */}
            <div className="dash-card">
              <h3 className="dash-card-title">🏷️ Questions par catégorie</h3>
              <BarChart data={categoryData} color="#00897B" />
              <div className="dash-legend-cats">
                {['📍 Lieux', '🗓️ Dates', '🏅 Sports', '🎟️ Billets', '🚍 Transport'].map((c, i) => (
                  <span key={i} className="dash-cat-chip">{c}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Activité récente */}
          <div className="dash-card">
            <h3 className="dash-card-title">🕐 Activité récente</h3>
            <div className="dash-activity">
              {(stats.recent || [
                { time: 'Il y a 2 min', msg: 'Quand commencent les JOJ ?', lang: '🇫🇷', channel: '🌐' },
                { time: 'Il y a 5 min', msg: 'Where is the stadium?', lang: '🇬🇧', channel: '🌐' },
                { time: 'Il y a 8 min', msg: 'Foo stade bi nekk ?', lang: '🇸🇳', channel: '📱' },
                { time: 'Il y a 12 min', msg: 'Comment acheter des billets ?', lang: '🇫🇷', channel: '🌐' },
                { time: 'Il y a 15 min', msg: 'How many sports in JOJ 2026?', lang: '🇬🇧', channel: '📱' },
              ]).map((item, i) => (
                <div key={i} className="activity-row">
                  <span className="activity-time">{item.time}</span>
                  <span className="activity-msg">{item.msg}</span>
                  <span className="activity-badges">
                    <span className="activity-badge">{item.lang}</span>
                    <span className="activity-badge">{item.channel}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Canaux */}
          <div className="dash-grid-2">
            <div className="dash-card">
              <h3 className="dash-card-title">📡 Canaux d'accès</h3>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <div className="channel-stat" style={{ borderColor: '#00897B' }}>
                  <span style={{ fontSize: 28 }}>🌐</span>
                  <div className="channel-value">{stats.webCount || 0}</div>
                  <div className="channel-label">Web</div>
                </div>
                <div className="channel-stat" style={{ borderColor: '#25D366' }}>
                  <span style={{ fontSize: 28 }}>📱</span>
                  <div className="channel-value">{stats.waCount || 0}</div>
                  <div className="channel-label">WhatsApp</div>
                </div>
              </div>
            </div>
            <div className="dash-card">
              <h3 className="dash-card-title">🏆 Impact JOJ</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                {[
                  { label: 'Visiteurs servis', value: `${liveCount} / jour`, icon: '👤' },
                  { label: 'Langues supportées', value: '3 (FR/EN/WO)', icon: '🌍' },
                  { label: 'Disponibilité', value: '24h/24 · 7j/7', icon: '⚡' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: i < 2 ? '1px solid #f0f0ec' : 'none' }}>
                    <span style={{ fontSize: 13, color: '#555' }}>{item.icon} {item.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#00897B' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
      `}</style>
    </div>
  )
}