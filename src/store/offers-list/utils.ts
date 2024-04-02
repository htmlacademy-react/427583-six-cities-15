import { TOffer, TOfferFull } from '@/common/types';

export const updateFavorites = (offersList: TOffer[], payload: TOfferFull) => offersList.map((offer) => {
  if (offer.id === payload.id) {
    return {
      ...offer,
      isFavorite: payload.isFavorite,
    };
  }
  return offer;
});
