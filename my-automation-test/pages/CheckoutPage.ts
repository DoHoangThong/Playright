import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly zipCodeInput: Locator;
  readonly continueButton: Locator;
  readonly overviewItemName: Locator;
  readonly overviewItemPrice: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.zipCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.overviewItemName = page.locator('[data-test="inventory-item-name"]');
    this.overviewItemPrice = page.locator('[data-test="inventory-item-price"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }

  async fillInformation(firstName: string, lastName: string, zipCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipCodeInput.fill(zipCode);
    await this.continueButton.click();
  }

  async getOverviewItemName(): Promise<string> {
    return await this.overviewItemName.innerText();
  }

  async getOverviewItemPrice(): Promise<string> {
    return await this.overviewItemPrice.innerText();
  }

  async clickFinish() {
    await this.finishButton.click();
  }
}