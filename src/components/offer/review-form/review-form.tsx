import { ChangeEvent, FormEvent, Fragment, useCallback, useEffect, useState } from 'react';

import { Rating, RATINGS, RequestStatus, ReviewLength } from '@/common/const';
import { TReviewComment } from '@/common/types';
import useAppDispatch from '@/hooks/use-app-dispatch';
import useAppSelector from '@/hooks/use-app-selector';
import { selectRequestStatus } from '@/store/global/selectors';
import { selectShouldClearForm } from '@/store/offer/selectors';
import { postUserReview } from '@/store/offer/thunks';

type TProps = {
  offerId: string;
}

const ReviewForm = ({ offerId }: TProps) => {
  const dispatch = useAppDispatch();
  const loadingStatus = useAppSelector(selectRequestStatus);
  const shouldClearForm = useAppSelector(selectShouldClearForm);

  const [reviewForm, setReviewForm] = useState<TReviewComment>({
    comment: '',
    rating: null,
  });

  const clearForm = () => {
    setReviewForm({
      comment: '',
      rating: null,
    });
  };

  useEffect(() => {
    if (shouldClearForm) {
      clearForm();
    }
  }, [shouldClearForm]);

  const isFormValid = useCallback(() => {
    const { comment, rating } = reviewForm;

    return rating && (comment.length >= ReviewLength.Min && comment.length <= ReviewLength.Max);
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
    }));
  }, [dispatch, isFormValid, offerId, reviewForm]);

  const { comment } = reviewForm;

  return (
    <form className="reviews__form form" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATINGS.map((rating) => (
          <Fragment key={rating}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={rating}
              id={`${rating}-stars`}
              type="radio"
              checked={Number(rating) === Number(reviewForm.rating)}
              disabled={loadingStatus === RequestStatus.Loading}
              onChange={handleFieldChange}
            />
            <label
              htmlFor={`${rating}-stars`}
              className="reviews__rating-label form__rating-label"
              title={Rating[rating]}
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
        disabled={loadingStatus === RequestStatus.Loading}
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
