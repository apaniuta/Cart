import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import FillProductsList from '../containers/FillProductsList.jsx';
import AddProductsToCart from '../containers/AddProductsToCart.jsx';

import styles from './App.less';

@DragDropContext(HTML5Backend)
export default class App extends Component {
    render() {
        return (
            <div className={styles.base}>
                <h1 className={styles.header}>Shopping Cart</h1>
                <div className={styles.content}>
                    <FillProductsList />
                    <AddProductsToCart />
                </div>
            </div>
        );
    }
}
