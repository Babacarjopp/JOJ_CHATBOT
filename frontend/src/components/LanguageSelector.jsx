const LANGS = [
  { value: 'auto', label: '🌐 Auto' },
  { value: 'fr',   label: '🇫🇷 FR' },
  { value: 'en',   label: '🇬🇧 EN' },
  { value: 'wo',   label: '🇸🇳 WO' },
]

export default function LanguageSelector({ lang, onChange }) {
  return (
    <div className="lang-selector">
      {LANGS.map(l => (
        <button
          key={l.value}
          className={`lang-btn ${lang === l.value ? 'lang-active' : ''}`}
          onClick={() => onChange(l.value)}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}