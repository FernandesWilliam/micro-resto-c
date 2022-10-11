import './order-list.css'

export function OrderList(props) {
    return (
        <ul>
            {
                props.orders.map(
                    (order,index) => <li key={index} style={{ color: props.color }}>{order}</li>)
            }
        </ul>
    )
}