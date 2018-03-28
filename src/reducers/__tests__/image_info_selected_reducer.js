// @flow

import { imageInfoSelectedReducer } from '../image_info_selected_reducer';

const VALID_IMAGE_INFO = {
  createdAt: 'blah',
  description: 'a descrption',
  galleryId: 12,
  galleryName: 'agalleryname',
  id: 22,
  name: 'aname',
  originalUrl: 'aurl',
  version: [
  ],
};

const EMPTY_STATE = {
  loading: false,
  error: null,
  imageInfo: null,
};

const VALID_STATE = {
  loading: false,
  error: null,
  imageInfo: VALID_IMAGE_INFO,
};

const ERROR = { message: 'an error' };


describe('image_info_selected_reducer', () => {
  describe('imageInfoSelectedReducer', () => {
    it('initializes with proper value', () => {
      expect(imageInfoSelectedReducer(undefined, { type: 'LOGOUT_REQUEST' })).toEqual({
        loading: false,
        error: null,
        imageInfo: null,
      });
    });

    it('does not update on unknown value', () => {
      expect(imageInfoSelectedReducer(VALID_STATE, { type: 'LOGOUT_REQUEST' })).toEqual(VALID_STATE);
    });

    it('processes IMAGE_GALLERY_IMAGE_INFO_SELECTED_REQUEST', () => {
      expect(imageInfoSelectedReducer(VALID_STATE, { type: 'IMAGE_GALLERY_IMAGE_INFO_SELECTION_REQUEST' })).toEqual({
        loading: true,
        error: null,
        imageInfo: null,
      });
    });

    it('processes IMAGE_GALLERY_IMAGE_INFO_SELECTED_RESPONSE_OK', () => {
      expect(imageInfoSelectedReducer(EMPTY_STATE, {
        type: 'IMAGE_GALLERY_IMAGE_INFO_SELECTION_RESPONSE_OK',
        imageInfo: VALID_IMAGE_INFO,
      })).toEqual(VALID_STATE);
    });

    it('processes IMAGE_GALLERY_IMAGE_INFO_SELECTED_RESPONSE_ERROR', () => {
      expect(imageInfoSelectedReducer(EMPTY_STATE, {
        type: 'IMAGE_GALLERY_IMAGE_INFO_SELECTION_RESPONSE_ERROR',
        error: ERROR,
      })).toEqual({ loading: false, error: ERROR, imageInfo: null });
    });

    it('processes IMAGE_GALLERY_IMAGE_INFO_DELETE_RESPONSE_OK when deleted is selected', () => {
      expect(imageInfoSelectedReducer(VALID_STATE, {
        type: 'IMAGE_GALLERY_IMAGE_INFO_DELETE_RESPONSE_OK',
        galleryId: VALID_IMAGE_INFO.galleryId,
        imageInfoId: VALID_IMAGE_INFO.id,
      })).toEqual(EMPTY_STATE);
    });

    it('processes IMAGE_GALLERY_IMAGE_INFO_DELETE_RESPONSE_OK when deleted is not selected', () => {
      expect(imageInfoSelectedReducer(VALID_STATE, {
        type: 'IMAGE_GALLERY_IMAGE_INFO_DELETE_RESPONSE_OK',
        galleryId: VALID_IMAGE_INFO.galleryId,
        imageInfoId: -5,
      })).toEqual(VALID_STATE);
    });
  });
});
