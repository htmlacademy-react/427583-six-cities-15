import { createSlice } from '@reduxjs/toolkit';

import { TOffer, TOfferFull, TUserReview } from '@/common/types';

import { updateOfferFavoriteStatus } from '../favorites/thunks';
import { updateFavorites } from '../offers-list/utils';
import { fetchNearbyOffers, fetchOffer, fetchOfferReviews } from './thunks';

type TOfferStore = {
  offer?: TOfferFull;
  reviews: TUserReview[];
  nearbyOffers: TOffer[];
}

const initialState: TOfferStore = {
  offer: undefined,
  reviews: [],
  nearbyOffers: [],
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
      });
  },
});


export const { reducer: offerReducer } = slice;
