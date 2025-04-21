import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({
    include: /\.(js|jsx)$/, 
    babel: {
      plugins: [
        ['@babel/plugin-transform-react-jsx', {
          runtime: 'automatic' 
        }]
      ]
    }
  })],
  esbuild: {
    loader: 'jsx',
  },
  json: {
    stringify: false 
  },
  resolve: {
    alias: {
      crypto: 'crypto-browserify'
    }
  }
})