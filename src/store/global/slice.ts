import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CITIES, RequestStatus } from '@/common/const';
import { TCityName } from '@/common/types';


type TGlobalStore = {
  requestStatus: RequestStatus;
  city: TCityName;
}

const initialState: TGlobalStore = {
  requestStatus: RequestStatus.Idle,
  city: CITIES.Paris.name,
};

const slice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<TCityName>) => {
      state.city = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher<AnyAction>(
        (action: AnyAction) => String(action.type).includes('/pending'),
        (state) => {
          state.requestStatus = RequestStatus.Loading;
        },
      )
      .addMatcher<AnyAction>(
        (action: AnyAction) => String(action.type).includes('/fulfilled'),
        (state) => {
          state.requestStatus = RequestStatus.Success;
        },
      )
      .addMatcher<AnyAction>(
        (action: AnyAction) => String(action.type).includes('/rejected'),
        (state) => {
          state.requestStatus = RequestStatus.Failed;
        },
      );
  }
});

export const { setCity } = slice.actions;

export const { reducer: globalReducer } = slice;
