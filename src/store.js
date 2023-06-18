import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { discSlice } from './slicers/discSlice';
import { userSlice } from './slicers/userSlice';

const rootReducer = combineReducers({
  discs: discSlice.reducer,
  users: userSlice.reducer,
});

const store = configureStore({ reducer: rootReducer});

export default store;