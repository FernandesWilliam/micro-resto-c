import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './app/store/store.js';
import './index.css';
import {Home} from "./app/views/home/home.js";


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <Home/>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
