import cn from 'classnames';
import { useEffect } from 'react';

import { RequestStatus } from '@/common/const';
import { TCityName } from '@/common/types';
import CityPlaces from '@/components/city-places';
import CityPlacesEmpty from '@/components/city-places-empty';
import Header from '@/components/header';
import Loader from '@/components/loader';
import LocationsTabs from '@/components/locations-tabs';
import useAppDispatch from '@/hooks/use-app-dispatch';
import useAppSelector from '@/hooks/use-app-selector';
import { selectCity, selectOffersByCity, selectStatus } from '@/store/offers-list/selectors';
import { setCity } from '@/store/offers-list/slice';
import { fetchOffersList } from '@/store/offers-list/thunks';


const Main = () => {
  const dispath = useAppDispatch();
  const offers = useAppSelector(selectOffersByCity);
  const currentCity = useAppSelector(selectCity);
  const loadingStatus = useAppSelector(selectStatus);

  useEffect(() => {
    dispath(fetchOffersList());
  }, [dispath, currentCity]);

  const hasOffers = offers.length > 0;

  const pageMainClasses = cn([
    'page__main',
    'page__main--index',
    !hasOffers ? 'page__main--index-empty' : ''
  ]);

  const handleCityChange = (city: TCityName) => {
    dispath(setCity(city));
  };

  const renderCityPlaces = () => {
    if (loadingStatus === RequestStatus.Loading) {
      return <Loader />;
    }

    if (loadingStatus === RequestStatus.Failed || !hasOffers) {
      return <CityPlacesEmpty />;
    }

    return <CityPlaces offers={offers} selectedCity={currentCity} />;
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
