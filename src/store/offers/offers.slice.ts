import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CITIES } from '../../common/const';
import { TCityName, TOffer } from '../../common/types';

type TOffersStore = {
  offers: TOffer[];
  city: TCityName;
}

const initialState: TOffersStore = {
  offers: [],
  city: CITIES.Amsterdam.name,
};

const slice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setOffers: (state, action: PayloadAction<TOffer[]>) => {
      state.offers = action.payload;
    },
    setCity: (state, action: PayloadAction<TCityName>) => {
      state.city = action.payload;
    },
  }
});

export const { setOffers, setCity } = slice.actions;

export const { reducer: offersReducer } = slice;
