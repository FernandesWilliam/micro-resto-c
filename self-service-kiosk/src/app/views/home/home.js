import {useDispatch} from "react-redux";
import React from 'react';
import {useEffect} from "react";
import './home.css';
import logo from "./logoFastFood.png";
import {startOrderAsync} from "../../store/order-store";
import {useNavigate} from "react-router-dom"
import {Title} from "../title/title";


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
        <Title />
        <div id={"around"}>
            <img src={logo} alt="logoo"></img>
            <div id={'start'} onClick={()=>start()}>
                <p>Touch to start the order.</p>
            </div>

        </div>

    </div>;

}