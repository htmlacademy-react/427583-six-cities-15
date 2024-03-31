import { MAX_REVIEWS_COUNT } from './const';
import { TOffer, TPoint, TUserReview } from './types';

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
