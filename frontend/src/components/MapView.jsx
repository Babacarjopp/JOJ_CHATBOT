// frontend/src/components/MapView.jsx
import { useEffect, useRef } from 'react'

// Sites JOJ Dakar 2026
const VENUES = [
  {
    id: 1,
    name: "Dakar Arena",
    nameWo: "Dakar Arena — Site bu mag bi",
    lat: 14.7272,
    lng: -17.0588,
    sports: ["Basketball", "Volleyball", "Gymnastique", "Lutte / Laamb 🥊"],
    capacity: "15 000 places",
    color: "#00897B",
    icon: "🏟️"
  },
  {
    id: 2,
    name: "Stade Léopold Sédar Senghor",
    nameWo: "Stade LSS — Dakar",
    lat: 14.7219,
    lng: -17.4674,
    sports: ["Football", "Athlétisme"],
    capacity: "60 000 places",
    color: "#E64A19",
    icon: "⚽"
  },
  {
    id: 3,
    name: "Piscine Olympique de Diamniadio",
    nameWo: "Piscine Olympique bi",
    lat: 14.7350,
    lng: -17.0650,
    sports: ["Natation", "Plongeon", "Water-polo"],
    capacity: "5 000 places",
    color: "#1565C0",
    icon: "🏊"
  },
  {
    id: 4,
    name: "Village Olympique",
    nameWo: "Village Olympique — Diamniadio",
    lat: 14.7300,
    lng: -17.0600,
    sports: ["Hébergement athlètes", "Centre médical", "Restauration"],
    capacity: "4 000 athlètes",
    color: "#FFB300",
    icon: "🏘️"
  },
  {
    id: 5,
    name: "Arène Nationale",
    nameWo: "Arène Nationale — Pikine",
    lat: 14.7542,
    lng: -17.3906,
    sports: ["Lutte Sénégalaise / Laamb 🥊", "Judo", "Taekwondo"],
    capacity: "20 000 places",
    color: "#6A1B9A",
    icon: "🥋"
  },
  {
    id: 6,
    name: "Complexe Sportif de Mbour",
    nameWo: "Complexe sportif Mbour",
    lat: 14.3773,
    lng: -16.9653,
    sports: ["Cyclisme", "Triathlon", "Tennis"],
    capacity: "8 000 places",
    color: "#2E7D32",
    icon: "🚴"
  }
]

export default function MapView({ onClose }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    // Charger Leaflet dynamiquement
    if (mapInstanceRef.current) return

    const linkCSS = document.createElement('link')
    linkCSS.rel = 'stylesheet'
    linkCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(linkCSS)

    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.onload = () => initMap()
    document.head.appendChild(script)

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  const initMap = () => {
    if (!mapRef.current || mapInstanceRef.current) return

    const L = window.L

    // Centrer sur Dakar/Diamniadio
    const map = L.map(mapRef.current, {
      center: [14.693, -17.2],
      zoom: 10,
      zoomControl: true,
    })

    mapInstanceRef.current = map

    // Tuiles OpenStreetMap (gratuit)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map)

    // Ajouter chaque venue
    VENUES.forEach(venue => {
      // Icône personnalisée
      const icon = L.divIcon({
        html: `
          <div style="
            background: ${venue.color};
            width: 42px; height: 42px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 3px solid white;
            box-shadow: 0 3px 10px rgba(0,0,0,0.3);
            display: flex; align-items: center; justify-content: center;
          ">
            <span style="transform: rotate(45deg); font-size: 18px; display:block; text-align:center; line-height:36px;">
              ${venue.icon}
            </span>
          </div>
        `,
        className: '',
        iconSize: [42, 42],
        iconAnchor: [21, 42],
        popupAnchor: [0, -45],
      })

      const sportsHTML = venue.sports.map(s =>
        `<span style="
          display:inline-block;
          background:#f0f0ec;
          border-radius:12px;
          padding:2px 8px;
          font-size:11px;
          margin:2px;
          color:#333;
        ">${s}</span>`
      ).join('')

      const popup = L.popup({ maxWidth: 260, className: 'joj-popup' }).setContent(`
        <div style="font-family:'Outfit',sans-serif; padding:4px;">
          <div style="font-size:22px; margin-bottom:4px;">${venue.icon}</div>
          <h3 style="
            margin:0 0 2px;
            font-size:15px;
            font-weight:800;
            color:#1a1a18;
          ">${venue.name}</h3>
          <p style="
            margin:0 0 8px;
            font-size:11px;
            color:#00897B;
            font-weight:600;
          ">📍 ${venue.nameWo}</p>
          <div style="margin-bottom:8px;">${sportsHTML}</div>
          <div style="
            background:#00897B;
            color:white;
            border-radius:8px;
            padding:4px 10px;
            font-size:12px;
            font-weight:600;
            display:inline-block;
          ">👥 ${venue.capacity}</div>
        </div>
      `)

      L.marker([venue.lat, venue.lng], { icon })
        .addTo(map)
        .bindPopup(popup)
    })

    // Ligne reliant Dakar ↔ Diamniadio (TER)
    const terLine = L.polyline(
      [[14.7219, -17.4674], [14.7272, -17.0588]],
      { color: '#FFB300', weight: 3, dashArray: '8,6', opacity: 0.8 }
    ).addTo(map)

    terLine.bindTooltip('🚆 TER — Dakar ↔ Diamniadio (45 min)', {
      permanent: false,
      direction: 'center',
      className: 'ter-tooltip'
    })
  }

  return (
    <div className="map-overlay">
      <div className="map-modal">
        {/* Header */}
        <div className="map-header">
          <div className="map-header-left">
            <span style={{ fontSize: 22 }}>🗺️</span>
            <div>
              <h2 className="map-title">Sites JOJ Dakar 2026</h2>
              <p className="map-subtitle">{VENUES.length} sites officiels • Clique sur un marqueur</p>
            </div>
          </div>
          <button className="map-close" onClick={onClose}>✕</button>
        </div>

        {/* Légende */}
        <div className="map-legend">
          {VENUES.map(v => (
            <span key={v.id} className="legend-item">
              <span style={{
                width: 10, height: 10,
                borderRadius: '50%',
                background: v.color,
                display: 'inline-block',
                marginRight: 4,
                flexShrink: 0
              }} />
              {v.icon} {v.name.split(' ').slice(0, 2).join(' ')}
            </span>
          ))}
        </div>

        {/* Carte */}
        <div ref={mapRef} className="map-container" />

        {/* Footer */}
        <div className="map-footer">
          <span>🚆 Ligne jaune = TER Dakar-Diamniadio (45 min)</span>
          <span>© OpenStreetMap</span>
        </div>
      </div>
    </div>
  )
}