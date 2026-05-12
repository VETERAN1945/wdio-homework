class InventoryPage {
    get burgerMenu()       { return $('#react-burger-menu-btn'); }
    get logoutLink()       { return $('#logout_sidebar_link'); }
    get cartButton()       { return $('.shopping_cart_link'); }
    get cartBadge()        { return $('.shopping_cart_badge'); }
    get sortDropdown()     { return $('.product_sort_container'); }
    get addToCartButtons() { return $$('[id^="add-to-cart"]'); }

    async open() { await browser.url('/inventory.html'); }

    async openBurgerMenu() {
        await this.burgerMenu.click();
        await $('#logout_sidebar_link').waitForDisplayed({ timeout: 3000 });
    }

    async addFirstProductToCart() {
        const buttons = await this.addToCartButtons;
        const nameEl = await $('.inventory_item_name');
        const firstName = await nameEl.getText();
        await buttons[0].click();
        return firstName;
    }

    async getCartCount() {
        const badge = await this.cartBadge;
        if (await badge.isExisting()) return parseInt(await badge.getText());
        return 0;
    }

    async selectSorting(value) {
        await this.sortDropdown.selectByAttribute('value', value);
    }

    async getProductNamesText() {
        const elements = await $$('.inventory_item_name');
        const names = [];
        for (const el of elements) { names.push(await el.getText()); }
        return names;
    }

    async getProductPricesNumbers() {
        const elements = await $$('.inventory_item_price');
        const prices = [];
        for (const el of elements) {
            const text = await el.getText();
            prices.push(parseFloat(text.replace('$', '')));
        }
        return prices;
    }
}
module.exports = new InventoryPage();