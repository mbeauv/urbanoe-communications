// @flow

import { Map } from 'immutable';
import type { ImageGallery } from 'urbanoe-model';
import {
  imageGalleriesReducer,
  selectGalleries,
  selectGallery,
  selectLoadingIndicator,
} from '../image_galleries_reducer';

const EMPTY_STATE = { loading: false, galleries: new Map(), error: null };
const ERROR = { message: 'error message' };

const GALLERY_INFO_1 : ImageGallery = {
  createdOn: '12/1/2018',
  description: 'a description for 5',
  id: 5,
  name: 'jdoe_gallery5',
  nbImages: 0,
  updatedOn: '12/2/2018',
};

const GALLERY_INFO_2 : ImageGallery = {
  createdOn: '12/1/2017',
  description: 'a description for 6',
  id: 6,
  name: 'jdoe_gallery6',
  nbImages: 0,
  updatedOn: '12/2/2017',
};

describe('image_galleries_reducer', () => {
  describe('selectors', () => {
    let state;

    beforeEach(() => {
      state = {
        loading: false,
        error: null,
        galleries: Map({
          gallery_6: {
            loading: true,
            error: null,
            gallery: GALLERY_INFO_1,
          },
          gallery_5: {
            loading: false,
            error: null,
            gallery: GALLERY_INFO_2,
          },
        }),
      };
    });

    describe('selectGalleries', () => {
      it('returns content of state', () => {
        expect(selectGalleries(state)).toEqual([GALLERY_INFO_1, GALLERY_INFO_2]);
      });
    });

    describe('selectGallery', () => {
      it('returns gallery if it exists', () => {
        expect(selectGallery(state, 5)).toEqual(GALLERY_INFO_2);
      });

      it('returns null if it does not exist', () => {
        expect(selectGallery(state, 52)).toEqual(null);
      });
    });

    describe('selectLoadingIndicator', () => {
      it('returns true when gallery is loading', () => {
        expect(selectLoadingIndicator(state, 6)).toEqual(true);
      });

      it('returns false when gallery is not loading', () => {
        expect(selectLoadingIndicator(state, 5)).toEqual(false);
      });

      it('returns false when gallery does not exist', () => {
        expect(selectLoadingIndicator(state, 25)).toEqual(false);
      });
    });
  });

  describe('imageGalleriesReducer', () => {
    it('initializes with proper value', () => {
      expect(imageGalleriesReducer(undefined, { type: 'IMAGE_GALLERY_SCRATCH_REINIT_LOCAL' })).toEqual(EMPTY_STATE);
    });

    describe('when state is empty', () => {
      it('processes unsupported action type', () => {
        expect(imageGalleriesReducer(EMPTY_STATE, { type: 'IMAGE_GALLERY_SCRATCH_REINIT_LOCAL' }))
          .toEqual(EMPTY_STATE);
      });

      it('processes IMAGE_GALLERY_LIST_REQUEST correctly', () => {
        expect(imageGalleriesReducer(EMPTY_STATE, { type: 'IMAGE_GALLERY_LIST_REQUEST' })).toEqual({
          loading: true,
          error: null,
          galleries: Map(),
        });
      });

      it('processes IMAGE_GALLERY_LIST_RESPONSE_ERROR correctly', () => {
        const startState = { loading: true, error: null, galleries: Map() };
        const expectedState = { loading: false, error: ERROR, galleries: Map() };

        expect(imageGalleriesReducer(
          startState,
          { type: 'IMAGE_GALLERY_LIST_RESPONSE_ERROR', error: ERROR },
        )).toEqual(expectedState);
      });

      it('processes IMAGE_GALLERY_LIST_RESPONSE_OK correctly', () => {
        const galleries = [GALLERY_INFO_1, GALLERY_INFO_2];
        const startState = { loading: true, error: null, galleries: Map() };
        const expectedState = {
          loading: false,
          error: null,
          galleries: Map({
            gallery_5: {
              loading: false,
              error: null,
              gallery: GALLERY_INFO_1,
            },
            gallery_6: {
              loading: false,
              error: null,
              gallery: GALLERY_INFO_2,
            },
          }) };

        expect(imageGalleriesReducer(
          startState,
          { type: 'IMAGE_GALLERY_LIST_RESPONSE_OK', galleries },
        )).toEqual(expectedState);
      });

      it('processes IMAGE_GALLERY_CREATE_REQUEST', () => {
        const startState = { loading: false, error: null, galleries: Map() };
        const expectedState = {
          loading: true,
          error: null,
          galleries: Map(),
        };

        expect(imageGalleriesReducer(startState, {
          type: 'IMAGE_GALLERY_CREATE_REQUEST',
        })).toEqual(expectedState);
      });

      it('processes IMAGE_GALLERY_CREATE_RESPONSE_OK', () => {
        const startState = { loading: true, error: null, galleries: Map() };
        const expectedState = {
          loading: false,
          error: null,
          galleries: Map({
            gallery_5: {
              loading: false,
              error: null,
              gallery: GALLERY_INFO_1,
            },
          }),
        };

        expect(imageGalleriesReducer(startState, {
          type: 'IMAGE_GALLERY_CREATE_RESPONSE_OK',
          gallery: GALLERY_INFO_1,
        })).toEqual(expectedState);
      });

      it('processes IMAGE_GALLERY_CREATE_RESPONSE_ERROR', () => {
        const startState = { loading: true, error: null, galleries: Map() };
        const expectedState = { loading: false, error: ERROR, galleries: Map() };

        expect(imageGalleriesReducer(startState, {
          type: 'IMAGE_GALLERY_CREATE_RESPONSE_ERROR',
          error: ERROR,
        })).toEqual(expectedState);
      });
    });

    describe('when state has one gallery', () => {
      let startState;

      beforeAll(() => {
        startState = {
          loading: false,
          error: null,
          galleries: Map({
            gallery_5: {
              loading: false,
              error: null,
              gallery: GALLERY_INFO_1,
            },
          }),
        };
      });

      it('processes IMAGE_GALLERY_LIST_DELETE_REQUEST', () => {
        const expectedState = {
          loading: false,
          error: null,
          galleries: Map({
            gallery_5: {
              loading: true,
              error: null,
              gallery: GALLERY_INFO_1,
            },
          }),
        };

        expect(imageGalleriesReducer(
          startState,
          { type: 'IMAGE_GALLERY_DELETE_REQUEST', galleryId: 5 },
        )).toEqual(expectedState);
      });

      it('processes IMAGE_GALLERY_LIST_DELETE_RESPONSE_ERROR', () => {
        const expectedState = {
          loading: false,
          error: null,
          galleries: Map({
            gallery_5: {
              loading: false,
              error: ERROR,
              gallery: GALLERY_INFO_1,
            },
          }),
        };

        expect(imageGalleriesReducer(
          startState,
          { type: 'IMAGE_GALLERY_DELETE_RESPONSE_ERROR', galleryId: 5, error: ERROR },
        )).toEqual(expectedState);
      });

      it('processes IMAGE_GALLERY_LIST_DELETE_RESPONSE_OK', () => {
        const expectedState = {
          loading: false,
          error: null,
          galleries: Map(),
        };

        expect(imageGalleriesReducer(
          startState,
          { type: 'IMAGE_GALLERY_DELETE_RESPONSE_OK', galleryId: 5 },
        )).toEqual(expectedState);
      });

      it('processes IMAGE_GALLERY_UPDATE_REQUEST', () => {
        const expectedState = {
          loading: false,
          error: null,
          galleries: Map({
            gallery_5: {
              loading: true,
              error: null,
              gallery: GALLERY_INFO_1,
            },
          }),
        };

        expect(imageGalleriesReducer(startState, {
          type: 'IMAGE_GALLERY_UPDATE_REQUEST',
          galleryId: 5,
        })).toEqual(expectedState);
      });

      it('processes IMAGE_GALLERY_UPDATE_RESPONSE_ERROR', () => {
        const expectedState = {
          loading: false,
          error: null,
          galleries: Map({
            gallery_5: {
              loading: false,
              error: ERROR,
              gallery: GALLERY_INFO_1,
            },
          }),
        };

        expect(imageGalleriesReducer(startState, {
          type: 'IMAGE_GALLERY_UPDATE_RESPONSE_ERROR',
          galleryId: 5,
          error: ERROR,
        })).toEqual(expectedState);
      });

      it('processes IMAGE_GALLERY_UPDATE_RESPONSE_OK', () => {
        const newGallery = { ...GALLERY_INFO_1, description: 'a new description' };

        const expectedState = {
          loading: false,
          error: null,
          galleries: Map({
            gallery_5: {
              loading: false,
              error: null,
              gallery: newGallery,
            },
          }),
        };

        expect(imageGalleriesReducer(startState, {
          type: 'IMAGE_GALLERY_UPDATE_RESPONSE_OK',
          gallery: newGallery,
        })).toEqual(expectedState);
      });
    });
  });
});
