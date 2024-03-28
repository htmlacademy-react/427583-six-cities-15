import Footer from '../../components/footer';
import Header from '../../components/header';
import PlaceCard from '../../components/place-card';
import useAppSelector from '../../hooks/use-app-selector';
import { selectFavoritesList } from '../../store/favorites/selectors';
import { sortFavoritesByCities } from './utils';

const Favorites = () => {
  const favoritesList = useAppSelector(selectFavoritesList);
  const hasFavorites = favoritesList.length > 0;

  if (!hasFavorites) {
    return (
      <div className="page page--favorites-empty">
        <Header />
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const favoritesByCity = sortFavoritesByCities(favoritesList);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.keys(favoritesByCity).map((city) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {favoritesByCity[city].map((offer) => (
                      <PlaceCard
                        key={offer.id}
                        {...offer}
                        variant="favorites"
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;
