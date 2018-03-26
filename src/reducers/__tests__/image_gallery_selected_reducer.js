import { imageGallerySelectedReducer } from '../image_gallery_selected_reducer';

const INITIAL_STATE = {
  loading: false,
  gallery: null,
  error: null,
};

const GALLERY = { id: 22 };
const ERROR = 'An error';

describe('image_gallery_selected_reducer', () => {
  describe('imageGallerySelectedReducer', () => {
    it('returns current state if unsupported action', () => {
      expect(imageGallerySelectedReducer(INITIAL_STATE, { type: 'BLAH' })).toEqual(INITIAL_STATE);
    });

    it('initializes with proper value', () => {
      expect(imageGallerySelectedReducer(undefined, {})).toEqual(INITIAL_STATE);
    });

    it('proecesses IMAGE_GALLERY_DELETE_RESPONSE_OK', () => {
      expect(imageGallerySelectedReducer(
        {
          loading: false,
          gallery: GALLERY,
          error: null,
        },
        { type: 'IMAGE_GALLERY_DELETE_RESPONSE_OK', galleryId: 22 },
      )).toEqual({ loading: false, gallery: null, error: null });
    });

    it('processes IMAGE_GALLERY_SELECTION_REQUEST', () => {
      expect(imageGallerySelectedReducer(
        INITIAL_STATE,
        { type: 'IMAGE_GALLERY_SELECTION_REQUEST' },
      )).toEqual({
        error: null,
        gallery: null,
        loading: true,
      });
    });

    it('processes IMAGE_GALLERY_SELECTION_RESPONSE_OK', () => {
      expect(imageGallerySelectedReducer(
        INITIAL_STATE,
        { type: 'IMAGE_GALLERY_SELECTION_RESPONSE_OK', gallery: GALLERY },
      )).toEqual({
        error: null,
        gallery: GALLERY,
        loading: false,
      });
    });

    it('processes IMAGE_GALLERY_SELECTION_RESPONSE_ERROR', () => {
      expect(imageGallerySelectedReducer(
        INITIAL_STATE,
        { type: 'IMAGE_GALLERY_SELECTION_RESPONSE_ERROR', error: ERROR },
      )).toEqual({
        error: ERROR,
        gallery: null,
        loading: false,
      });
    });
  });
});
