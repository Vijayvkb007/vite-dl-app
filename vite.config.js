import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/vite-dl-app',
  plugins: [react(), tailwindcss(),]
})
// https://github.com/Vijayvkb007/vite-dl-app.git