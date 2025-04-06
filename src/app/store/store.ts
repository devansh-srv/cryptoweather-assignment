import { configureStore } from '@reduxjs/toolkit';
import preferencesReducer from './preferenceSlice';
import cryptoReducer from './cryptoSlice';
import weatherReducer from './weatherSlice';
import notificationsReducer from './notificationSlice';

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    crypto: cryptoReducer,
    weather: weatherReducer,
    notifications: notificationsReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
