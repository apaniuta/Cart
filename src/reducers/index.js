import products from './products';
import cart from './cart';
import { combineReducers } from 'redux-immutable';

export default combineReducers({ products, cart });