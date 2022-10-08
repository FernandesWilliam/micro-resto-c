import { useState } from "react";
import {useSelector} from "react-redux";
import {selectMenuByID} from "../../store/catalog-store";

const useModal = () => {
    const [isShowing, setIsShowing] = useState(false);
    const [idItem, setIdItem] = useState("");
    const [idOrder, setIdOrder] = useState("");


    function toggle(id, idOrder) {
        setIsShowing(!isShowing);
        setIdItem(id);
        setIdOrder(idOrder)

    }

    return {
        isShowing,
        toggle,
        idItem,
        idOrder
    };
};

export default useModal;