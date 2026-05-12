const LoginPage = require('../pageobjects/login.page');

describe('Login', () => {

    it('TC-1: should login with valid credentials', async () => {
        await LoginPage.open();
        await LoginPage.usernameInput.setValue('standard_user');
        await LoginPage.passwordInput.setValue('secret_sauce');
        await LoginPage.loginButton.click();
        await expect(browser).toHaveUrlContaining('/inventory.html');
        await $('.inventory_item').waitForDisplayed({ timeout: 5000 });
    });

    it('TC-2: should show error when logging in with invalid password', async () => {
        await LoginPage.open();
        await LoginPage.usernameInput.setValue('standard_user');
        await LoginPage.passwordInput.setValue('any_random_value');
        await LoginPage.loginButton.click();
        await LoginPage.errorMessage.waitForDisplayed({ timeout: 5000 });
        await expect(LoginPage.errorMessage).toHaveTextContaining(
            'Username and password do not match any user in this service'
        );
    });

    it('TC-3: should show error when logging in with locked out user', async () => {
        await LoginPage.open();
        await LoginPage.usernameInput.setValue('locked_out_user');
        await LoginPage.passwordInput.setValue('secret_sauce');
        await LoginPage.loginButton.click();
        await LoginPage.errorMessage.waitForDisplayed({ timeout: 5000 });
        await expect(LoginPage.errorMessage).toHaveTextContaining(
            'Sorry, this user has been locked out'
        );
    });
});