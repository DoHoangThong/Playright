import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('C_CO_04: Kiểm tra tính đồng nhất của tên và giá sản phẩm', async ({ page }) => {
  // Khởi tạo các Page Object
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Đăng nhập
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');

  // Chọn sản phẩm Backpack
  await inventoryPage.addBackpackToCart();
  
  // --- BƯỚC 1: LẤY THÔNG TIN GỐC ---
  const expectedName = await inventoryPage.getFirstItemName();
  const expectedPrice = await inventoryPage.getFirstItemPrice();
  console.log(`Thông tin gốc: ${expectedName} - ${expectedPrice}`);

  // Đi đến giỏ hàng và Checkout
  await inventoryPage.goToCart();
  await checkoutPage.clickCheckout();
  
  // Điền thông tin khách hàng
  await checkoutPage.fillInformation('Mike', 'Brown', '67890');

  // --- BƯỚC 2: SO SÁNH DỮ LIỆU TẠI TRANG TỔNG QUAN (OVERVIEW) ---
  const actualName = await checkoutPage.getOverviewItemName();
  const actualPrice = await checkoutPage.getOverviewItemPrice();
  console.log(`Thông tin thực tế tại Checkout: ${actualName} - ${actualPrice}`);

  // Thực hiện so sánh (Assertion)
  expect(actualName).toBe(expectedName);
  expect(actualPrice).toBe(expectedPrice);
  
  // Hoàn tất đơn hàng
  await checkoutPage.clickFinish();
});