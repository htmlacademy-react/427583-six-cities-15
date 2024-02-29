import { AuthorizationStatus } from '../../common/const';
import { TOffer } from '../../common/types';
import Footer from '../../components/footer';
import Header from '../../components/header';
import PlaceCard from '../../components/place-card';
import { mockFavorites } from '../../mocks/mocks';


const favoritesByCity = mockFavorites.reduce((offersList: { [K: string]: TOffer[] }, offer: TOffer) => {
  if (offersList[offer.city.name]) {
    offersList[offer.city.name].push(offer);
  } else {
    offersList[offer.city.name] = [offer];
  }
  return offersList;
}, {});

const Favorites = () => (
  <div className="page">
    <Header authorizationStatus={AuthorizationStatus.Auth} />

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
                      version="secondary"
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

export default Favorites;
