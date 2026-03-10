// backend/alerts.js
// Système d'alertes WhatsApp automatiques JOJ 2026
const twilio = require('twilio')

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

const FROM = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886'

// ── Base d'abonnés (en mémoire pour la démo) ──
const subscribers = new Set()

// ── Alertes préprogrammées JOJ 2026 ──
const SCHEDULED_ALERTS = [
  {
    id: 'ouverture',
    time: '08:00',
    message: {
      fr: '🏅 *JOJ Dakar 2026* — La cérémonie d\'ouverture commence AUJOURD\'HUI à 18h au Dakar Arena ! Soyez prêts 🇸🇳🔥',
      en: '🏅 *Dakar 2026 YOG* — Opening ceremony starts TODAY at 6PM at Dakar Arena! Get ready 🇸🇳🔥',
      wo: '🏅 *JOJ Dakar 2026* — Cérémonie d\'ouverture bi dafa tambali TËKKI bi ci 18h ci Dakar Arena ! Dëkkal 🇸🇳🔥'
    }
  },
  {
    id: 'laamb',
    time: '14:00',
    message: {
      fr: '🥊 *Lutte Sénégalaise (Laamb)* — Finale dans 1 heure à l\'Arène Nationale ! Ne manquez pas ça 🇸🇳',
      en: '🥊 *Senegalese Wrestling (Laamb)* — Final in 1 hour at the National Arena! Don\'t miss it 🇸🇳',
      wo: '🥊 *Laamb bi* — Finale bi dafa am ci 1 waxtu ci Arène Nationale ! Bayal ko woon 🇸🇳'
    }
  },
  {
    id: 'football',
    time: '16:00',
    message: {
      fr: '⚽ *Football* — Match Sénégal U18 dans 30 minutes au Stade LSS ! Allez les Lions🦁 ',
      en: '⚽ *Football* — Senegal U18 match in 30 minutes at LSS Stadium! Go Lions 🦁',
      wo: '⚽ *Football* — Match Sénégal U18 ci 30 minutes ci Stade LSS ! Jëm ci Lions yi 🦁'
    }
  },
  {
    id: 'medailles',
    time: '20:00',
    message: {
      fr: '🥇 *Tableau des médailles* — Sénégal : 3🥇 2🥈 1🥉 — Continuez à suivre les JOJ sur notre chatbot !',
      en: '🥇 *Medal standings* — Senegal: 3🥇 2🥈 1🥉 — Keep following the YOG on our chatbot!',
      wo: '🥇 *Médailles yi* — Sénégal: 3🥇 2🥈 1🥉 — Sooyeel JOJ yi ci chatbot bi !'
    }
  },
]

// ── Ajouter un abonné ──
function addSubscriber(phone) {
  subscribers.add(phone)
  console.log(`📱 Nouvel abonné: ${phone} (total: ${subscribers.size})`)
  return subscribers.size
}

// ── Supprimer un abonné ──
function removeSubscriber(phone) {
  subscribers.delete(phone)
  console.log(`📱 Désabonné: ${phone}`)
}

// ── Envoyer une alerte à tous les abonnés ──
async function sendAlertToAll(message) {
  if (subscribers.size === 0) {
    console.log('⚠️ Aucun abonné pour recevoir l\'alerte')
    return { sent: 0, failed: 0 }
  }

  let sent = 0, failed = 0

  for (const phone of subscribers) {
    try {
      await client.messages.create({
        from: FROM,
        to: phone,
        body: message
      })
      sent++
      console.log(`✅ Alerte envoyée à ${phone}`)
    } catch (err) {
      failed++
      console.error(`❌ Échec envoi à ${phone}:`, err.message)
    }
  }

  console.log(`📊 Alertes: ${sent} envoyées, ${failed} échouées`)
  return { sent, failed }
}

// ── Envoyer une alerte à UN abonné ──
async function sendAlertToOne(phone, message) {
  try {
    await client.messages.create({ from: FROM, to: phone, body: message })
    console.log(`✅ Alerte envoyée à ${phone}`)
    return true
  } catch (err) {
    console.error(`❌ Échec:`, err.message)
    return false
  }
}

// ── Message de bienvenue abonnement ──
async function sendWelcome(phone) {
  const msg = `🦁 *JOJ Assistant — Alertes activées !*

✅ Vous êtes abonné aux alertes JOJ Dakar 2026.

Vous recevrez :
🏅 Résultats en direct
⏰ Rappels avant les épreuves
🥇 Tableau des médailles
🚨 Infos importantes

Répondez *STOP* pour vous désabonner.

_Powered by JOJ Assistant 🇸🇳_`

  return sendAlertToOne(phone, msg)
}

// ── Getters ──
function getSubscribers() { return Array.from(subscribers) }
function getSubscriberCount() { return subscribers.size }
function getScheduledAlerts() { return SCHEDULED_ALERTS }

module.exports = {
  addSubscriber,
  removeSubscriber,
  sendAlertToAll,
  sendAlertToOne,
  sendWelcome,
  getSubscribers,
  getSubscriberCount,
  getScheduledAlerts,
}