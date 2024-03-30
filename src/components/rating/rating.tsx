import cn from 'classnames';
import { memo } from 'react';

import getRatingWidth from './getRatingWidth';

type TProps = {
  rating: number;
  className?: string;
}

const Rating = ({ rating, className }: TProps) => (
  <div
    className={cn([
      className ? className : '',
      'rating__stars'
    ])}
  >
    <span style={{ width: `${getRatingWidth(rating)}%` }} />
    <span className="visually-hidden">{rating}</span>
  </div >
);

const MemoizedRating = memo(Rating);

export default MemoizedRating;
