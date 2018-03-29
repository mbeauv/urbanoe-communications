// @flow

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { setCommunicatorInstance } from '../../common';
import {
  getImageGalleries,
  getImageGallery,
  createImageGallery,
  updateImageGallery,
  deleteImageGallery,
} from '../image_galleries_actions';

const AUTH_TOKEN = 'atoken';
const GALLERY1_ID = 5;
const GALLERY1_NAME = 'jdoe_gallery';
const GALLERY1_DESCRIPTION = 'jdoe gallery description';
const GALLERY2_ID = 6;
const GALLERY2_NAME = 'jdoe_gallery22';
const GALLERY1 = {
  id: GALLERY1_ID,
  name: GALLERY1_NAME,
  description: GALLERY1_DESCRIPTION,
  nbImages: 1,
  createdAt: '123',
};
const GALLERY2 = { id: GALLERY2_ID, name: GALLERY2_NAME, nbImages: 0, createdAt: '123' };
const GALLERIES = [GALLERY1, GALLERY2];

const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('image_galleries_actions', () => {
  beforeEach(() => setCommunicatorInstance(mock.axiosInstance));

  afterEach(() => mock.reset());

  describe('deleteImageGallery', () => {
    it('handles successful deletion', () => {
      mock.onDelete(`/media_gallery/galleries/${GALLERY1_ID}.json?auth_token=${AUTH_TOKEN}`).reply(200);
    });

    const expectedActions = [
      { type: 'IMAGE_GALLERY_DELETE_REQUEST', galleryID: GALLERY1_ID },
      { type: 'IMAGE_GALLERY_DELETE_RESPONSE_OK' },
    ];

    const store = mockStore({ todos: [] });

    return store.dispatch(deleteImageGallery(AUTH_TOKEN, GALLERY1_ID)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('updateImageGallery', () => {
    it('handles successful creation', () => {
      mock.onPut(`/media_gallery/galleries/${GALLERY1_ID}.json?auth_token=${AUTH_TOKEN}`, {
        name: GALLERY1_NAME,
        description: GALLERY1_DESCRIPTION,
      }).reply(200, GALLERY1);


      const expectedActions = [
        {
          type: 'IMAGE_GALLERY_UPDATE_REQUEST',
        },
        {
          type: 'IMAGE_GALLERY_CREATE_RESPONSE_OK',
          gallery: GALLERY1,
        },
      ];

      const store = mockStore({ todos: [] });

      return store.dispatch(updateImageGallery(
        AUTH_TOKEN,
        GALLERY1_ID,
        GALLERY1_NAME,
        GALLERY1_DESCRIPTION,
      )).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('createImageGallery', () => {
    it('handles successful creation', () => {
      mock.onPost(`/media_gallery/galleries.json?auth_token=${AUTH_TOKEN}`, {
        name: GALLERY1_NAME,
        description: GALLERY1_DESCRIPTION,
      }).reply(200, GALLERY1);


      const expectedActions = [
        {
          type: 'IMAGE_GALLERY_CREATE_REQUEST',
          galleryName: GALLERY1_NAME,
          galleryDescription: GALLERY1_DESCRIPTION,
        },
        {
          type: 'IMAGE_GALLERY_CREATE_RESPONSE_OK',
          gallery: GALLERY1,
        },
      ];

      const store = mockStore({ todos: [] });

      return store.dispatch(createImageGallery(
        AUTH_TOKEN,
        GALLERY1_NAME,
        GALLERY1_DESCRIPTION,
      )).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('getImageGallery', () => {
    it('handles successful fetch', () => {
      mock.onGet(`/media_gallery/galleries/${GALLERY1_ID}.json?auth_token=${AUTH_TOKEN}`).reply(200, GALLERY1);

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
      mock.onGet(`/media_gallery/galleries.json?auth_token=${AUTH_TOKEN}`).reply(200, GALLERIES);

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
