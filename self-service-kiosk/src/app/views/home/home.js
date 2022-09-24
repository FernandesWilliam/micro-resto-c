import {useDispatch, useSelector} from "react-redux";
import {getMenusAsync, selectMenus, getMenuByID} from "../../store/catalog-store.js";
import {useEffect} from "react";
import './home.css';

export function Home() {

    const menus = useSelector(selectMenus);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMenusAsync());
    }, []);


    return <div>
        <h1>MIAMMIAM</h1>
        Il y a {menus.length} menus disponible
        <div id={'filters'}>
            <span>Starter</span>
            <span>Main</span>
            <span>Dessert</span>
            <span>Beverage</span>
        </div>
        <div id={'menu-list'}>
            {menus.map(({image, category, shortName, price},index) => <div className={'item-card'} key={index}>
                    <div>{shortName} {price}</div>
                    <img src={image} className={'img-display'}/>
                    <div>
                        {category}
                    </div>
                </div>
            )}
        </div>


    </div>;

}