import { useCallback, useEffect, useMemo, useState } from 'react';

import { CITIES, DEFAULT_SORT, SortType } from '@/common/const';
import { TOffer } from '@/common/types';
import { getPointsFromOffers } from '@/common/utils';
import useAppSelector from '@/hooks/use-app-selector';
import { selectCity } from '@/store/global/selectors';
import { selectOffersByCity } from '@/store/offers-list/selectors';

import Map from '../../map';
import PlaceCard from '../../place-card';
import OffersSort from '../offers-sort';
import { sortOffersByType } from './utils';

const CityPlaces = () => {
  const offers = useAppSelector(selectOffersByCity);
  const selectedCity = useAppSelector(selectCity);

  const [selectedPointId, setSelectedPointId] = useState('');
  const [sortedOffers, setSortedOffers] = useState(offers);
  const [sortType, setSortType] = useState(DEFAULT_SORT);

  const mapPoints = useMemo(() => getPointsFromOffers(offers), [offers]);

  useEffect(() => {
    setSortedOffers(sortOffersByType(offers, sortType));
  }, [offers, sortType]);

  useEffect(() => {
    setSortType(DEFAULT_SORT);
  }, [selectedCity]);

  const handleCardSelect = useCallback((id: string) => {
    setSelectedPointId(id);
  }, []);

  const handleSortTypeChange = (selectedSort: SortType) => {
    setSortType(selectedSort);
  };

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{sortedOffers.length} places to stay in {selectedCity}</b>
          <OffersSort
            sortType={sortType}
            onSortTypeChange={handleSortTypeChange}
          />
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
