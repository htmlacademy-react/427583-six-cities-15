import { useCallback, useMemo, useState } from 'react';

import { CITIES, SortType } from '@/common/const';
import { TOffer } from '@/common/types';
import { getPointsFromOffers } from '@/common/utils';
import useAppSelector from '@/hooks/use-app-selector';
import { selectCity, selectOffersByCity } from '@/store/offers-list/selectors';

import Map from '../map';
import OffersSort from '../offers-sort';
import PlaceCard from '../place-card';
import { sortOffersByType } from './utils';


const CityPlaces = () => {
  const offers = useAppSelector(selectOffersByCity);
  const selectedCity = useAppSelector(selectCity);

  const [selectedPointId, setSelectedPointId] = useState('');
  const [sortedOffers, setSortedOffers] = useState(offers);

  const mapPoints = useMemo(() => getPointsFromOffers(offers), [offers]);

  const handleCardSelect = useCallback((id: string) => {
    setSelectedPointId(id);
  }, []);

  const handleSortTypeChange = (sortType: SortType) => {
    setSortedOffers(sortOffersByType(offers, sortType));
  };

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{sortedOffers.length} places to stay in {selectedCity}</b>
          <OffersSort onSortTypeChange={handleSortTypeChange} />
          <div className="cities__places-list places__list tabs__content">
            {sortedOffers.map((offer: TOffer) => (
              <PlaceCard
                {...offer}
                key={offer.id}
                onSelect={handleCardSelect}
              />
            ))}
          </div>
        </section>
        <div className="cities__right-section">
          <Map
            className="cities__map"
            city={CITIES[selectedCity]}
            points={mapPoints}
            selectedPointId={selectedPointId}
          />
        </div>
      </div>
    </div>
  );
};

export default CityPlaces;
