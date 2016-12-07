import React, { Component } from 'react';
import { connect } from 'react-redux';

import Cart from '../components/Cart.jsx';

import { checkoutCart } from '../actions';

@connect(mapStateToProps, mapDispatchToProps)
export default class AddProductsToCart extends Component {
    render() {
        const {
            products,
            total,
            onCheckoutCart
        } = this.props;
        
        return <Cart products={products} total={total} onCheckoutCart={onCheckoutCart} />;
    }
}

function mapStateToProps(state) {
    return {
        products: state.getIn(['cart', 'items']),
        total: state.getIn(['cart', 'total']),
        isFetching: state.getIn(['cart', 'isFetching'])
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onCheckoutCart: () => dispatch(checkoutCart())
    };
}