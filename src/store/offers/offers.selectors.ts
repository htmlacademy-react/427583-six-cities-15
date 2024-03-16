import { RootState } from '../store.types';

export const selectOffers = (state: RootState) => state.offers.offers;

export const selectCity = (state: RootState) => state.offers.city;
