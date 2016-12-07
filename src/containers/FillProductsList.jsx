import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProductsList from '../components/ProductsList.jsx';

import { fetchProducts, fetchAddToCart } from '../actions';


@connect(mapStateToProps, mapDispatchToProps)
export default class FillProductsList extends Component {
    componentDidMount() {
        this.props.onFetchProducts();
    }

    render() {
        const {
            products, 
            isFetching, 
            onFetchAddToCart
        } = this.props;

        return (
            <div>
                {
                    isFetching
                    ? 'Loading...' 
                    : <ProductsList products={products} onFetchAddToCart={onFetchAddToCart} />
                }
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        products: state.getIn(['products', 'items']),
        isFetching: state.getIn(['products', 'isFetching'])
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onFetchProducts: () => dispatch(fetchProducts()),
        onFetchAddToCart: (product) => dispatch(fetchAddToCart(product))
    };
}