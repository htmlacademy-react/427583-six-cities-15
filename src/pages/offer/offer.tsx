import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { CITIES, OfferType } from '../../common/const';
import { getPointsFromOffers } from '../../common/utils';
import Header from '../../components/header';
import Map from '../../components/map';
import PlaceCard from '../../components/place-card';
import Rating from '../../components/rating';
import ReviewList from '../../components/review-list';
import useAppDispatch from '../../hooks/use-app-dispatch';
import useAppSelector from '../../hooks/use-app-selector';
import { selectNearbyOffers, selectOffer } from '../../store/offer/selectors';
import { fetchNearbyOffers, fetchOffer } from '../../store/offer/thunks';
import { selectCity } from '../../store/offers-list/selectors';
import NotFound from '../not-found';

const NEARBY_OFFERS_COUNT = 3;
const MAX_IMAGES_COUNT = 6;

const Offer = () => {
  const dispatch = useAppDispatch();
  const { id: offerId } = useParams();
  const offer = useAppSelector(selectOffer);
  const selectedCity = useAppSelector(selectCity);
  const nearbyOffers = useAppSelector(selectNearbyOffers).slice(0, NEARBY_OFFERS_COUNT);
  const nearbyPoints = getPointsFromOffers(nearbyOffers);

  useEffect(() => {
    if (!offerId) {
      return;
    }

    dispatch(fetchOffer(offerId));
    dispatch(fetchNearbyOffers(offerId));
  }, [dispatch, offerId]);

  useEffect(() => {
    if (!offer || !nearbyPoints.length || !offerId) {
      return;
    }

    nearbyPoints.push({
      id: offerId,
      latitude: offer.location.latitude,
      longitude: offer.location.longitude,
    });
  }, [offer, nearbyPoints, offerId]);

  if (!offer) {
    return <NotFound />;
  }

  const bedroomsString = `${offer.bedrooms} Bedroom${offer.bedrooms > 1 ? 's' : ''}`;
  const maxAdultsString = `Max ${offer.maxAdults} Adult${offer.maxAdults > 1 ? 's' : ''}`;

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images.slice(0, MAX_IMAGES_COUNT).map((image) => (
                <div
                  className="offer__image-wrapper"
                  key={image}
                >
                  <img
                    className="offer__image"
                    src={image}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <Rating className="offer__stars" rating={offer.rating} />
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {OfferType[offer.type]}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedroomsString}
                </li>
                <li className="offer__feature offer__feature--adults">
                  {maxAdultsString}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={offer.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {offer.host.name}
                  </span>
                  {offer.host.isPro && (
                    <span className="offer__user-status">
                      Pro
                    </span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              {offerId && <ReviewList offerId={offerId} />}
            </div>
          </div>
          <Map
            className="offer__map"
            city={CITIES[selectedCity]}
            points={nearbyPoints}
            selectedPointId={offerId}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearbyOffers.map((item) => (
                <PlaceCard key={item.id} {...item} variant="near-places" />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Offer;
