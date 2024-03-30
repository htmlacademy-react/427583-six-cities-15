import { memo } from 'react';

const MAX_IMAGES_COUNT = 6;

type TProps = {
  images: string[];
}

const OfferGallery = ({ images }: TProps) => (
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

const MemoizedOfferGallery = memo(OfferGallery);

export default MemoizedOfferGallery;
