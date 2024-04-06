import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { Endpoint } from '@/common/const';
import { TFavoritesPayload, TOffer, TOfferFull } from '@/common/types';

import { AppDispatch } from '../store.types';

export const fetchFavoritesList = createAsyncThunk<TOffer[], void, { extra: AxiosInstance }>(
  'favorites/fetchFavoritesList',
  async (_, { extra: api }) => {
    const response = await api.get<TOffer[]>(Endpoint.Favorite);
    return response.data;
  }
);

export const updateOfferFavoriteStatus = createAsyncThunk<TOfferFull, TFavoritesPayload, { dispatch: AppDispatch; extra: AxiosInstance }>(
  'favorites/updateOfferFavoriteStatus',
  async ({ offerId, status }, { extra: api }) => {
    const response = await api.post<TOfferFull>(`${Endpoint.Favorite}/${offerId}/${status}`);
    return response.data;
  }
);
