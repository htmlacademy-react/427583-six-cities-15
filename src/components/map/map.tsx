import 'leaflet/dist/leaflet.css';

import { Icon, LayerGroup, layerGroup, Marker } from 'leaflet';
import { useEffect, useRef } from 'react';

import { TCity, TPoint } from '../../common/types';
import useMap from '../../hooks/use-map';

const URL_MARKER_DEFAULT = '/img/pin.svg';
const URL_MARKER_CURRENT = '/img/pin-active.svg';

const defaultPin = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const activePin = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

type TProps = {
  city: TCity;
  points: TPoint[];
  selectedPointId?: string;
}

const Map = ({ city, points, selectedPointId }: TProps) => {
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
  }, [map, points, selectedPointId, city]); //TODO:city можно будет удалить из зависимостей, когда появятся points других городов

  return (
    <section className="cities__map" ref={mapRef} />
  );
};

export default Map;
