// backend/server.js
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const { generateResponse, detectLang } = require("./chatHandler")
const whatsappRouter = require("./whatsapp")

const app = express()

// ── Middlewares ──
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // ← CRUCIAL pour Twilio

// ── Health check ──
app.get("/", (req, res) => {
  res.json({ status: "🦁 JOJ Backend OK" })
})

// ── Route Chat Web ──
app.post("/api/chat", async (req, res) => {
  const { message, lang } = req.body

  if (!message) {
    return res.status(400).json({ error: "Message requis" })
  }

  const detectedLang = lang === "auto" ? detectLang(message) : lang
  const response = await generateResponse(message, detectedLang)

  res.json({ response, detectedLang })
})

// ── Route WhatsApp ──
app.use("/webhook", whatsappRouter)

// ── Démarrage ──
app.listen(process.env.PORT || 3001, () => {
  console.log("🦁 JOJ Chatbot API running on port 3001")
})