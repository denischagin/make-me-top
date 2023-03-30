import { createSlice} from '@reduxjs/toolkit'
import { getGalaxy } from "../api/getGalaxy"

const galaxySlice = createSlice({
    name: 'galaxy',
    initialState: {
        list: [],
    },
    reducers: {
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getGalaxy.fulfilled, (state, action) => {
            // Add user to the state array
            state.list = action.payload;
        })
    },
})

// export const { galaxyReducer } = galaxySlice.actions
export default galaxySlice.reducer