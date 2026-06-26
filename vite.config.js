import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? '/GenX-Ai/' : '/',
  build: {
    chunkSizeWarningLimit: 200,
    rolldownOptions: {
      output: {
        codeSplitting: {
          strategy: 'manual',
          chunks: {
            'react-vendor':    ['react', 'react-dom'],
            'ai-vendor':       ['@google/genai'],
            'markdown-vendor': ['marked', 'marked-highlight'],
            'highlight-vendor':['highlight.js'],
          }
        }
      }
    }
  }
})