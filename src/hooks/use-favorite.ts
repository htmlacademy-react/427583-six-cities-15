import { useNavigate } from 'react-router-dom';

import { AppRoute, AuthorizationStatus, FavoriteStatus } from '@/common/const';
import { selectAuthorizationStatus } from '@/store/auth/selectors';
import { updateOfferFavoriteStatus } from '@/store/favorites/thunks';

import useAppDispatch from './use-app-dispatch';
import useAppSelector from './use-app-selector';

export const useFavorite = (offerId: string, isFavorite: FavoriteStatus) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  const handleUpdateIsFavorite = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }
    dispatch(updateOfferFavoriteStatus({ offerId, status: isFavorite }));
  };

  return handleUpdateIsFavorite;
};
