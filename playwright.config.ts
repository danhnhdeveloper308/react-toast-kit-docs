import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: process.env.CI ? 2 : 1,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['html', { open: 'never' }], ['github']] : 'list',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    ...(process.env.PLAYWRIGHT_CHROME_PATH
      ? { launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROME_PATH } }
      : {}),
  },
  webServer: {
    command: 'pnpm dev',
    url: 'http://127.0.0.1:3000',
    // Visual baselines must never be captured from an unrelated stale dev server.
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
