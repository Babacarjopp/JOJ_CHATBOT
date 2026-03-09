// backend/server.js
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const { generateResponse, detectLang } = require("./chatHandler")
const whatsappRouter = require("./whatsapp")
const { track, getStats } = require("./analytics")
const { sendAlertToAll, getSubscriberCount, getScheduledAlerts } = require("./alerts")

const app = express()

// ── Middlewares ──
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ── Health check ──
app.get("/", (req, res) => {
  res.json({ status: "🦁 JOJ Backend OK" })
})

// ── Route Chat Web ──
app.post("/api/chat", async (req, res) => {
  const { message, lang } = req.body
  if (!message) return res.status(400).json({ error: "Message requis" })

  const start = Date.now()
  const detectedLang = lang === "auto" ? detectLang(message) : lang
  const response = await generateResponse(message, detectedLang)
  const responseTimeMs = Date.now() - start

  track({ message, lang: detectedLang, channel: 'web', responseTimeMs, from: req.ip })
  res.json({ response, detectedLang })
})

// ── Route Stats Dashboard (protégée) ──
app.get("/api/stats", (req, res) => {
  const key = req.query.key
  if (key !== process.env.ADMIN_KEY) {
    return res.status(403).json({ error: "🔐 Accès refusé" })
  }
  res.json({
    ...getStats(),
    subscriberCount: getSubscriberCount()
  })
})

// ── Route Envoyer Alerte (protégée) ──
app.post("/api/alerts/send", async (req, res) => {
  const key = req.query.key
  if (key !== process.env.ADMIN_KEY) {
    return res.status(403).json({ error: "🔐 Accès refusé" })
  }
  const { message } = req.body
  if (!message) return res.status(400).json({ error: "Message requis" })

  const result = await sendAlertToAll(message)
  res.json(result)
})

// ── Route Alertes programmées (protégée) ──
app.get("/api/alerts/scheduled", (req, res) => {
  const key = req.query.key
  if (key !== process.env.ADMIN_KEY) {
    return res.status(403).json({ error: "🔐 Accès refusé" })
  }
  res.json(getScheduledAlerts())
})

// ── Route WhatsApp ──
app.use("/webhook", whatsappRouter)

// ── Démarrage ──
app.listen(process.env.PORT || 3001, () => {
  console.log("🦁 JOJ Chatbot API running on port 3001")
  console.log(`🔐 Dashboard: /api/stats?key=${process.env.ADMIN_KEY}`)
  console.log(`🔔 Alertes:   /api/alerts/send?key=${process.env.ADMIN_KEY}`)
})