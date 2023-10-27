import { createSlice } from '@reduxjs/toolkit';

import { UserState } from './types/index';

const initialState: UserState = {
    isModalOpen: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        showModal: (state) => {
            state.isModalOpen = true;
        },
        toggleModal: (state) => {
            state.isModalOpen = !state.isModalOpen;
        },
        closeModal: (state) => {
            state.isModalOpen = false;
        },
    },
    extraReducers: (builder) => {
        builder;
    },
});

export const { toggleModal, closeModal, showModal } = userSlice.actions;

export default userSlice.reducer;
