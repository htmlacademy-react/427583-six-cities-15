import cn from 'classnames';
import { useState } from 'react';

import { SortType } from '../../common/const';

type TProps = {
  onSortTypeChange: (sortType: SortType) => void;
}

const OffersSort = ({ onSortTypeChange }: TProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSortType, setCurrentSortType] = useState(SortType.Popular);

  const toggleSortList = () => {
    setIsOpen(!isOpen);
  };

  const handleSortTypeChange = (sortType: SortType) => {
    setCurrentSortType(sortType);
    onSortTypeChange(sortType);
    toggleSortList();
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={toggleSortList}>
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={cn([
          'places__options',
          'places__options--custom',
          isOpen ? 'places__options--opened' : ''
        ])}
      >
        {Object.values(SortType).map((item) => (
          <li
            className={cn([
              'places__option',
              currentSortType === item ? 'places__option--active' : ''
            ])}
            key={item}
            tabIndex={0}
            onClick={() => handleSortTypeChange(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default OffersSort;
