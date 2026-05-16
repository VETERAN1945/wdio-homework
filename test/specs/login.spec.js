const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const { credentials, urls, errorMessages } = require('../fixtures/testData');

describe('Login', () => {

    it('TC-1: should login with valid credentials', async () => {
        await LoginPage.open();
        await LoginPage.usernameInput.setValue(credentials.validUser.username);
        await LoginPage.passwordInput.setValue(credentials.validUser.password);
        await LoginPage.loginButton.click();
        await expect(browser).toHaveUrlContaining(urls.inventory);
        await InventoryPage.firstProduct.waitForDisplayed();
    });

    it('TC-2: should show error when logging in with invalid password', async () => {
        await LoginPage.open();
        await LoginPage.usernameInput.setValue(credentials.invalidUser.username);
        await LoginPage.passwordInput.setValue(credentials.invalidUser.password);
        await LoginPage.loginButton.click();
        await LoginPage.errorMessage.waitForDisplayed();
        await expect(LoginPage.errorMessage).toHaveTextContaining(
            errorMessages.invalidPassword
        );
    });

    it('TC-3: should show error when logging in with locked out user', async () => {
        await LoginPage.open();
        await LoginPage.usernameInput.setValue(credentials.lockedUser.username);
        await LoginPage.passwordInput.setValue(credentials.lockedUser.password);
        await LoginPage.loginButton.click();
        await LoginPage.errorMessage.waitForDisplayed();
        await expect(LoginPage.errorMessage).toHaveTextContaining(
            errorMessages.lockedUser
        );
    });
});