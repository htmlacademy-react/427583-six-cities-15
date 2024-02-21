
export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type OfferCity = {
  name: string;
  location: Location;
}

export type OfferType = 'apartment' | 'room' | 'house' | 'hotel';

export type Offer = {
  id: string;
  title: string;
  type: OfferType;
  price: number;
  previewImage: string;
  city: OfferCity;
  location?: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
}

