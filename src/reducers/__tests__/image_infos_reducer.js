// @flow

import { Map } from 'immutable';
import type { ImageGalleryImageInfo } from 'urbanoe-model';
import {
  imageInfosReducer,
  selectImageInfos,
  selectImageInfo,
  selectImageInfoLoading,
} from '../image_infos_reducer';

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

const IMAGE_INFO_2 : ImageGalleryImageInfo = {
  createdOn: '12/12/2018',
  description: 'a description for 2',
  id: 18,
  name: 'aname1',
  originalUrl: 'http://www.google.com',
  updatedOn: '12/12/2018',
  variants: [],
};

describe('image_infos_reducer', () => {
  let startState;

  beforeEach(() => {
    startState = {
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
            image_18: {
              loading: true,
              error: null,
              imageInfo: IMAGE_INFO_2,
            },
          }),
        },
      }),
    };
  });

  describe('selectImageInfoLoading', () => {
    it('returns true when loading is true', () => {
      expect(selectImageInfoLoading(startState, 23, 18)).toEqual(true);
    });

    it('returns false if loading is false', () => {
      expect(selectImageInfoLoading(startState, 23, 22)).toEqual(false);
    });

    it('returns false if image not found', () => {
      expect(selectImageInfoLoading(startState, 23, 25)).toEqual(false);
    });

    it('returns false if gallery not found', () => {
      expect(selectImageInfoLoading(startState, 23, 12)).toEqual(false);
    });
  });

  describe('selectImageInfo', () => {
    it('returns imageInfo when present', () => {
      expect(selectImageInfo(startState, 23, 22)).toEqual(IMAGE_INFO_1);
    });

    it('returns null if gallery not found', () => {
      expect(selectImageInfo(startState, 25, 22)).toEqual(null);
    });

    it('returns null if image not found', () => {
      expect(selectImageInfo(startState, 23, 25)).toEqual(null);
    });
  });

  describe('selectImageInfos', () => {
    it('returns all of the image infos for existing gallery', () => {
      expect(selectImageInfos(startState, 23)).toEqual([IMAGE_INFO_1, IMAGE_INFO_2]);
    });

    it('returns empty when gallery not found', () => {
      expect(selectImageInfos(startState, 38)).toEqual([]);
    });
  });

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
