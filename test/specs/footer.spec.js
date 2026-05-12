const LoginPage = require('../pageobjects/login.page');

describe('Footer social links', () => {

    before(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/inventory.html'),
            { timeout: 10000 }
        );
        await browser.execute(() => window.scrollTo(0, document.body.scrollHeight));
        await browser.pause(1000);
    });

    it('TC-7a: should open Twitter in a new tab', async () => {
        const link = await $('[data-test="social-twitter"]');
        await link.waitForExist({ timeout: 5000 });
        const href = await link.getAttribute('href');
        const target = await link.getAttribute('target');
        expect(href).toContain('twitter.com');
        expect(target).toBe('_blank');
    });

    it('TC-7b: should open Facebook in a new tab', async () => {
        const link = await $('[data-test="social-facebook"]');
        await link.waitForExist({ timeout: 5000 });
        const href = await link.getAttribute('href');
        const target = await link.getAttribute('target');
        expect(href).toContain('facebook.com');
        expect(target).toBe('_blank');
    });

    it('TC-7c: should open LinkedIn in a new tab', async () => {
        const link = await $('[data-test="social-linkedin"]');
        await link.waitForExist({ timeout: 5000 });
        const href = await link.getAttribute('href');
        const target = await link.getAttribute('target');
        expect(href).toContain('linkedin.com');
        expect(target).toBe('_blank');
    });
});