import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { Endpoint } from '@/common/const';
import { TOffer } from '@/common/types';

export const fetchFavoritesList = createAsyncThunk<TOffer[], void, { extra: AxiosInstance }>(
  'favorites/fetchFavoritesList',
  async (_, { extra: api }) => {
    const response = await api.get<TOffer[]>(Endpoint.Favorite);
    return response.data;
  }
);
