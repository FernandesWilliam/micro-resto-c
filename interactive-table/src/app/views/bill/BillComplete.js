import './bill-complete.css';
import Title from '../title/Title';
import Button from '../buttons/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { forgetOrder } from '../../store/order-store';

export default function BillComplete () {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const home = () => {
		dispatch(forgetOrder());

		navigate('/welcome');
	}

	return (
		<div className='main'>
			<Title />

			<h2>Thank you</h2>

			<footer>
				<Button id='home-btn' onClick={home}>
					Home
				</Button>
			</footer>
		</div>
	)
}