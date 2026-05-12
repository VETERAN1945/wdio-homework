const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');

describe('Logout', () => {

    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/inventory.html'),
            { timeout: 10000 }
        );
    });

    it('TC-4: should logout from the account via burger menu', async () => {
        await InventoryPage.burgerMenu.click();
        // Ждём анимацию открытия меню
        await browser.pause(1000);
        await InventoryPage.logoutLink.waitForClickable({ timeout: 5000 });
        await InventoryPage.logoutLink.click();

        await browser.waitUntil(
            async () => !(await browser.getUrl()).includes('/inventory.html'),
            { timeout: 5000 }
        );

        await expect(LoginPage.usernameInput).toHaveValue('');
        await expect(LoginPage.passwordInput).toHaveValue('');
    });
});