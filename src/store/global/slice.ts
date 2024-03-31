import { AnyAction, createSlice } from '@reduxjs/toolkit';

import { RequestStatus } from '@/common/const';


type TGlobalStore = {
  requestStatus: RequestStatus;
}

const initialState: TGlobalStore = {
  requestStatus: RequestStatus.Idle
};

const slice = createSlice({
  name: 'global',
  initialState,
  reducers: {},
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

export const { reducer: globalReducer } = slice;
