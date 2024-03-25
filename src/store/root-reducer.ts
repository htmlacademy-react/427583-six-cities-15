import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from './auth/slice';
import { offerReducer } from './offer/slice';
import { offersListReducer } from './offers-list/slice';

const rootReducer = combineReducers({
  offersList: offersListReducer,
  auth: authReducer,
  offer: offerReducer,
});

export default rootReducer;
