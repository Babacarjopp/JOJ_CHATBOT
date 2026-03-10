// backend/chatHandler.js
require('dotenv').config()
const OpenAI = require('openai')
const { searchKnowledge } = require('./knowledgeBase')

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const JOJ_CONTEXT = `
=== JEUX OLYMPIQUES DE LA JEUNESSE (JOJ) DAKAR 2026 ===

## INFORMATIONS GÉNÉRALES
- Nom officiel : Jeux Olympiques de la Jeunesse Dakar 2026
- Édition : 5ème édition des JOJ d'été
- Dates : du 31 octobre au 13 novembre 2026 (14 jours)
- Ville hôte : Dakar, Sénégal
- Premier JOJ organisé en Afrique
- Site officiel : dakar2026.sn
- Slogan : "Ouvrons un monde meilleur"

## PARTICIPANTS
- Environ 4 000 jeunes athlètes, âge 14-18 ans
- Plus de 200 pays représentés
- 28 sports olympiques

## SPORTS (28)
Athlétisme, Aviron, Badminton, Basketball 3x3, Boxe,
Canoë-Kayak, Cyclisme, Escalade, Escrime, Football,
Gymnastique artistique, Gymnastique rythmique,
Haltérophilie, Handball, Hockey sur gazon, Judo,
Lutte (dont Laamb sénégalais), Natation,
Pentathlon, Plongeon, Surf, Taekwondo,
Tennis, Tennis de table, Tir, Triathlon, Voile, Volleyball

## SITES PRINCIPAUX
- Dakar Arena (Diamniadio) : Basketball, Volleyball, Gym, Cérémonies — 15 000 places
- Stade LSS (Dakar) : Football, Athlétisme — 60 000 places
- Piscine Olympique Diamniadio : Natation, Plongeon — 5 000 places
- Arène Nationale (Pikine) : Lutte/Laamb, Judo, Boxe — 20 000 places
- Village Olympique (Diamniadio) : hébergement 4 000 athlètes
- Lac Rose : Voile, Surf

## TRANSPORT
- TER : Dakar à Diamniadio en 45 min
- Navettes officielles toutes les 30 min depuis gare Petersen
- Parkings officiels autour Dakar Arena

## BILLETTERIE
- Site : dakar2026.sn
- Gratuit enfants -12 ans (certaines épreuves)
- Paiement : carte, Orange Money, Wave
- Cérémonies : billets très demandés, réserver tôt

## CÉRÉMONIES
- Ouverture : 31 octobre 2026 à 18h — Dakar Arena
- Clôture : 13 novembre 2026 — Dakar Arena

## MÉTÉO
- Saison sèche, 25-32°C, temps ensoleillé

## CONTACT
- Site : dakar2026.sn
- Email : info@dakar2026.sn
- Réseaux : @Dakar2026

=== FIN DU CONTEXTE ===
`

function detectLang(text) {
  const wolofWords = ['foo','naka','lan','dafa','jënd','nekk','def','laamb',
    'xam','bëgg','dem','jeex','tambali','yëgël','ci','bi','yi','bu',
    'waw','dëgg','xale','laaj','kow','dañu','maa','nga','mooy']
  const lower = text.toLowerCase()
  if (wolofWords.filter(w => lower.includes(w)).length >= 1) return 'wo'
  const enWords = ['where','what','how','when','who','is','are','the','can','will','does','do','tell','me']
  if (enWords.filter(w => lower.split(' ').includes(w)).length >= 2) return 'en'
  return 'fr'
}

async function generateResponse(message, lang) {
  // 1️⃣ Knowledge Base
  const found = searchKnowledge(message)
  if (found) return found[lang] || found['fr']

  // 2️⃣ GPT avec contexte JOJ
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('xxx')) {
    return getFallback(lang)
  }

  try {
    const langLabel = lang === 'fr' ? 'français' : lang === 'en' ? 'English' : 'wolof'

    const systemPrompt = `Tu es JOJ Assistant, chatbot officiel des JOJ Dakar 2026.

CONTEXTE JOJ 2026 :
${JOJ_CONTEXT}

RÈGLES :
- Réponds UNIQUEMENT en ${langLabel}
- Utilise le contexte pour répondre avec précision
- Sois concis (2-3 phrases), chaleureux, 1 emoji
- Si hors-sujet JOJ, redirige poliment vers les JOJ 2026
- Ne jamais inventer d'infos hors du contexte`

    const res = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 250,
      temperature: 0.5
    })
    return res.choices[0].message.content

  } catch (err) {
    console.error('OpenAI error:', err.message)
    return getFallback(lang)
  }
}

function getFallback(lang) {
  return {
    fr: "🦁 Consultez dakar2026.sn ou posez-moi une question sur les lieux, dates, sports, billets ou transport !",
    en: "🦁 Check dakar2026.sn or ask me about venues, dates, sports, tickets or transport!",
    wo: "🦁 Xool dakar2026.sn walla laaj ma ci lieux, dates, sports, billets walla transport!"
  }[lang] || "🦁 Consultez dakar2026.sn pour plus d'informations !"
}

module.exports = { generateResponse, detectLang }