import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'



export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    'process.env': {}, // Or any specific environment variables you need
    process: {
      env: {}
    }
  },
  base: './'
})
