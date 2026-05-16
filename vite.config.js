import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  // Use '/Platinumhotelmanue/' for GitHub Pages project site deployment
  base: '/Platinumhotelmanue/',
  plugins: [
    react(),
    tailwindcss(),
  ],
}))
