import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {useDispatch, useSelector} from "react-redux";
import {getMenusAsync, selectMenuByID, selectMenus} from "../../store/catalog-store";
import {addItemToOrderAsync} from "../../store/order-store";


const Modal = ({isShowing, hide, itemId, idOrder}) => {
    const menus = useSelector(selectMenus);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getMenusAsync());
    }, [dispatch]);
    const item = selectMenuByID(menus, itemId);

    const [data, setData] = useState({
        nb: 0,
        price: item?.price || 0
    });

    function addItem() {
        setData({nb: data.nb + 1, price: (data.nb + 1) * item.price});
    }

    function removeItem() {
        if (data.nb > 0) {
            setData({nb: data.nb - 1, price: data.price - item.price});
        }
    }

    async function addToCard() {
        if (data.nb > 0) {
            dispatch(addItemToOrderAsync({
                orderID: idOrder,
                menuItem: itemId,
                menuItemShortName: item.shortName,
                howMany: data.nb
            }));
        }
        setData({nb: 0, price: 0})
    }

    function quit(){
        hide();
        setData({nb: 0, price: 0})
    }

    return isShowing
        ? ReactDOM.createPortal(
            <>
                <div className="modal-overlay">
                    <link rel="stylesheet"
                          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                    <div className="modal-wrapper">
                        <div className="modal">
                            <div className="modal-header">
                                <h4>{item.fullName}</h4>
                                <button
                                    type="button"
                                    className="modal-close-button"
                                    onClick={quit}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <img src={item.image} style={{height: '50vh'}} className={'img-display'} alt={'Failure loading'}/>
                            <div id={"add"}>
                                <div id={"remove-add"}>
                                    <i className="fa fa-minus" onClick={removeItem}></i>
                                    <div>{data.nb}</div>
                                    <i className="fa fa-plus" onClick={addItem}></i>

                                </div>
                                <div className="price">{data.price}€</div>
                            </div>
                            <div id={"add-card"}>
                                <button class="button-1" onClick={() => {
                                    addToCard();
                                    hide(itemId, idOrder);
                                }}>Add to card
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <style jsx="true">{`
                  #add {
                    display: flex;
                    justify-content: space-between;
                  }

                  #remove-add {
                    display: flex;
                    justify-content: space-evenly;
                  }

                  #add-card {
                    justify-content: right;
                  }
                  
                  i {
                    padding-right: 1rem;
                    padding-left: 1rem;
                  }

                  .price {
                    font-family: 'Courier New', monospace;
                    font-weight: bold;
                  }

                  .button-1 {
                    background-color: #EA4C89;
                    border-radius: 8px;
                    border-style: none;
                    box-sizing: border-box;
                    color: #FFFFFF;
                    cursor: pointer;
                    display: inline-block;
                    font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    height: 40px;
                    line-height: 20px;
                    list-style: none;
                    margin: 0;
                    outline: none;
                    padding: 10px 16px;
                    position: relative;
                    text-align: center;
                    text-decoration: none;
                    transition: color 100ms;
                    vertical-align: baseline;
                    user-select: none;
                    -webkit-user-select: none;
                    touch-action: manipulation;
                  }

                  .button-1:hover,
                  .button-1:focus {
                    background-color: #F082AC;
                  }

                  .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 300vh;
                    z-index: 1040;
                    background-color: rgba(0, 0, 0, 0.5);
                  }

                  .modal-wrapper {
                    position: fixed;
                    top: 0;
                    left: 0;
                    z-index: 1050;
                    width: 100%;
                    height: 100%;
                    overflow-x: hidden;
                    overflow-y: auto;
                    outline: 0;
                    display: flex;
                    align-items: center;
                  }

                  .modal {
                    z-index: 100;
                    background: #fff;
                    position: relative;
                    margin: auto;
                    border-radius: 5px;
                    max-width: 500px;
                    width: 80%;
                    padding: 1rem;
                  }

                  .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                  }

                  .modal-close-button {
                    font-size: 1.4rem;
                    font-weight: 700;
                    color: #000;
                    cursor: pointer;
                    border: none;
                    background: transparent;
                  }

                  #plusbtn {
                    width: 35px;
                    height: 35px;
                    border-bottom: solid 2px #4F3C35;
                    background-color: #377BB5;
                    color: white;
                    border-radius: 50%;
                    font-size: 35px;
                    display: flex;
                    margin: 15px 10px;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    vertical-align: top;
                  }
                `}</style>
            </>,
            document.body
        )
        : null;
}


export default Modal;