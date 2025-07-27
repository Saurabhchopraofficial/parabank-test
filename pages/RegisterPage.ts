import { Page } from '@playwright/test';
import * as fs from 'fs/promises';

export class RegisterPage {
  constructor(private page: Page) {}

  /**
   * Registers a new user with random username
   */
  async registerUser() {
    // Generate a unique username
    const username = 'user' + Math.floor(Math.random() * 100000);

    // Navigate to registration page
    await this.page.goto('https://parabank.parasoft.com/');

    // Fill registration form
    await this.page.getByRole('link', { name : 'Register'}).click();
    await this.page.fill('input[id="customer.firstName"]', 'Test');
    await this.page.fill('input[id="customer.lastName"]', 'User');
    await this.page.fill('input[id="customer.address.street"]', '123 Test St');
    await this.page.fill('input[id="customer.address.city"]', 'Melbourne');
    await this.page.fill('input[id="customer.address.state"]', 'VIC');
    await this.page.fill('input[id="customer.address.zipCode"]', '3000');
    await this.page.fill('input[id="customer.phoneNumber"]', '123456789');
    await this.page.fill('input[id="customer.ssn"]', '111-22-3333');
    await this.page.fill('input[id="customer.username"]', username);
    await this.page.fill('input[id="customer.password"]', 'Testpassword');
    await this.page.fill('input[id="repeatedPassword"]', 'Testpassword');

    // Submit form
    await this.page.click('input[value="Register"]');

    // Save username for login script
    await fs.writeFile(
      'test-data.json',
      JSON.stringify({ username }, null, 2)
    );

    console.log(' Registered User:', username);
  }
}
