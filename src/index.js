import React from 'react';
import { createRoot } from 'react-dom/client';
import App from "./App";
import { Provider } from 'react-redux';
import store from './store';
//import history from './utils/history';
import { BrowserRouter } from 'react-router-dom';
import "../public/sass/mystyles.scss";


const root = createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter >
        <Provider store={store}> 
            <App />
        </Provider>
    </BrowserRouter>
);

