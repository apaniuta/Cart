import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

import styles from './Product.less';
import noProduct from '../assets/no-product.png';

const boxSource = {
    beginDrag(props) {
        return {
            product: props.product,
            onFetchAddToCart: props.onFetchAddToCart
        };
    },

    endDrag(props, monitor) {
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();

        if (dropResult) {
            item.onFetchAddToCart(item.product);
        }
    }
};

@DragSource('product', boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
export default class Product extends Component {
    handleFetchAddToCart = () => {
        const { onFetchAddToCart, product } = this.props;

        onFetchAddToCart(product);
    };

    render() {
        const {
            title,
            price,
            inventory,
            isDragging,
            connectDragSource
        } = this.props;
        const draggingClass = isDragging ? styles.isDragging : styles.base;

        return connectDragSource(
            <div
                className={inventory ? draggingClass : styles.disabled}
            >
                <img className={styles.img} src={noProduct}/>
                <div className={styles.content}>
                    <h1 className={styles.title}>{title}</h1>
                    <div className={styles.container}>
                        <p className={styles.price}>{`${price}$`}</p>
                        {
                            inventory
                                ?
                                <span
                                    data-qa="buyButton"
                                    className={styles.buy}
                                    onClick={this.handleFetchAddToCart}
                                >
                                    Buy
                                </span>
                                :
                                <p className={styles.soldOut}>Sold Out</p>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
