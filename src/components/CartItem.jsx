import React from 'react';

import styles from './CartItem.less';

const CartItem = props => {
    const {
        title,
        quantity,
        price
    } = props;

    return (
        <div className={styles.item}>
            <p>{title}</p>
            <p>{`${quantity} x ${price}$`}</p>
        </div>
    );
};

export default CartItem;
