import cn from 'classnames';

import { FavoriteStatus } from '@/common/const';
import { TOfferFull } from '@/common/types';
import { useFavorite } from '@/hooks/use-favorite';

type TProps = {
  offer: TOfferFull;
}

const BookmarkButton = ({ offer }: TProps) => {
  const status = offer.isFavorite ? FavoriteStatus.NotFavorite : FavoriteStatus.Favorite;

  const handleFavoriteClick = useFavorite(offer.id, status);

  return (
    <button
      className={cn([
        'offer__bookmark-button',
        offer.isFavorite ? 'offer__bookmark-button--active' : '',
        'button'
      ])}
      type="button"
      onClick={handleFavoriteClick}
    >
      <svg className="offer__bookmark-icon" width="31" height="33">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
};

export default BookmarkButton;
