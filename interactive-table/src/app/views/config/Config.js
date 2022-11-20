import './config.css';
import Title from '../title/Title';
import Button from '../buttons/Button';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { configureTableInfo } from '../../store/order-store';
import Row from './Row';
import { ThemeContext } from '../../context/theme-context';

/**
 * Initial screen to config a pad. Used by the waiter to set table pad for customer or for the table.
 */
export default function Config() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {theme, toggleTheme} = useContext(ThemeContext);
	const modes = ['customer', 'table'];

	const [tableNumber, setTableNumber] = useState(1);
	const [mode, setMode] = useState('customer');
	const [tablePartitionNumber, setTablePartitionNumber] = useState(1);

	const validate = () => {
        console.log(`The table has been configured in ${mode} mode`);
		dispatch(configureTableInfo({
			tableNumber: tableNumber,
			tablePartitionNumber: tablePartitionNumber
		}));

		const path = mode === 'customer' ? '/welcome' : '/status';
		navigate(path);
	}

	return (
		<div id="config-menu-container"
			 style={{
				 background: theme.background,
				 color: theme.text_color
			 }}>
			<Title/>

			<Row name='Table Number'>
				<input type='number' value={tableNumber} onChange={(e) => setTableNumber(parseInt(e.target.value))}/>
			</Row>
			<Row name='Mode'>
				<div style={{display: "inline"}}>
					{
						modes.map((value, index) =>
							<div key={index}
								 onClick={() => setMode(value)}
								 className={mode === value ? "radio-btn selected" : "radio-btn"}>
								{value}
							</div>)
					}
				</div>
			</Row>
			<Row name='Table Partition Number'>
				<input type='number' value={tablePartitionNumber}
					   onChange={(e) => setTablePartitionNumber(parseInt(e.target.value))}/>
			</Row>

			<Button id='toggle-theme-btn' onClick={toggleTheme}>
                <span className="material-symbols-rounded">
					{theme.icon}
				</span>
			</Button>

			<footer>
				<Button id='validate-btn' onClick={validate}>Validate</Button>
			</footer>
		</div>
	)
}