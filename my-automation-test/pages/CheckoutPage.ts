import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly checkoutButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly zipCodeInput: Locator;
  readonly continueButton: Locator;
  readonly overviewItemName: Locator;
  readonly overviewItemPrice: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    super(page);
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
    await this.clickOn(this.checkoutButton);
  }

  async fillInformation(firstName: string, lastName: string, zipCode: string) {
    await this.typeTo(this.firstNameInput, firstName);
    await this.typeTo(this.lastNameInput, lastName);
    await this.typeTo(this.zipCodeInput, zipCode);
    await this.clickOn(this.continueButton);
  }

  async getOverviewItemName(): Promise<string> {
    return await this.getTextOf(this.overviewItemName);
  }

  async getOverviewItemPrice(): Promise<string> {
    return await this.getTextOf(this.overviewItemPrice);
  }

  async clickFinish() {
    await this.clickOn(this.finishButton);
  }
}