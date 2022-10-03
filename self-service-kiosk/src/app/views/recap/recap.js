import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getMenusAsync} from "../../store/catalog-store";
import {
    addItemToOrderAsync,
    removeItemToOrderAsync,
    selectIdOrder,
    selectItemsOrder, sendOrderToPreparationAsync,
    startOrderAsync
} from "../../store/order-store";
import "../menu/menu.css"
import {useNavigate} from "react-router-dom";


export function Recap() {
    const navigate = useNavigate();

    const idOrder = useSelector(selectIdOrder)
    const orderItemsInState = useSelector(selectItemsOrder)
    const orderItems = orderItemsInState === undefined ? [] : orderItemsInState;
    const dispatch = useDispatch();

    async function removeItem(itemId, itemShortName, howMany) {
        if (howMany > 0) {
            await dispatch(removeItemToOrderAsync({
                orderID: idOrder,
                menuItem: itemId,
                menuItemShortName: itemShortName,
                howMany: 1
            }));
        }
    }

    async function addItem(itemId, itemShortName) {
        await dispatch(addItemToOrderAsync({
            orderID: idOrder,
            menuItem: itemId,
            menuItemShortName: itemShortName,
            howMany: 1
        }));
    }

    async function validateOrder() {
        await dispatch(sendOrderToPreparationAsync(idOrder));
        navigate("/end")
    }

    return <div className={"main"}>
        <link rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <h1 id={"titles"}>MiamMiam</h1>
        <h2>Recap</h2>
        <div id={'order-items'}>
            {orderItems.map(({item, howMany}) =>
                <div id={"plus-minus"}>
                    <div id={"plus-minus"}>
                        <i className="fa fa-minus" id={"i"}
                           onClick={() => removeItem(item._id, item.shortName, howMany)}></i>
                        <div>{howMany}</div>
                        <i className="fa fa-plus" id={"i"}
                           onClick={() => addItem(item._id, item.shortName)}></i>
                    </div>
                    {item.shortName}
                </div>
            )}
        </div>
        <button className={"button-1"} onClick={validateOrder}>Validate</button>
    </div>

}