// backend/server.js
require("dotenv").config()
const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.json({ status: "🦁 JOJ Backend OK" })
})

app.listen(3001, () => {
  console.log("Server running on port 3001")
})





const { generateResponse, detectLang } = require("./chatHandler")

app.post("/api/chat", async (req, res) => {

  const { message, lang } = req.body

  if (!message) {
    return res.status(400).json({ error: "Message requis" })
  }

  const detectedLang = lang === "auto"
    ? detectLang(message)
    : lang

  const response = await generateResponse(message, detectedLang)

  res.json({
    response,
    detectedLang
  })

})