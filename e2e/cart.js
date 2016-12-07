'use strict';

let url = '';

const productsList = `div[data-qa='productsList']`;
const cartItems = `div[data-qa='cartItems']`;

const cartEmpty = "div[data-qa='cartEmpty']";
const cartEmptyText = "Click on BUY button or drag-n-drop products to cart";
const checkoutButton = "span[data-qa='checkoutButton']";

const getBuyButtonByIndex = index => `${productsList} > div:nth-child(${index}) span[data-qa='buyButton']`;
const getCartItemByIndex = index => `${cartItems} div:nth-child(${index})`;
const addProductToCart = (client, index) => (
    client
        .waitForElementVisible(productsList, 1000)
        .click(getBuyButtonByIndex(index))
);

const secondBuyButton = getBuyButtonByIndex(2);
const cartFirstItem = getCartItemByIndex(1);
const cartSecondItem = getCartItemByIndex(2);

module.exports = {
    before(browser) {
        url = browser.launch_url;
    },

    'Add product to cart': client => {
        client
            .url(url)
            .waitForElementVisible(productsList, 1000)
            .assert.visible(secondBuyButton)
            .click(secondBuyButton)
            .waitForElementVisible(cartItems, 1000)
            .assert.visible(cartFirstItem)
            .pause(1000)
            .end();
    },

    'Checkout cart': client => {
        client.url(url);

        addProductToCart(client, 1);
        addProductToCart(client, 2);

        client
            .pause(500)
            .assert.visible(cartFirstItem)
            .assert.visible(cartSecondItem)
            .click(checkoutButton)
            .assert.containsText(cartEmpty, cartEmptyText)
            .pause(1000)
            .end();
    }
};