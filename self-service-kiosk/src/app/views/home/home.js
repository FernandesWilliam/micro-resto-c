import {useDispatch} from "react-redux";
import React from 'react';
import {useEffect} from "react";
import './home.css';
import {startOrderAsync} from "../../store/order-store";
import {useNavigate} from "react-router-dom"
import {Title} from "../title/title";


export function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(startOrderAsync())
    }, [dispatch]);


    function start() {
        navigate("/menu");

    }

    return <div>
        <Title />
        <div id={"around"}>
            <div id={"logo"}> Logo </div>
            <div id={'start'} onClick={()=>start()}>
                Touch to start the order.
            </div>

        </div>

    </div>;

}