import { configureStore } from '@reduxjs/toolkit';
import catalogReducer from './catalog-store.js'
import orderReducer from './order-store.js'
export const store = configureStore({
  reducer: {
    catalog:catalogReducer,
    order:orderReducer
  },
});
