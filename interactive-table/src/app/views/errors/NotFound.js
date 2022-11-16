import Title from '../title/Title';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../buttons/Button';

/**
 * Error display (page not found)
 */
export default function NotFound() {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<div>
			<Title />
			<div><code>{location.pathname}</code> not found</div>
			<footer>
				<Button id="home-button" onClick={() => navigate('/')}>Return Home</Button>
			</footer>
			<style>{`
				#home-button {
					width: 60%;
					height: 150px;
	
					display: table;
				}
				footer {
					width: 100%;
					position: absolute;
					bottom: 5%;
					justify-content: space-evenly;
				}
			`}</style>
		</div>
	)
}