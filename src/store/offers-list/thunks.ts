import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { Endpoint } from '../../common/const';
import { TOffer } from '../../common/types';

export const fetchOffersList = createAsyncThunk<TOffer[], undefined, { extra: AxiosInstance }>(
  'offersList/fetchOffersList',
  async (_, { extra: api }) => {
    const response = await api.get<TOffer[]>(Endpoint.Offers);
    return response.data;
  }
);
