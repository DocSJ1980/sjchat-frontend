import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  darkMode: 'class',
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://sjchat-backend.vercel.app',
  //       changeOrigin: true,
  //       headers: {
  //         origin: 'http://localhost:5173',
  //       },
  //     },
  //   },
  // },
  plugins: [react()],
})
