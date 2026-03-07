const express = require('express')
const router = express.Router()
const twilio = require('twilio')
const { generateResponse, detectLang } = require('./chatHandler')

router.post('/whatsapp', async (req, res) => {
  const message = req.body.Body        // texte reçu
  const from    = req.body.From        // numéro expéditeur

  console.log(`📱 WhatsApp de ${from}: "${message}"`)

  const lang     = detectLang(message)
  const response = await generateResponse(message, lang)

  // Répondre via Twilio MessagingResponse
  const twiml = new twilio.twiml.MessagingResponse()
  twiml.message(response)

  res.type('text/xml').send(twiml.toString())
})

module.exports = router