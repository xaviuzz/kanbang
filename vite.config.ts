/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDefaults } from 'vitest/config'

export default defineConfig({
  base:'/kanbang/',
  plugins: [react()],
  server: {
    port: 4000,
    host: '0.0.0.0',
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./setupTest.ts'],
    exclude:[
      ...configDefaults.exclude,
      'e2e/test/*']
  },
})
