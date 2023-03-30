import { createSlice } from '@reduxjs/toolkit'
import { CuratorState } from './interfaces';

const initialState: CuratorState = {
  isCurator: false,
}

export const curatorSlice = createSlice({
  name: 'curator',
  initialState,
  reducers: {
    selectRoleAsCurator: (state) => {
      state.isCurator = true;
    }
  }
})

// Action creators are generated for each case reducer function
export const { selectRoleAsCurator } = curatorSlice.actions

export default curatorSlice.reducer