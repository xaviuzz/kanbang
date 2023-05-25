import { defineConfig } from '@playwright/test'
export default defineConfig({
  fullyParallel: true,
  workers: '50%',
  use: {
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
})