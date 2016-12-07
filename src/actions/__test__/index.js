import { expect } from 'chai';
import { fromJS, List, Map } from 'Immutable';

import {
    receiveProducts,
    receiveAddToCart,
    updateProductsInventory,
    checkoutCart,
    FETCH_PRODUCTS_SUCCESS,
    ADD_PRODUCT_SUCCESS,
    UPDATE_PRODUCTS_INVENTORY,
    CHECKOUT
} from '../index';

describe('actions', () => {
    describe('#receiveProducts', () => {
        it('should create an action to receive products', () => {
            const testProduct = {"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2};
            const action = receiveProducts(testProduct);

            expect(action).to.have.property('type')
                .that.equals(FETCH_PRODUCTS_SUCCESS);
            expect(action).to.have.property('products')
                .that.equals(testProduct);
        })
    });

    describe('#receiveAddToCart', () => {
        it('should create an action to add product to cart', () => {
            const testProduct = {"id": 2, "title": "H&M T-Shirt White", "price": 10.99, "inventory": 10};
            const action = receiveAddToCart(testProduct);

            expect(action).to.have.property('type')
                .that.equals(ADD_PRODUCT_SUCCESS);
            expect(action).to.have.property('product')
                .that.equals(testProduct);
        })
    });

    describe('#updateProductsInventory', () => {
        it('should create an action to update products inventory', () => {
            const testProduct = {"id": 3, "title": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5};
            const action = updateProductsInventory(testProduct);

            expect(action).to.have.property('type')
                .that.equals(UPDATE_PRODUCTS_INVENTORY);
            expect(action).to.have.property('product')
                .that.equals(testProduct);
        })
    });

    describe('#checkoutCart', () => {
        it('should create an action to checkout cart', () => {
            const action = checkoutCart();

            expect(action).to.eql({ type: CHECKOUT });
        })
    });
});