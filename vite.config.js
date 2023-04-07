import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:5230',
  //       changeOrigin: true,
  //       headers: {
  //         origin: 'http://localhost:5173',
  //       },
  //     },
  //   },
  // },
  plugins: [react()],
})
