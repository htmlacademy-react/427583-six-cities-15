import type { Location } from 'react-router-dom';
import { Navigate, useLocation } from 'react-router-dom';

import { AppRoute } from '@/common/const';
import { TLocationFrom } from '@/common/types';
import useAppSelector from '@/hooks/use-app-selector';
import { getToken } from '@/services/token';
import { selectUser } from '@/store/auth/selectors';

type TProps = {
  isLoginPage?: boolean;
  children: JSX.Element;
}

const ProtectedRoute = ({ isLoginPage, children }: TProps) => {
  const location: Location<TLocationFrom> = useLocation() as Location<TLocationFrom>;
  const user = useAppSelector(selectUser);
  const token = getToken();

  if (token || isLoginPage && user) {
    const from: Location = location.state?.from || { pathname: AppRoute.Main } as Location;

    return <Navigate to={from} />;
  }

  if (!isLoginPage && !user) {
    return <Navigate state={{ from: location }} to={AppRoute.Login} />;
  }

  return children;
};

export default ProtectedRoute;
