import { configureStore } from '@reduxjs/toolkit';
import catalogStore from './catalog-store';
import orderStore from './order-store';
import preparationStore from './preparation-store';

export const store = configureStore({
	reducer: {
		catalog: catalogStore,
		order: orderStore,
		preparations: preparationStore
	}
});