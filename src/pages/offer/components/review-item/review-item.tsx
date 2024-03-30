import dayjs from 'dayjs';

import { TUserReview } from '@/common/types';
import Rating from '@/components/rating';

type TProps = {
  review: TUserReview;
}

const ReviewItem = ({ review }: TProps) => {
  const { user, rating, comment, date } = review;
  const fullDate = dayjs(date).format('YYYY-MM-DD');
  const shortDate = dayjs(date).format('MMMM YYYY');


  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <Rating
            className="reviews__stars"
            rating={rating}
          />
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time
          className="reviews__time"
          dateTime={fullDate}
        >
          {shortDate}
        </time>
      </div>
    </li>
  );
};

export default ReviewItem;
