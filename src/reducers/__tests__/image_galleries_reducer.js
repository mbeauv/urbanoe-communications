import { Map } from 'immutable';
import { imageGalleriesReducer } from '../image_galleries_reducer';

const EMPTY_STATE = { loading: false, galleries: new Map(), error: null };
const ERROR = 'an error';
const GALLERIES_JSON = [
  { id: 5, name: 'jdoe_gallery', nbImages: 1 },
  { id: 6, name: 'jdoe_gallery22', nbImages: 0 },
];

/** Helper method converting a JSON map structure to an Immutable map object. */
function createMap(data) {
  return new Map(data.map(item => [item.id, item]));
}

describe('image_galleries_reducer', () => {
  describe('imageGalleriesReducer', () => {
    it('returns state if action is unsupported type', () => {
      expect(imageGalleriesReducer(EMPTY_STATE, { type: 'BLAH_BLAH', error: {} }))
        .toEqual(EMPTY_STATE);
    });

    it('initializes with proper value', () => {
      expect(imageGalleriesReducer(undefined, {})).toEqual(EMPTY_STATE);
    });

    it('processes IMAGE_GALLERY_DELETE_RESPONSE_OK', () => {
      const startMap = createMap(GALLERIES_JSON);

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
        { type: 'IMAGE_GALLERY_LIST_RESPONSE_OK', galleries: GALLERIES_JSON },
      )).toEqual({
        error: null,
        galleries: createMap(GALLERIES_JSON),
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
