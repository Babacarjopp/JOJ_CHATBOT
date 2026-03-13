// Mapping mots-clés → venue ID (doit correspondre aux IDs dans MapView.jsx)
const VENUE_KEYWORDS = [
  { id: 1, keywords: ['dakar arena', 'diamniadio'] },
  { id: 2, keywords: ['stade léopold', 'stade lss', 'stade leopold', 'stade senghor'] },
  { id: 3, keywords: ['piscine olympique', 'natation', 'plongeon'] },
  { id: 4, keywords: ['village olympique'] },
  { id: 5, keywords: ['arène nationale', 'arene nationale', 'pikine', 'laamb'] },
  { id: 6, keywords: ['complexe de mbour', 'mbour', 'cyclisme'] },
  { id: 7, keywords: ['lac rose', 'voile', 'surf'] },
]

function detectVenue(text) {
  const lower = text.toLowerCase()
  for (const venue of VENUE_KEYWORDS) {
    if (venue.keywords.some(kw => lower.includes(kw))) {
      return venue.id
    }
  }
  return null
}

const VENUE_NAMES = {
  1: 'Dakar Arena',
  2: 'Stade LSS',
  3: 'Piscine Olympique',
  4: 'Village Olympique',
  5: 'Arène Nationale',
  6: 'Complexe de Mbour',
  7: 'Lac Rose',
}

export default function MessageBubble({ msg, index, onOpenVenue }) {
  const isBot = msg.role === 'bot'
  const venueId = isBot ? detectVenue(msg.text) : null

  return (
    <div
      className={`message-row ${isBot ? 'bot-row' : 'user-row'}`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {isBot && (
        <div className="bot-avatar">
          <img
            src="/lion.png"
            alt="JOJ"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
            onError={e => { e.target.style.display = 'none'; e.target.parentNode.textContent = '🦁' }}
          />
        </div>
      )}

      <div className={`bubble ${isBot ? 'bubble-bot' : 'bubble-user'} ${msg.isOffline ? 'bubble-offline' : ''} ${msg.isError ? 'bubble-error' : ''}`}>
        <p>{msg.text}</p>

        {/* Bouton "Voir sur la carte" si lieu détecté */}
        {venueId && onOpenVenue && (
          <button
            className="venue-link-btn"
            onClick={() => onOpenVenue(venueId)}
          >
            📍 Voir {VENUE_NAMES[venueId]} sur la carte
          </button>
        )}

        {msg.detectedLang && (
          <span className="lang-tag">
            {msg.detectedLang === 'fr' ? '🇫🇷' : msg.detectedLang === 'en' ? '🇬🇧' : '🇸🇳'}
          </span>
        )}
      </div>
    </div>
  )
}