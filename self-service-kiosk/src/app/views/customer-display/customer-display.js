import {useEffect, useState} from "react";
//import {useDispatch, useSelector} from "react-redux";
import './customer-display.css';
import {Title} from "../title/title";
import {NumberList} from "../number-list/number-list";

export function CustomerDisplay() {
    //const dispatch = useDispatch();

    const [startedOrders, setStartedOrders] = useState([492, 495, 496]);
    useEffect(() => {
        //setStartedOrders(dispatch(/* add store method */))
    }, startedOrders);

    const [completedOrders, setCompletedOrders] = useState([493, 494]);
    useEffect(() => {
        //setCompletedOrders(dispatch(/* add store method */))
    }, completedOrders);

    return (
        <div id="customer-display">
            <header>
                <Title />
                <h2>Orders</h2>
            </header>

            <div id="main-content">
                <div>
                    <h3>Started</h3>
                    <NumberList numbers={startedOrders} />
                </div>

                <div>
                    <h3>Ready</h3>
                    <NumberList numbers={completedOrders} />
                </div>
            </div>
        </div>
    )
}