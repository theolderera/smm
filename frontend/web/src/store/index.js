// frontend/web/src/store/index.js

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import userReducer from './slices/userSlice';
import brandReducer from './slices/brandSlice';
import contentReducer from './slices/contentSlice';
import analyticsReducer from './slices/analyticsSlice';
import academyReducer from './slices/academySlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    brand: brandReducer,
    content: contentReducer,
    analytics: analyticsReducer,
    academy: academyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'content/generateContent/fulfilled',
          'persist/PERSIST',
          'persist/REHYDRATE'
        ],
        ignoredPaths: ['content.generatedData'],
      },
      immutableCheck: true,
      thunk: true,
    }),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: {},
  enhancers: [],
});

// Enable refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export default store;

// These types should be moved to types.ts if using TypeScript
/* 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
*/