import {useEffect} from "react";
import {startOrderAsync} from "../store/order-store.js";
import {useDispatch, useSelector} from "react-redux";

export function Test() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(startOrderAsync());
    }, []);


    return <div>
        Testing mode
    </div>;
}