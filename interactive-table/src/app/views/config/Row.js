import './row.css';

/**
 * Generic display to print a form row
 *
 * @param name The name of the Raw
 * @param children The HTML element to display that performs user entry
 */
export default function Row ({name, children}) {
	return (
		<label>
			<span>{name}</span>
			{children}
		</label>
	)
}