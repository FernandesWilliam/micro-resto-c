import './order-status.css';
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

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	return (
		<div className='main'>
			<Title />
			<div id="state-display">
				<div className={'column-recap'}>
					<div className={'states'}>Sent</div>
					{dishes.filter((d) => d.startedAt === null).map((dish, index) =>
					<div key={index}>{capitalizeFirstLetter(dish.shortName)}</div>)}
				</div>
				<div className={'column-recap'}>
					<div className={'states'}>Started</div>
					{dishes.filter((d) => d.startedAt !== null && d.finishedAt === null).map((dish, index) =>
						<div key={index}>{capitalizeFirstLetter(dish.shortName)}</div>)}
				</div>
				<div className={'column-recap'}>
					<div className={'states'}>Finished</div>
					{dishes.filter((d) => d.startedAt !== null && d.finishedAt !== null).map((dish, index) =>
						<div key={index}>{capitalizeFirstLetter(dish.shortName)}</div>)}
				</div>
			</div>

			<footer>
				<Button id='general-bill-button' onClick={generalBill}>Bill</Button>
			</footer>
		</div>
	)
}