import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    subscriptionStatus: null,
};

export const subscriptionStatusSlice = createSlice({
        name: 'subscriptionStatus',
        initialState,
        reducers: {
            subscribed: (state, action) => {
                state.subscriptionStatus = action.payload;
            },
            unsubscribed: (state) => {
                state.subscriptionStatus = null;
            }
    },
});

export const { subscribed, unsubscribed } = subscriptionStatusSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.user.value)`
export const selectSubscriptionStatus = (state) => state.subscriptionStatus.subscriptionStatus;

export default subscriptionStatusSlice.reducer;
