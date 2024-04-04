
import { memo, useEffect } from 'react';

import { AuthorizationStatus } from '@/common/const';
import { getSortedReviews } from '@/common/utils';
import useAppDispatch from '@/hooks/use-app-dispatch';
import useAppSelector from '@/hooks/use-app-selector';
import { selectAuthorizationStatus } from '@/store/auth/selectors';
import { selectOfferReviews } from '@/store/offer/selectors';
import { fetchOfferReviews } from '@/store/offer/thunks';

import OfferReviewForm from '../review-form';
import ReviewItem from '../review-item';

type TProps = {
  offerId: string;
}

const ReviewList = ({ offerId }: TProps) => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const reviews = useAppSelector(selectOfferReviews);
  const sortedReviews = getSortedReviews(reviews);

  useEffect(() => {
    dispatch(fetchOfferReviews(offerId));
  }, [dispatch, offerId]);

  const updateReviews = () => {
    dispatch(fetchOfferReviews(offerId));
  };

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{sortedReviews.length}</span>
      </h2>
      {reviews?.length && (
        <ul className="reviews__list">
          {sortedReviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </ul>
      )}

      {authorizationStatus === AuthorizationStatus.Auth && (
        <OfferReviewForm
          offerId={offerId}
          onReviewSend={updateReviews}
        />
      )}
    </section>
  );
};

const MemoizedReviewList = memo(ReviewList);

export default MemoizedReviewList;
