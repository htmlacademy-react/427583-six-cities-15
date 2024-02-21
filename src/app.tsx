import { Offer } from './common/types';
import Main from './pages/main/main';

type Props = {
  offers: Offer[];
}

const App = ({ offers }: Props) => (
  <Main offers={offers} />
);

export default App;
