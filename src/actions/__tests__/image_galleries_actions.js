import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { setCommunicatorInstance } from '../communicator';
import { getImageGalleries, getImageGallery } from '../image_galleries_actions';

const AUTH_TOKEN = 'atoken';
const GALLERY1_ID = 5;
const GALLERY2_ID = 6;
const GALLERY1 = { id: GALLERY1_ID, name: 'jdoe_gallery', nbImages: 1, createdAt: '123' };
const GALLERY2 = { id: GALLERY2_ID, name: 'jdoe_gallery22', nbImages: 0, createdAt: '123' };
const GALLERIES = [GALLERY1, GALLERY2];

const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('image_galleries_actions', () => {
  beforeEach(() => {
    setCommunicatorInstance(mock.axiosInstance);
  });

  afterEach(() => {
    mock.reset();
  });

  describe('getImageGallery', () => {
    it('handles successful fetch', () => {
      mock.onGet(`/media_gallery/galleries/${GALLERY1_ID}.json?authToken=${AUTH_TOKEN}`).reply(200, GALLERY1);

      const expectedActions = [
        { type: 'IMAGE_GALLERY_SELECTION_REQUEST', galleryId: GALLERY1_ID },
        { type: 'IMAGE_GALLERY_SELECTION_RESPONSE_OK', gallery: GALLERY1 },
      ];

      const store = mockStore({ todos: [] });

      return store.dispatch(getImageGallery(AUTH_TOKEN, GALLERY1_ID)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('getImageGalleries', () => {
    it('handles successful fetch', () => {
      mock.onGet(`/media_gallery/galleries.json?authToken=${AUTH_TOKEN}`).reply(200, GALLERIES);

      const expectedActions = [
        { type: 'IMAGE_GALLERY_LIST_REQUEST' },
        { type: 'IMAGE_GALLERY_LIST_RESPONSE_OK', galleries: GALLERIES },
      ];

      const store = mockStore({ todos: [] });

      return store.dispatch(getImageGalleries(AUTH_TOKEN)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
