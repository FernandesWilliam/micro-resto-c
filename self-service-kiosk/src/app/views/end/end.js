import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgetOrder, selectIdOrder, selectOrderTable } from "../../store/order-store";
import { Title } from "../title/title";
import './end.css';

export function End() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const table = useSelector(selectOrderTable);
    const orderId = useSelector(selectIdOrder)

    function returnHome() {
        navigate('/');
        dispatch(forgetOrder);
    }

    return (
        <div className={"main"}>
            <link rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <Title />
            <h2>Order sent for preparation</h2>
            <p>You order is <span style={{ color: "darkorange" }}>{table !== undefined ? table : orderId}</span></p>

            <div className="button-container">
                <div id="return-home" onClick={() => returnHome()}>Return Home</div>
            </div>
        </div>
    );
}