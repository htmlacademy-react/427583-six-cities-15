
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

