import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppRoute } from './common/const';
import { Offer } from './common/types';
import Main from './pages/main';
import NotFound from './pages/not-found';

type Props = {
  offers: Offer[];
}

const App = ({ offers }: Props) => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoute.Main} element={<Main offers={offers} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
