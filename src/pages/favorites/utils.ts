import { TOffer } from '@/common/types';

export const sortFavoritesByCities = (favorites: TOffer[]) => favorites.reduce((offersList: { [K: string]: TOffer[] }, offer: TOffer) => {
  if (offersList[offer.city.name]) {
    offersList[offer.city.name].push(offer);
  } else {
    offersList[offer.city.name] = [offer];
  }

  return offersList;
}, {});
