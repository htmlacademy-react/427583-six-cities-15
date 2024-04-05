import axios, { AxiosError, AxiosInstance } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';

import store from '@/store';
import { clearAuth } from '@/store/auth/slice';

import { getToken, removeToken } from './token';

type DetailMessageType = {
  type: string;
  message: string;
}

const BACKEND_URL = 'https://15.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      const detailMessage = error.response?.data?.message ?? error.message;
      toast.error(detailMessage);

      if (error.response?.status === StatusCodes.UNAUTHORIZED) {
        store.dispatch(clearAuth());
        removeToken();
      }

      throw error;
    }
  );

  return api;
};
