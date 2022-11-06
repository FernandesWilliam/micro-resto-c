import { useState } from 'react';

export default function useModal() {
	const [shown, setShown] = useState(false);
	const [itemId, setItemId] = useState('');

	function toggle(itemId) {
		setShown(!shown);
		setItemId(itemId);
	}

	return [shown, toggle, itemId];
}