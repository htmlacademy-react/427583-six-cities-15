import cn from 'classnames';
import { useState } from 'react';

import { CITIES, TCityName } from '../../common/const';


type TProps = {
  onCityChange: (city: TCityName) => void;
}

const LocationsTabs = ({ onCityChange }: TProps) => {
  const [selectedCity, setSelectedCity] = useState<TCityName>('Amsterdam');

  const handleCityChange = (city: TCityName) => {
    setSelectedCity(city);
    onCityChange(city);
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {Object.keys(CITIES).map((city) => (
            <li className="locations__item" key={city}>
              <a
                className={cn([
                  'locations__item-link',
                  'tabs__item',
                  selectedCity === city ? 'tabs__item--active' : ''
                ])}
                onClick={() => handleCityChange(city as TCityName)}
              >
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default LocationsTabs;
