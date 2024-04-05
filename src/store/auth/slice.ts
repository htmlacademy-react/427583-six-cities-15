import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthorizationStatus } from '@/common/const';
import { Nullable, TUser } from '@/common/types';
import { removeToken } from '@/services/token';

import { checkAuth, login, logout } from './thunks';

type TAuthStore = {
  authorizationStatus: AuthorizationStatus;
  user: Nullable<TUser>;
}

const initialState: TAuthStore = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    clearAuth: (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
        removeToken();
      })
      .addCase(logout.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      });
  }
});

export const { setAuthorizationStatus, clearAuth } = slice.actions;

export const { reducer: authReducer } = slice;
