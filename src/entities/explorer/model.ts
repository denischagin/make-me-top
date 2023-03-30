import { createSlice } from '@reduxjs/toolkit'
import { ExplorerState } from './interfaces';

const initialState: ExplorerState = {
  isExplorer: false,
}

export const explorerSlice = createSlice({
  name: 'explorer',
  initialState,
  reducers: {
    selectRoleAsExplorer: state => {
      state.isExplorer = !state.isExplorer;
    }
  }
})

// Action creators are generated for each case reducer function
export const { selectRoleAsExplorer } = explorerSlice.actions

export default explorerSlice.reducer