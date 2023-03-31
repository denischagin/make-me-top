import {combineReducers, configureStore} from '@reduxjs/toolkit';
import explorerReducer from '../../../entities/explorer/model';
import curatorReducer from '../../../entities/curator/model';
import userReducer from '../../../entities/user/model';
import galaxySlice from '../../../entities/galaxy/model/slice'
import logger from "redux-logger";

const rootReducer = combineReducers({
  explorer: explorerReducer,
  curator: curatorReducer,
  user: userReducer,
  galaxy: galaxySlice,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = {
  explorer: {
    isExplorer: boolean
  },
  curator: {
    isCurator: boolean
  },
  user: {
    isRegistered: boolean
  },
  galaxy: {
    galacticId: number,
    galacticName: string,
    orbitList: Array<{
      orbitId: number,
      orbitLevel: number,
      positionCount: number,
      listPlanet: Array<{
        systemId: number,
        positionSystem: number,
        systemName: string,
        systemLevel: number,
        systemParentList: Array<{
          parent_id: number | null,
          isAlternative: boolean,
        }>,
        systemChildList: Array<number>,
      }>
    }>
  }
}
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store;