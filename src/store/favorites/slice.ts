import { createSlice } from '@reduxjs/toolkit';

import { RequestStatus } from '../../common/const';
import { TOffer } from '../../common/types';
import { fetchFavoritesList } from './thunks';

type TFavoritesStore = {
  favoritesList: TOffer[];
  status: RequestStatus;
}

const initialState: TFavoritesStore = {
  favoritesList: [],
  status: RequestStatus.Idle,
};

const slice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritesList.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchFavoritesList.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.favoritesList = action.payload;
      })
      .addCase(fetchFavoritesList.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});

export const { reducer: favoritesReducer } = slice;
