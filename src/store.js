import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { discSlice } from './discSlice';

const rootReducer = combineReducers({
  discs: discSlice.reducer
});

const store = configureStore({ reducer: rootReducer});

export default store;