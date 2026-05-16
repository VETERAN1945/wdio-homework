const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const { credentials } = require('../fixtures/testData');

describe('Logout', () => {

    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login(credentials.validUser.username, credentials.validUser.password);
        await InventoryPage.firstProduct.waitForDisplayed();
    });

    it('TC-4: should logout from the account via burger menu', async () => {
        await InventoryPage.burgerMenu.click();
        await InventoryPage.logoutLink.waitForClickable();
        await InventoryPage.logoutLink.click();
        await LoginPage.loginButton.waitForDisplayed();
        await expect(LoginPage.usernameInput).toHaveValue('');
        await expect(LoginPage.passwordInput).toHaveValue('');
    });
});