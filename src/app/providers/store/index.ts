import {combineReducers, configureStore} from '@reduxjs/toolkit';
import explorerReducer from '../../../entities/explorer/model';
import curatorReducer from '../../../entities/curator/model';
import userReducer from '../../../entities/user/model';
import galaxySlice from '../../../entities/galaxy/model/slice'
import logger from "redux-logger";
import {GalaxyType} from "@/entities/galaxy/model/types";

const rootReducer = combineReducers({
  explorer: explorerReducer,
  curator: curatorReducer,
  user: userReducer,
  galaxies: galaxySlice,
})

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
  galaxies: GalaxyType,
}

export type AppDispatch = typeof store.dispatch

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store;