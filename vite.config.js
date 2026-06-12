import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' supaya hasil build bisa dibuka dari subfolder (mis. GitHub Pages)
export default defineConfig({
  plugins: [react()],
  base: './',
})
