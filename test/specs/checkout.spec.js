const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const CartPage = require('../pageobjects/cart.page');
const CheckoutPage = require('../pageobjects/checkout.page');
const { credentials, checkoutData, urls, errorMessages } = require('../fixtures/testData');

describe('Checkout', () => {

    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login(credentials.validUser.username, credentials.validUser.password);
        await InventoryPage.firstProduct.waitForDisplayed();
    });

    it('TC-8: should complete checkout with valid data', async () => {
        const addedProduct = await InventoryPage.addFirstProductToCart();
        expect(await InventoryPage.getCartCount()).toBe(1);

        await InventoryPage.cartButton.click();
        await expect(browser).toHaveUrlContaining(urls.cart);

        const cartItems = await CartPage.getItemNames();
        expect(cartItems).toContain(addedProduct);

        await CartPage.clickCheckout();
        await expect(browser).toHaveUrlContaining(urls.checkoutStepOne);

        await CheckoutPage.fillForm(
            checkoutData.firstName,
            checkoutData.lastName,
            checkoutData.postalCode
        );
        await CheckoutPage.clickContinue();
        await expect(browser).toHaveUrlContaining(urls.checkoutStepTwo);

        const itemNames = await CheckoutPage.getOverviewItemNames();
        expect(itemNames).toContain(addedProduct);

        await CheckoutPage.clickFinish();
        await expect(browser).toHaveUrlContaining(urls.checkoutComplete);
        const header = await CheckoutPage.getCompleteHeaderText();
        expect(header).toContain(errorMessages.completeHeader);

        await CheckoutPage.clickBackHome();
        await expect(browser).toHaveUrlContaining(urls.inventory);
        expect(await InventoryPage.getCartCount()).toBe(0);
    });

    it('TC-9: should show error when trying to checkout without products', async () => {
        await InventoryPage.cartButton.click();
        await expect(browser).toHaveUrlContaining(urls.cart);
        expect(await CartPage.isEmpty()).toBe(true);
        await CartPage.clickCheckout();
        await expect(browser).toHaveUrlContaining(urls.checkoutStepOne);
    });
});