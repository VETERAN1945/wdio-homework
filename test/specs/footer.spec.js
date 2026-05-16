const LoginPage = require('../pageobjects/login.page');
const InventoryPage = require('../pageobjects/inventory.page');
const FooterPage = require('../pageobjects/footer.page');
const { credentials } = require('../fixtures/testData');

describe('Footer social links', () => {

    before(async () => {
        await LoginPage.open();
        await LoginPage.login(credentials.validUser.username, credentials.validUser.password);
        await InventoryPage.firstProduct.waitForDisplayed();
        await browser.execute(() => window.scrollTo(0, document.body.scrollHeight));
        await FooterPage.twitterLink.waitForExist();
    });

    async function verifyFooterLink(link, expectedUrl) {
        const href = await link.getAttribute('href');
        const target = await link.getAttribute('target');
        expect(href).toContain(expectedUrl);
        expect(target).toBe('_blank');
    }

    it('TC-7a: should open Twitter in a new tab', async () => {
        await verifyFooterLink(FooterPage.twitterLink, 'twitter.com');
    });

    it('TC-7b: should open Facebook in a new tab', async () => {
        await verifyFooterLink(FooterPage.facebookLink, 'facebook.com');
    });

    it('TC-7c: should open LinkedIn in a new tab', async () => {
        await verifyFooterLink(FooterPage.linkedinLink, 'linkedin.com');
    });
});