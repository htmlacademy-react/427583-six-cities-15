import { FavoriteStatus } from './const';

export type TLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type TOfferCity = {
  name: string;
  location: TLocation;
}

export type TOfferType = 'apartment' | 'room' | 'house' | 'hotel';

export type TOffer = {
  id: string;
  title: string;
  type: TOfferType;
  price: number;
  city: TOfferCity;
  location: TLocation;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}

export type TOfferFull = TOffer & {
  description: string;
  images: string[];
  goods: string[];
  host: {
    isPro: boolean;
    name: string;
    avatarUrl: string;
  };
  bedrooms: number;
  maxAdults: number;
}

export type TCity = {
  name: string;
  latitude: number;
  longitude: number;
  zoom: number;
};

export type TPoint = {
  id: string;
  latitude: number;
  longitude: number;
};

export type TUser = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
}

export type TUserShort = Omit<TUser, 'email' | 'token'>;

export type TUserReview = {
  id: string;
  date: string;
  user: TUserShort;
  comment: string;
  rating: number;
}

export type TCityName = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';

export type TCities = {
  [K in TCityName]: {
    name: TCityName;
    latitude: number;
    longitude: number;
    zoom: number;
  };
};

export type TUserAuthData = {
  email: string;
  password: string;
}

export type TRatingNamed = 'perfect' | 'good' | 'not bad' | 'badly' | 'terribly';

export type TRating = {
  [K: string]: TRatingNamed;
};

export type TReviewComment = {
  comment: string;
  rating?: number;
}

export type TFavoritesPayload = {
  offerId: string;
  status: FavoriteStatus;
}
