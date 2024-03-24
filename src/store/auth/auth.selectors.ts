import { RootState } from '../store.types';

export const selectAuthorizationStatus = (state: RootState) => state.auth.authorizationStatus;

export const selectUser = (state: RootState) => state.auth.user;
