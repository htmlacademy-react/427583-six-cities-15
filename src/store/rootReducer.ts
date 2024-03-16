import { combineReducers } from '@reduxjs/toolkit';

import { offersReducer } from './offers/offers.slice';

const rootReducer = combineReducers({
  offers: offersReducer,
});

export default rootReducer;
