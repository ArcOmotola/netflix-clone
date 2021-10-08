import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import subscriptionStatusReducer from '../features/subscriptionStatus';

export const store = configureStore({
    reducer: {
        user: userReducer,
        subscriptionStatus: subscriptionStatusReducer,
    },
});
