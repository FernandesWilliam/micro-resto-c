import { configureStore } from '@reduxjs/toolkit';
import catalogReducer from './catalog-store.js'
export const store = configureStore({
  reducer: {
    catalog:catalogReducer
  },
});
