// frontend/src/components/MapView.jsx
import { useEffect, useRef, useState } from 'react'

const VENUES = [
  {
    id: 1, name: "Dakar Arena", nameWo: "Dakar Arena — Site bu mag bi",
    lat: 14.7272, lng: -17.0588, color: "#00897B", icon: "🏟️",
    sports: ["Basketball", "Volleyball", "Gymnastique", "Lutte / Laamb 🥊"],
    capacity: "15 000 places", address: "Diamniadio, Dakar"
  },
  {
    id: 2, name: "Stade Léopold Sédar Senghor", nameWo: "Stade LSS",
    lat: 14.7219, lng: -17.4674, color: "#E64A19", icon: "⚽",
    sports: ["Football", "Athlétisme"],
    capacity: "60 000 places", address: "Dakar"
  },
  {
    id: 3, name: "Piscine Olympique", nameWo: "Piscine Olympique bi",
    lat: 14.7350, lng: -17.0650, color: "#1565C0", icon: "🏊",
    sports: ["Natation", "Plongeon", "Water-polo"],
    capacity: "5 000 places", address: "Diamniadio"
  },
  {
    id: 4, name: "Village Olympique", nameWo: "Village Olympique",
    lat: 14.7300, lng: -17.0600, color: "#FFB300", icon: "🏘️",
    sports: ["Hébergement athlètes", "Centre médical"],
    capacity: "4 000 athlètes", address: "Diamniadio"
  },
  {
    id: 5, name: "Arène Nationale", nameWo: "Arène Nationale — Pikine",
    lat: 14.7542, lng: -17.3906, color: "#6A1B9A", icon: "🥋",
    sports: ["Lutte / Laamb 🥊", "Judo", "Taekwondo", "Boxe"],
    capacity: "20 000 places", address: "Pikine, Dakar"
  },
  {
    id: 6, name: "Complexe de Mbour", nameWo: "Complexe sportif Mbour",
    lat: 14.3773, lng: -16.9653, color: "#2E7D32", icon: "🚴",
    sports: ["Cyclisme", "Triathlon", "Tennis"],
    capacity: "8 000 places", address: "Mbour"
  },
  {
    id: 7, name: "Lac Rose", nameWo: "Lac Rose — Sports nautiques",
    lat: 14.8347, lng: -17.2317, color: "#00ACC1", icon: "🏄",
    sports: ["Voile", "Surf"],
    capacity: "Plein air", address: "Lac Rose, Dakar"
  },
]

const RESTAURANTS = [
  {
    id: 101, name: "Le Baobab", lat: 14.7280, lng: -17.0600,
    color: "#F57C00", icon: "🍽️",
    cuisine: "Cuisine sénégalaise", price: "💰💰",
    specialty: "Thiéboudienne, Yassa poulet", address: "Diamniadio",
    near: "Dakar Arena (5 min)"
  },
  {
    id: 102, name: "Chez Aminata", lat: 14.7260, lng: -17.0570,
    color: "#F57C00", icon: "🥘",
    cuisine: "Plats locaux", price: "💰",
    specialty: "Mafé, Thiou, Domoda", address: "Diamniadio",
    near: "Dakar Arena (8 min)"
  },
  {
    id: 103, name: "Terrou-Bi Restaurant", lat: 14.7150, lng: -17.4800,
    color: "#F57C00", icon: "🌊",
    cuisine: "Gastronomique / Fruits de mer", price: "💰💰💰",
    specialty: "Poissons frais, vue mer", address: "Corniche, Dakar",
    near: "Stade LSS (10 min)"
  },
  {
    id: 104, name: "La Calebasse", lat: 14.6937, lng: -17.4441,
    color: "#F57C00", icon: "🫙",
    cuisine: "Africaine fusion", price: "💰💰",
    specialty: "Brochettes, grillades, thiébou", address: "Plateau, Dakar",
    near: "Centre Dakar"
  },
  {
    id: 105, name: "Food Court Diamniadio", lat: 14.7310, lng: -17.0620,
    color: "#F57C00", icon: "🛍️",
    cuisine: "Multi-cuisine", price: "💰",
    specialty: "Fast food, sénégalais, libanais", address: "Diamniadio Mall",
    near: "Village Olympique (3 min)"
  },
  {
    id: 106, name: "Marché Kermel", lat: 14.6714, lng: -17.4400,
    color: "#F57C00", icon: "🥬",
    cuisine: "Street food & marché", price: "💰",
    specialty: "Jus baobab, accara, sandwichs", address: "Kermel, Dakar",
    near: "Centre Dakar"
  },
  {
    id: 107, name: "King Fadal", lat: 14.7540, lng: -17.3900,
    color: "#F57C00", icon: "🍖",
    cuisine: "Grillades sénégalaises", price: "💰",
    specialty: "Viande grillée, thiébou dieun", address: "Pikine",
    near: "Arène Nationale (5 min)"
  },
]

