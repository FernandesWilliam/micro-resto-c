import './welcome.css';
import Title from '../title/Title';
import Button from '../buttons/Button';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../context/theme-context';

export default function Welcome() {
	const navigate = useNavigate();
	const {theme} = useContext(ThemeContext);

	function start() {
		navigate('/menu');
	}

	return (
		<div className="main">
			<Title />
			<div id="around" style={{ background: theme.background }}>
				<img src="/logoFastFood.png" alt="Welcome to MiamMiam's restaurant" />
				<Button id="start" onClick={start}>
					Touch to start the order.
				</Button>
			</div>
		</div>
	)
}