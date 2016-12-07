import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';

import App from './components/App.jsx';

import store from './store';

// styles
import 'normalize.css';
import './assets/main.css';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);