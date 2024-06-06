import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
console.log(import.meta.env.VITE_BACKEND_URL)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:3002',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  }
})
