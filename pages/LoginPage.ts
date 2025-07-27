import { Page } from '@playwright/test';
import * as fs from 'fs/promises';

export class LoginPage {
  constructor(private page: Page) {}

  async login() {
    const data = JSON.parse(await fs.readFile('test-data.json', 'utf-8'));
    const username = data.username;

    await this.page.goto('https://parabank.parasoft.com/parabank/index.htm');

    await this.page.waitForSelector('input[name="username"]', { timeout: 15000 });
    await this.page.fill('input[name="username"]', username);
    await this.page.fill('input[name="password"]', 'Testpassword');
    await this.page.click('input[value="Log In"]');

    await this.page.waitForSelector('text=Welcome', { timeout: 15000 });
  }
}