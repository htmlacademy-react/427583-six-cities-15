import { RootState } from '../store.types';

export const selectOffer = (state: RootState) => state.offer.offer;

export const selectOfferReviews = (state: RootState) => state.offer.reviews;

export const selectNearbyOffers = (state: RootState) => state.offer.nearbyOffers;

export const selectShouldClearForm = (state: RootState) => state.offer.shouldClearForm;
