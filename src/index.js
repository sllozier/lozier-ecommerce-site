import React from 'react';
import { createRoot } from 'react-dom/client';
import App from "./App";
import { Provider } from 'react-redux';
import { store } from './store';
import history from './utils/history';
import { BrowserRouter, Router } from 'react-router-dom';


const root = createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter history={history}>
        <Provider store={store}>
            
            <App />
        </Provider>
    </BrowserRouter>

);
