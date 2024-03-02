import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from './common/const';
import { TOffer } from './common/types';
import PrivateRoute from './components/private-route';
import Favorites from './pages/favorites';
import Login from './pages/login';
import Main from './pages/main';
import NotFound from './pages/not-found';
import Offer from './pages/offer';

const authorizationStatus = AuthorizationStatus.Auth;

type TProps = {
  offers: TOffer[];
}

const App = ({ offers }: TProps) => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoute.Main} element={<Main offers={offers} />} />
      <Route path={AppRoute.Login} element={(
        <PrivateRoute authorizationStatus={authorizationStatus} isReverse>
          <Login />
        </PrivateRoute>
      )}
      />
      <Route path={AppRoute.Favorites} element={(
        <PrivateRoute authorizationStatus={authorizationStatus}>
          <Favorites />
        </PrivateRoute>
      )}
      />
      < Route path={AppRoute.Offer} element={<Offer authorizationStatus={authorizationStatus} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
