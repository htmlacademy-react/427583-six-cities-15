import { RequestStatus } from '@/common/const';
import useAppSelector from '@/hooks/use-app-selector';
import { selectRequestStatus } from '@/store/global/selectors';

import style from './style.module.css';

const Loader = () => {
  const loadingStatus = useAppSelector(selectRequestStatus);

  if (loadingStatus === RequestStatus.Loading) {
    return (
      <div className={style.loader}>
        Loading...
      </div>
    );
  }

  return null;
};


export default Loader;
