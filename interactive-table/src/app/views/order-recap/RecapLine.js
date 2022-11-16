import { useContext } from 'react';
import { ThemeContext } from '../../context/theme-context';

/**
 * A recap line about on item of the order
 */
export default function RecapLine({item, addItem, removeItem}) {
	const {theme} = useContext(ThemeContext);

	return (
		<div className='recap-row' style={{ background: theme.recap_card_background }}>
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