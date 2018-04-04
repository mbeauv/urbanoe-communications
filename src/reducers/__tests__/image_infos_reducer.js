// @flow

import { Map } from 'immutable';
import type { ImageGalleryImageInfo } from 'urbanoe-model';
import { imageInfosReducer } from '../image_infos_reducer';

const EMPTY_STATE = { galleryImages: new Map() };
const ERROR = { message: 'an error' };

const IMAGE_INFO_1 : ImageGalleryImageInfo = {
  createdOn: '12/12/2018',
  description: 'a description for 1',
  id: 22,
  name: 'aname1',
  originalUrl: 'http://www.google.com',
  updatedOn: '12/12/2018',
  variants: [],
};

describe('image_infos_reducer', () => {
  describe('imageInfosReducer', () => {
    it('initializes with proper value', () => {
      expect(imageInfosReducer(undefined, { type: 'LOGOUT_REQUEST' })).toEqual(EMPTY_STATE);
    });

    describe('when state is empty', () => {
      it('does not update unsupported type', () => {
        expect(imageInfosReducer(EMPTY_STATE, { type: 'LOGOUT_REQUEST' })).toEqual(EMPTY_STATE);
      });

      it('processes IMAGE_GALLERY_IMAGE_INFO_CREATE_REQUEST', () => {
        const expectedState = {
          galleryImages: Map({
            gallery_23: {
              loading: true,
              error: null,
            },
          }),
        };

        expect(imageInfosReducer(EMPTY_STATE, {
          type: 'IMAGE_GALLERY_IMAGE_INFO_CREATE_REQUEST',
          galleryId: 23,
        })).toEqual(expectedState);
      });
    });

    describe('when state has one image', () => {
      const startState = (loading : boolean = false) => (
        {
          galleryImages: Map({
            gallery_23: {
              loading: false,
              error: null,
              imageInfos: Map({
                image_22: {
                  loading,
                  error: null,
                  imageInfo: IMAGE_INFO_1,
                },
              }),
            },
          }),
        }
      );

      it('processes IMAGE_GALLERY_DELETE_REQUEST', () => {
        const expectedState = {
          galleryImages: Map({
            gallery_23: {
              loading: false,
              error: null,
              imageInfos: Map({
                image_22: {
                  loading: true,
                  error: null,
                  imageInfo: IMAGE_INFO_1,
                },
              }),
            },
          }),
        };

        expect(imageInfosReducer(startState(), {
          type: 'IMAGE_GALLERY_IMAGE_INFO_DELETE_REQUEST',
          galleryId: 23,
          imageInfoId: 22,
        })).toEqual(expectedState);
      });

      it('processes IMAGE_GALLERY_DELETE_RESPONSE_ERROR', () => {
        const expectedState = {
          galleryImages: Map({
            gallery_23: {
              loading: false,
              error: null,
              imageInfos: Map({
                image_22: {
                  loading: false,
                  error: ERROR,
                  imageInfo: IMAGE_INFO_1,
                },
              }),
            },
          }),
        };

        expect(imageInfosReducer(startState(), {
          type: 'IMAGE_GALLERY_IMAGE_INFO_DELETE_RESPONSE_ERROR',
          galleryId: 23,
          imageInfoId: 22,
          error: ERROR,
        })).toEqual(expectedState);
      });

      it('processes IMAGE_GALLERY_IMAGE_INFO_DELETE_RESPONSE_OK', () => {
        const expectedState = {
          galleryImages: Map({
            gallery_23: {
              loading: false,
              error: null,
              imageInfos: Map(),
            },
          }),
        };

        expect(imageInfosReducer(startState(), {
          type: 'IMAGE_GALLERY_IMAGE_INFO_DELETE_RESPONSE_OK',
          galleryId: 23,
          imageInfoId: 22,
        })).toEqual(expectedState);
      });

      it('processes IMAGE_GALLERY_IMAGE_INFO_UPDATE_REQUEST', () => {
        const expectedState = {
          galleryImages: Map({
            gallery_23: {
              loading: false,
              error: null,
              imageInfos: Map({
                image_22: {
                  loading: true,
                  error: null,
                  imageInfo: IMAGE_INFO_1,
                },
              }),
            },
          }),
        };

        expect(imageInfosReducer(startState(), {
          type: 'IMAGE_GALLERY_IMAGE_INFO_UPDATE_REQUEST',
          galleryId: 23,
          imageInfoId: 22,
        })).toEqual(expectedState);
      });

      it('processes IMAGE_GALLERY_IMAGE_INFO_UPDATE_RESPONSE_ERROR', () => {
        const expectedState = {
          galleryImages: Map({
            gallery_23: {
              loading: false,
              error: null,
              imageInfos: Map({
                image_22: {
                  loading: false,
                  error: ERROR,
                  imageInfo: IMAGE_INFO_1,
                },
              }),
            },
          }),
        };

        expect(imageInfosReducer(startState(true), {
          type: 'IMAGE_GALLERY_IMAGE_INFO_UPDATE_RESPONSE_ERROR',
          galleryId: 23,
          imageInfoId: 22,
          error: ERROR,
        })).toEqual(expectedState);
      });

      it('processes IMAGE_GALLERY_IMAGE_INFO_UPDATE_RESPONSE_OK', () => {
        const newImageInfo = { ...IMAGE_INFO_1, description: 'a new description' };

        const expectedState = {
          galleryImages: Map({
            gallery_23: {
              loading: false,
              error: null,
              imageInfos: Map({
                image_22: {
                  loading: false,
                  error: null,
                  imageInfo: newImageInfo,
                },
              }),
            },
          }),
        };

        expect(imageInfosReducer(startState(true), {
          type: 'IMAGE_GALLERY_IMAGE_INFO_UPDATE_RESPONSE_OK',
          galleryId: 23,
          imageInfo: newImageInfo,
        })).toEqual(expectedState);
      });
    });

    it('processes IMAGE_GALLERY_IMAGE_INFO_CREATE_RESPONSE_ERROR', () => {
      const startState = {
        galleryImages: Map({
          gallery_23: {
            loading: true,
            error: null,
            imageInfos: Map(),
          },
        }),
      };
      const expectedState = {
        galleryImages: Map({
          gallery_23: {
            loading: false,
            error: ERROR,
            imageInfos: Map(),
          },
        }),
      };

      expect(imageInfosReducer(startState, {
        type: 'IMAGE_GALLERY_IMAGE_INFO_CREATE_RESPONSE_ERROR',
        galleryId: 23,
        error: ERROR,
      })).toEqual(expectedState);
    });
    it('processes IMAGE_GALLERY_IMAGE_INFO_CREATE_RESPONSE_OK', () => {
      const startState = {
        galleryImages: Map({
          gallery_23: {
            loading: true,
            error: null,
            imageInfos: Map(),
          },
        }),
      };
      const expectedState = {
        galleryImages: Map({
          gallery_23: {
            loading: false,
            error: null,
            imageInfos: Map({
              image_22: {
                loading: false,
                error: null,
                imageInfo: IMAGE_INFO_1,
              },
            }),
          },
        }),
      };

      expect(imageInfosReducer(startState, {
        type: 'IMAGE_GALLERY_IMAGE_INFO_CREATE_RESPONSE_OK',
        galleryId: 23,
        imageInfo: IMAGE_INFO_1,
      })).toEqual(expectedState);
    });

    it('processes IMAGE_GALLERY_IMAGE_INFO_LIST_REQUEST', () => {
      const startState = { galleryImages: Map() };
      const expectedState = {
        galleryImages: Map({
          gallery_23: {
            loading: true,
            error: null,
            imageInfos: Map(),
          },
        }),
      };

      expect(imageInfosReducer(startState, { type: 'IMAGE_GALLERY_IMAGE_INFO_LIST_REQUEST', galleryId: 23 }))
        .toEqual(expectedState);
    });

    it('processes IMAGE_GALLERY_IMAGE_INFO_LIST_RESPONSE_ERROR', () => {
      const startState = { galleryImages: Map({
        gallery_23: {
          loading: true,
          error: null,
          imageInfos: Map(),
        },
      }) };
      const expectedState = {
        galleryImages: Map({
          gallery_23: {
            loading: false,
            error: ERROR,
            imageInfos: Map(),
          },
        }),
      };

      expect(imageInfosReducer(startState, {
        type: 'IMAGE_GALLERY_IMAGE_INFO_LIST_RESPONSE_ERROR',
        galleryId: 23,
        error: ERROR,
      })).toEqual(expectedState);
    });

    it('processes IMAGE_GALLERY_IMAGE_INFO_LIST_RESPONSE_OK', () => {
      const startState = {
        galleryImages: Map({
          gallery_23: {
            loading: true,
            error: null,
            imageInfos: Map(),
          },
        }),
      };
      const expectedState = {
        galleryImages: Map({
          gallery_23: {
            loading: false,
            error: null,
            imageInfos: Map({
              image_22: {
                loading: false,
                error: null,
                imageInfo: IMAGE_INFO_1,
              },
            }),
          },
        }),
      };
      expect(imageInfosReducer(startState, {
        type: 'IMAGE_GALLERY_IMAGE_INFO_LIST_RESPONSE_OK',
        galleryId: 23,
        imageInfos: [IMAGE_INFO_1],
      })).toEqual(expectedState);
    });
  });
});
