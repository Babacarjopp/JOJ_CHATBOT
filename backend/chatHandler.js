require('dotenv').config()
const OpenAI = require('openai')
const { searchKnowledge } = require('./knowledgeBase')

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// ── Détection de langue ──
function detectLang(text) {
  const wolofWords = [
    'foo', 'naka', 'lan', 'dafa', 'jënd', 'nekk', 'def', 'laamb',
    'xam', 'bëgg', 'dem', 'jeex', 'tambali', 'yëgël', 'ci', 'bi',
    'yi', 'bu', 'mu', 'nu', 'waw', 'dëgg', 'xale', 'laaj', 'kow'
  ]
  const lower = text.toLowerCase()

  // Priorité Wolof : si 2+ mots wolof détectés
  const wolofCount = wolofWords.filter(w => lower.includes(w)).length
  if (wolofCount >= 1) return 'wo'

  // Anglais : mots-clés EN
  const enWords = ['where', 'what', 'how', 'when', 'who', 'is', 'are', 'the', 'can', 'will', 'does', 'do']
  const enCount = enWords.filter(w => lower.split(' ').includes(w)).length
  if (enCount >= 2) return 'en'

  // Français par défaut
  return 'fr'
}

// ── Génération de réponse ──
async function generateResponse(message, lang) {

  // 1️⃣ Chercher dans la Knowledge Base (priorité absolue)
  const found = searchKnowledge(message)
  if (found) {
    return found[lang] || found['fr']
  }

  // 2️⃣ Fallback → GPT si clé OpenAI disponible
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'sk-...') {
    return getFallback(lang)
  }

  try {
    const langLabel = lang === 'fr' ? 'français' : lang === 'en' ? 'English' : 'wolof'
    const systemPrompt = `Tu es JOJ Assistant, le chatbot officiel des Jeux Olympiques de la Jeunesse Dakar 2026.
Réponds UNIQUEMENT en ${langLabel}.
Sois concis (max 2 phrases), chaleureux et utilise 1 emoji pertinent.
Si la question ne concerne pas les JOJ Dakar 2026, réponds :
- FR: "Je suis spécialisé sur les JOJ Dakar 2026 🦁 Pose-moi une question sur les sports, lieux, dates, billets ou transport !"
- EN: "I specialize in Dakar 2026 YOG 🦁 Ask me about sports, venues, dates, tickets or transport!"
- WO: "Maa ngi spécialisé ci JOJ Dakar 2026 🦁 Laaj ma ci sports, lieux, dates, billets walla transport!"`

    const res = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 200,
      temperature: 0.7
    })

    return res.choices[0].message.content

  } catch (err) {
    console.error('OpenAI error:', err.message)
    return getFallback(lang)
  }
}

// ── Message de fallback si pas d'API ──
function getFallback(lang) {
  const fallbacks = {
    fr: "🦁 Je n'ai pas trouvé de réponse précise. Essaie de demander sur les lieux, dates, sports, billets ou transport des JOJ 2026 !",
    en: "🦁 I couldn't find a precise answer. Try asking about venues, dates, sports, tickets or transport for JOJ 2026!",
    wo: "🦁 Amuma réponse bu dëggu. Laaj ma ci lieux, dates, sports, billets walla transport yi ci JOJ 2026!"
  }
  return fallbacks[lang] || fallbacks['fr']
}

module.exports = { generateResponse, detectLang }