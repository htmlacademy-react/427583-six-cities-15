import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppRoute } from './common/const';
import ProtectedRoute from './components/protected-route';
import useAppDispatch from './hooks/use-app-dispatch';
import useAppSelector from './hooks/use-app-selector';
import Favorites from './pages/favorites';
import Login from './pages/login';
import Main from './pages/main';
import NotFound from './pages/not-found';
import Offer from './pages/offer';
import { getToken } from './services/token';
import { selectAuthorizationStatus } from './store/auth/auth.selectors';
import { checkAuth } from './store/auth/auth.thunks';

const App = () => {
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const token = getToken();

  useEffect(() => {
    if (token) {
      dispatch(checkAuth());
    }
  }, [token, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Main />} />
        <Route path={AppRoute.Login} element={(
          <ProtectedRoute isLoginPage>
            <Login />
          </ProtectedRoute>
        )}
        />
        <Route path={AppRoute.Favorites} element={(
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        )}
        />
        <Route path={AppRoute.Offer} element={<Offer authorizationStatus={authorizationStatus} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
