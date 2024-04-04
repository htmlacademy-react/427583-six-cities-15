import cn from 'classnames';
import { memo, useCallback, useState } from 'react';

import { SortType } from '@/common/const';

type TProps = {
  sortType: SortType;
  onSortTypeChange: (sortType: SortType) => void;
}

const OffersSort = ({ sortType, onSortTypeChange }: TProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSortList = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleSortTypeChange = useCallback((selectedSort: SortType) => {
    onSortTypeChange(selectedSort);
    toggleSortList();
  }, [onSortTypeChange, toggleSortList]);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={toggleSortList}>
        {sortType}
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
              sortType === item ? 'places__option--active' : ''
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

const MemoizedOffersSort = memo(OffersSort);

export default MemoizedOffersSort;
