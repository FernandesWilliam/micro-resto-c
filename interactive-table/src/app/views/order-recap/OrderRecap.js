import './order-recap.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectMenu } from '../../store/catalog-store';
import { useNavigate } from 'react-router-dom';
import { addItemToOrder, removeItemFromOrder, selectOrderItems, sendOrderForPreparation } from '../../store/order-store';
import Title from '../title/Title';
import RecapLine from './RecapLine';
import Button from '../buttons/Button';
import { useContext } from 'react';
import { ThemeContext } from '../../context/theme-context';
import BackButton from '../buttons/BackButton';

export default function OrderRecap() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {theme} = useContext(ThemeContext);

	const getItemDetails = (orderItems) => {
		return orderItems.map(item => {
			const details = menu.find(menuItem => menuItem._id === item.item._id);
			return {
				...item,
				fullName: details.fullName,
				price: details.price,
				image: details.image
			}
		})
	}

	const menu = useSelector(selectMenu);
	const orderItems = useSelector(selectOrderItems);
	const items = getItemDetails(orderItems);

	const addItem = async (itemId, itemShortName) => {
		dispatch(addItemToOrder({
			_id: itemId,
			shortName: itemShortName,
			howMany: 1
		}));
	}
	const removeItem = async (itemId, itemShortName) => {
		dispatch(removeItemFromOrder({
			menuItem: {
				_id: itemId,
				shortName: itemShortName,
				howMany: 1
			}
		}));
	}

	const submitOrder = async () => {
		dispatch(sendOrderForPreparation({}));
		navigate('/game');
	}

	return (
		<div className="recap">
			<BackButton onClick={() => {}} />
			<Title />
			<h2>Recap</h2>
			<div id='order-items-recap'>
				{
					items.map((item, index) =>
						<RecapLine item={item} key={index} addItem={addItem} removeItem={removeItem}/>
					)
				}
			</div>
			<div className="footer-recap" style={{ background: theme.background }}>
				<p>Total price: {items.reduce((sum, item) => sum + (item.howMany * item.price), 0)} €</p>
				<Button id='recap-complete-btn' onClick={submitOrder}>Validate</Button>
			</div>
		</div>
	)
}