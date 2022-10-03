import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './app/store/store.js';
import './index.css';
import { CustomerDisplay } from "./app/views/customer-display/customer-display";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Helmet} from "react-helmet";


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>

        <Helmet>
            <meta charSet="utf-8" />
            <title>MiamMiam</title>
        </Helmet>

        <BrowserRouter>
            <Routes>
                <Route exact path="/customer-display" element={<CustomerDisplay />} />
            </Routes>
        </BrowserRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
