import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { AccountPage } from '../pages/AccountPage';

test('Full user flow: Register → Login → Open Account', async ({ page }) => {
  test.setTimeout(60000); // increase timeout

  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);

  // Register a new user
  await registerPage.registerUser();

  // Validate registration success
  await expect(page.getByText('Your account was created successfully')).toBeVisible({ timeout: 10000 });

  // Logout after registration
  await page.getByRole('link', { name: 'Log Out' }).click();
  await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();

  // Login with the registered user
  await loginPage.login();
  await expect(page.getByText('Welcome')).toBeVisible();

  // Open a new account
  await accountPage.openAccount();
  await expect(page.locator('#newAccountId')).toBeVisible();

  // Verify account balance
  await accountPage.verifyAccountBalance();
  await expect(page.getByRole('link', { name: 'Accounts Overview' })).toBeVisible();

  // Transfer funds
  await accountPage.transferFunds();
  await expect(page.getByText('Transfer Complete!')).toBeVisible();

  // Pay a bill
  await accountPage.payBill();
  await expect(page.getByRole('heading', { name: 'Bill Payment Complete' })).toBeVisible();
});