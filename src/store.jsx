// store.js
import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './hooks/itemsSlice';

export const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
});