// frontend/src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AdminApp from './AdminApp.jsx'
import './App.css'

// Routing simple sans react-router
const isAdmin = window.location.pathname.startsWith('/admin')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isAdmin ? <AdminApp /> : <App />}
  </StrictMode>
)