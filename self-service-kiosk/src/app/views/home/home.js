import {useDispatch, useSelector} from "react-redux";
import React, { useState } from 'react';
import {getMenusAsync, selectMenus, getMenuByID, selectMenuByID} from "../../store/catalog-store.js";
import {useEffect} from "react";
import './home.css';
import {Menu} from "../menu/menu";
import {startOrderAsync} from "../../store/order-store";
import {useNavigate} from "react-router-dom"


export function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(startOrderAsync())
    }, []);


    function start() {
        navigate("/menu");

    }

    return <div>
        <h1 id={'titles'}>MiamMiam</h1>
        <div id={"around"}>
            <div id={"logo"}> Logo </div>
            <div id={'start'} onClick={()=>start()}>
                Touch to start the order.
            </div>

        </div>

    </div>;

}