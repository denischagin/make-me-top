import { configureStore } from '@reduxjs/toolkit';
import explorerReducer from '../../../entities/explorer/model';
import curatorReducer from '../../../entities/curator/model';
import userReducer from '../../../entities/user/model';

export default configureStore({
  reducer: {
    explorerReducer,
    curatorReducer,
    userReducer
  },
})