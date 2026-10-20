import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Builds to ./dist as plain static files — perfect for Vercel.
export default defineConfig({
  plugins: [react()],
})
