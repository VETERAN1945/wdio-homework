class CartPage {
    get cartItems()      { return $$('.cart_item'); }
    get checkoutButton() { return $('#checkout'); }

    async open() {
        await browser.url('/cart.html');
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }

    async getItemNames() {
        const elements = await $$('.inventory_item_name');
        const names = [];
        for (const el of elements) {
            names.push(await el.getText());
        }
        return names;
    }

    async isEmpty() {
        const items = await $$('.cart_item');
        let count = 0;
        for (const el of items) { count++; }
        return count === 0;
    }
}

module.exports = new CartPage();