import './add-item.css';
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getMenu, selectItemById, selectMenu } from '../../store/catalog-store';
import { useContext, useEffect, useState } from 'react';
import { addItemToOrder } from '../../store/order-store';
import Button from '../buttons/Button';
import { ThemeContext } from '../../context/theme-context';

/**
 * Pop-up to add item to an order
 *
 * @param isShown is the modal displayed ?
 * @param hide Hide the modal on close button click
 * @param itemId id of the item to add to the order
 */
export default function AddItemModal ({isShown, hide, itemId}) {
	const menu = useSelector(selectMenu);
	const dispatch = useDispatch();
	const {theme} = useContext(ThemeContext);

	useEffect(() => {
		dispatch(getMenu({}));
	}, [dispatch]);

	const item = selectItemById(menu, itemId);
	const [quantity, setQuantity] = useState(1);

	const addItem = () => setQuantity(quantity + 1);
	const removeItem = () => setQuantity(Math.max(quantity - 1, 0));

	const quit = () => {
		hide();
		setQuantity(1);
	}

	const submit = async () => {
		if (quantity <= 0) return;
		dispatch(addItemToOrder({
			_id: itemId,
			shortName: item.shortName,
			howMany: quantity
		}));
		quit();
	}

	return (
		isShown ?
		ReactDOM.createPortal((
			<div className='modal-overlay' style={{ background: theme.modal_overlay }}>
				<div className='modal-wrapper'>
					<div className='modal' style={{ background: theme.background, color: theme.text_color }}>
						<div className='modal-header'>
							<h4>{item.fullName}</h4>
							<div className='button' onClick={quit} style={{
								background: 'none',
								'--box-shadow-color': 'none',
								fontSize: '20px'
							}}>
								<span style={{ color: theme.text_color }}>&times;</span>
							</div>
						</div>
						<img src={item.image} style={{height: '50vh'}} className='img-display' alt='Loading...' />
						<div className='add'>
							<div className='remove-add'>
								<b className='clickable'
								   style={{ fontSize: '20px' }}
								   onClick={removeItem}>-</b>
								<div id='quantity-display'>{quantity}</div>
								<b className='clickable'
								   style={{ fontSize: '20px' }}
								   onClick={addItem}>+</b>
							</div>
							<div id="price-display">{quantity * (item?.price || 0)} €</div>
						</div>
						<div className='add-card'>
							<Button id='add-to-cart-button' onClick={submit}>Add to card</Button>
						</div>
					</div>
				</div>
			</div>
			),
			document.body
		) : null
	)
}