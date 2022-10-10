
import React  from "react";
import "./recap-line.css"

export function RecapLine(props) {
    const item = props.item;
    const howMany = props.howMany;
    const price = props.price;
    const image = props.image;

    return <div className="recap-row">
                <div className="row-info">
                    <img src={image} alt={item.shortName}></img>
                    <p>{item.shortName}</p>
                </div>
                <div className="plusMinus">
                    <i className="fa fa-minus i"
                        onClick={() => props.removeItem(item._id, item.shortName, howMany)}></i>
                    <p>{howMany}</p>
                    <i className="fa fa-plus i"
                        onClick={() => props.addItem(item._id, item.shortName)}></i>
                </div>
                <p className="price">{howMany*price} €</p>
            </div>

}