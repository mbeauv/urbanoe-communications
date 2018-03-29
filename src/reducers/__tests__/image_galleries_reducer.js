// @flow

import { Map } from 'immutable';
import type { ImageGalleryInfo, ImageGalleryImageInfoDetails } from 'urbanoe-model';
import { imageGalleriesReducer } from '../image_galleries_reducer';

const EMPTY_STATE = { loading: false, galleries: new Map(), error: null };
const ERROR = { message: 'error message' };
const GALLERY_INFO_1 = { id: 5, name: 'jdoe_gallery5', description: 'a description for 5', nbImages: 0 };
const GALLERY_INFO_2 = { id: 6, name: 'jdoe_gallery6', description: 'a description for 6', nbImages: 0 };
const GALLERIES : Array<ImageGalleryInfo> = [GALLERY_INFO_1, GALLERY_INFO_2];
const TEST_GALLERY_DETAILS = {
  createdAt: '12/12/2222',
  description: 'a test description',
  id: 6,
  imageInfos: [],
  name: 'a test gallery',
};

const TEST_IMAGE : ImageGalleryImageInfoDetails = {
  createdAt: '12/13/2111',
  description: 'an image description',
  galleryId: 6,
  galleryName: 'a test gallery',
  id: 23,
  name: 'an image',
  originalUrl: 'a url',
  version: [],
};

/** Helper method converting a JSON map structure to an Immutable map object. */
function createMap(data : Array<ImageGalleryInfo>) : Map<number, ImageGalleryInfo> {
  return Map(data.map(item => [item.id, item]));
}

describe('image_galleries_reducer', () => {
  describe('imageGalleriesReducer', () => {
    it('returns state if action is unsupported type', () => {
      expect(imageGalleriesReducer(EMPTY_STATE, { type: 'LOGOUT_REQUEST' }))
        .toEqual(EMPTY_STATE);
    });

    it('initializes with proper value', () => {
      expect(imageGalleriesReducer(undefined, { type: 'LOGOUT_REQUEST' })).toEqual(EMPTY_STATE);
    });

    it('processes IMAGE_GALLERY_IMAGE_INFO_CREATE_RESPONSE_OK', () => {
      const startMap = createMap(GALLERIES);
      const endMap = startMap.set(6, { ...GALLERY_INFO_2, nbImages: 1 });
      expect(imageGalleriesReducer(
        {
          loading: false,
          galleries: startMap,
          error: null,
        },
        {
          type: 'IMAGE_GALLERY_IMAGE_INFO_CREATE_RESPONSE_OK',
          imageInfo: TEST_IMAGE,
        },
      )).toEqual({
        loading: false,
        galleries: endMap,
        error: null,
      });
    });

    it('processes IMAGE_GALLERY_UPDATE_RESPONSE_OK', () => {
      const startMap = createMap(GALLERIES);
      const endMap = startMap.set(6, {
        ...GALLERY_INFO_2,
        name: TEST_GALLERY_DETAILS.name,
        description: TEST_GALLERY_DETAILS.description });

      expect(imageGalleriesReducer(
        {
          loading: false,
          galleries: startMap,
          error: null,
        },
        {
          type: 'IMAGE_GALLERY_UPDATE_RESPONSE_OK',
          gallery: TEST_GALLERY_DETAILS,
        },
      )).toEqual({ loading: false, galleries: endMap, error: null });
    });

    it('processes IMAGE_GALLERY_DELETE_RESPONSE_OK', () => {
      const startMap = createMap(GALLERIES);

      expect(imageGalleriesReducer(
        {
          loading: false,
          galleries: startMap,
          error: null,
        },
        { type: 'IMAGE_GALLERY_DELETE_RESPONSE_OK', galleryId: 5 },
      )).toEqual({
        error: null,
        galleries: startMap.delete(5),
        loading: false,
      });
    });

    it('processes IMAGE_GALLERY_LIST_RESPONSE_ERROR', () => {
      expect(imageGalleriesReducer(
        EMPTY_STATE,
        { type: 'IMAGE_GALLERY_LIST_RESPONSE_ERROR', error: ERROR },
      )).toEqual({
        error: ERROR,
        galleries: new Map(),
        loading: false,
      });
    });

    it('processes IMAGE_GALLERY_LIST_RESPONSE_OK', () => {
      expect(imageGalleriesReducer(
        EMPTY_STATE,
        { type: 'IMAGE_GALLERY_LIST_RESPONSE_OK', galleries: GALLERIES },
      )).toEqual({
        error: null,
        galleries: createMap(GALLERIES),
        loading: false,
      });
    });

    it('processes IMAGE_GALLERY_LIST_REQUEST', () => {
      expect(imageGalleriesReducer(
        EMPTY_STATE,
        { type: 'IMAGE_GALLERY_LIST_REQUEST' },
      )).toEqual({
        error: null,
        galleries: new Map(),
        loading: true,
      });
    });
  });
});
