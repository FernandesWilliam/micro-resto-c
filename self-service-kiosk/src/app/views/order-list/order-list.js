import './order-list.css'

export function OrderList(props) {
    return (
        <ul>
            {
                props.orders.map(
                    (order) => <li key={order} style={{ color: props.color }}>{order}</li>)
            }
        </ul>
    )
}