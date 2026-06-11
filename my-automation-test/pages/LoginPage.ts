import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page); // Gọi constructor của BasePage
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  async navigate() {
    await this.openUrl('https://www.saucedemo.com/'); // Dùng hàm của BasePage
  }

  async login(username: string, pass: string) {
    await this.typeTo(this.usernameInput, username);  // Dùng hàm của BasePage
    await this.typeTo(this.passwordInput, pass);      // Dùng hàm của BasePage
    await this.clickOn(this.loginButton);             // Dùng hàm của BasePage
  }
}