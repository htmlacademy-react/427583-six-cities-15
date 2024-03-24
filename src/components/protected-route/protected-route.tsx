import type { Location } from 'react-router-dom';
import { Navigate, useLocation } from 'react-router-dom';

import { AppRoute } from '../../common/const';
import useAppSelector from '../../hooks/use-app-selector';
import { selectUser } from '../../store/auth/auth.selectors';

type TFrom = {
  from?: Location;
}

type TProps = {
  isLoginPage?: boolean;
  children: JSX.Element;
}

const ProtectedRoute = ({ isLoginPage, children }: TProps) => {
  const location: Location<TFrom> = useLocation() as Location<TFrom>;
  const user = useAppSelector(selectUser);

  if (isLoginPage && user) {
    const from: Location = location.state?.from || { pathname: AppRoute.Main } as Location;

    return <Navigate to={from} />;
  }

  if (!isLoginPage && !user) {
    return <Navigate state={{ from: location }} to={AppRoute.Login} />;
  }

  return children;
};

export default ProtectedRoute;
