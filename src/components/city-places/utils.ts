import { SortType } from '../../common/const';
import { TOffer } from '../../common/types';

export const sortOffersByType = (offers: TOffer[], sortType: SortType) => {
  switch (true) {
    case sortType === SortType.PriceHighToLow:
      return [...offers].sort((a, b) => b.price - a.price);
    case sortType === SortType.PriceLowToHigh:
      return [...offers].sort((a, b) => a.price - b.price);
    case sortType === SortType.TopRatedFirst:
      return [...offers].sort((a, b) => b.rating - a.rating);
    default:
      return [...offers];
  }
};
