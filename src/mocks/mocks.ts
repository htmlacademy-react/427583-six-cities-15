import { TOffer, TUserReview } from '../common/types';

export const mockPoints = [
  {
    id: '6a780ccc-a0ad-4701-8d8a-398c1be39208',
    latitude: 52.3909553943508,
    longitude: 4.85309666406198,
  },
  {
    id: '95c6de64-9ac5-4008-b72e-8d6dbd2bf020',
    latitude: 52.3609553943508,
    longitude: 4.85309666406198,
  },
  {
    id: '31f5ca9b-deb6-4b1e-a3c9-bf46300561f7',
    latitude: 52.3909553943508,
    longitude: 4.929309666406198,
  },
  {
    id: '72738f79-abf1-42ae-87f1-e970687a7fd8',
    latitude: 52.3809553943508,
    longitude: 4.939309666406198,
  },
];

export const mockOffers: TOffer[] = [
  {
    'id': '6a780ccc-a0ad-4701-8d8a-398c1be39208',
    'title': 'The Joshua Tree House',
    'type': 'hotel',
    'price': 291,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/5.jpg',
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.3909553943508,
        'longitude': 4.85309666406198,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 52.36554,
      'longitude': 4.911976,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 3.3
  },
  {
    'id': '95c6de64-9ac5-4008-b72e-8d6dbd2bf020',
    'title': 'Nice, cozy, warm big bed apartment',
    'type': 'house',
    'price': 333,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/10.jpg',
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.37454,
        'longitude': 4.897976,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 52.3609553943508,
      'longitude': 4.85309666406198,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 4.9
  },
  {
    'id': '31f5ca9b-deb6-4b1e-a3c9-bf46300561f7',
    'title': 'Penthouse, 4-5 rooms + 5 balconies',
    'type': 'room',
    'price': 131,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/1.jpg',
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.37454,
        'longitude': 4.897976,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 52.3909553943508,
      'longitude': 4.929309666406198,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 1.6
  },
  {
    'id': '72738f79-abf1-42ae-87f1-e970687a7fd8',
    'title': 'Perfectly located Castro',
    'type': 'house',
    'price': 477,
    'previewImage': 'https://15.design.htmlacademy.pro/static/hotel/5.jpg',
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.37454,
        'longitude': 4.897976,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 52.3809553943508,
      'longitude': 4.939309666406198,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 3.4
  },
];

export const mockUserReviews: TUserReview[] = [
  {
    'id': '2c31d812-7902-4f30-8ebd-482360374779',
    'comment': 'Beautiful space, fantastic location and atmosphere, really a wonderful place to spend a few days. Will be back.',
    'date': '2024-02-15T21:00:00.295Z',
    'rating': 4,
    'user': {
      'name': 'Isaac',
      'avatarUrl': 'https://15.design.htmlacademy.pro/static/avatar/4.jpg',
      'isPro': true
    }
  },
  {
    'id': '2c31d812-7902-4f30-8ebd-482360374779',
    'comment': 'Not beautiful space, unfantastic location and non-atmosphere, really an awful place to spend a few days. Will not be back.',
    'date': '2023-01-15T21:00:00.295Z',
    'rating': 1,
    'user': {
      'name': 'Clark',
      'avatarUrl': 'https://15.design.htmlacademy.pro/static/avatar/4.jpg',
      'isPro': true
    }
  }
];
