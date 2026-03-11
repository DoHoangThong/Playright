// import { test, expect } from '@playwright/test';

// test('Kiểm tra quy trình thanh toán bằng getByRole và getByText', async ({ page }) => {
//   await page.goto('https://www.saucedemo.com/');

//   // --- ĐĂNG NHẬP ---
//   // Sử dụng getByPlaceholder để xác định ô nhập liệu qua văn bản gợi ý
//   await page.getByPlaceholder('Username').fill('standard_user');
//   await page.getByPlaceholder('Password').fill('secret_sauce');
//   await page.getByRole('button', { name: 'Login' }).click();

//   // --- GHI NHỚ THÔNG TIN SẢN PHẨM 1 (Sauce Labs Backpack) ---
//   const nameProd1 = await page.getByText('Sauce Labs Backpack').innerText();
//   // Tìm thẻ chứa sản phẩm Backpack, sau đó tìm giá tiền bên trong đó
//   const priceProd1 = await page.locator('.inventory_item')
//     .filter({ hasText: 'Sauce Labs Backpack' })
//     .locator('.inventory_item_price').innerText();

//   // --- GHI NHỚ THÔNG TIN SẢN PHẨM 2 (Sauce Labs Bike Light) ---
//   const nameProd2 = await page.getByText('Sauce Labs Bike Light').innerText();
//   const priceProd2 = await page.locator('.inventory_item')
//     .filter({ hasText: 'Sauce Labs Bike Light' })
//     .locator('.inventory_item_price').innerText();

//   // --- THÊM VÀO GIỎ HÀNG ---
//   await page.getByRole('button', { name: 'Add to cart' }).first().click(); // Backpack thường ở đầu
//   await page.getByRole('button', { name: 'Add to cart' }).first().click(); // Sau khi cái đầu mất, cái tiếp theo thành first

//   // --- ĐI ĐẾN GIỎ HÀNG & CHECKOUT ---
//   await page.locator('a.shopping_cart_link').click(); // Icon giỏ hàng thường dùng locator class hoặc Role link
//   await page.getByRole('button', { name: 'Checkout' }).click();

//   // --- ĐIỀN THÔNG TIN ---
//   await page.getByPlaceholder('First Name').fill('Mike');
//   await page.getByPlaceholder('Last Name').fill('Brown');
//   await page.getByPlaceholder('Zip/Postal Code').fill('67890');
//   await page.getByRole('button', { name: 'Continue' }).click();

//   // --- SO SÁNH THÔNG TIN TẠI TRANG OVERVIEW ---

//   // Kiểm tra sản phẩm 1
//   const checkoutName1 = await page.getByText('Sauce Labs Backpack').innerText();
//   const checkoutPrice1 = await page.locator('.cart_item')
//     .filter({ hasText: 'Sauce Labs Backpack' })
//     .locator('.inventory_item_price').innerText();

//   expect(checkoutName1).toBe(nameProd1);
//   expect(checkoutPrice1).toBe(priceProd1);

//   // Kiểm tra sản phẩm 2
//   const checkoutName2 = await page.getByText('Sauce Labs Bike Light').innerText();
//   const checkoutPrice2 = await page.locator('.cart_item')
//     .filter({ hasText: 'Sauce Labs Bike Light' })
//     .locator('.inventory_item_price').innerText();

//   expect(checkoutName2).toBe(nameProd2);
//   expect(checkoutPrice2).toBe(priceProd2);
// });

import { test, expect } from '@playwright/test';

test.describe('SauceDemo Purchase Flow', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill('error_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
  });

  test('Verify product info matches between Cart and Overview', async ({ page }) => {
    const product1Name = 'Sauce Labs Backpack';
    const product2Name = 'Sauce Labs Bike Light';

    const p1Container = page.locator('.inventory_item').filter({ hasText: product1Name });
    const p2Container = page.locator('.inventory_item').filter({ hasText: product2Name });

    const p1Price = await p1Container.locator('.inventory_item_price').innerText();
    const p2Price = await p2Container.locator('.inventory_item_price').innerText();

    await test.step('Step 1: Add products and go to checkout', async () => {
      await p1Container.getByRole('button', { name: 'Add to cart' }).click();
      await p2Container.getByRole('button', { name: 'Add to cart' }).click();
      await page.locator('.shopping_cart_link').click();
      await page.getByRole('button', { name: 'Checkout' }).click();
    });

    await test.step('Step 2: Fill info and proceed', async () => {
      await page.getByPlaceholder('First Name').fill('Mike');
      await page.getByPlaceholder('Last Name').fill('Brown');
      await page.getByPlaceholder('Zip/Postal Code').fill('67890');
      await page.getByRole('button', { name: 'Continue' }).click();
    });

    await test.step('Step 3: Validate Overview info', async () => {
      await expect(page).toHaveURL(/.*checkout-step-two.html/);
      
      const checkItem1 = page.locator('.cart_item').filter({ hasText: product1Name });
      await expect(checkItem1.locator('.inventory_item_price')).toHaveText(p1Price);

      const checkItem2 = page.locator('.cart_item').filter({ hasText: product2Name });
      await expect(checkItem2.locator('.inventory_item_price')).toHaveText(p2Price);

      await expect(page.locator('.cart_quantity')).toHaveCount(2);
    });
  });

  test('Verify button toggle state (Add/Remove)', async ({ page }) => {
    const backpack = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' });
    
    await test.step('Action: Add to cart', async () => {
      await backpack.getByRole('button', { name: 'Add to cart' }).click();
      await expect(backpack.getByRole('button', { name: 'Remove' })).toBeVisible();
    });

    await test.step('Action: Remove from cart', async () => {
      await backpack.getByRole('button', { name: 'Remove' }).click();
      await expect(backpack.getByRole('button', { name: 'Add to cart' })).toBeVisible();
    });
  });

  test('Verify checkout input fields validation', async ({ page }) => {
    await test.step('Action: Navigate to checkout info', async () => {
      await page.getByRole('button', { name: 'Add to cart' }).first().click();
      await page.locator('.shopping_cart_link').click();
      await page.getByRole('button', { name: 'Checkout' }).click();
    });

    await test.step('Action: Fill and verify inputs', async () => {
      const data = { fName: 'Mike', lName: 'Brown', zip: '12345' };
      
      await page.getByPlaceholder('First Name').fill(data.fName);
      await page.getByPlaceholder('Last Name').fill(data.lName);
      await page.getByPlaceholder('Zip/Postal Code').fill(data.zip);

      await expect(page.getByPlaceholder('First Name')).toHaveValue(data.fName);
      await expect(page.getByPlaceholder('Last Name')).toHaveValue(data.lName);
      await expect(page.getByPlaceholder('Zip/Postal Code')).toHaveValue(data.zip);
    });
  });
});