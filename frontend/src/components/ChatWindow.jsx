import { useState, useRef, useEffect } from 'react'
import MessageBubble from './MessageBubble'
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

export default function ChatWindow({ lang }) {
  const [messages, setMessages] = useState([
    { role: 'bot', text: WELCOME[lang] || WELCOME['auto'] }
  ])
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleSend = async (text) => {
    if (!text.trim()) return
    setMessages(prev => [...prev, { role: 'user', text }])
    setLoading(true)
    try {
      const { response, detectedLang } = await sendMessage(text, lang)
      setMessages(prev => [...prev, { role: 'bot', text: response, detectedLang }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'bot',
        text: '⚠️ Désolé, une erreur est survenue. Réessaie dans un instant.'
      }])
    }
    setLoading(false)
  }

  const suggestions = SUGGESTIONS[lang] || SUGGESTIONS['auto']

  return (
    <div className="chat-container">
      {/* Messages area */}
      <div className="messages-area">
        {messages.map((msg, i) => (
          <MessageBubble key={i} msg={msg} index={i} />
        ))}
        {loading && (
          <div className="typing-indicator">
            <div className="typing-avatar">🦁</div>
            <div className="typing-dots">
              <span /><span /><span />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      <div className="suggestions-bar">
        {suggestions.map((s, i) => (
          <button key={i} className="suggestion-chip" onClick={() => handleSend(s)}>
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <InputBar onSend={handleSend} loading={loading} lang={lang} />
    </div>
  )
}