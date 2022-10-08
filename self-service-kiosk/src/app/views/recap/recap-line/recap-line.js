
import React  from "react";
import "./recap-line.css"

export function RecapLine(props) {
    const item = props.item;
    const howMany = props.howMany;
    const price = props.price;
    const image = props.image;

    return <div id="recap-row">
                <div id="row-info">
                    <img src={image}></img>
                    <p>{item.shortName}</p>
                </div>
                <div id="plusMinus">
                    <i className="fa fa-minus" id={"i"}
                        onClick={() => props.removeItem(item._id, item.shortName, howMany)}></i>
                    <p>{howMany}</p>
                    <i className="fa fa-plus" id={"i"}
                        onClick={() => props.addItem(item._id, item.shortName)}></i>
                </div>
                <p id="price">{howMany*price}</p>
            </div>

}