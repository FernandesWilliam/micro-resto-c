import { useNavigate } from 'react-router-dom';

/**
 * Custom back button usable anywhere in the app
 *
 * @param onClick function to add custom behaviour on button click. In any-case, the button goes back to previous screen
 */
export default function BackButton({ onClick }) {
	const navigate = useNavigate();

	function action() {
		navigate(-1);

		onClick();
	}

	return (
		<div id='back-button' onClick={action} className='button' style={{ background: 'none' }}>
			<span className="material-symbols-rounded" style={{ width: '36px', height: '36px' }}>
				arrow_back
			</span>
		</div>
	)
}