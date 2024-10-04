import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://3000-idx-rifa-pro-fondos-1726786151144.cluster-iesosxm5fzdewqvhlwn5qivgry.cloudworkstations.dev",
        changeOrigin: true
      }
    }
  }
})
