const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');

describe('Cart', () => {

    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/inventory.html'),
            { timeout: 10000 }
        );
    });

    it('TC-5: should persist cart after logout and login again', async () => {
        const addedProduct = await InventoryPage.addFirstProductToCart();
        expect(await InventoryPage.getCartCount()).toBe(1);

        // Открываем меню и ждём анимацию
        await InventoryPage.burgerMenu.click();
        await browser.pause(1000);
        await InventoryPage.logoutLink.waitForClickable({ timeout: 5000 });
        await InventoryPage.logoutLink.click();

        await browser.waitUntil(
            async () => !(await browser.getUrl()).includes('/inventory.html'),
            { timeout: 5000 }
        );

        await LoginPage.login('standard_user', 'secret_sauce');
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/inventory.html'),
            { timeout: 10000 }
        );

        await InventoryPage.cartButton.click();
        await expect(browser).toHaveUrlContaining('/cart.html');
        const cartItemNames = await CartPage.getItemNames();
        expect(cartItemNames).toContain(addedProduct);
    });
});