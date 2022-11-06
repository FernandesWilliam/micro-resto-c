export default function RecapLine({item, addItem, removeItem}) {
	return (
		<div className='recap-row'>
			<div className='row-info'>
				<img src={item.image} alt={item.shortName} />
				<p>{item.fullName}</p>
			</div>
			<div className='plus-minus'>
				<b onClick={() => removeItem(item._id, item.shortName, item.howMany)}>-</b>
				<p>{item.howMany}</p>
				<b onClick={() => addItem(item._id, item.shortName)}>+</b>
			</div>
			<p className="price">{item.howMany * item.price} €</p>
		</div>
	);
}