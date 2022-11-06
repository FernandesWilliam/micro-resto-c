import Button from '../buttons/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectMenu } from '../../store/catalog-store';

export default function OrderRecapCard ({items, style}) {
	const navigate = useNavigate();

	const menu = useSelector(selectMenu);

	const getItemDetails = (orderItems) => {
		return orderItems.map(item => {
			const details = menu.find(menuItem => menuItem._id === item.item._id);
			return {
				...item,
				fullName: details.fullName
			}
		})
	}

	const orderLines = getItemDetails(items);

	return (
		<div id='order-recap' style={style}>
			Total dishes selected: {orderLines.reduce((sum, item) => sum + item.howMany, 0)}
			<ul style={{ listStyleType: 'none' }}>
				{
					orderLines.map((item, index) => <li key={index}>{item.howMany}&times; {item.fullName}</li>)
				}
			</ul>
			<Button id='recap-complete-btn' onClick={() => navigate('/recap')}>Complete</Button>
		</div>
	)
}