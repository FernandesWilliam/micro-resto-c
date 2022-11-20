import './game.css';
import Title from '../title/Title';
import Button from '../buttons/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { billOrder, selectTablePartitionNumber } from '../../store/order-store';

/**
 * Display a game interface to wait until the order is ready and served
 */
export default function Game() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const tablePartitionNumber = useSelector(selectTablePartitionNumber);

	const bill = () => {
		dispatch(billOrder({
			tablePartitionNumber: tablePartitionNumber
		}));

		navigate('/bill');
	}

	return (
		<div className="main" style={{ backgroundImage: 'url("/game_background.gif")', position: 'absolute' }}>
			<Title />
			<h2>It's Game time !</h2>

			<Button id="back-to-ordering-button"  onClick={() => navigate('/menu')}>
				Back to ordering
			</Button>

			<Button id="bill-btn" onClick={bill}>
				Bill
			</Button>
		</div>
	)
}