import { CITY_NAMES, MAX_REVIEWS_COUNT } from './const';
import { TCityName, TOffer, TPoint, TUserReview } from './types';

export const getPointsFromOffers = (offers: TOffer[]) => offers.reduce((acc: TPoint[], { id, location }) => {
  acc.push({
    id,
    latitude: location.latitude,
    longitude: location.longitude,
  });

  return acc;
}, []);


const compareDates = (a: TUserReview, b: TUserReview) => Date.parse(b.date) - Date.parse(a.date);

export const getSortedReviews = (
  reviews: TUserReview[]
) => [...reviews].sort(compareDates).slice(0, MAX_REVIEWS_COUNT);

export const getRandomCityName = (): TCityName => CITY_NAMES[Math.floor(Math.random() * CITY_NAMES.length)];
