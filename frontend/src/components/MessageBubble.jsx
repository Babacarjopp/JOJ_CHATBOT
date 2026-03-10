export default function MessageBubble({ msg, index }) {
  const isBot = msg.role === 'bot'

  return (
    <div
      className={`message-row ${isBot ? 'bot-row' : 'user-row'}`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {isBot && (
        <div className="bot-avatar">
  <img src="/lion.png" alt="JOJ" className="avatar-img" />
</div>
      )}
      <div className={`bubble ${isBot ? 'bubble-bot' : 'bubble-user'}`}>
        <p>{msg.text}</p>
        {msg.detectedLang && (
          <span className="lang-tag">
            {msg.detectedLang === 'fr' ? '🇫🇷' : msg.detectedLang === 'en' ? '🇬🇧' : '🇸🇳'}
          </span>
        )}
      </div>
    </div>
  )
}