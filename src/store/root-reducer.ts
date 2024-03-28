import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from './auth/slice';
import { favoritesReducer } from './favorites/slice';
import { offerReducer } from './offer/slice';
import { offersListReducer } from './offers-list/slice';

const rootReducer = combineReducers({
  offersList: offersListReducer,
  auth: authReducer,
  offer: offerReducer,
  favorites: favoritesReducer,
});

export default rootReducer;
