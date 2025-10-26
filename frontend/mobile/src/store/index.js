// src/store/index.js

import { configureStore } from '@reduxjs/toolkit';
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
        // Ignore non-serializable values (e.g., functions, promises) in actions
        ignoredActions: ['content/generateContent/fulfilled'],
        ignoredPaths: ['content.generatedData'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export default store;

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;