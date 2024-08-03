import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/login',
  server: {
    host: 'localhost',
    port: 5173,
  },
  plugins: [react()],
})
