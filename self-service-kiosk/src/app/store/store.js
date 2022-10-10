import { configureStore } from '@reduxjs/toolkit';
import catalogReducer from './catalog-store.js';
import orderReducer from './order-store.js';
import {preparationReducer} from './preparation-store';

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    order: orderReducer,
    // Bind the preparation store state to `preparations` namespace in the global store state.
    preparations: preparationReducer
  },
});
