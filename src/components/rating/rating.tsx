import cn from 'classnames';
import { memo } from 'react';

import { getRatingCSS } from '@/common/utils';


type TProps = {
  rating: number;
  className?: string;
}

const Rating = ({ rating, className }: TProps) => (
  <div
    className={cn([
      className,
      'rating__stars'
    ])}
  >
    <span style={getRatingCSS(rating)} />
    <span className="visually-hidden">{rating}</span>
  </div >
);

const MemoizedRating = memo(Rating);

export default MemoizedRating;
