import { createSlice } from '@reduxjs/toolkit';

import { RequestStatus } from '../../common/const';
import { TOffer, TOfferFull, TUserReview } from '../../common/types';
import { fetchNearbyOffers, fetchOffer, fetchOfferReviews, postUserReview } from './thunks';

type TOfferStore = {
  offer?: TOfferFull;
  reviews: TUserReview[];
  nearbyOffers: TOffer[];
  status: RequestStatus;
}

const initialState: TOfferStore = {
  offer: undefined,
  reviews: [],
  nearbyOffers: [],
  status: RequestStatus.Idle,
};

const slice = createSlice({
  name: 'offer',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffer.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchOffer.fulfilled, (state, { payload }) => {
        state.status = RequestStatus.Success;
        state.offer = payload;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(fetchOfferReviews.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchOfferReviews.fulfilled, (state, { payload }) => {
        state.status = RequestStatus.Success;
        state.reviews = payload;
      })
      .addCase(fetchOfferReviews.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(fetchNearbyOffers.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, { payload }) => {
        state.status = RequestStatus.Success;
        state.nearbyOffers = payload;
      })
      .addCase(fetchNearbyOffers.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(postUserReview.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(postUserReview.fulfilled, (state) => {
        state.status = RequestStatus.Success;
      })
      .addCase(postUserReview.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });

  },
});


export const { reducer: offerReducer } = slice;
