import { fromJS, List } from 'immutable';

import {
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,
    CHECKOUT
} from '../actions';

export const setProductsInCart = (state, product) => {
    const currentProductTitle = product.get('title');
    const products = state.get('items');
    const isCurrentProductInList = products.find(product => product.get('title') === currentProductTitle);

    if (!isCurrentProductInList) {
        return state
            .set('items', products.push(product.set('quantity', 1)));
    }

    const currentProductIndex = products.findIndex(product => product.get('title') === currentProductTitle);
    const updatedCurrentProduct = products.update(currentProductIndex, (product) => product.set('quantity', product.get('quantity') + 1));

    return state
        .set('items', updatedCurrentProduct);
};

const cart = (state = fromJS({ isFetching: false, items: [], total: 0 }), action) => {
    switch (action.type) {
        case ADD_PRODUCT_REQUEST:
            return state
                .set('isFetching', true);

        case ADD_PRODUCT_SUCCESS:
            return setProductsInCart(state, action.product)
                .set('total', state.get('total') + action.product.get('price'))
                .set('isFetching', false);

        case CHECKOUT:
            return state
                .set('total', 0)
                .set('items', new List())
                .set('isFetching', false);

        default:
            return state;
    }
};

export default cart;