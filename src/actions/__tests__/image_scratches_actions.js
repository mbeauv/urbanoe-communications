// @flow
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { setCommunicatorInstance } from '../../common';
import { createImageScratch, deleteImageScratch } from '../image_scratches_actions';

const AUTH_TOKEN = 'blbla';
const IMAGE_FILE = { name: 'test' };


const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('image_scratches_actions', () => {
  beforeEach(() => setCommunicatorInstance(mock.axiosInstance));

  afterEach(() => mock.reset());

  describe('createImageScratch', () => {
    it('handles successful create', () => {
      mock.onPost(`/media_gallery/image_scratches.json?auth_token=${AUTH_TOKEN}`, {
        scratchImage: {
          image: IMAGE_FILE,
        },
      }).reply(200, { id: 4 });

      const expectedActions = [
        { type: 'IMAGE_GALLERY_SCRATCH_CREATE_REQUEST' },
        { type: 'IMAGE_GALLERY_SCRATCH_CREATE_RESPONSE_OK', scratchImage: { id: 4 } },
      ];

      const store = mockStore({});

      return store.dispatch(createImageScratch(AUTH_TOKEN, IMAGE_FILE)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('deleteImageScrach', () => {
    it('handles successful delete', () => {
      mock.onDelete(`/media_gallery/image_scratches.json?auth_token=${AUTH_TOKEN}`).reply(204);

      const expectedActions = [
        { type: 'IMAGE_GALLERY_SCRATCH_DELETE_REQUEST' },
        { type: 'IMAGE_GALLERY_SCRATCH_DELETE_RESPONSE_OK' },
      ];

      const store = mockStore({});

      return store.dispatch(deleteImageScratch(AUTH_TOKEN)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
