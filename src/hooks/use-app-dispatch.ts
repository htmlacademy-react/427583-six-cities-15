import { useDispatch } from 'react-redux';

import { AppDispatch } from '../store/store.types';

const useAppDispatch = useDispatch<AppDispatch>;

export default useAppDispatch;
