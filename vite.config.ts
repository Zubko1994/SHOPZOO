import { defineConfig } from 'vite'
// import path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': './src',
  }},
  plugins: [vue()],
})
