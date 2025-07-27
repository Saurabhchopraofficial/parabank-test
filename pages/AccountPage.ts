import { Page, expect } from '@playwright/test';
import fs from 'fs';

export class AccountPage {
  constructor(private page: Page) {}

  async openAccount() {
    await this.page.getByRole('link', { name: 'Open New Account' }).click();

    // Select option by label "SAVINGS"
    await this.page.waitForSelector('select#type', { timeout: 15000 });
    await this.page.selectOption('select#type', { label: 'SAVINGS' });

    // Select the "From Account"
    const fromAccount = this.page.locator('select#fromAccountId');
    await fromAccount.waitFor({ state: 'visible', timeout: 10000 });
    await fromAccount.selectOption({ index: 0 });

    await this.page.getByRole('button', { name: 'Open New Account' }).click();

    // Wait until account number appears
    await this.page.waitForSelector('#newAccountId', { timeout: 10000 });
    const accountNumber = await this.page.textContent('#newAccountId');

    fs.writeFileSync(
      'data/test-data.json',
      JSON.stringify({ accountNumber: accountNumber }, null, 2)
    );

    if (!accountNumber) throw new Error('Account number not found!');

    console.log('New Account Number:', accountNumber);
  }

  async verifyAccountBalance() {
    await this.page.getByRole('link', { name: 'Accounts Overview' }).click();
    const totalBalance = await this.page
      .locator('#accountTable tbody tr')
      .last()
      .locator('td')
      .nth(1)
      .textContent();
    console.log('Total balance:', totalBalance?.trim());
  }

  async transferFunds() {
    await this.page.getByRole('link', { name: 'Transfer Funds' }).click();

    await this.page.locator('input#amount').fill('100');
    await this.page.locator('select#fromAccountId').selectOption({ index: 0 });
    await this.page.locator('select#toAccountId').selectOption({ index: 1 });

    // Click Transfer button
    await this.page.getByRole('button', { name: 'Transfer' }).click();

    // API validation after transfer
    const fromAccountId = await this.page
      .locator('select#fromAccountId')
      .inputValue();
    const toAccountId = await this.page
      .locator('select#toAccountId')
      .inputValue();
    const amount = 100;

    const apiUrl = `https://parabank.parasoft.com/parabank/services_proxy/bank/transfer?fromAccountId=${fromAccountId}&toAccountId=${toAccountId}&amount=${amount}`;
    const response = await this.page.request.post(apiUrl);
    const text = await response.text();

    if (!text.includes(`Successfully transferred $${amount}`)) {
      throw new Error(`API validation failed. Response: ${text}`);
    }

    console.log('API Transfer validated:', text);

    // UI assertion after API validation
    await expect(
      this.page.getByText('Transfer Complete!')
    ).toBeVisible({ timeout: 5000 });
  }

  async payBill() {
    await this.page.getByRole('link', { name: 'Bill Pay' }).click();
    await this.page.locator('input[name="payee.name"]').fill('John Doe');
    await this.page
      .locator('input[name="payee.address.street"]')
      .fill('123 Smart Ave Brunswick');
    await this.page.locator('input[name="payee.address.city"]').fill('Sydney');
    await this.page.locator('input[name="payee.address.state"]').fill('NSW');
    await this.page.locator('input[name="payee.address.zipCode"]').fill('2006');
    await this.page.locator('input[name="payee.address.city"]').fill('Sydney');
    await this.page.locator('input[name="payee.phoneNumber"]').fill('Sydney');
    await this.page
      .locator('input[name="payee.accountNumber"]')
      .fill('10240945');
    await this.page.locator('input[name="verifyAccount"]').fill('10240945');
    await this.page.locator('input[name="amount"]').fill('20');
    await this.page.getByRole('button', { name: 'Send Payment' }).click();
  }
}
