import cn from 'classnames';

import { OfferType } from '../../common/types';
import { getRatingWidth } from '../../utils/utils';

type Verion = 'primary' | 'secondary';

type Props = {
  title: string;
  type: OfferType;
  price: number;
  previewImage: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  version?: Verion;
}

const PlaceCard = ({ title, type, price, previewImage, isFavorite, isPremium, rating, version = 'primary' }: Props) => {
  const definingClass = version === 'primary' ? 'cities' : 'favorites';

  return (
    <article className={cn(`${definingClass}__card`, 'place-card')}>
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div
        className={cn(`${definingClass}__image-wrapper`, 'place-card__image-wrapper')}
      >
        <a href="#">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place previewImage" />
        </a>
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
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

export default PlaceCard;
