import { fromJS } from 'immutable';

import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    UPDATE_PRODUCTS_INVENTORY
} from '../actions';

export const updateProductsInventory = (state, product) => {
    const currentProductTitle = product.get('title');
    const products = state.get('items');

    if (product.get('inventory')) {
        const currentProductIndex = products.findIndex(product => product.get('title') === currentProductTitle);
        const updatedCurrentProduct = products.update(currentProductIndex, (product) => product.set('inventory', product.get('inventory') - 1));

        return state
            .set('items', updatedCurrentProduct);

    }
    return state;
};

const products = (state = fromJS({ isFetching: false, items: [] }), action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return state
                .set('isFetching', true);

        case FETCH_PRODUCTS_SUCCESS:
            return state
                .set('items', action.products)
                .set('isFetching', false);

        case UPDATE_PRODUCTS_INVENTORY:
            return updateProductsInventory(state, action.product)
                .set('isFetching', false);

        default:
            return state;
    }
};

export default products;