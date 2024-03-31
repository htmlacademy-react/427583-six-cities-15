import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CITIES } from '@/common/const';
import { TCityName, TOffer } from '@/common/types';

import { fetchOffersList } from './thunks';

type TOffersListStore = {
  offersList: TOffer[];
  city: TCityName;
}

const initialState: TOffersListStore = {
  offersList: [],
  city: CITIES.Paris.name,
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
      .addCase(fetchOffersList.fulfilled, (state, action) => {
        state.offersList = action.payload;
      });
  }
});

export const { setCity } = slice.actions;

export const { reducer: offersListReducer } = slice;
