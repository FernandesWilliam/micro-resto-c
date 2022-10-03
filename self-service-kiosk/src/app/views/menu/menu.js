import {useDispatch, useSelector} from "react-redux";
import React, {useRef, useState} from 'react';
import {
    getMenusAsync,
    selectMenus
} from "../../store/catalog-store.js";
import {useEffect} from "react";
import useModal from "../modal/useModal";
import Modal from "../modal/modal";
import "./menu.css"
import {BottomSheet} from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import {
    addItemToOrderAsync,
    removeItemToOrderAsync,
    selectIdOrder,
    selectItemsOrder,
    startOrderAsync
} from "../../store/order-store";
import {useNavigate} from "react-router-dom";

/**
 * filter to get all distinct element in a list
 */
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

const selectMenuByCategory = (menus, cat) => {
    return menus.filter((menu) => menu.category === cat);
}

export function Menu() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMenusAsync());
        // move to home
        dispatch(startOrderAsync())
    }, []);

    const menus = useSelector(selectMenus);
    const idOrder = useSelector(selectIdOrder)

    const orderItemsInState = useSelector(selectItemsOrder)
    const orderItems = orderItemsInState === undefined ? [] : orderItemsInState;

    const categories = menus.map(m => m.category).filter(onlyUnique);

    const [category, setCategory] = useState({
        // current name of category
        currentCat: "STARTER",
        // part of menu corresponding to the category
        catMenu: selectMenuByCategory(menus, "STARTER")
    });

    const [open, setOpen] = useState(false);

    function openOrder() {
        setOpen(true);
    }

    function onDismiss() {
        setOpen(false)
    }

    const {isShowing, toggle, idItem} = useModal();


    function changeCat(newCat) {
        setCategory({
            currentCat: newCat,
            catMenu: selectMenuByCategory(menus, newCat)
        })
    }


    async function removeItem(itemId, howMany) {
        if (howMany > 0) {
            await dispatch(removeItemToOrderAsync({
                orderID: idOrder,
                menuItem: itemId
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

    return <div className={"main"}>
        <h1 id={'titles'}>MiamMiam</h1>
        <div id={'filters'}>
            {categories.map((cat, i) =>
                <div onClick={() => changeCat(cat)}>{cat}</div>
            )}</div>
        <div id={'menu-list'}>
            {category.catMenu.map(({_id, image, category, shortName, price}, index) =>
                <div className={'item-card'} key={index}
                     onClick={() => {
                         toggle(_id, idOrder);
                     }}>
                    <img src={image} className={'img-display'}/>
                    <div id={'description'}>
                        <div id={'dish'}>{shortName}  </div>
                        <div id={'price'}>{price} €</div>
                    </div>
                </div>
            )}
        </div>

        <div className={"footer"} onClick={openOrder}>
            <div id={"drawer"}>
                <div id={'order-items'}>
                    {orderItems.slice(0, 3).map(({item, howMany}) =>
                        <div id={"plus-minus"}>{howMany}x {item.shortName}</div>
                    )}
                </div>
                <button className={"button-1"}>Validate</button>
            </div>
        </div>


        <Modal isShowing={isShowing} hide={toggle} itemId={idItem} idOrder={idOrder}/>
        <link rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

        <BottomSheet

            open={open}
            onDismiss={onDismiss}
            snapPoints={({minHeight}) => minHeight}>
            <div id={"drawer"}>
                <div id={'order-items'}>
                    {orderItems.map(({item, howMany}) =>
                        <div id={"plus-minus"}>
                            <div id={"plus-minus"}>
                                <i className="fa fa-minus" id={"i"}
                                   onClick={() => removeItem(item._id, howMany)}></i>
                                <div>{howMany}</div>
                                <i className="fa fa-plus" id={"i"}
                                   onClick={() => addItem(item._id, item.shortName)}></i>
                            </div>
                            {item.shortName}
                        </div>
                    )}
                </div>
                <button className={"button-1"} onClick={()=>navigate("/recap")}>Validate</button>
            </div>
        </BottomSheet>
    </div>;

}