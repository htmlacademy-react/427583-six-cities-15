import { ChangeEvent, FormEvent, Fragment, useCallback, useState } from 'react';

import { RequestStatus } from '@/common/const';
import { TRating, TReviewComment } from '@/common/types';
import useAppDispatch from '@/hooks/use-app-dispatch';
import useAppSelector from '@/hooks/use-app-selector';
import { selectRequestStatus } from '@/store/global/selectors';
import { postUserReview } from '@/store/offer/thunks';

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

type TProps = {
  offerId: string;
  onReviewSend: () => void;
}

const ReviewForm = ({ offerId, onReviewSend }: TProps) => {
  const dispatch = useAppDispatch();
  const loadingStatus = useAppSelector(selectRequestStatus);

  const [reviewForm, setReviewForm] = useState<TReviewComment>({
    comment: '',
    rating: undefined,
  });

  const clearForm = () => {
    setReviewForm({
      comment: '',
      rating: 0,
    });
  };

  const isFormValid = useCallback(() => {
    const { comment, rating } = reviewForm;

    return rating && (comment.length >= MIN_REVIEW_LENGTH && comment.length <= MAX_REVIEW_LENGTH);
  }, [reviewForm]);

  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target;

    setReviewForm({
      ...reviewForm,
      [name]: value
    });
  };

  const handleFormSubmit = useCallback((evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!isFormValid()) {
      return;
    }

    dispatch(postUserReview({
      id: offerId,
      comment: reviewForm.comment,
      rating: Number(reviewForm.rating),
    }))
      .unwrap()
      .then(() => {
        onReviewSend();
        clearForm();
      });
  }, [dispatch, isFormValid, offerId, onReviewSend, reviewForm.comment, reviewForm.rating]);

  const { comment } = reviewForm;

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
              checked={Number(rating) === Number(reviewForm.rating)}
              onChange={handleFieldChange}
            />
            <label
              htmlFor={`${rating}-stars`}
              className="reviews__rating-label form__rating-label"
              title={RATINGS[rating]}
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
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleFieldChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isFormValid() || loadingStatus === RequestStatus.Loading}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
