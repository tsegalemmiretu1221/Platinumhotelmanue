import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  // Use '/' for the custom subdomain root
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
}))
