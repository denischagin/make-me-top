import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    profileAvatarHash: '',
};

const avatarSlice = createSlice({
    initialState,
    name: 'avatar',
    reducers: {
        setProfileAvatarHash: (state) => {
            state.profileAvatarHash = `${new Date().getTime()}`;
        },
    },
});

export default avatarSlice.reducer;
export const { setProfileAvatarHash } = avatarSlice.actions;