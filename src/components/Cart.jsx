import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

import CartItem from './CartItem.jsx';

import styles from './Cart.less';

const boxTarget = {
    drop() {
        return { name: 'Dustbin' };
    }
};

@DropTarget('product', boxTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))
export default class Cart extends Component {
    render() {
        const {
            products,
            total,
            onCheckoutCart,
            canDrop,
            isOver,
            connectDropTarget
        } = this.props;

        const isActive = canDrop && isOver;
        let baseClass = styles.base;
        if (isActive) {
            baseClass = styles.isActive;
        } else if (canDrop) {
            baseClass = styles.canDrop;
        }

        return connectDropTarget(
            <div className={baseClass}>
                <h1 className={styles.header}>Cart</h1>
                {
                    products.size ?
                        <div data-qa="cartItems">
                            {
                                products.map(product =>
                                    <CartItem
                                        key={product.get('id')}
                                        title={product.get('title')}
                                        quantity={product.get('quantity')}
                                        price={product.get('price')}
                                    />
                                )
                            }
                        </div>
                        :
                        <div
                            data-qa="cartEmpty"
                            className={styles.hint}
                        >
                            Click on BUY button or drag-n-drop products to cart
                        </div>
                }
                <p className={styles.total}>{`Total: ${total.toFixed(2)}$`}</p>
                <span
                    data-qa="checkoutButton"
                    className={products.size ? styles.button : styles.disabled}
                    onClick={onCheckoutCart}
                >
                    Checkout
                </span>
            </div>
        );
    }
}
