import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './app/store/store.js';
import './index.css';
import {Menu} from "./app/views/menu/menu";

import {BrowserRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom";

import {Home} from "./app/views/home/home";
import {Recap} from "./app/views/recap/recap";
import {End} from "./app/views/end/end";



const container = document.getElementById('root');
const root = createRoot(container);


root.render(
    <Provider store={store}>

        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/menu" element={<Menu/>}/>
                <Route exact path="/recap" element={<Recap/>}/>
                <Route exact path="/end" element={<End/>}/>

            </Routes>
        </BrowserRouter>

   

    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
