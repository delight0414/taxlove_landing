import { defineConfig } from 'vite'
import * as path from 'path'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from "url"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') + '/',
      '@/': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  base: '/taxlove/',

  server: {
    port: 5500
  },

  css: { preprocessorOptions: { scss: { charset: false } } },
})
