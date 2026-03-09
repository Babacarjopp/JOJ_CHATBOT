// frontend/src/components/InputBar.jsx
import { useState } from 'react'
import VoiceButton from './VoiceButton'

const PLACEHOLDER = {
  auto: "Pose ta question... · Ask anything... · Laaj ci kow...",
  fr:   "Pose ta question sur les JOJ...",
  en:   "Ask anything about the Games...",
  wo:   "Laaj ci kow JOJ yi..."
}

export default function InputBar({ onSend, loading, lang, lastBotMessage }) {
  const [value, setValue] = useState('')

  const handleSubmit = () => {
    if (!value.trim() || loading) return
    onSend(value.trim())
    setValue('')
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleTranscript = (transcript) => {
    setValue(transcript)
    setTimeout(() => {
      onSend(transcript)
      setValue('')
    }, 300)
  }

  return (
    <div className="input-bar">
      <VoiceButton
        lang={lang}
        onTranscript={handleTranscript}
        lastBotMessage={lastBotMessage}
        disabled={loading}
      />
      <input
        className="input-field"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKey}
        placeholder={PLACEHOLDER[lang] || PLACEHOLDER['auto']}
        disabled={loading}
      />
      <button
        className={`send-btn ${loading ? 'send-loading' : ''}`}
        onClick={handleSubmit}
        disabled={loading || !value.trim()}
      >
        {loading ? '⏳' : '➤'}
      </button>
    </div>
  )
}