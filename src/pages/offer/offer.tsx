import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { CITIES, NEARBY_OFFERS_COUNT, OfferType, RequestStatus } from '@/common/const';
import { TCityName } from '@/common/types';
import { getPluralString, getPointsFromOffers } from '@/common/utils';
import Header from '@/components/header';
import Loader from '@/components/loader';
import Map from '@/components/map';
import BookmarkButton from '@/components/offer/bookmark-button';
import Gallery from '@/components/offer/gallery';
import Host from '@/components/offer/host';
import InsideGoods from '@/components/offer/inside-goods';
import NearPlaces from '@/components/offer/near-places';
import ReviewList from '@/components/offer/review-list';
import Rating from '@/components/rating';
import useAppDispatch from '@/hooks/use-app-dispatch';
import useAppSelector from '@/hooks/use-app-selector';
import { selectRequestStatus } from '@/store/global/selectors';
import { selectCity } from '@/store/global/selectors';
import { setCity } from '@/store/global/slice';
import { selectNearbyOffers, selectOffer } from '@/store/offer/selectors';
import { fetchNearbyOffers, fetchOffer } from '@/store/offer/thunks';

import NotFound from '../not-found';

const Offer = () => {
  const dispatch = useAppDispatch();
  const { id: offerId } = useParams();

  const offer = useAppSelector(selectOffer);
  const selectedCity = useAppSelector(selectCity);
  const nearbyOffers = useAppSelector(selectNearbyOffers).slice(0, NEARBY_OFFERS_COUNT);
  const requestStatus = useAppSelector(selectRequestStatus);

  useEffect(() => {
    if (!offerId) {
      return;
    }

    dispatch(fetchOffer(offerId));
    dispatch(fetchNearbyOffers(offerId));
  }, [dispatch, offerId]);

  useEffect(() => {
    if (!offer) {
      return;
    }

    dispatch(setCity(offer.city.name as TCityName));
  }, [dispatch, offer]);

  if (!offer) {
    return [RequestStatus.Idle, RequestStatus.Loading].includes(requestStatus) ? <Loader /> : <NotFound />;
  }

  const nearbyPoints = getPointsFromOffers([...nearbyOffers, offer]);
  const bedroomsString = `${offer.bedrooms} ${getPluralString('Bedroom', offer.bedrooms)}`;
  const maxAdultsString = `Max ${offer.maxAdults} ${getPluralString('Adult', offer.maxAdults)}`;

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <Gallery images={offer.images} />
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
                <BookmarkButton offer={offer} />
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
              <InsideGoods goods={offer.goods} />
              <Host
                avatarUrl={offer.host.avatarUrl}
                name={offer.host.name}
                isPro={offer.host.isPro}
                description={offer.description}
              />
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
          <NearPlaces nearbyOffers={nearbyOffers} />
        </div>
      </main>
    </div>
  );
};

export default Offer;
