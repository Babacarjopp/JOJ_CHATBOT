// frontend/src/components/ChatWindow.jsx
import { useState, useRef, useEffect, useCallback } from 'react'
import MessageBubble from './MessageBubble'
import MessageSkeleton from './MessageSkeleton'
import OfflineBanner from './OfflineBanner'
import InputBar from './InputBar'
import { sendMessage } from '../api/chat'

const SUGGESTIONS = {
  auto: ["Quand commencent les JOJ ?", "Where is the stadium?", "Foo stade bi nekk ?"],
  fr:   ["Où est le stade ?", "Quels sports sont prévus ?", "Comment acheter des billets ?"],
  en:   ["Where is the stadium?", "What sports are planned?", "How to buy tickets?"],
  wo:   ["Foo stade bi nekk ?", "Sports yii lan lañuy def ?", "Naka nga jënd billet ?"]
}

const WELCOME = {
  auto: "🦁 Bonjour · Hello · Asalaamaalekum ! Je suis JOJ Assistant. Pose-moi une question sur les JOJ Dakar 2026 !",
  fr:   "🦁 Bonjour ! Je suis JOJ Assistant. Comment puis-je vous aider pour les JOJ Dakar 2026 ?",
  en:   "🦁 Hello! I'm JOJ Assistant. How can I help you with the Dakar 2026 Youth Olympic Games?",
  wo:   "🦁 Asalaamaalekum ! Maa ngi JOJ Assistant. Naka nga def ci JOJ Dakar 2026 ?"
}

const OFFLINE_MSG = {
  auto: "📡 Pas de connexion. Votre message sera envoyé dès le retour du réseau.",
  fr:   "📡 Pas de connexion. Votre message sera envoyé dès le retour du réseau.",
  en:   "📡 No connection. Your message will be sent when network is back.",
  wo:   "📡 Connexion amul. Message bi dina dem bu réseau bi dellu."
}

export default function ChatWindow({ lang, onOpenVenue }) {
  const [messages, setMessages] = useState([
    { role: 'bot', text: WELCOME[lang] || WELCOME['auto'] }
  ])
  const [loading, setLoading] = useState(false)
  const [lastBotMessage, setLastBotMessage] = useState('')
  const [pendingMsg, setPendingMsg] = useState(null) // message en attente si offline
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Retry automatique quand connexion revient
  useEffect(() => {
    const handleOnline = () => {
      if (pendingMsg) {
        handleSend(pendingMsg)
        setPendingMsg(null)
      }
    }
    window.addEventListener('online', handleOnline)
    return () => window.removeEventListener('online', handleOnline)
  }, [pendingMsg])

  const handleSend = useCallback(async (text) => {
    if (!text.trim()) return

    // Si offline → stocker le message + afficher info
    if (!navigator.onLine) {
      setMessages(prev => [...prev, { role: 'user', text }])
      setMessages(prev => [...prev, { role: 'bot', text: OFFLINE_MSG[lang] || OFFLINE_MSG['auto'], isOffline: true }])
      setPendingMsg(text)
      return
    }

    setMessages(prev => [...prev, { role: 'user', text }])
    setLoading(true)

    try {
      const { response, detectedLang } = await sendMessage(text, lang)
      setMessages(prev => [...prev, { role: 'bot', text: response, detectedLang }])
      setLastBotMessage(response)
    } catch {
      const errMsg = lang === 'en'
        ? '⚠️ Sorry, something went wrong. Please try again.'
        : lang === 'wo'
        ? '⚠️ Bañ a dem. Saytu ko !'
        : '⚠️ Désolé, une erreur est survenue. Réessaie dans un instant.'
      setMessages(prev => [...prev, { role: 'bot', text: errMsg, isError: true }])
      setLastBotMessage(errMsg)
    }
    setLoading(false)
  }, [lang])

  const suggestions = SUGGESTIONS[lang] || SUGGESTIONS['auto']

  return (
    <div className="chat-container">

      {/* Bannière offline */}
      <OfflineBanner />

      {/* Zone messages */}
      <div className="messages-area">
        {messages.map((msg, i) => (
          <MessageBubble
            key={i}
            msg={msg}
            index={i}
            onOpenVenue={onOpenVenue}
          />
        ))}

        {/* Skeleton pendant chargement */}
        {loading && <MessageSkeleton />}

        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      <div className="suggestions-bar">
        {suggestions.map((s, i) => (
          <button key={i} className="suggestion-chip"
            onClick={() => handleSend(s)}
            disabled={loading}>
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <InputBar
        onSend={handleSend}
        loading={loading}
        lang={lang}
        lastBotMessage={lastBotMessage}
      />
    </div>
  )
}