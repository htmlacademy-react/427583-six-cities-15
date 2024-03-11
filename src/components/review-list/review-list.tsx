import { AuthorizationStatus } from '../../common/const';
import { TUserReview } from '../../common/types';
import ReviewForm from '../review-form';
import ReviewItem from '../review-item';

type TProps = {
  authorizationStatus: AuthorizationStatus;
  reviews: TUserReview[];
}

const ReviewList = ({ authorizationStatus, reviews }: TProps) => {
  const reviewsCount = reviews.length;

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsCount}</span></h2>
      {reviewsCount > 0 && (
        <ul className="reviews__list">
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </ul>
      )}

      {authorizationStatus === AuthorizationStatus.Auth && (
        <ReviewForm />
      )}
    </section>
  );
};

export default ReviewList;
