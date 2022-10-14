import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './app/store/store.js';
import './index.css';
import { CustomerDisplay } from "./app/views/customer-display/customer-display";
import { Helmet } from "react-helmet";
import { Menu } from "./app/views/menu/menu";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import {Home} from "./app/views/home/home";
import {Recap} from "./app/views/recap/recap";
import {End} from "./app/views/end/end";



const container = document.getElementById('root');
const root = createRoot(container);


root.render(
    <Provider store={store}>

        <Helmet>
            <link rel="icon" type="image/png" href="/logoFastFood.png" sizes="16x16" />
            <meta charSet="utf-8" />
            <title>MiamMiam</title>
        </Helmet>

        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/menu" element={<Menu/>}/>
                <Route exact path="/recap" element={<Recap/>}/>
                <Route exact path="/end" element={<End/>}/>
                <Route exact path="/customer-display" element={<CustomerDisplay />} />
            </Routes>
        </BrowserRouter>

    </Provider>
);

