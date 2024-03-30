import cn from 'classnames';

import { CITIES } from '@/common/const';
import { TCityName } from '@/common/types';

type TProps = {
  selectedCity: TCityName;
  onCityChange: (city: TCityName) => void;
}


const LocationsTabs = ({ selectedCity, onCityChange }: TProps) => {
  const handleCityChange = (city: TCityName) => {
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
