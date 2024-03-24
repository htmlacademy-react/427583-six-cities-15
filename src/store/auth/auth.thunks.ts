import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { Endpoint } from '../../common/const';
import { TUser, TUserAuthData } from '../../common/types';
import { removeToken, saveToken } from '../../services/token';

export const checkAuth = createAsyncThunk<TUser, undefined, { extra: AxiosInstance }>(
  'auth/checkAuth',
  async (_, { extra: api }) => {
    const { data: user } = await api.get<TUser>(Endpoint.Login);

    return user;
  }
);

export const login = createAsyncThunk<TUser, TUserAuthData, { extra: AxiosInstance }>(
  'auth/login',
  async ({ email, password }, { extra: api }) => {
    const { data: user } = await api.post<TUser>(Endpoint.Login, { email, password });
    saveToken(user?.token || '');

    return user;
  }
);

export const logout = createAsyncThunk<void, undefined, { extra: AxiosInstance }>(
  'auth/logout',
  async (_, { extra: api }) => {
    await api.delete(Endpoint.Logout);
    removeToken();
  }
);
