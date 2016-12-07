import { expect } from 'chai';
import { fromJS, List, Map } from 'immutable';

import reducer, { updateProductsInventory } from '../products';

import { FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS } from '../../actions'

describe('products reducer', () => {
    it('should return the initial state', () => {
        const state = reducer(undefined, {});

        const expectedState = fromJS({ isFetching: false, items: [] });

        expect(state).to.be.an.instanceof(Map);
        expect(state).to.eql(expectedState);
    });

    it('should wait while request is processed', () => {
        const initialState = fromJS({ isFetching: false });
        const action = {
            type: FETCH_PRODUCTS_REQUEST,
        };
        const state = reducer(initialState, action);

        const expectedState = fromJS({ isFetching: true });

        expect(state).to.be.an.instanceof(Map);
        expect(state).to.eql(expectedState);
    });

    it('should add product', () => {
        const initialState = fromJS({ isFetching: false, items: [] });
        const testProducts = fromJS([{"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2}]);
        const action = {
            type: FETCH_PRODUCTS_SUCCESS,
            products: testProducts
        };

        const state = reducer(initialState, action);

        expect(state).to.be.an.instanceof(Map);
        expect(state).to.have.property('isFetching')
            .that.eql(false);
        expect(state).to.have.property('items')
            .that.eql(testProducts);
    });

    it('should update products inventory when adding product to the cart', () => {
        const state = fromJS({ isFetching: false, items: [{"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2}] });
        const testProduct = fromJS({"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2});

        const result = updateProductsInventory(state, testProduct);

        expect(result).to.be.an.instanceof(Map);
        expect(result).to.have.property('items')
            .that.is.an.instanceof(List)
            .to.have.property(0)
            .to.have.property('inventory')
            .that.eql(1);
    });
});