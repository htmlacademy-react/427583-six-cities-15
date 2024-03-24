
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
  previewImage: string;
  city: TOfferCity;
  location?: TLocation;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
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

export type TUserReview = {
  id: string;
  comment: string;
  date: string;
  rating: number;
  user: TUser;
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
