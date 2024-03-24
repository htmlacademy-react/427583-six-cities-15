import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CITIES, RequestStatus } from '../../common/const';
import { TCityName, TOffer } from '../../common/types';
import { fetchOffers } from './offers.thunks';

type TOffersStore = {
  offers: TOffer[];
  city: TCityName;
  status: RequestStatus;
}

const initialState: TOffersStore = {
  offers: [],
  city: CITIES.Amsterdam.name,
  status: RequestStatus.Idle,
};

const slice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<TCityName>) => {
      state.city = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export const { setCity } = slice.actions;

export const { reducer: offersReducer } = slice;
