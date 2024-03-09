import cn from 'classnames';
import { Link } from 'react-router-dom';

import { TOfferType } from '../../common/types';
import { getRatingWidth } from '../../utils/utils';

type TVersion = 'primary' | 'secondary';

type TProps = {
  id: string;
  title: string;
  type: TOfferType;
  price: number;
  previewImage: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  version?: TVersion;
  onSelect?: (title: string) => void;
}

const PlaceCard = ({
  id,
  title,
  type,
  price,
  previewImage,
  isFavorite,
  isPremium,
  rating,
  version = 'primary',
  onSelect
}: TProps) => {
  const definingClass = version === 'primary' ? 'cities' : 'favorites';
  const linkToRoute = `/offer/${id}`;

  const handleCardHover = () => {
    if (onSelect) {
      onSelect(id);
    }
  };

  const handleMouseLeave = () => {
    if (onSelect) {
      onSelect('');
    }
  };

  return (
    <article
      className={cn(`${definingClass}__card`, 'place-card')}
      onMouseEnter={handleCardHover}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div
        className={cn(`${definingClass}__image-wrapper`, 'place-card__image-wrapper')}
      >
        <Link to={linkToRoute}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place previewImage" />
        </Link>
      </div>
      <div
        className={cn({
          'favorites__card-info': version === 'secondary',
          'place-card__info': true,
        })}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={cn([
              'place-card__bookmark-button',
              'button',
              isFavorite ? 'place-card__bookmark-button--active' : ''
            ])}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${getRatingWidth(rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={linkToRoute}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

export default PlaceCard;
