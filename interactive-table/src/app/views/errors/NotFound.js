import Title from '../title/Title';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../buttons/Button';

export default function NotFound() {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<div>
			<Title />
			<div><code>{location.pathname}</code> not found</div>
			<div id="footer">
				<Button id="home-button" onClick={() => navigate('/')}>Return Home</Button>
			</div>
			<style>{`
				#home-button {
					width: 60%;
					height: 150px;
	
					display: table;
				}
				#footer {
					width: vw;
					text-align: center;
					position: absolute;
					bottom: 5vh;
				}
			`}</style>
		</div>
	)
}