import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { Endpoint } from '@/common/const';
import { TUser, TUserAuthData } from '@/common/types';
import { removeToken, saveToken } from '@/services/token';

import { fetchFavoritesList } from '../favorites/thunks';
import { fetchOffersList } from '../offers-list/thunks';
import { AppDispatch } from '../store.types';

export const checkAuth = createAsyncThunk<TUser, undefined, { extra: AxiosInstance }>(
  'auth/checkAuth',
  async (_, { extra: api }) => {
    const { data: user } = await api.get<TUser>(Endpoint.Login);

    return user;
  }
);

export const login = createAsyncThunk<TUser, TUserAuthData, { dispatch: AppDispatch; extra: AxiosInstance }>(
  'auth/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data: user } = await api.post<TUser>(Endpoint.Login, { email, password });

    saveToken(user?.token || '');
    dispatch(fetchFavoritesList());

    return user;
  }
);

export const logout = createAsyncThunk<void, undefined, { dispatch: AppDispatch; extra: AxiosInstance }>(
  'auth/logout',
  async (_, { dispatch, extra: api }) => {
    await api.delete(Endpoint.Logout);

    removeToken();
    dispatch(fetchOffersList());
  }
);
