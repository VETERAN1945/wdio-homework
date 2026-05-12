const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutPage = require('../pageobjects/checkout.page');

describe('Checkout', () => {

    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/inventory.html'),
            { timeout: 10000 }
        );
    });

    it('TC-8: should complete checkout with valid data', async () => {
        const addedProduct = await InventoryPage.addFirstProductToCart();
        expect(await InventoryPage.getCartCount()).toBe(1);

        await InventoryPage.cartButton.click();
        await expect(browser).toHaveUrlContaining('/cart.html');

        const cartItems = await CartPage.getItemNames();
        expect(cartItems).toContain(addedProduct);

        await CartPage.clickCheckout();
        await expect(browser).toHaveUrlContaining('/checkout-step-one.html');

        await CheckoutPage.fillForm('John', 'Doe', '12345');
        await CheckoutPage.clickContinue();
        await expect(browser).toHaveUrlContaining('/checkout-step-two.html');

        const overviewItems = await $$('.inventory_item_name');
        const itemNames = [];
        for (const el of overviewItems) {
            itemNames.push(await el.getText());
        }
        expect(itemNames).toContain(addedProduct);

        await CheckoutPage.clickFinish();
        await expect(browser).toHaveUrlContaining('/checkout-complete.html');
        const header = await CheckoutPage.getCompleteHeaderText();
        expect(header).toContain('Thank you for your order');

        await CheckoutPage.clickBackHome();
        await expect(browser).toHaveUrlContaining('/inventory.html');
        expect(await InventoryPage.getCartCount()).toBe(0);
    });

    it('TC-9: should show error when trying to checkout without products', async () => {
        await InventoryPage.cartButton.click();
        await expect(browser).toHaveUrlContaining('/cart.html');
        expect(await CartPage.isEmpty()).toBe(true);
        await CartPage.clickCheckout();
        await expect(browser).toHaveUrlContaining('/checkout');
    });
});