import cn from 'classnames';
import { useCallback, useEffect } from 'react';

import { TCityName } from '@/common/types';
import Header from '@/components/header';
import CityPlaces from '@/components/main/city-places';
import CityPlacesEmpty from '@/components/main/city-places-empty';
import LocationsTabs from '@/components/main/locations-tabs';
import useAppDispatch from '@/hooks/use-app-dispatch';
import useAppSelector from '@/hooks/use-app-selector';
import { selectCity } from '@/store/global/selectors';
import { setCity } from '@/store/global/slice';
import { selectOffersByCity } from '@/store/offers-list/selectors';
import { fetchOffersList } from '@/store/offers-list/thunks';

const Main = () => {
  const dispatch = useAppDispatch();
  const offers = useAppSelector(selectOffersByCity);
  const currentCity = useAppSelector(selectCity);

  useEffect(() => {
    dispatch(fetchOffersList());
  }, [dispatch, currentCity]);

  const hasOffers = offers.length > 0;

  const pageMainClasses = cn([
    'page__main',
    'page__main--index',
    !hasOffers ? 'page__main--index-empty' : ''
  ]);

  const handleCityChange = useCallback((city: TCityName) => {
    dispatch(setCity(city));
  }, [dispatch]);

  const renderCityPlaces = () => {
    if (!hasOffers) {
      return <CityPlacesEmpty />;
    }

    return <CityPlaces />;
  };

  return (
    <div className="page page--gray page--main">
      <Header />
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
