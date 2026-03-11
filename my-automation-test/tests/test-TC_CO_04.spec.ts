import { test, expect } from '@playwright/test';

test('TC_CO_04: Verify error message when First Name is empty', async ({ page }) => {
  
  await test.step('Step 1: Navigate to SauceDemo and Login', async () => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
  });

  await test.step('Step 2: Add product to cart and navigate to Checkout', async () => {
    // Tối ưu locator đồng nhất
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await page.locator('a.shopping_cart_link').click();
    await page.getByRole('button', { name: 'Checkout' }).click();
  });

  await test.step('Step 3: Fill Checkout information leaving First Name empty', async () => {
    await page.getByPlaceholder('Last Name').fill('Doe');
    await page.getByPlaceholder('Zip/Postal Code').fill('12345');
    await page.getByRole('button', { name: 'Continue' }).click();
  });

  await test.step('Step 4: Verify error message and current page', async () => {
    // Sử dụng locator rõ ràng cho lỗi
    const errorBanner = page.locator('[data-test="error"]');
    await expect(errorBanner).toBeVisible();
    await expect(errorBanner).toHaveText(/First Name is required/);
    
    await expect(page.getByText('Checkout: Your Information')).toBeVisible();
  });

  await test.step('Step 5: Close the browser', async () => {
    await page.close();
  });
});