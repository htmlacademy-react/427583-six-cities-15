import { memo } from 'react';

import { MAX_IMAGES_COUNT } from '@/common/const';

type TProps = {
  images: string[];
}

const Gallery = ({ images }: TProps) => (
  <div className="offer__gallery-container container">
    <div className="offer__gallery">
      {images.slice(0, MAX_IMAGES_COUNT).map((image) => (
        <div
          className="offer__image-wrapper"
          key={image}
        >
          <img
            className="offer__image"
            src={image}
            alt="Photo studio"
          />
        </div>
      ))}
    </div>
  </div>
);

const MemoizedGallery = memo(Gallery);

export default MemoizedGallery;
