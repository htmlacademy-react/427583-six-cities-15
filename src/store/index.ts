import { configureStore } from '@reduxjs/toolkit';

import { createApi } from '../services/api';
import rootReducer from './rootReducer';

export const api = createApi();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export default store;
