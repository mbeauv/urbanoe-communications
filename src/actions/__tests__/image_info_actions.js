// @flow

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { setCommunicatorInstance } from '../../common';
import { getImageInfos, deleteImageInfo } from '../image_info_actions';

const AUTH_TOKEN = 'blbla';
const GALLERY1_ID = 43;
const IMAGE_INFO_ID1 = 24;
const IMAGE_INFO1 = { id: IMAGE_INFO_ID1 };
const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('image_info_actions', () => {
  beforeEach(() => setCommunicatorInstance(mock.axiosInstance));

  afterEach(() => mock.reset());

  describe('getImageInfos', () => {
    it('handles successful get all of image infos', () => {
      mock.onGet(`/media_gallery/galleries/${GALLERY1_ID}/image_infos.json?auth_token=${AUTH_TOKEN}`).reply(200, [IMAGE_INFO1]);

      const expectedActions = [
        { type: 'IMAGE_GALLERY_IMAGE_INFO_LIST_REQUEST', galleryId: GALLERY1_ID },
        { type: 'IMAGE_GALLERY_IMAGE_INFO_LIST_RESPONSE_OK', galleryId: GALLERY1_ID, imageInfos: [IMAGE_INFO1] },
      ];

      const store = mockStore({ todos: [] });

      return store.dispatch(getImageInfos(AUTH_TOKEN, GALLERY1_ID)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('deleteImageInfo', () => {
    it('handles successful delete of an image info', () => {
      mock.onDelete(`/media_gallery/galleries/${GALLERY1_ID}/image_infos/${IMAGE_INFO_ID1}.json?auth_token=${AUTH_TOKEN}`).reply(200);

      const expectedActions = [
        { type: 'IMAGE_GALLERY_IMAGE_INFO_DELETE_REQUEST', galleryId: GALLERY1_ID, imageInfoId: IMAGE_INFO_ID1 },
        { type: 'IMAGE_GALLERY_IMAGE_INFO_DELETE_RESPONSE_OK', galleryId: GALLERY1_ID, imageInfoId: IMAGE_INFO_ID1 },
      ];

      const store = mockStore({ todos: [] });

      return store.dispatch(deleteImageInfo(AUTH_TOKEN, GALLERY1_ID, IMAGE_INFO_ID1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
