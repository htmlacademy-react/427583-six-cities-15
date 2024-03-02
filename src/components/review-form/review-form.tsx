import { ChangeEvent, FormEvent, Fragment, useState } from 'react';

import { TRating, TRatingNumeric, TReview } from './types';

const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 300;

const RATINGS: TRating = {
  5: 'perfect',
  4: 'good',
  3: 'not bad',
  2: 'badly',
  1: 'terribly'
};

const reversedRatings = Object.keys(RATINGS).reverse();

const ReviewForm = () => {
  const [reviewForm, setReviewForm] = useState<TReview>({
    review: '',
    rating: undefined,
  });

  const clearForm = () => {
    setReviewForm({
      review: '',
      rating: undefined,
    });
  };

  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target;

    setReviewForm({
      ...reviewForm,
      [name]: value
    });
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    clearForm();
  };

  const isFormValid = () => {
    const { review, rating } = reviewForm;

    return rating && (review.length >= MIN_REVIEW_LENGTH && review.length <= MAX_REVIEW_LENGTH);
  };

  const { review } = reviewForm;

  return (
    <form className="reviews__form form" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {reversedRatings.map((rating) => (
          <Fragment key={rating}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={rating}
              id={`${rating}-stars`}
              type="radio"
              checked={rating === reviewForm.rating}
              onChange={handleFieldChange}
            />
            <label
              htmlFor={`${rating}-stars`}
              className="reviews__rating-label form__rating-label"
              title={RATINGS[rating as TRatingNumeric]}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        onChange={handleFieldChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isFormValid()}
        >Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
