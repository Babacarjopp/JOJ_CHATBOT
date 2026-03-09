// backend/whatsapp.js
const express = require('express')
const router = express.Router()
const twilio = require('twilio')
const { generateResponse, detectLang } = require('./chatHandler')
const { track } = require('./analytics')
const { addSubscriber, removeSubscriber, sendWelcome, getSubscriberCount } = require('./alerts')

router.post('/whatsapp', async (req, res) => {
  const message = req.body.Body?.trim()
  const from    = req.body.From

  if (!message) return res.status(200).send('')

  console.log(`📱 WhatsApp de ${from}: "${message}"`)

  const twiml = new twilio.twiml.MessagingResponse()

  // ── Commande STOP → désabonnement ──
  if (message.toUpperCase() === 'STOP') {
    removeSubscriber(from)
    twiml.message('🛑 Vous avez été désabonné des alertes JOJ. À bientôt ! 🦁')
    return res.type('text/xml').send(twiml.toString())
  }

  // ── Commande ALERTE → s'abonner aux alertes ──
  if (message.toUpperCase() === 'ALERTE' || message.toUpperCase() === 'ALERT' || message.toUpperCase() === 'SUBSCRIBE') {
    addSubscriber(from)
    await sendWelcome(from)
    // sendWelcome envoie déjà le message directement
    twiml.message('') // message vide car sendWelcome gère l'envoi
    return res.type('text/xml').send(twiml.toString())
  }

  // ── Abonnement automatique au premier message ──
  addSubscriber(from)

  // ── Réponse normale du chatbot ──
  const lang     = detectLang(message)
  const response = await generateResponse(message, lang)

  // Analytics
  track({ message, lang, channel: 'whatsapp', from })

  // Ajouter hint d'abonnement aux alertes (1 fois sur 5)
  const hint = Math.random() < 0.2
    ? '\n\n💡 _Envoyez ALERTE pour recevoir les résultats en direct !_'
    : ''

  twiml.message(response + hint)
  res.type('text/xml').send(twiml.toString())
})

module.exports = router

//ngrok http 3001 pour exposer le serveur local et tester les webhooks Twilio en développement.lancer whatsapp.js dans server.js avec app.use('/api', whatsappRouter) et configurer Twilio pour pointer vers http://localhost:3001/api/whatsapp