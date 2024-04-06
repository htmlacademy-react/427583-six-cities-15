import { createSlice } from '@reduxjs/toolkit';

import { TOffer, TOfferFull, TUserReview } from '@/common/types';

import { logout } from '../auth/thunks';
import { updateOfferFavoriteStatus } from '../favorites/thunks';
import { resetFavorites, updateFavorites } from '../offers-list/utils';
import { fetchNearbyOffers, fetchOffer, fetchOfferReviews, postUserReview } from './thunks';

type TOfferStore = {
  offer?: TOfferFull;
  reviews: TUserReview[];
  nearbyOffers: TOffer[];
  shouldClearForm: boolean;
}

const initialState: TOfferStore = {
  offer: undefined,
  reviews: [],
  nearbyOffers: [],
  shouldClearForm: false,
};

const slice = createSlice({
  name: 'offer',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffer.fulfilled, (state, { payload }) => {
        state.offer = payload;
      })
      .addCase(fetchOfferReviews.fulfilled, (state, { payload }) => {
        state.reviews = payload;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, { payload }) => {
        state.nearbyOffers = payload;
      })
      .addCase(updateOfferFavoriteStatus.fulfilled, (state, { payload }) => {
        if (state.offer?.id === payload.id) {
          state.offer.isFavorite = payload.isFavorite;
        } else {
          state.nearbyOffers = updateFavorites(state.nearbyOffers, payload);
        }
      })
      .addCase(logout.fulfilled, (state) => {
        if (state.offer) {
          state.offer.isFavorite = false;
        }
        state.nearbyOffers = resetFavorites(state.nearbyOffers);
      })
      .addCase(postUserReview.pending, (state) => {
        state.shouldClearForm = false;
      })
      .addCase(postUserReview.fulfilled, (state, { payload }) => {
        state.reviews = [payload, ...state.reviews];
        state.shouldClearForm = true;
      });
  },
});


export const { reducer: offerReducer } = slice;
