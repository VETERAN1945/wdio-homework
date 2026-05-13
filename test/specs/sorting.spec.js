const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const { credentials } = require('../fixtures/testData');

describe('Sorting', () => {

    before(async () => {
        await LoginPage.open();
        await LoginPage.login(credentials.validUser.username, credentials.validUser.password);
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/inventory.html'),
            { timeout: 10000 }
        );
    });

    it('TC-6a: should sort products by Price (low to high)', async () => {
        await InventoryPage.selectSorting('lohi');
        const prices = await InventoryPage.getProductPricesNumbers();
        const sorted = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sorted);
    });

    it('TC-6b: should sort products by Price (high to low)', async () => {
        await InventoryPage.selectSorting('hilo');
        const prices = await InventoryPage.getProductPricesNumbers();
        const sorted = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sorted);
    });

    it('TC-6c: should sort products by Name (A to Z)', async () => {
        await InventoryPage.selectSorting('az');
        const names = await InventoryPage.getProductNamesText();
        const sorted = [...names].sort();
        expect(names).toEqual(sorted);
    });

    it('TC-6d: should sort products by Name (Z to A)', async () => {
        await InventoryPage.selectSorting('za');
        const names = await InventoryPage.getProductNamesText();
        const sorted = [...names].sort().reverse();
        expect(names).toEqual(sorted);
    });
});