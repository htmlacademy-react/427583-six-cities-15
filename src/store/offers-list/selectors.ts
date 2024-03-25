import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store.types';

export const selectOffersList = (state: RootState) => state.offersList.offersList;

export const selectCity = (state: RootState) => state.offersList.city;

export const selectStatus = (state: RootState) => state.offersList.status;

export const selectOffersByCity = createSelector(
  [selectOffersList, selectCity],
  (offersList, city) => offersList.filter((offer) => offer.city.name === city)
);
