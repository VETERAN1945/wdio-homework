const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const { credentials, urls } = require('../fixtures/testData');

describe('Cart', () => {

    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login(credentials.validUser.username, credentials.validUser.password);
        await InventoryPage.firstProduct.waitForDisplayed();
    });

    it('TC-5: should persist cart after logout and login again', async () => {
        const addedProduct = await InventoryPage.addFirstProductToCart();
        expect(await InventoryPage.getCartCount()).toBe(1);

        await InventoryPage.burgerMenu.click();
        await InventoryPage.logoutLink.waitForClickable();
        await InventoryPage.logoutLink.click();
        await LoginPage.loginButton.waitForDisplayed();

        await LoginPage.login(credentials.validUser.username, credentials.validUser.password);
        await InventoryPage.firstProduct.waitForDisplayed();

        await InventoryPage.cartButton.click();
        await expect(browser).toHaveUrlContaining(urls.cart);
        const cartItemNames = await CartPage.getItemNames();
        expect(cartItemNames).toContain(addedProduct);
    });
});