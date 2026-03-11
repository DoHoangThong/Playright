import { test, expect } from '@playwright/test';

test('C_CO_04: Kiểm tra tính đồng nhất của tên và giá sản phẩm', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  
  // Đăng nhập
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Chọn sản phẩm Backpack
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  
  // --- BƯỚC 1: LẤY THÔNG TIN GỐC ---
  // Chúng ta dùng .innerText() để lấy chữ hiển thị trên màn hình
  const expectedName = await page.locator('[data-test="inventory-item-name"]').first().innerText();
  const expectedPrice = await page.locator('[data-test="inventory-item-price"]').first().innerText();
  
  console.log(`Thông tin gốc: ${expectedName} - ${expectedPrice}`);

  // Đi đến giỏ hàng và Checkout
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  
  // Điền thông tin khách hàng
  await page.locator('[data-test="firstName"]').fill('Mike');
  await page.locator('[data-test="lastName"]').fill('Brown');
  await page.locator('[data-test="postalCode"]').fill('67890');
  await page.locator('[data-test="continue"]').click();

  // --- BƯỚC 2: SO SÁNH DỮ LIỆU TẠI TRANG TỔNG QUAN (OVERVIEW) ---
  // Lấy thông tin thực tế tại trang cuối cùng
  const actualName = await page.locator('[data-test="inventory-item-name"]').innerText();
  const actualPrice = await page.locator('[data-test="inventory-item-price"]').innerText();

  console.log(`Thông tin thực tế tại Checkout: ${actualName} - ${actualPrice}`);

  // Sử dụng hàm expect để kiểm tra
  // Nếu không khớp, Playwright sẽ đánh dấu test FAIL và báo lỗi rõ ràng
  expect(actualName).toBe(expectedName);
  expect(actualPrice).toBe(expectedPrice);
  
  // Hoàn tất đơn hàng (Tùy chọn)
  await page.locator('[data-test="finish"]').click();
});

// import { test, expect } from '@playwright/test';

// test('Xác minh thông tin giỏ hàng được giữ nguyên từ Cart đến Overview', async ({ page }) => {
//     // 1. Đăng nhập với user standard_user
//     await page.goto('https://www.saucedemo.com/');
//     await page.locator('[data-test="username"]').fill('standard_user');
//     await page.locator('[data-test="password"]').fill('secret_sauce');
//     await page.locator('[data-test="login-button"]').click();

//     // 2. Thêm 2 sản phẩm cụ thể (Ví dụ: Backpack và Bike Light)
//     const product1Name = 'Sauce Labs Backpack';
//     const product2Name = 'Sauce Labs Bike Light';
    
//     await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
//     await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

//     // Bước 1 trong quy trình: Ghi nhớ thông tin giỏ hàng (tên và giá)
//     // Chúng ta sẽ lấy dữ liệu trực tiếp từ các phần tử để so sánh sau này
//     const cartItemsBefore = [
//         { name: product1Name, price: await page.locator('.inventory_item:has-text("' + product1Name + '") .inventory_item_price').innerText() },
//         { name: product2Name, price: await page.locator('.inventory_item:has-text("' + product2Name + '") .inventory_item_price').innerText() }
//     ];

//     // 2. Click icon giỏ hàng
//     await page.locator('.shopping_cart_link').click();
//     await expect(page).toHaveURL(/.*cart.html/);

//     // 3. Click CHECKOUT
//     await page.locator('[data-test="checkout"]').click();

//     // 4. Nhập thông tin giao hàng
//     await page.locator('[data-test="firstName"]').fill('Mike');
//     await page.locator('[data-test="lastName"]').fill('Brown');
//     await page.locator('[data-test="postalCode"]').fill('67890');

//     // 5. Click CONTINUE
//     await page.locator('[data-test="continue"]').click();
//     await expect(page).toHaveURL(/.*checkout-step-two.html/);

//     // 6. So sánh thông tin trên trang Overview với giỏ hàng ban đầu
//     for (const item of cartItemsBefore) {
//         // Kiểm tra tên sản phẩm hiển thị trên trang Overview
//         const nameSelector = page.locator('.inventory_item_name', { hasText: item.name });
//         await expect(nameSelector).toBeVisible();

//         // Kiểm tra giá sản phẩm hiển thị trên trang Overview khớp với giá ban đầu
//         const priceSelector = page.locator('.cart_item', { has: nameSelector }).locator('.inventory_item_price');
//         await expect(priceSelector).toHaveText(item.price);
//     }

//     // Kiểm tra số lượng sản phẩm (Quantity) mặc định là 1 cho mỗi món
//     const itemsCount = await page.locator('.cart_quantity').count();
//     expect(itemsCount).toBe(2);
// });

// sử dụng page.getByRRole, page.getByText không dùng page.locator để tối ưu locator đồng nhất và rõ ràng hơn.

// import { test, expect } from '@playwright/test';

// test('Xác minh thông tin giỏ hàng được giữ nguyên từ Cart đến Overview', async ({ page }) => {
//     // 1. Đăng nhập
//     await page.goto('https://www.saucedemo.com/');
    
//     await page.getByPlaceholder('Username').fill('standard_user');
//     await page.getByPlaceholder('Password').fill('secret_sauce');
//     await page.getByRole('button', { name: 'Login' }).click();

//     // 2. Thêm 2 sản phẩm cụ thể
//     const product1Name = 'Sauce Labs Backpack';
//     const product2Name = 'Sauce Labs Bike Light';

//     // Tìm container chứa sản phẩm dựa trên tên, sau đó nhấn nút Add to cart bên trong đó
//     const product1Container = page.locator('.inventory_item').filter({ hasText: product1Name });
//     const product2Container = page.locator('.inventory_item').filter({ hasText: product2Name });

//     await product1Container.getByRole('button', { name: 'Add to cart' }).click();
//     await product2Container.getByRole('button', { name: 'Add to cart' }).click();

//     // Lưu lại giá sản phẩm để đối chiếu
//     const cartItemsBefore = [
//         { 
//             name: product1Name, 
//             price: await product1Container.locator('.inventory_item_price').innerText() 
//         },
//         { 
//             name: product2Name, 
//             price: await product2Container.locator('.inventory_item_price').innerText() 
//         }
//     ];

//     // 3. Click icon giỏ hàng
//     await page.locator('.shopping_cart_link').click(); 
//     await expect(page).toHaveURL(/.*cart.html/);

//     // 4. Click CHECKOUT
//     await page.getByRole('button', { name: 'Checkout' }).click();

//     // 5. Nhập thông tin giao hàng
//     await page.getByPlaceholder('First Name').fill('Mike');
//     await page.getByPlaceholder('Last Name').fill('Brown');
//     await page.getByPlaceholder('Zip/Postal Code').fill('67890');

//     // 6. Click CONTINUE
//     await page.getByRole('button', { name: 'Continue' }).click();
//     await expect(page).toHaveURL(/.*checkout-step-two.html/);

//     // 7. So sánh thông tin trên trang Overview
//     for (const item of cartItemsBefore) {
//         // Tìm item container dựa trên tên sản phẩm
//         const checkoutItem = page.locator('.cart_item').filter({ hasText: item.name });
        
//         // Kiểm tra tên hiển thị
//         await expect(checkoutItem.getByText(item.name)).toBeVisible();

//         // Kiểm tra giá khớp với lúc đầu
//         await expect(checkoutItem.locator('.inventory_item_price')).toHaveText(item.price);
//     }

//     // Kiểm tra số lượng sản phẩm
//     const quantityLabels = page.locator('.cart_quantity');
//     await expect(quantityLabels).toHaveCount(2);
// });