import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {
    selectMenus
} from "../../store/catalog-store.js";
import {
    addItemToOrderAsync,
    removeItemToOrderAsync,
    selectIdOrder,
    selectItemsOrder, sendOrderToPreparationAsync} from "../../store/order-store";
import "./recap.css"
import {useNavigate} from "react-router-dom";
import {Title} from "../title/title";
import { RecapLine } from "./recap-line/recap-line";




export function Recap() {

    const menus = useSelector(selectMenus);
    const navigate = useNavigate();

    const idOrder = useSelector(selectIdOrder);
    const orderItemsInState = useSelector(selectItemsOrder);
    const orderItems = initOrderPriceAndImage(orderItemsInState === undefined ? [] : orderItemsInState);
    const dispatch = useDispatch();

    async function removeItem(itemId, itemShortName, howMany) {
        if (howMany > 0) {
            dispatch(removeItemToOrderAsync({
                orderID: idOrder,
                menuItem: itemId,
                menuItemShortName: itemShortName,
                howMany: 1
            }));
        }
    }



    async function addItem(itemId,  itemShortName) {
        await dispatch(addItemToOrderAsync({
            orderID: idOrder,
            _id: itemId,
            shortName: itemShortName,
            howMany: 1
        }));
    }

    async function validateOrder() {
        dispatch(sendOrderToPreparationAsync({orderId: idOrder}));
        navigate("/end");
    }

    function initOrderPriceAndImage(orderItems){
        return initPrices(initImages(orderItems));
    }

    function initPrices(orderItems) {
        return orderItems.map(element => {
            const orderItem = menus.find(menuItem => menuItem._id === element.item._id);
            return { ...element , price:orderItem.price};
        });
    }

    function initImages(orderItems) {
        return orderItems.map(element => {
            const orderItem = menus.find(menuItem => menuItem._id === element.item._id);
            return { ...element , image:orderItem.image};
        });
    }


    function calculatePrice( orderItems ) {
        let totalPrice = 0;
        orderItems.forEach(element => {  
            totalPrice += element.price * element.howMany}
        )
        return totalPrice;
    }

    return <div className="recap">
        <link rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <Title />
        <h2>Recap</h2>
        <div id='order-items-recap'>
            {orderItems.map(({item, howMany, price, image}) =>
                <RecapLine item={item} howMany={howMany} price={price} image={image} addItem={addItem} removeItem={removeItem}/>
            )}
        </div>
        <div class="footer-recap">
            <p>Total price: {calculatePrice(orderItems)} €</p>
            <button className={"button-1"} onClick={validateOrder}>Validate</button>
        </div>
    </div>
}

