import {useDispatch, useSelector} from "react-redux";
import React, {useState} from 'react';
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
    selectItemsOrder
} from "../../store/order-store";
import {useNavigate} from "react-router-dom";
import {Title} from "../title/title";

/**
 * filter to get all distinct element in a list
 * https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
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

    }, [dispatch]);

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

    useEffect(() => {
        setCategory({
            currentCat: "STARTER",
            catMenu: selectMenuByCategory(menus, "STARTER")
        })
    }, [menus])

    const [open, setOpen] = useState(false);

    const {isShowing, toggle, idItem} = useModal();


    function changeCat(newCat) {
        setCategory({
            currentCat: newCat,
            catMenu: selectMenuByCategory(menus, newCat)
        })
    }

    async function removeItem(itemId, howMany) {
        if (howMany > 0) {
            dispatch(removeItemToOrderAsync({
                orderID: idOrder,
                menuItem: itemId
            }));
        }
    }

    async function addItem(itemId, itemShortName) {
        dispatch(addItemToOrderAsync({
            orderID: idOrder,
            _id: itemId,
            shortName: itemShortName,
            howMany: 1
        }));
    }


    return <div className={"main"}>
        <Title />
        <div id={'filters'}>
            {categories.map((cat, i) =>
                <div key={i} onClick={() => changeCat(cat)}>{cat}</div>
            )}</div>
        <div className={'menu-list'}>
            {category.catMenu.map(({_id, image, category, shortName, price}, index) =>
                <div className={'item-card'} key={index}
                     onClick={() => {

                         toggle(_id, idOrder);
                     }}>
                    <img src={image} className={'img-display'} alt={'Failure loading'}/>
                    <div className={'description'}>
                        <div className={'dish'}>{shortName}  </div>
                        <div className={'priceMenu'}>{price} €</div>
                    </div>
                </div>
            )}
        </div>

        <div className={"footerMenu"} onClick={ () =>setOpen(true) }>
            <div className={"drawerMenu"}>
                <div className={'orderItemsMenu'}>
                    {orderItems.slice(0, 3).map(({item, howMany},key) =>
                        <div key={key} className={"plus-minus"}>{howMany}x {item.shortName}</div>
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
            onDismiss={ () =>setOpen(false)}
            snapPoints={({minHeight}) => minHeight}>
            <div className={"drawerMenu"}>
                <div className={'order'}>
                    {orderItems.map(({item, howMany},index) =>
                        <div key={index} className="together">
                            <div className="plus-minus">
                                <i className="fa fa-minus"
                                   onClick={() => removeItem(item._id, howMany)}></i>
                                <div>{howMany}</div>
                                <i className="fa fa-plus"
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