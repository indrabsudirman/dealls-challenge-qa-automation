import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  testDir: './tests/specs',
  timeout: 30 * 1000,
  retries: 1,
  outputDir: 'test-results',
  use: {
    headless: false,
    baseURL: process.env.BASE_URL || 'https://job-portal-user-dev-skx7zw44dq-et.a.run.app/mentoring',
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'on',
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  reporter: [['list'], ['allure-playwright']],
})
