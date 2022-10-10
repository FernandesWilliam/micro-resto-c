import './order-list.css'

export function OrderList(props) {
    return (
        <ul>
            {
                props.orders.map(
                    (order) => <li key={order._id.toString()} style={{ color: props.color }}>{order.tableNumber}</li>)
            }
        </ul>
    )
}