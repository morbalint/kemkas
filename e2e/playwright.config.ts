import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';

const port = Number(process.env.E2E_PORT ?? 4173);
const baseURL = process.env.E2E_BASE_URL ?? `http://127.0.0.1:${port}`;
const useWebServer = process.env.E2E_USE_WEBSERVER !== 'false';

export default defineConfig({
  testDir: path.join(__dirname, 'tests'),
  outputDir: path.join(__dirname, 'test-results'),
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 30_000,
  reporter: [
    ['list'],
    ['html', { outputFolder: path.join(__dirname, 'playwright-report'), open: 'never' }],
  ],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  ...(useWebServer
    ? {
        webServer: {
          command: `node ./node_modules/vite/bin/vite.js --host 127.0.0.1 --port ${port}`,
          cwd: path.resolve(__dirname, '../frontend'),
          port,
          timeout: 120_000,
          reuseExistingServer: !process.env.CI,
        },
      }
    : {}),
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
