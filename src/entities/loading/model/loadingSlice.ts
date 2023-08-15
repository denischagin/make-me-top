import {
    AnyAction,
    createSlice,
} from '@reduxjs/toolkit';

import {
    FulfilledAction,
    LoadingState,
    ModifiedRejectedAction,
    PendingAction,
} from './types';

const initialState: LoadingState = {
    isLoading: false,
};

function isPendingAction(action: AnyAction): action is PendingAction {
    return action.type.endsWith('/pending');
}

function isFulfilledAction(action: AnyAction): action is FulfilledAction {
    return action.type.endsWith('/fulfilled');
}

function isRejectedAction(action: AnyAction): action is ModifiedRejectedAction {
    return action.type.endsWith('/rejected');
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = !state.isLoading;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(isPendingAction, (state) => {
                state.isLoading = true;
            })
            .addMatcher(isFulfilledAction, (state) => {
                state.isLoading = false;
            })
            .addMatcher(isRejectedAction, (state) => {
                state.isLoading = false;
            });
    },
});

export const {
    setLoading,
} = loadingSlice.actions;

export default loadingSlice.reducer;