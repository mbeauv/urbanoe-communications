import { imageGalleriesReducer } from '../image_galleries_reducer';

const EMPTY_STATE = {
  loading: false,
  galleries: [],
  error: null,
};

const ERROR = 'an error';

const GALLERIES = [
  {
    id: 5,
    name: 'jdoe_gallery',
    nbImages: 1,
  },
  {
    id: 6,
    name: 'jdoe_gallery22',
    nbImages: 0,
  },
];

describe('image_galleries_reducer', () => {
  describe('imageGalleriesReducer', () => {
    it('returns state if action is unsupported type', () => {
      expect(imageGalleriesReducer(EMPTY_STATE, { type: 'BLAH_BLAH', error: {} }))
        .toEqual(EMPTY_STATE);
    });

    it('initializes with proper value', () => {
      expect(imageGalleriesReducer(undefined, {})).toEqual(EMPTY_STATE);
    });

    it('processes IMAGE_GALLERY_LIST_RESPONSE_ERROR', () => {
      expect(imageGalleriesReducer(
        EMPTY_STATE,
        { type: 'IMAGE_GALLERY_LIST_RESPONSE_ERROR', error: ERROR },
      )).toEqual({
        error: ERROR,
        galleries: [],
        loading: false,
      });
    });

    it('processes IMAGE_GALLERY_LIST_RESPONSE_OK', () => {
      expect(imageGalleriesReducer(
        EMPTY_STATE,
        { type: 'IMAGE_GALLERY_LIST_RESPONSE_OK', galleries: GALLERIES },
      )).toEqual({
        error: null,
        galleries: GALLERIES,
        loading: false,
      });
    });

    it('processes IMAGE_GALLERY_LIST_REQUEST', () => {
      expect(imageGalleriesReducer(
        EMPTY_STATE,
        { type: 'IMAGE_GALLERY_LIST_REQUEST' },
      )).toEqual({
        error: null,
        galleries: [],
        loading: true,
      });
    });
  });
});