const TOURISM = [
  {
    id: 201, name: "Monument Renaissance", lat: 14.7233, lng: -17.4953,
    color: "#C62828", icon: "🗿",
    category: "Monument", duration: "1-2h",
    description: "Plus grand monument d'Afrique — 52m de hauteur. Vue panoramique sur Dakar.", address: "Ouakam, Dakar"
  },
  {
    id: 202, name: "Île de Gorée", lat: 14.6686, lng: -17.3981,
    color: "#C62828", icon: "🏝️",
    category: "Patrimoine UNESCO", duration: "Demi-journée",
    description: "Site historique UNESCO. Ferry depuis Dakar (20 min). Maison des Esclaves.", address: "Île de Gorée"
  },
  {
    id: 203, name: "Grande Mosquée de Dakar", lat: 14.6830, lng: -17.4467,
    color: "#C62828", icon: "🕌",
    category: "Architecture", duration: "30 min",
    description: "Mosquée emblématique au cœur de Dakar. Architecture arabo-sénégalaise.", address: "Plateau, Dakar"
  },
  {
    id: 204, name: "Lac Rose (Lac Retba)", lat: 14.8347, lng: -17.2317,
    color: "#C62828", icon: "🌸",
    category: "Nature", duration: "Demi-journée",
    description: "Lac aux eaux roses naturellement. Récolte du sel traditionnelle. Baignade possible.", address: "Lac Rose, Dakar"
  },
  {
    id: 205, name: "Plage de N'Gor", lat: 14.7478, lng: -17.5147,
    color: "#C62828", icon: "🏖️",
    category: "Nature / Plage", duration: "Libre",
    description: "Plage préservée avec îlot. Surf, baignade, restaurants de plage.", address: "N'Gor, Dakar"
  },
  {
    id: 206, name: "Village des Arts", lat: 14.7089, lng: -17.4603,
    color: "#C62828", icon: "🎨",
    category: "Culture / Art", duration: "1-2h",
    description: "Ateliers d'artistes sénégalais. Peintures, sculptures, artisanat local.", address: "Dakar"
  },
  {
    id: 207, name: "Réserve de Bandia", lat: 14.5167, lng: -16.9833,
    color: "#C62828", icon: "🦒",
    category: "Safari / Nature", duration: "Journée",
    description: "Safari à 1h de Dakar. Girafes, rhinocéros, buffles, zèbres.", address: "Bandia, près Mbour"
  },
  {
    id: 208, name: "Marché Sandaga", lat: 14.6770, lng: -17.4393,
    color: "#C62828", icon: "🛒",
    category: "Shopping / Culture", duration: "1-2h",
    description: "Grand marché traditionnel de Dakar. Tissus, bijoux, artisanat, épices.", address: "Plateau, Dakar"
  },
]

const TABS = [
  { id: 'venues',      label: '🏟️ Sites JOJ',      data: VENUES },
  { id: 'restaurants', label: '🍽️ Restaurants',    data: RESTAURANTS },
  { id: 'tourism',     label: '🏛️ Tourisme',        data: TOURISM },
]

