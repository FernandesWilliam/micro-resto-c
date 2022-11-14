import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import './customer-display.css';
import {Title} from "../title/title";
import {OrderList} from "../order-list/order-list";
import { getPreparations } from "../../store/preparation-store";

export function CustomerDisplay() {
    const dispatch = useDispatch();

    const ordersStarted = useSelector((state) => state.preparations.started);
    const ordersReady = useSelector((state) => state.preparations.ready);

    useEffect(() => {
        dispatch(getPreparations());
    }, [ dispatch, ordersStarted, ordersReady ]);

    return (
        <div id="customer-display">
            <header>
                <Title />
                <h2>Orders</h2>
            </header>

            <div id="main-content">
                <div>
                    <h3>Started</h3>
                    <OrderList orders={ordersStarted} color="darkorange" />
                </div>

                <div>
                    <h3>Ready</h3>
                    <OrderList orders={ordersReady} color="forestgreen" />
                </div>
            </div>
        </div>
    )
}