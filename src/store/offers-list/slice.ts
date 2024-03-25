import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CITIES, RequestStatus } from '../../common/const';
import { TCityName, TOffer } from '../../common/types';
import { fetchOffersList } from './thunks';

type TOffersListStore = {
  offersList: TOffer[];
  city: TCityName;
  status: RequestStatus;
}

const initialState: TOffersListStore = {
  offersList: [],
  city: CITIES.Amsterdam.name,
  status: RequestStatus.Idle,
};

const slice = createSlice({
  name: 'offersList',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<TCityName>) => {
      state.city = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersList.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchOffersList.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.offersList = action.payload;
      })
      .addCase(fetchOffersList.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export const { setCity } = slice.actions;

export const { reducer: offersListReducer } = slice;
