import cn from 'classnames';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import { TOfferType } from '@/common/types';

import Rating from '../rating';

type TVariant = 'cities' | 'favorites' | 'near-places';

const cardVariant = {
  cities: {
    card: 'cities__card',
    image: 'cities__image-wrapper',
    info: '',
  },
  favorites: {
    card: 'favorites__card',
    image: 'favorites__image-wrapper',
    info: 'favorites__card-info',
  },
  ['near-places']: {
    card: 'near-places__card',
    image: 'near-places__image-wrapper',
    info: '',
  }
};

type TProps = {
  id: string;
  title: string;
  type: TOfferType;
  price: number;
  previewImage: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  variant?: TVariant;
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
  variant = 'cities',
  onSelect
}: TProps) => {
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
      className={cn(cardVariant[variant].card, 'place-card')}
      onMouseEnter={handleCardHover}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={cn(cardVariant[variant].image, 'place-card__image-wrapper')}>
        <Link to={linkToRoute}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place previewImage" />
        </Link>
      </div>
      <div className={cn(cardVariant[variant].info, 'place-card__info')}>
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
          <Rating className="place-card__stars" rating={rating} />
        </div>
        <h2 className="place-card__name">
          <Link to={linkToRoute}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

const MemoizedPlaceCard = memo(PlaceCard);

export default MemoizedPlaceCard;
