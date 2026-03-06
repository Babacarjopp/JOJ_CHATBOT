import axios from "axios"

const API_URL = "http://localhost:3001"

export async function sendMessage(message, lang = "auto") {

  const { data } = await axios.post(`${API_URL}/api/chat`, {
    message,
    lang
  })

  return data
}