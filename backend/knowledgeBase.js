// ============================================================
//  JOJ ASSISTANT — Knowledge Base V1
//  5 catégories × 3 questions × 3 langues = 45 entrées
//  Catégories : Lieux | Dates | Sports | Billetterie | Transport
// ============================================================

const knowledge = [

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
    keywords: ["durée", "combien de jours", "how long", "how many days", "programme", "calendrier", "schedule", "bëgg xam"],
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
    keywords: ["gratuit", "free", "enfant", "child", "famille", "family", "réduction", "discount", "waaw", "dëgg"],
    fr: "🆓 Certaines épreuves ont des billets gratuits pour les enfants de moins de 12 ans. Des tarifs réduits sont disponibles pour les groupes scolaires.",
    en: "🆓 Some events offer free tickets for children under 12. Reduced rates are available for school groups.",
    wo: "🆓 Épreuves dëkk am na billets gratuits ngir xale yi ci bës 12 ans. Prix yu wees am na ngir écoles."
  },
  {
    keywords: ["cérémonie", "ceremony", "ouverture", "clôture", "opening", "closing", "inauguration", "gala"],
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
    keywords: ["train", "ter", "rail", "tgv", "gare", "station", "métro"],
    fr: "🚆 Le TER (Train Express Régional) relie Dakar à Diamniadio en 45 minutes. C'est le moyen le plus rapide et le plus confortable.",
    en: "🚆 The TER (Regional Express Train) connects Dakar to Diamniadio in 45 minutes — the fastest and most comfortable option.",
    wo: "🚆 TER bi (Train Express Régional) dafa dem Dakar-Diamniadio ci 45 minutes. Moyen bu gaaw bu kanam."
  },
  {
    keywords: ["parking", "voiture", "car", "taxi", "uber", "moto", "taxi moto", "jakarta", "wottu"],
    fr: "🚗 Des parkings officiels sont disponibles autour du Dakar Arena. Le covoiturage et les taxis sont aussi recommandés pour éviter les embouteillages.",
    en: "🚗 Official parking areas are available around Dakar Arena. Carpooling and taxis are also recommended to avoid traffic.",
    wo: "🚗 Parkings officiels am na ci kanam Dakar Arena. Taxi ak covoiturage dañu ko jàpp ngir wéccati embouteillages."
  },

]

// ── Recherche dans la knowledge base ──
function searchKnowledge(message) {
  const lower = message.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // enlève les accents pour la recherche

  // Score par nombre de keywords matchés
  let bestMatch = null
  let bestScore = 0

  for (const item of knowledge) {
    const score = item.keywords.filter(kw =>
      lower.includes(kw.toLowerCase())
    ).length

    if (score > bestScore) {
      bestScore = score
      bestMatch = item
    }
  }

  return bestScore > 0 ? bestMatch : null
}

module.exports = { knowledge, searchKnowledge }