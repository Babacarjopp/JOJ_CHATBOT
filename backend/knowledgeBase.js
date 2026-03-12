// ============================================================
//  JOJ ASSISTANT — Knowledge Base V2
//  + Salutations, politesse, identité bot
// ============================================================

const knowledge = [

  // ════════════════════════════════
  //  👋 SALUTATIONS
  // ════════════════════════════════
  {
    keywords: ["bonjour", "salut", "hello", "hi", "hey", "bonsoir", "coucou", "salam", "asalaam", "asalam", "alaykum", "wa alaykum", "asalaamaalekum"],
    fr: "👋 Bonjour ! Je suis JOJ Assistant, votre guide officiel pour les JOJ Dakar 2026 🦁 Comment puis-je vous aider ?",
    en: "👋 Hello! I'm JOJ Assistant, your official guide for the Dakar 2026 Youth Olympic Games 🦁 How can I help you?",
    wo: "👋 Asalaamaalekum ! Maa ngi JOJ Assistant, guide ji officiel bi ci JOJ Dakar 2026 🦁 Naka maa ko def ngir yow ?"
  },
  {
    keywords: ["ça va", "ca va", "comment vas", "comment tu vas", "how are you", "naka nga def", "nanga def", "naka waa"],
    fr: "😊 Je vais très bien merci ! Prêt à vous aider sur tout ce qui concerne les JOJ Dakar 2026. Quelle est votre question ?",
    en: "😊 I'm doing great, thanks! Ready to help with everything about Dakar 2026 YOG. What's your question?",
    wo: "😊 Maa ngi fi rekk, jërejëf ! Duma sore ngir dëgëlal leen ci JOJ Dakar 2026. Ana laaj bi ?"
  },

  // ════════════════════════════════
  //  🙏 REMERCIEMENTS
  // ════════════════════════════════
  {
    keywords: ["merci", "thank you", "thanks", "thx", "jërejëf", "jerejef", "yëp baal", "nianga def"],
    fr: "🙏 Avec plaisir ! N'hésitez pas si vous avez d'autres questions sur les JOJ Dakar 2026 🦁",
    en: "🙏 You're welcome! Feel free to ask if you have more questions about Dakar 2026 YOG 🦁",
    wo: "🙏 Amul solo ! Bul ségal laaj ko ci yeneen laaj yi ci JOJ Dakar 2026 🦁"
  },

  // ════════════════════════════════
  //  👋 AU REVOIR
  // ════════════════════════════════
  {
    keywords: ["au revoir", "bye", "goodbye", "à bientôt", "bonne journée", "bonne soirée", "ciao", "ba beneen", "ba beneen yoon", "ba ci kanam"],
    fr: "👋 Au revoir ! Bonne visite aux JOJ Dakar 2026 🦁🇸🇳 À bientôt !",
    en: "👋 Goodbye! Enjoy the Dakar 2026 Youth Olympic Games 🦁🇸🇳 See you soon!",
    wo: "👋 Ba beneen yoon ! Jàng ak yëgëlal ci JOJ Dakar 2026 🦁🇸🇳 Ba ci kanam !"
  },

  // ════════════════════════════════
  //  🤖 IDENTITÉ DU BOT
  // ════════════════════════════════
  {
    keywords: ["qui es tu", "qui es-tu", "c'est quoi", "what are you", "who are you", "tu es quoi", "présente toi", "présente-toi", "kii ana", "yow ana nga"],
    fr: "🤖 Je suis JOJ Assistant, le chatbot officiel des Jeux Olympiques de la Jeunesse Dakar 2026 ! Je parle français, anglais et wolof 🇫🇷🇬🇧🇸🇳 Je peux vous aider sur les sports, lieux, dates, billets et transport.",
    en: "🤖 I'm JOJ Assistant, the official chatbot of the Dakar 2026 Youth Olympic Games! I speak French, English and Wolof 🇫🇷🇬🇧🇸🇳 I can help with sports, venues, dates, tickets and transport.",
    wo: "🤖 Maa ngi JOJ Assistant, chatbot officiel bi ci JOJ Dakar 2026 ! Dégg naa français, anglais ak wolof 🇫🇷🇬🇧🇸🇳 Maa ngay dëgëlal ci sports, lieux, dates, billets ak transport."
  },
  {
    keywords: ["tu peux faire quoi", "what can you do", "aide", "help", "menu", "options", "lan moo xamne", "naka maa ko def"],
    fr: "🦁 Je peux vous aider sur :\n📍 Lieux des compétitions\n🗓️ Dates et programme\n🏅 Sports et disciplines\n🎟️ Billetterie\n🚍 Transport\n\nPosez-moi votre question !",
    en: "🦁 I can help you with:\n📍 Competition venues\n🗓️ Dates and schedule\n🏅 Sports and disciplines\n🎟️ Tickets\n🚍 Transport\n\nAsk me anything!",
    wo: "🦁 Maa ngay dëgëlal ci :\n📍 Lieux yi\n🗓️ Dates ak programme bi\n🏅 Sports yi\n🎟️ Billets yi\n🚍 Transport bi\n\nLaaj ma !"
  },

  // ════════════════════════════════
  //  😄 COMPLIMENTS / RÉACTIONS
  // ════════════════════════════════
  {
    keywords: ["super", "génial", "parfait", "excellent", "bravo", "bien", "great", "awesome", "nice", "cool", "baax", "baax na"],
    fr: "😊 Merci ! Je suis là pour vous aider. Avez-vous d'autres questions sur les JOJ Dakar 2026 ?",
    en: "😊 Thank you! I'm here to help. Any more questions about Dakar 2026 YOG?",
    wo: "😊 Jërejëf ! Duma sore. Am na yeneen laaj yi ci JOJ Dakar 2026 ?"
  },
  {
    keywords: ["ok", "d'accord", "compris", "je vois", "je comprends", "understood", "got it", "waaw", "waaw waaw", "dëgg"],
    fr: "👍 Parfait ! N'hésitez pas si vous avez d'autres questions 🦁",
    en: "👍 Great! Don't hesitate if you have more questions 🦁",
    wo: "👍 Baax na ! Bul ségal laaj ko ci yeneen dëkkal 🦁"
  },

  // ════════════════════════════════
  //  📍 LIEUX
  // ════════════════════════════════
  {
    keywords: ["stade", "stadium", "venue", "lieu", "site", "foo", "nekk", "arène", "arena", "where", "dakar arena"],
    fr: "🏟️ Le site principal est le Dakar Arena à Diamniadio, à 30 km de Dakar. C'est là que se déroulent la plupart des épreuves.",
    en: "🏟️ The main venue is Dakar Arena in Diamniadio, 30km from Dakar city center. Most events take place there.",
    wo: "🏟️ Dakar Arena ci Diamniadio moy site bu mag bi. Dafa nekk 30km ci Dakar. Épreuves yi ëpp dañu ko def foofu."
  },
  {
    keywords: ["diamniadio", "ville", "city", "endroit", "localisation", "location", "où se passe", "kër", "dëkk"],
    fr: "🌍 Les JOJ Dakar 2026 se déroulent principalement à Diamniadio, la nouvelle ville intelligente du Sénégal, et dans plusieurs sites à Dakar.",
    en: "🌍 Dakar 2026 YOG takes place mainly in Diamniadio, Senegal's new smart city, and at several venues across Dakar.",
    wo: "🌍 JOJ Dakar 2026 dañu ko def ci Diamniadio, dëkk bu bees bu Sénégal, ak sites yi ci Dakar."
  },
  {
    keywords: ["village", "athlète", "athlete", "hébergement", "logement", "dormir", "hotel", "where stay", "nekkal"],
    fr: "🏘️ Le Village Olympique est situé à Diamniadio. Il accueille tous les athlètes participants aux JOJ 2026.",
    en: "🏘️ The Olympic Village is located in Diamniadio and will host all athletes competing at the 2026 YOG.",
    wo: "🏘️ Village Olympique bi dafa nekk ci Diamniadio. Athlètes yëp dañu ko dëkk ci JOJ 2026."
  },

  // ════════════════════════════════
  //  🗓️ DATES
  // ════════════════════════════════
  {
    keywords: ["date", "quand", "when", "commence", "start", "début", "opening", "ouverture", "tambali"],
    fr: "🗓️ Les JOJ Dakar 2026 commencent le 31 octobre 2026 avec la cérémonie d'ouverture.",
    en: "🗓️ The Dakar 2026 Youth Olympic Games start on October 31, 2026 with the opening ceremony.",
    wo: "🗓️ JOJ Dakar 2026 dañu tambali ci 31 octobre 2026 ak cérémonie d'ouverture bi."
  },
  {
    keywords: ["finit", "fin", "end", "clôture", "closing", "fermeture", "dernier jour", "last day", "jeex"],
    fr: "🏁 Les JOJ Dakar 2026 se terminent le 13 novembre 2026 avec la cérémonie de clôture.",
    en: "🏁 The Dakar 2026 YOG conclude on November 13, 2026 with the closing ceremony.",
    wo: "🏁 JOJ Dakar 2026 dañu jeex ci 13 novembre 2026 ak cérémonie de clôture bi."
  },
  {
    keywords: ["durée", "combien de jours", "how long", "how many days", "programme", "calendrier", "schedule"],
    fr: "📅 Les JOJ Dakar 2026 durent 14 jours, du 31 octobre au 13 novembre 2026.",
    en: "📅 The Dakar 2026 YOG last 14 days, from October 31 to November 13, 2026.",
    wo: "📅 JOJ Dakar 2026 dañu dëkk 14 fan, ci 31 octobre jëkk 13 novembre 2026."
  },

  // ════════════════════════════════
  //  🏅 SPORTS
  // ════════════════════════════════
  {
    keywords: ["sport", "discipline", "épreuve", "event", "compétition", "jeux", "what sport", "lan", "def"],
    fr: "🏅 Les JOJ Dakar 2026 proposent 28 disciplines sportives, incluant l'athlétisme, la natation, le basketball, le judo, le football, la lutte et bien d'autres.",
    en: "🏅 Dakar 2026 features 28 sports disciplines including athletics, swimming, basketball, judo, football, wrestling and many more.",
    wo: "🏅 JOJ Dakar 2026 am na sports 28 : athlétisme, natation, basketball, judo, football, laamb ak yeneen."
  },
  {
    keywords: ["lutte", "wrestling", "laamb", "sport sénégalais", "local", "africain", "traditional"],
    fr: "🥊 La lutte sénégalaise (Laamb) est mise à l'honneur aux JOJ 2026 ! C'est un sport traditionnel africain intégré au programme officiel.",
    en: "🥊 Senegalese wrestling (Laamb) is featured at the 2026 YOG! This traditional African sport is part of the official program.",
    wo: "🥊 Laamb bi dafa am solo ci JOJ 2026 ! Dafa nekk ci programme officiel bi. Sénégal moy kor !"
  },
  {
    keywords: ["athlète", "athlete", "participant", "jeune", "youth", "âge", "age", "combien", "how many", "bari"],
    fr: "👟 Environ 4 000 jeunes athlètes âgés de 14 à 18 ans, représentant plus de 200 pays, participent aux JOJ Dakar 2026.",
    en: "👟 Around 4,000 young athletes aged 14 to 18, representing over 200 countries, will compete at Dakar 2026 YOG.",
    wo: "👟 Athlètes 4000 ci diggante 14 ak 18 ans, dañu bëgg joindre ci pays 200, dañu dem ci JOJ Dakar 2026."
  },

  // ════════════════════════════════
  //  🎟️ BILLETTERIE
  // ════════════════════════════════
  {
    keywords: ["billet", "ticket", "place", "entrée", "acheter", "buy", "prix", "price", "jënd", "achat"],
    fr: "🎟️ Les billets sont disponibles sur le site officiel dakar2026.sn. Les prix varient selon les épreuves et les catégories.",
    en: "🎟️ Tickets are available on the official website dakar2026.sn. Prices vary by event and category.",
    wo: "🎟️ Billets yi dañu ko jënd ci site officiel dakar2026.sn. Prix yi dañu sowwu ci épreuve ak catégorie."
  },
  {
    keywords: ["gratuit", "free", "enfant", "child", "famille", "family", "réduction", "discount"],
    fr: "🆓 Certaines épreuves ont des billets gratuits pour les enfants de moins de 12 ans. Des tarifs réduits sont disponibles pour les groupes scolaires.",
    en: "🆓 Some events offer free tickets for children under 12. Reduced rates are available for school groups.",
    wo: "🆓 Épreuves dëkk am na billets gratuits ngir xale yi ci bës 12 ans. Prix yu wees am na ngir écoles."
  },
  {
    keywords: ["cérémonie", "ceremony", "ouverture", "clôture", "opening", "closing", "inauguration"],
    fr: "🎆 Les billets pour les cérémonies d'ouverture et de clôture sont les plus demandés. Réservez tôt sur dakar2026.sn !",
    en: "🎆 Tickets for the opening and closing ceremonies are the most sought-after. Book early on dakar2026.sn!",
    wo: "🎆 Billets yi ci cérémonies d'ouverture ak clôture dañu ko bëgg lool. Réserve ci kanam ci dakar2026.sn !"
  },

  // ════════════════════════════════
  //  🚍 TRANSPORT
  // ════════════════════════════════
  {
    keywords: ["transport", "bus", "navette", "shuttle", "comment aller", "how to get", "aller", "dem", "yëgël"],
    fr: "🚌 Des navettes officielles relient Dakar à Diamniadio toutes les 30 minutes pendant les JOJ. Départ depuis la gare de Petersen.",
    en: "🚌 Official shuttles run between Dakar and Diamniadio every 30 minutes during the Games. Departing from Petersen station.",
    wo: "🚌 Bus officiel yi dañu dem Dakar-Diamniadio ci 30 minutes chaque fois. Dañu dem ci gare Petersen."
  },
  {
    keywords: ["train", "ter", "rail", "gare", "station"],
    fr: "🚆 Le TER (Train Express Régional) relie Dakar à Diamniadio en 45 minutes. C'est le moyen le plus rapide et le plus confortable.",
    en: "🚆 The TER (Regional Express Train) connects Dakar to Diamniadio in 45 minutes — the fastest and most comfortable option.",
    wo: "🚆 TER bi (Train Express Régional) dafa dem Dakar-Diamniadio ci 45 minutes. Moyen bu gaaw bu kanam."
  },
  {
    keywords: ["parking", "voiture", "car", "taxi", "uber", "moto", "wottu"],
    fr: "🚗 Des parkings officiels sont disponibles autour du Dakar Arena. Le covoiturage et les taxis sont aussi recommandés.",
    en: "🚗 Official parking areas are available around Dakar Arena. Carpooling and taxis are also recommended.",
    wo: "🚗 Parkings officiels am na ci kanam Dakar Arena. Taxi ak covoiturage dañu ko jàpp ngir wéccati embouteillages."
  },
]

// ── Recherche avec scoring ──
function searchKnowledge(message) {
  const lower = message.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")

  let bestMatch = null
  let bestScore = 0

  for (const item of knowledge) {
    const score = item.keywords.filter(kw =>
      lower.includes(kw.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""))
    ).length

    if (score > bestScore) {
      bestScore = score
      bestMatch = item
    }
  }

  return bestScore > 0 ? bestMatch : null
}

module.exports = { knowledge, searchKnowledge }