export default function MapView({ onClose, focusVenueId }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef({})
  const layerGroupsRef = useRef({})
  const [search, setSearch] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const [activeTab, setActiveTab] = useState('venues')
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    const linkCSS = document.createElement('link')
    linkCSS.rel = 'stylesheet'
    linkCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(linkCSS)
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.onload = () => { initMap(); setMapReady(true) }
    document.head.appendChild(script)
    return () => {
      if (mapInstanceRef.current) { mapInstanceRef.current.remove(); mapInstanceRef.current = null }
    }
  }, [])

  useEffect(() => {
    if (!mapReady) return
    showTab(activeTab)
  }, [activeTab, mapReady])

  useEffect(() => {
    if (focusVenueId && mapReady) {
      const venue = VENUES.find(v => v.id === focusVenueId)
      if (venue) { zoomToItem(venue); setActiveTab('venues') }
    }
  }, [focusVenueId, mapReady])

  const createIcon = (item) => {
    const L = window.L
    return L.divIcon({
      html: `<div style="background:${item.color};width:40px;height:40px;
        border-radius:50% 50% 50% 0;transform:rotate(-45deg);
        border:3px solid white;box-shadow:0 3px 10px rgba(0,0,0,0.3);
        display:flex;align-items:center;justify-content:center;">
        <span style="transform:rotate(45deg);font-size:17px;display:block;
          text-align:center;line-height:34px;">${item.icon}</span></div>`,
      className: '', iconSize: [40, 40], iconAnchor: [20, 40], popupAnchor: [0, -42],
    })
  }

  const createPopup = (item) => {
    const L = window.L
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}`
    let details = ''
    if (item.sports) details = item.sports.map(s => `<span style="display:inline-block;background:#f0f0ec;border-radius:10px;padding:2px 7px;font-size:11px;margin:2px;">${s}</span>`).join('')
    else if (item.cuisine) details = `<span style="font-size:12px;color:#555;">${item.cuisine} · ${item.price}</span><br><span style="font-size:11px;color:#888;">${item.specialty}</span>`
    else if (item.description) details = `<span style="font-size:12px;color:#555;">${item.description}</span>`

    return L.popup({ maxWidth: 280 }).setContent(`
      <div style="font-family:'Outfit',sans-serif;padding:4px;">
        <div style="font-size:20px;margin-bottom:3px;">${item.icon}</div>
        <h3 style="margin:0 0 2px;font-size:14px;font-weight:800;color:#1a1a18;">${item.name}</h3>
        <p style="margin:0 0 6px;font-size:11px;color:#00897B;font-weight:600;">📍 ${item.address}</p>
        <div style="margin-bottom:8px;">${details}</div>
        ${item.near ? `<p style="font-size:11px;color:#888;margin:0 0 6px;">🏟️ ${item.near}</p>` : ''}
        ${item.duration ? `<p style="font-size:11px;color:#888;margin:0 0 6px;">⏱️ ${item.duration}</p>` : ''}
        <a href="${mapsUrl}" target="_blank" style="display:inline-block;background:#4285F4;
          color:white;border-radius:8px;padding:5px 12px;font-size:12px;
          font-weight:700;text-decoration:none;margin-top:4px;">🧭 M'y emmener</a>
      </div>`)
  }

  const initMap = () => {
    if (!mapRef.current || mapInstanceRef.current) return
    const L = window.L
    const map = L.map(mapRef.current, { center: [14.693, -17.2], zoom: 10 })
    mapInstanceRef.current = map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap', maxZoom: 19,
    }).addTo(map)
    L.polyline([[14.7219, -17.4674], [14.7272, -17.0588]], {
      color: '#FFB300', weight: 3, dashArray: '8,6', opacity: 0.8
    }).addTo(map).bindTooltip('🚆 TER — Dakar ↔ Diamniadio (45 min)', { direction: 'center' })

    // Créer les layers pour chaque onglet
    ;['venues', 'restaurants', 'tourism'].forEach(tabId => {
      layerGroupsRef.current[tabId] = L.layerGroup()
    })

    // Ajouter marqueurs venues
    VENUES.forEach(item => {
      const marker = L.marker([item.lat, item.lng], { icon: createIcon(item) })
        .bindPopup(createPopup(item))
        .on('click', () => setSelectedItem(item))
      markersRef.current[item.id] = marker
      layerGroupsRef.current['venues'].addLayer(marker)
    })

    // Ajouter marqueurs restaurants
    RESTAURANTS.forEach(item => {
      const marker = L.marker([item.lat, item.lng], { icon: createIcon(item) })
        .bindPopup(createPopup(item))
        .on('click', () => setSelectedItem(item))
      markersRef.current[item.id] = marker
      layerGroupsRef.current['restaurants'].addLayer(marker)
    })

    // Ajouter marqueurs tourisme
    TOURISM.forEach(item => {
      const marker = L.marker([item.lat, item.lng], { icon: createIcon(item) })
        .bindPopup(createPopup(item))
        .on('click', () => setSelectedItem(item))
      markersRef.current[item.id] = marker
      layerGroupsRef.current['tourism'].addLayer(marker)
    })

    // Afficher onglet actif par défaut
    layerGroupsRef.current['venues'].addTo(map)
  }

  const showTab = (tabId) => {
    const map = mapInstanceRef.current
    if (!map) return
    Object.entries(layerGroupsRef.current).forEach(([id, layer]) => {
      if (id === tabId) layer.addTo(map)
      else map.removeLayer(layer)
    })
    setSelectedItem(null)
    setSearch('')
  }

  const zoomToItem = (item) => {
    if (!mapInstanceRef.current) return
    mapInstanceRef.current.setView([item.lat, item.lng], 15, { animate: true })
    markersRef.current[item.id]?.openPopup()
    setSelectedItem(item)
  }

  const handleSearch = (query) => {
    setSearch(query)
    if (!query.trim()) return
    const lower = query.toLowerCase()
    const allItems = [...VENUES, ...RESTAURANTS, ...TOURISM]
    const found = allItems.find(item =>
      item.name.toLowerCase().includes(lower) ||
      (item.sports?.some(s => s.toLowerCase().includes(lower))) ||
      (item.cuisine?.toLowerCase().includes(lower)) ||
      (item.category?.toLowerCase().includes(lower)) ||
      (item.address?.toLowerCase().includes(lower))
    )
    if (found) {
      // Changer d'onglet si nécessaire
      if (RESTAURANTS.find(r => r.id === found.id)) setActiveTab('restaurants')
      else if (TOURISM.find(t => t.id === found.id)) setActiveTab('tourism')
      else setActiveTab('venues')
      setTimeout(() => zoomToItem(found), 100)
    }
  }

  const currentData = TABS.find(t => t.id === activeTab)?.data || []
  const filtered = currentData.filter(item =>
    !search ||
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.address?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="map-overlay" onClick={onClose}>
      <div className="map-modal" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="map-header">
          <div className="map-header-left">
            <span style={{ fontSize: 22 }}>🗺️</span>
            <div>
              <h2 className="map-title">Carte JOJ Dakar 2026</h2>
              <p className="map-subtitle">Sites · Restaurants · Tourisme</p>
            </div>
          </div>
          <button className="map-close" onClick={onClose}>✕</button>
        </div>

        {/* Onglets */}
        <div className="map-tabs">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`map-tab ${activeTab === tab.id ? 'map-tab-active' : ''}`}
              onClick={() => { setActiveTab(tab.id); showTab(tab.id) }}
            >
              {tab.label}
              <span className="map-tab-count">{tab.data.length}</span>
            </button>
          ))}
        </div>

        {/* Recherche */}
        <div className="map-search-bar">
          <span className="map-search-icon">🔍</span>
          <input
            className="map-search-input"
            placeholder={
              activeTab === 'venues' ? "Rechercher un site, sport..." :
              activeTab === 'restaurants' ? "Rechercher un restaurant, cuisine..." :
              "Rechercher un site touristique..."
            }
            value={search}
            onChange={e => handleSearch(e.target.value)}
          />
          {search && <button className="map-search-clear" onClick={() => setSearch('')}>✕</button>}
        </div>

        {/* Chips */}
        <div className="map-venues-list">
          {filtered.map(item => (
            <button
              key={item.id}
              className={`venue-chip ${selectedItem?.id === item.id ? 'venue-chip-active' : ''}`}
              style={{ '--venue-color': item.color }}
              onClick={() => zoomToItem(item)}
            >
              <span>{item.icon}</span>
              <span className="venue-chip-name">{item.name.split(' ').slice(0, 2).join(' ')}</span>
            </button>
          ))}
        </div>

        {/* Carte */}
        <div ref={mapRef} className="map-container" />

        {/* Panel info */}
        {selectedItem && (
          <div className="venue-info-panel">
            <div className="venue-info-left">
              <span style={{ fontSize: 20 }}>{selectedItem.icon}</span>
              <div>
                <div className="venue-info-name">{selectedItem.name}</div>
                <div className="venue-info-sports">
                  {selectedItem.sports?.slice(0,2).join(' · ') ||
                   selectedItem.cuisine ||
                   selectedItem.category}
                </div>
              </div>
            </div>
            <button className="venue-navigate-btn"
              onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedItem.lat},${selectedItem.lng}`, '_blank')}>
              🧭 Y aller
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="map-footer">
          <span>🚆 Ligne jaune = TER Dakar-Diamniadio</span>
          <span>© OpenStreetMap</span>
        </div>
      </div>
    </div>
  )
}