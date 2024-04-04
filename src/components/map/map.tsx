import 'leaflet/dist/leaflet.css';

import { LayerGroup, layerGroup, Marker } from 'leaflet';
import { memo, useEffect, useRef } from 'react';

import { TCity, TPoint } from '@/common/types';
import useMap from '@/hooks/use-map';

import { activePin, defaultPin } from './const';

type TProps = {
  city: TCity;
  points: TPoint[];
  selectedPointId?: string;
  className?: string;
}

const Map = ({ city, points, selectedPointId, className }: TProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapRef, city);
  const markersLayer = useRef<LayerGroup>(layerGroup());

  useEffect(() => {
    if (map) {
      map.setView([city.latitude, city.longitude], city.zoom);
      markersLayer.current.addTo(map);
      markersLayer.current.clearLayers();
    }
  }, [city, map]);

  useEffect(() => {
    if (map) {
      points.forEach((point: TPoint) => {
        const marker = new Marker([point.latitude, point.longitude]);
        const icon = point.id === selectedPointId ? activePin : defaultPin;

        marker
          .setIcon(icon)
          .addTo(markersLayer.current);
      });
    }
  }, [map, points, selectedPointId]);

  return (
    <section className={className} ref={mapRef} />
  );
};

const MemoizedMap = memo(Map);

export default MemoizedMap;
