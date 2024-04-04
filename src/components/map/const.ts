import { Icon } from 'leaflet';

const UrlMarker = {
  Default: '/img/pin.svg',
  Current: '/img/pin-active.svg',
} as const;

export const defaultPin = new Icon({
  iconUrl: UrlMarker.Default,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

export const activePin = new Icon({
  iconUrl: UrlMarker.Current,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});
