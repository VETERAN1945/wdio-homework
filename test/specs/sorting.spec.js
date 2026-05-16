const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const { credentials } = require('../fixtures/testData');

describe('Sorting', () => {

    before(async () => {
        await LoginPage.open();
        await LoginPage.login(credentials.validUser.username, credentials.validUser.password);
        await InventoryPage.firstProduct.waitForDisplayed();
    });

    async function verifySortingByPrice(order) {
        await InventoryPage.selectSorting(order);
        const prices = await InventoryPage.getProductPricesNumbers();
        const sorted = [...prices].sort((a, b) => order === 'lohi' ? a - b : b - a);
        expect(prices).toEqual(sorted);
    }

    async function verifySortingByName(order) {
        await InventoryPage.selectSorting(order);
        const names = await InventoryPage.getProductNamesText();
        const sorted = [...names].sort();
        if (order === 'za') sorted.reverse();
        expect(names).toEqual(sorted);
    }

    it('TC-6a: should sort products by Price (low to high)', async () => {
        await verifySortingByPrice('lohi');
    });

    it('TC-6b: should sort products by Price (high to low)', async () => {
        await verifySortingByPrice('hilo');
    });

    it('TC-6c: should sort products by Name (A to Z)', async () => {
        await verifySortingByName('az');
    });

    it('TC-6d: should sort products by Name (Z to A)', async () => {
        await verifySortingByName('za');
    });
});