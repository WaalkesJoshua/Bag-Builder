import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { discSlice } from './slicers/discSlice';

const rootReducer = combineReducers({
  discs: discSlice.reducer
});

const store = configureStore({ reducer: rootReducer});

export default store;