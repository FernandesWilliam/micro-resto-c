import { useState } from 'react';

/**
 * Hook to use a modal (store if the modal is displayed or not, the data linked to the modal and the toggle function)
 */
export default function useModal() {
	const [shown, setShown] = useState(false);
	const [itemId, setItemId] = useState('');

	function toggle(itemId) {
		setShown(!shown);
		setItemId(itemId);
	}

	return [shown, toggle, itemId];
}