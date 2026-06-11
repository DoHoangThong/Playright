import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Hàm dùng chung để mở một URL bất kỳ
  async openUrl(url: string) {
    await this.page.goto(url);
  }

  // Hàm điền chữ vào ô input (Đã bọc sẵn logic an toàn)
  async typeTo(locator: Locator, text: string) {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(text);
  }

  // Hàm click vào một phần tử
  async clickOn(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  // Hàm lấy text từ element bất kỳ
  async getTextOf(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    return await locator.innerText();
  }
}