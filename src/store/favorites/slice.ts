import { createSlice } from '@reduxjs/toolkit';

import { TOffer } from '@/common/types';

import { fetchFavoritesList, updateOfferFavoriteStatus } from './thunks';

type TFavoritesStore = {
  favoritesList: TOffer[];
}

const initialState: TFavoritesStore = {
  favoritesList: [],
};

const slice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritesList.fulfilled, (state, action) => {
        state.favoritesList = action.payload;
      })
      .addCase(updateOfferFavoriteStatus.fulfilled, (state, { payload }) => {
        state.favoritesList = state.favoritesList.filter((item) => item.id !== payload.id);
      });
  }
});

export const { reducer: favoritesReducer } = slice;
