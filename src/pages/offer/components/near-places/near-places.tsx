import { memo } from 'react';

import { TOffer } from '../../../../common/types';
import PlaceCard from '../../../../components/place-card';


type TProps = {
  nearbyOffers: TOffer[];
}

const NearPlaces = ({ nearbyOffers }: TProps) => (
  <section className="near-places places">
    <h2 className="near-places__title">Other places in the neighbourhood</h2>
    <div className="near-places__list places__list">
      {nearbyOffers.map((item) => (
        <PlaceCard key={item.id} {...item} variant="near-places" />
      ))}
    </div>
  </section>
);

const MemoizedNearPlaces = memo(NearPlaces);

export default MemoizedNearPlaces;
