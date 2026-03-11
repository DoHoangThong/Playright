import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Recording...
});

import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator

// Zone 2 khai báo biến (properties)
  
  constructor(page: Page) {
    this.page = page
    this.usernameInput = page.locator('[data-test="username"]')
    this.passwordInput = page.locator('[data-test="password"]')
    this.loginButton = page.locator('[data-test="login-button"]')
  }}

// Zone 3: khởi tạo giá trị (constructor) và các hàm (methods)

async function login(page: Page, username: string, password: string) {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
}

// Zone 4: viết test case sử dụng hàm đã tạo
