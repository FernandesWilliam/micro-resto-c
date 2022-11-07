import { useContext } from 'react';
import { ThemeContext } from '../../context/theme-context';

export default function Button({ id, onClick, children }) {
	const {theme} = useContext(ThemeContext);

	return (
		<div id={id} className='button'
			 onClick={onClick}
			 style={{
				 background: theme.button_background,
				 color: theme.button_color,
				 '--box-shadow-color': theme.button_shadow
		}}>
			{children}
		</div>
	)
}