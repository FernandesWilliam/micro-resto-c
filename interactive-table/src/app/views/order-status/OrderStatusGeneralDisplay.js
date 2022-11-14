import Title from '../title/Title';
import { useDispatch, useSelector } from 'react-redux';
import { getMenu, selectMenu } from '../../store/catalog-store';
import { useEffect } from 'react';
import { getOrderStatus, selectOrderStatus } from '../../store/preparation-store';
import { billOrder, selectTableNumber } from '../../store/order-store';
import { useNavigate } from 'react-router-dom';
import Button from '../buttons/Button';

/**
 * Display for the table (general pad)
 */
export default function OrderStatusGeneralDisplay() {
	const navigate = useNavigate();
	const tableNumber = useSelector(selectTableNumber);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getMenu({}));
	}, [dispatch]);

	// It will allow to display dishes by their full name
	// however, it may need to fetch the menu first
	const menu = useSelector(selectMenu);
	const orderStatus = useSelector(selectOrderStatus);

	useEffect(() => {
		if (tableNumber === null)
			navigate('/');
		dispatch(getOrderStatus({}));
	}, [dispatch, orderStatus]);

	const getItemDetails = (orderItems) => {
		return orderItems.map(item => {
			const details = menu.find(menuItem => menuItem.shortName === item.shortName);
			return {
				...item,
				fullName: details?.fullName || item.shortName
			}
		})
	}

	const dishes = getItemDetails(orderStatus);

	const generalBill =  () => {
		dispatch(billOrder({tablePartitionNumber: null}));
	}

	return (
		<div className='main'>
			<Title />
			<div id="status-of-dishes">
				{
					dishes.map((dish, index) =>
						<div key={index}>{dish.fullName} {dish.startedAt === null ? 'sent' : dish.finishedAt === null ? 'started' : 'finished'}</div>
					)
				}
			</div>
			<footer>
				<Button id='general-bill-button' onClick={generalBill}>Bill</Button>
			</footer>
		</div>
	)
}