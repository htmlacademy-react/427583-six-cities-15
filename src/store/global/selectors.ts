import { RootState } from '../store.types';

export const selectRequestStatus = (state: RootState) => state.global.requestStatus;

export const selectCity = (state: RootState) => state.global.city;
