import cn from 'classnames';

import { Offer } from '../../common/types';
import CityPlaces from '../../components/city-places';
import CityPlacesEmpty from '../../components/city-places-empty';
import Header from '../../components/header';
import LocationsTabs from '../../components/locations-tabs';


type Props = {
  offers: Offer[];
}

const Main = ({ offers }: Props) => {
  const hasOffers = offers.length > 0;

  const pageMainClasses = cn([
    'page__main',
    'page__main--index',
    hasOffers ? 'page__main--index-empty' : ''
  ]);

  const renderCityPlaces = () => {
    if (!hasOffers) {
      return <CityPlacesEmpty />;
    }

    return <CityPlaces offers={offers} />;
  };

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={pageMainClasses}>
        <h1 className="visually-hidden">Cities</h1>
        <LocationsTabs />
        {renderCityPlaces()}
      </main>
    </div>
  );
};

export default Main;
