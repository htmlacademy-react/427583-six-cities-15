import { useState } from 'react';

import { CITIES, TCityName } from '../../common/const';
import { TOffer } from '../../common/types';
import { mockPoints } from '../../mocks/mocks';
import Map from '../map';
import PlaceCard from '../place-card';

type TProps = {
  offers: TOffer[];
  selectedCity: TCityName;
}

const CityPlaces = ({ offers, selectedCity }: TProps) => {
  const [selectedPointId, setSelectedPointId] = useState('');

  const handleCardSelect = (id: string) => {
    setSelectedPointId(id);
  };

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in {selectedCity}</b>
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex={0}>
              Popular
              <svg className="places__sorting-arrow" width="7" height="4">
                <use xlinkHref="#icon-arrow-select"></use>
              </svg>
            </span>
            <ul className="places__options places__options--custom places__options--opened">
              <li className="places__option places__option--active" tabIndex={0}>Popular</li>
              <li className="places__option" tabIndex={0}>Price: low to high</li>
              <li className="places__option" tabIndex={0}>Price: high to low</li>
              <li className="places__option" tabIndex={0}>Top rated first</li>
            </ul>
          </form>
          <div className="cities__places-list places__list tabs__content">
            {offers.map((offer: TOffer) => (<PlaceCard {...offer} key={offer.id} onSelect={handleCardSelect} />))}
          </div>
        </section>
        <div className="cities__right-section">
          <Map
            className="cities__map"
            city={CITIES[selectedCity]}
            points={mockPoints}
            selectedPointId={selectedPointId}
          />
        </div>
      </div>
    </div>
  );
};

export default CityPlaces;
