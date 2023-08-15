import {
    AsyncThunk,
    SerializedError,
} from '@reduxjs/toolkit';

export interface LoadingState {
    isLoading: boolean
}

export type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

export type PendingAction = ReturnType<GenericAsyncThunk['pending']>
export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
export type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

//add error and its type to RejectedAction
export type Modify<T, R> = Omit<T, keyof R> & R;
export type ModifiedRejectedAction = Modify<RejectedAction, {
    error: SerializedError
}>
