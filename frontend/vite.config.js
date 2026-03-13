// frontend/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true, // redirige /admin vers index.html
  },
  preview: {
    historyApiFallback: true,
  }
})