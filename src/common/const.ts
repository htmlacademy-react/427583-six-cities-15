import { TCities } from './types';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = 'offer/:id'
}

export enum AuthorizationStatus {
  Auth = 'Auth',
  NoAuth = 'NoAuth',
  Unknown = 'Unknown'
}

export const CITIES: TCities = {
  Paris: {
    name: 'Paris',
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 12
  },
  Cologne: {
    name: 'Cologne',
    latitude: 50.938361,
    longitude: 6.959974,
    zoom: 12
  },
  Brussels: {
    name: 'Brussels',
    latitude: 50.846557,
    longitude: 4.351697,
    zoom: 12
  },
  Amsterdam: {
    name: 'Amsterdam',
    latitude: 52.3909553943508,
    longitude: 4.85309666406198,
    zoom: 12
  },
  Hamburg: {
    name: 'Hamburg',
    latitude: 53.550341,
    longitude: 10.000654,
    zoom: 12
  },
  Dusseldorf: {
    name: 'Dusseldorf',
    latitude: 51.225402,
    longitude: 6.776314,
    zoom: 12
  },
};

export enum SortType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export enum RequestStatus {
  Idle = 'Idle',
  Loading = 'Loading',
  Success = 'Success',
  Failed = 'Failed',
}

export const Endpoint = {
  Offers: '/offers',
  Login: '/login',
  Logout: '/logout',
  Comments: '/comments',
  Favorite: '/favorite',
};

export const OfferType = {
  apartment: 'Apartment',
  room: 'Room',
  house: 'House',
  hotel: 'Hotel'
};

export const MAX_REVIEWS_COUNT = 10;

export enum FavoriteStatus {
  NotFavorite = 0,
  Favorite = 1,
}
