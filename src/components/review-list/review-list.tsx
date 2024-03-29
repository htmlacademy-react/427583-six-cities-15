import { useEffect } from 'react';

import { AuthorizationStatus } from '../../common/const';
import useAppDispatch from '../../hooks/use-app-dispatch';
import useAppSelector from '../../hooks/use-app-selector';
import { selectAuthorizationStatus } from '../../store/auth/selectors';
import { selectOfferReviews } from '../../store/offer/selectors';
import { fetchOfferReviews } from '../../store/offer/thunks';
import ReviewForm from '../review-form';
import ReviewItem from '../review-item';

type TProps = {
  offerId: string;
}

const ReviewList = ({ offerId }: TProps) => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const reviews = useAppSelector(selectOfferReviews);

  useEffect(() => {
    dispatch(fetchOfferReviews(offerId));
  }, [dispatch, offerId]);

  const updateReviews = () => {
    dispatch(fetchOfferReviews(offerId));
  };

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews?.length}</span>
      </h2>
      {reviews?.length && (
        <ul className="reviews__list">
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </ul>
      )}

      {authorizationStatus === AuthorizationStatus.Auth && (
        <ReviewForm
          offerId={offerId}
          onReviewSend={updateReviews}
        />
      )}
    </section>
  );
};

export default ReviewList;
