// @flow
import type { ImageGalleryImageInfoDetails } from 'urbanoe-model';
import { imageGallerySelectedReducer } from '../image_gallery_selected_reducer';

const INITIAL_STATE = {
  loading: false,
  gallery: null,
  error: null,
};

const VALID_GALLERY = {
  name: 'aname',
  createdAt: '12/21/2211',
  description: 'a description',
  id: 22,
  imageInfos: [],
};

const TEST_IMAGE : ImageGalleryImageInfoDetails = {
  id: 12,
  name: 'testimage',
  createdAt: '23/11/2015',
  description: 'an image description',
  galleryId: 22,
  galleryName: 'aname',
  originalUrl: 'testurl',
  version: [
    {
      name: 'thumb',
      url: 'thumburl',
    },
  ],
};

const ERROR = { message: 'an error' };

describe('image_gallery_selected_reducer', () => {
  describe('imageGallerySelectedReducer', () => {
    it('returns current state if unsupported action', () => {
      expect(imageGallerySelectedReducer(INITIAL_STATE, { type: 'LOGOUT_REQUEST' })).toEqual(INITIAL_STATE);
    });

    it('initializes with proper value', () => {
      expect(imageGallerySelectedReducer(undefined, { type: 'LOGOUT_REQUEST' })).toEqual(INITIAL_STATE);
    });

    it('processes IMAGE_GALLERY_IMAGE_INFO_CREATE_RESPONSE_OK', () => {
      const modifGallery = { ...VALID_GALLERY,
        imageInfos: [
          {
            name: 'testimage',
            url: 'thumburl',
          },
        ],
      };

      expect(imageGallerySelectedReducer(
        { loading: false, gallery: VALID_GALLERY, error: null },
        { type: 'IMAGE_GALLERY_IMAGE_INFO_CREATE_RESPONSE_OK', imageInfo: TEST_IMAGE },
      )).toEqual({ loading: false, gallery: modifGallery, error: null });
    });

    it('processes IMAGE_GALLERY_UPDATE_RESPONSE_OK', () => {
      const modifGallery = { ...VALID_GALLERY, description: 'a new description' };
      expect(imageGallerySelectedReducer(
        { loading: false, gallery: VALID_GALLERY, error: null },
        { type: 'IMAGE_GALLERY_UPDATE_RESPONSE_OK', gallery: modifGallery },
      )).toEqual({ loading: false, gallery: modifGallery, error: null });
    });

    it('processes IMAGE_GALLERY_DELETE_RESPONSE_OK', () => {
      expect(imageGallerySelectedReducer(
        { loading: false, gallery: VALID_GALLERY, error: null },
        { type: 'IMAGE_GALLERY_DELETE_RESPONSE_OK', galleryId: 22 },
      )).toEqual({ loading: false, gallery: null, error: null });
    });

    it('processes IMAGE_GALLERY_SELECTION_REQUEST', () => {
      expect(imageGallerySelectedReducer(
        INITIAL_STATE,
        { type: 'IMAGE_GALLERY_SELECTION_REQUEST' },
      )).toEqual({ error: null, gallery: null, loading: true });
    });

    it('processes IMAGE_GALLERY_SELECTION_RESPONSE_OK', () => {
      expect(imageGallerySelectedReducer(
        INITIAL_STATE,
        { type: 'IMAGE_GALLERY_SELECTION_RESPONSE_OK', gallery: VALID_GALLERY },
      )).toEqual({ error: null, gallery: VALID_GALLERY, loading: false });
    });

    it('processes IMAGE_GALLERY_SELECTION_RESPONSE_ERROR', () => {
      expect(imageGallerySelectedReducer(
        INITIAL_STATE,
        { type: 'IMAGE_GALLERY_SELECTION_RESPONSE_ERROR', error: ERROR },
      )).toEqual({ error: ERROR, gallery: null, loading: false });
    });
  });
});
