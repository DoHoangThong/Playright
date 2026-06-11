import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly backpackAddToCartButton: Locator;
  readonly firstItemName: Locator;
  readonly firstItemPrice: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.backpackAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.firstItemName = page.locator('[data-test="inventory-item-name"]').first();
    this.firstItemPrice = page.locator('[data-test="inventory-item-price"]').first();
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async addBackpackToCart() {
    await this.clickOn(this.backpackAddToCartButton);
  }

  async getFirstItemName(): Promise<string> {
    return await this.getTextOf(this.firstItemName);
  }

  async getFirstItemPrice(): Promise<string> {
    return await this.getTextOf(this.firstItemPrice);
  }

  async goToCart() {
    await this.clickOn(this.cartLink);
  }
}