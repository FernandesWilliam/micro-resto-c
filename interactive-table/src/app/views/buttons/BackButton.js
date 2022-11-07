import { useNavigate } from 'react-router-dom';

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