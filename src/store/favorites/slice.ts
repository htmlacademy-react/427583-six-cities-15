import { createSlice } from '@reduxjs/toolkit';

import { TOffer } from '@/common/types';

import { fetchFavoritesList } from './thunks';

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
      });
  }
});

export const { reducer: favoritesReducer } = slice;
