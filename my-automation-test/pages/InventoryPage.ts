import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly backpackAddToCartButton: Locator;
  readonly firstItemName: Locator;
  readonly firstItemPrice: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backpackAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.firstItemName = page.locator('[data-test="inventory-item-name"]').first();
    this.firstItemPrice = page.locator('[data-test="inventory-item-price"]').first();
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async addBackpackToCart() {
    await this.backpackAddToCartButton.click();
  }

  async getFirstItemName(): Promise<string> {
    return await this.firstItemName.innerText();
  }

  async getFirstItemPrice(): Promise<string> {
    return await this.firstItemPrice.innerText();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}