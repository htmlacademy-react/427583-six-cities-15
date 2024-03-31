import { RootState } from '../store.types';

export const selectFavoritesList = (state: RootState) => state.favorites.favoritesList;

export const selectFavoritesCount = (state: RootState) => state.favorites.favoritesList.length;
