import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  server: {
    proxy: {
      "/api": {
        target: "https://server-node-neon-rho.vercel.app/",
        changeOrigin: true
      }
    }
  }
})
