import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allows access from any network
    port: 5173, // Ensures the correct port is used
    strictPort: true,
    allowedHosts: ['.ngrok-free.app'], // Allows all ngrok URLs
  },
})
