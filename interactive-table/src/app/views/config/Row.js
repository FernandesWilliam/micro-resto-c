import './row.css';

export default function Row ({name, children}) {
	return (
		<label>
			<span>{name}</span>
			{children}
		</label>
	)
}