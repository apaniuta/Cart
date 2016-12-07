import { expect } from 'chai';
import { fromJS, List, Map } from 'immutable';

import reducer, { setProductsInCart } from '../cart';

import { ADD_PRODUCT_SUCCESS, CHECKOUT } from '../../actions'

describe('cart reducer', () => {
    it('should return the initial state', () => {
        const state = reducer(undefined, {});

        const expectedState = fromJS({ isFetching: false, items: [], total: 0 });
        expect(state).to.be.an.instanceof(Map);
        expect(state).to.eql(expectedState);
    });

    it('should set product in the cart', () => {
        const state = reducer(undefined, {});
        const testProduct = fromJS({"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2});

        const result = setProductsInCart(state, testProduct);

        expect(result).to.be.an.instanceof(Map);
        expect(result).to.have.property('items')
            .that.is.an.instanceof(List)
            .to.have.property(0)
            .that.eql(fromJS({"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2, "quantity": 1}));
    });

    it('should update total', () => {
        const initialState = fromJS({ isFetching: false, items: [], total: 0 });
        const testProduct = fromJS({"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2});
        const action = {
            type: ADD_PRODUCT_SUCCESS,
            product: testProduct
        };
        const state = reducer(initialState, action);

        expect(state).to.be.an.instanceof(Map);
        expect(state).to.have.property('total')
            .that.equals(500.01);
    });

    it('should return the initial state on checkout', () => {
        const initialState = fromJS({ isFetching: true, items: [{ "id": 1 }], total: 42 });
        const action = {
            type: CHECKOUT,
        };
        const state = reducer(initialState, action);

        const expectedState = fromJS({ isFetching: false, items: [], total: 0 });

        expect(state).to.be.an.instanceof(Map);
        expect(state).to.eql(expectedState);
    });
});