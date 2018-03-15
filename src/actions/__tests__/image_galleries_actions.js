import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { setCommunicatorInstance } from '../communicator';
import { getImageGalleries } from '../image_galleries_actions';

const AUTH_TOKEN = 'atoken';

const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const GALLERIES = [
  {
    id: 5,
    name: 'jdoe_gallery',
    nbImages: 1,
  },
  {
    id: 6,
    name: 'jdoe_gallery22',
    nbImages: 0,
  },
];

describe('image_galleries_actions', () => {
  describe('getImageGalleries', () => {
    beforeEach(() => {
      setCommunicatorInstance(mock.axiosInstance);
    });

    afterEach(() => {
      mock.reset();
      mock.restore();
    });

    it('handles successful fetch', () => {
      mock.onGet(`/media_gallery/galleries.json?authToken=${AUTH_TOKEN}`).reply(200, GALLERIES);

      const expectedActions = [
        { type: 'IMAGE_GALLERY_LIST_REQUEST', authToken: AUTH_TOKEN },
        { type: 'IMAGE_GALLERY_LIST_RESPONSE_OK', galleries: GALLERIES },
      ];

      const store = mockStore({ todos: [] });

      return store.dispatch(getImageGalleries(AUTH_TOKEN)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
