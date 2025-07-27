import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'Google Chrome',
      use: { channel: 'chrome' }, // Uses system Chrome
    },
  ],
});