import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from './auth/auth.slice';
import { offersReducer } from './offers/offers.slice';

const rootReducer = combineReducers({
  offers: offersReducer,
  auth: authReducer,
});

export default rootReducer;
