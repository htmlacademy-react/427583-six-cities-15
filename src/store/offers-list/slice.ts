import { createSlice } from '@reduxjs/toolkit';

import { CITIES, SortType } from '@/common/const';
import { TCityName, TOffer } from '@/common/types';

import { updateOfferFavoriteStatus } from '../favorites/thunks';
import { fetchOffersList } from './thunks';
import { updateFavorites } from './utils';

type TOffersListStore = {
  offersList: TOffer[];
  city: TCityName;
  sortType: SortType;
}

const initialState: TOffersListStore = {
  offersList: [],
  city: CITIES.Paris.name,
  sortType: SortType.Popular,
};

const slice = createSlice({
  name: 'offersList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersList.fulfilled, (state, action) => {
        state.offersList = action.payload;
      })
      .addCase(updateOfferFavoriteStatus.fulfilled, (state, { payload }) => {
        state.offersList = updateFavorites(state.offersList, payload);
      });
  }
});

export const { reducer: offersListReducer } = slice;
