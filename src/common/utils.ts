import { TOffer, TPoint } from './types';

export const getPointsFromOffers = (offers: TOffer[]) => offers.reduce((acc: TPoint[], { id, location }) => {
  acc.push({
    id,
    latitude: location.latitude,
    longitude: location.longitude,
  });

  return acc;
}, []);
