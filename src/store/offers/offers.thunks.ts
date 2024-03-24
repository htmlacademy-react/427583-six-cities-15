import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { Endpoint } from '../../common/const';
import { TOffer } from '../../common/types';

export const fetchOffers = createAsyncThunk<TOffer[], undefined, { extra: AxiosInstance }>(
  'fetchOffers/all',
  async (_, { extra: api }) => {
    const response = await api.get<TOffer[]>(Endpoint.Offers);
    return response.data;
  }
);
