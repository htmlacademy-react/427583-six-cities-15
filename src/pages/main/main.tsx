import cn from 'classnames';
import { useEffect } from 'react';

import { AuthorizationStatus } from '../../common/const';
import { TCityName } from '../../common/types';
import CityPlaces from '../../components/city-places';
import CityPlacesEmpty from '../../components/city-places-empty';
import Header from '../../components/header';
import LocationsTabs from '../../components/locations-tabs';
import useAppDispatch from '../../hooks/use-app-dispatch';
import useAppSelector from '../../hooks/use-app-selector';
import { mockOffers } from '../../mocks/mocks';
import { selectCity, selectOffers } from '../../store/offers/offers.selectors';
import { setCity, setOffers } from '../../store/offers/offers.slice';


const Main = () => {
  const dispath = useAppDispatch();

  const offers = useAppSelector(selectOffers);
  const currentCity = useAppSelector(selectCity);

  useEffect(() => {
    dispath(setOffers(mockOffers));
  }, [dispath]);

  const hasOffers = offers.length > 0;

  const pageMainClasses = cn([
    'page__main',
    'page__main--index',
    hasOffers ? 'page__main--index-empty' : ''
  ]);

  const handleCityChange = (city: TCityName) => {
    dispath(setCity(city));
  };

  const renderCityPlaces = () => {
    if (!hasOffers) {
      return <CityPlacesEmpty />;
    }

    return <CityPlaces offers={offers} selectedCity={currentCity} />;
  };

  return (
    <div className="page page--gray page--main">
      <Header authorizationStatus={AuthorizationStatus.Auth} />
      <main className={pageMainClasses}>
        <h1 className="visually-hidden">Cities</h1>
        <LocationsTabs
          selectedCity={currentCity}
          onCityChange={handleCityChange}
        />
        {renderCityPlaces()}
      </main>
    </div>
  );
};

export default Main;
