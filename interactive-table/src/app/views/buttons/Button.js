import { useContext } from 'react';
import { ThemeContext } from '../../context/theme-context';

/**
 * Custom button that update its theme according to app global theme
 * Usage: <Button id='something' onClick={onClickFunction}>My Button</Button>
 *
 * @param id the button id
 * @param onClick the button onClick function
 * @param children HTML element to display inside the button
 */
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