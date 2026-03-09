// frontend/src/components/VoiceButton.jsx
import { useState, useEffect, useRef } from 'react'

// Langues Web Speech API
const SPEECH_LANGS = {
  fr: 'fr-FR',
  en: 'en-US',
  wo: 'fr-SN', // Wolof → fallback français sénégalais
  auto: 'fr-FR'
}

// Voix TTS par langue
const TTS_LANGS = {
  fr: 'fr-FR',
  en: 'en-US',
  wo: 'fr-FR',
  auto: 'fr-FR'
}

export default function VoiceButton({ lang, onTranscript, lastBotMessage, disabled }) {
  const [status, setStatus] = useState('idle') // idle | listening | processing
  const [supported, setSupported] = useState(true)
  const recognitionRef = useRef(null)
  const synthRef = useRef(window.speechSynthesis)

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setSupported(false)
    }
  }, [])

  // Lire la réponse du bot à voix haute
  useEffect(() => {
    if (!lastBotMessage || !synthRef.current) return
    speakText(lastBotMessage, lang)
  }, [lastBotMessage])

  const speakText = (text, lang) => {
    synthRef.current.cancel() // Arrêter si déjà en train de parler

    // Nettoyer les emojis et markdown pour la synthèse vocale
    const cleanText = text
      .replace(/[\u{1F300}-\u{1FFFF}]/gu, '')
      .replace(/[🎯🔥💪✅❌⚠️🦁🏅🗓️🏟️🎟️🚌🚆🚗🏘️🌍🥊⚽🥇🥈🥉]/g, '')
      .replace(/\*/g, '')
      .replace(/_/g, '')
      .trim()

    if (!cleanText) return

    const utterance = new SpeechSynthesisUtterance(cleanText)
    utterance.lang = TTS_LANGS[lang] || 'fr-FR'
    utterance.rate = 0.95
    utterance.pitch = 1.05
    utterance.volume = 1

    // Choisir une voix locale si disponible
    const voices = synthRef.current.getVoices()
    const targetLang = TTS_LANGS[lang] || 'fr-FR'
    const bestVoice = voices.find(v => v.lang === targetLang && v.localService)
      || voices.find(v => v.lang.startsWith(targetLang.split('-')[0]))
    if (bestVoice) utterance.voice = bestVoice

    synthRef.current.speak(utterance)
  }

  const startListening = () => {
    if (!supported || disabled) return

    // Arrêter TTS si en cours
    synthRef.current?.cancel()

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.lang = SPEECH_LANGS[lang] || 'fr-FR'
    recognition.continuous = false
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => setStatus('listening')

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setStatus('processing')
      onTranscript(transcript)
      setTimeout(() => setStatus('idle'), 1000)
    }

    recognition.onerror = (event) => {
      console.error('Speech error:', event.error)
      setStatus('idle')
    }

    recognition.onend = () => {
      if (status === 'listening') setStatus('idle')
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  const stopListening = () => {
    recognitionRef.current?.stop()
    setStatus('idle')
  }

  const handleClick = () => {
    if (status === 'listening') {
      stopListening()
    } else {
      startListening()
    }
  }

  if (!supported) return null // Cacher si navigateur non supporté

  return (
    <button
      className={`voice-btn voice-${status}`}
      onClick={handleClick}
      disabled={disabled || status === 'processing'}
      title={
        status === 'listening' ? 'Cliquez pour arrêter' :
        status === 'processing' ? 'Traitement...' :
        'Parler au chatbot'
      }
    >
      {status === 'idle'       && <MicIcon />}
      {status === 'listening'  && <StopIcon />}
      {status === 'processing' && <LoadingIcon />}

      {/* Ondes sonores animées quand on écoute */}
      {status === 'listening' && (
        <span className="voice-waves">
          <span /><span /><span /><span />
        </span>
      )}
    </button>
  )
}

// ── Icônes SVG ──
function MicIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
    </svg>
  )
}

function StopIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="6" width="12" height="12" rx="2"/>
    </svg>
  )
}

function LoadingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"
      style={{ animation: 'spin 1s linear infinite' }}>
      <path d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8z"/>
    </svg>
  )
}