import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { Endpoint } from '@/common/const';
import { TOffer, TOfferFull, TReviewComment, TUserReview } from '@/common/types';

export const fetchOffer = createAsyncThunk<TOfferFull, string, { extra: AxiosInstance }>(
  'offer/fetchOffer',
  async (id, { extra: api }) => {
    const response = await api.get<TOfferFull>(`${Endpoint.Offers}/${id}`);
    return response.data;
  }
);

export const fetchOfferReviews = createAsyncThunk<TUserReview[], string, { extra: AxiosInstance }>(
  'offer/fetchOffersReviews',
  async (id, { extra: api }) => {
    const response = await api.get<TUserReview[]>(`${Endpoint.Comments}/${id}`);
    return response.data;
  }
);

export const fetchNearbyOffers = createAsyncThunk<TOffer[], string, { extra: AxiosInstance }>(
  'offer/fetchNearbyOffers',
  async (id, { extra: api }) => {
    const response = await api.get<TOffer[]>(`${Endpoint.Offers}/${id}/nearby`);
    return response.data;
  }
);

export const postUserReview = createAsyncThunk<TUserReview, { id: string } & TReviewComment, { extra: AxiosInstance }>(
  'offer/postUserReview',
  async ({ id, comment, rating }, { extra: api }) => {
    const response = await api.post<TUserReview>(`${Endpoint.Comments}/${id}`, { comment, rating });

    return response.data;
  }
);
