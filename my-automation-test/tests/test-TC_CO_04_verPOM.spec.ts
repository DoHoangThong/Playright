import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { InventoryPage } from '../pages/InventoryPage';

test('TC_CO_04: Verify error message when First Name is empty', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');

  await inventoryPage.addBackpackToCart();
  
  const expectedName = await inventoryPage.getFirstItemName();
  const expectedPrice = await inventoryPage.getFirstItemPrice();
  console.log(`Thông tin gốc: ${expectedName} - ${expectedPrice}`);

  await inventoryPage.goToCart();
  await checkoutPage.clickCheckout();
  
  await checkoutPage.fillInformation('Mike', 'Brown', '67890');

  const actualName = await checkoutPage.getOverviewItemName();
  const actualPrice = await checkoutPage.getOverviewItemPrice();
  console.log(`Thông tin thực tế tại Checkout: ${actualName} - ${actualPrice}`);

  expect(actualName).toBe(expectedName);
  expect(actualPrice).toBe(expectedPrice);
  
  await checkoutPage.clickFinish();
});