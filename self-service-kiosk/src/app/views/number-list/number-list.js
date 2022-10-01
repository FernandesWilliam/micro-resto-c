import './number-list.css'

export function NumberList(props) {
    const numbers = props.numbers;
    const list = numbers.map((number) => <li key={number.toString()}>{number}</li>);
    return (
        <ul>{list}</ul>
    )
}