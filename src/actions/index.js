import api from '../api/shop';
import { fromJS } from 'immutable';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const UPDATE_PRODUCTS_INVENTORY = 'UPDATE_PRODUCTS_INVENTORY';

export const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const CHECKOUT = 'CHECKOUT';

export const requestProducts = () => ({
    type: FETCH_PRODUCTS_REQUEST
});

export const receiveProducts = products => ({
    type: FETCH_PRODUCTS_SUCCESS,
    products
});

export const fetchProducts = () => dispatch => {
    dispatch(requestProducts());

    return api.getProducts(products => dispatch(receiveProducts(fromJS(products))), 500);
};

export const requestAddToCart = () => ({
    type: ADD_PRODUCT_REQUEST
});

export const receiveAddToCart = product => ({
    type: ADD_PRODUCT_SUCCESS,
    product
});

export const fetchAddToCart = product => (dispatch, getState) => {
    dispatch(requestAddToCart());

    return api.buyProducts(product, () => {
        const currentProductTitle = product.get('title');
        const products = getState().getIn(['products','items']);
        const currentProductInventory = products.find(product => product.get('title') === currentProductTitle).get('inventory');

        if (currentProductInventory) {
            dispatch(receiveAddToCart(fromJS(product)));
            dispatch(updateProductsInventory(fromJS(product)));
        }
    }, 200);

};

export const updateProductsInventory = product => ({
    type: UPDATE_PRODUCTS_INVENTORY,
    product
});

export const checkoutCart = () => ({
    type: CHECKOUT
});