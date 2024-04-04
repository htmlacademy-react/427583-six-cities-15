import { Map as LeafletMap, TileLayer } from 'leaflet';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

import { TCity } from '../common/types';

const LAYER_TEMPLATE = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const ATTRIBUTION_LINK = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
const DEFAULT_ZOOM = 10;

const useMap = (
  mapRef: MutableRefObject<HTMLElement | null>,
  city: TCity
): LeafletMap | null => {
  const [map, setMap] = useState<LeafletMap | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const mapInstance = new LeafletMap(mapRef.current, {
        center: [city.latitude, city.longitude],
        zoom: city.zoom || DEFAULT_ZOOM,
      });

      const TILE_LAYER = new TileLayer(
        LAYER_TEMPLATE,
        { attribution: ATTRIBUTION_LINK }
      );

      mapInstance.addLayer(TILE_LAYER);
      setMap(mapInstance);

      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
};

export default useMap;
