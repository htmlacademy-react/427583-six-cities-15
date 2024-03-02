export type TRatingNumeric = '5' | '4' | '3' | '2' | '1';

export type TRatingNamed = 'perfect' | 'good' | 'not bad' | 'badly' | 'terribly';

export type TRating = {
  [K in TRatingNumeric]: TRatingNamed;
};

export type TReview = {
  review: string;
  rating?: TRatingNumeric;
}
