import { createSelector } from 'reselect';

import { RootState } from '../store.types';

export const selectOffers = (state: RootState) => state.offers.offers;

export const selectCity = (state: RootState) => state.offers.city;

export const selectStatus = (state: RootState) => state.offers.status;

export const selectOffersByCity = createSelector(
  [selectOffers, selectCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city)
);
