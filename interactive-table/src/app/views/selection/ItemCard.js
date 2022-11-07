import { useContext } from 'react';
import { ThemeContext } from '../../context/theme-context';

export default function ItemCard ({ dish, onClick }) {
	const {theme} = useContext(ThemeContext);

	return (
		<div className='item-card'
			 onClick={onClick}
			 style={{ background: theme.card_background }}
		>
			<img src={dish.image} className='img-display' alt='Failure loading' />
			<div className='description'>
				<div className='dish'>{dish.fullName}</div>
				<div className='itemPrice'>{dish.price} €</div>
			</div>
		</div>
	)
}