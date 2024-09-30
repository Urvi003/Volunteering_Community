import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests from frontend to backend
      '/api': {
        target: 'http://localhost:4000', // Backend server URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
