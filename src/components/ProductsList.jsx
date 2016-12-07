import React from 'react';

import Product from './Product.jsx';

const ProductsList = props => {
    return (
        <div data-qa="productsList">
            {
                props.products.map(product =>
                    <Product
                        key={product.get('id')}
                        id={product.get('id')}
                        title={product.get('title')}
                        price={product.get('price')}
                        inventory={product.get('inventory')}
                        product={product}
                        onFetchAddToCart={props.onFetchAddToCart}
                    />
                )
            }
        </div>
    );
};

export default ProductsList;

