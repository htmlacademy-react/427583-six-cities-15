import cn from 'classnames';

import { AuthorizationStatus } from '../../common/const';
import { TOffer } from '../../common/types';
import CityPlaces from '../../components/city-places';
import CityPlacesEmpty from '../../components/city-places-empty';
import Header from '../../components/header';
import LocationsTabs from '../../components/locations-tabs';


type TProps = {
  offers: TOffer[];
}

const Main = ({ offers }: TProps) => {
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
      <Header authorizationStatus={AuthorizationStatus.Auth} />
      <main className={pageMainClasses}>
        <h1 className="visually-hidden">Cities</h1>
        <LocationsTabs />
        {renderCityPlaces()}
      </main>
    </div>
  );
};

export default Main;
