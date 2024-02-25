import { Navigate } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../common/const';

type TProps = {
  authorizationStatus: AuthorizationStatus;
  isReverse?: boolean;
  children: JSX.Element;
}

const PrivateRoute = ({ authorizationStatus, isReverse, children }: TProps) => {
  const validStatus = isReverse ? AuthorizationStatus.NonAuth : AuthorizationStatus.Auth;
  const navigationRoute = isReverse ? AppRoute.Main : AppRoute.Login;

  if (authorizationStatus === validStatus) {
    return children;
  }

  return (<Navigate to={navigationRoute} />);
};

export default PrivateRoute;
