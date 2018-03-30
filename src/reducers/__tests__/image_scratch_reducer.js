// @flow
import type { ImageScratchDetails } from 'urbanoe-model';
import type { Action } from '../../actions';
import { imageScratchReducer } from '../image_scratch_reducer';

const INITIAL_STATE = {
  loading: false,
  error: null,
  imageScratch: null,
};

const CREATE_REQUEST : Action = {
  type: 'IMAGE_GALLERY_SCRATCH_CREATE_REQUEST',
};

const VALID_SCRATCH : ImageScratchDetails = {
  id: 12,
  imageVersionId: 23,
  variants: [],
};

describe('image_scratch_reducer', () => {
  describe('imageScratchReducer', () => {
    it('initializes with proper value', () => {
      expect(imageScratchReducer(undefined, { type: 'LOGOUT_REQUEST' })).toEqual(INITIAL_STATE);
    });

    it('returns current state if unsupported action', () => {
      expect(imageScratchReducer(INITIAL_STATE, { type: 'LOGOUT_REQUEST' })).toEqual(INITIAL_STATE);
    });

    it('processes IMAGE_GALLERY_SCRATCH_REINIT_LOCAL', () => {
      expect(imageScratchReducer(
        { loading: false, error: null, imageScratch: VALID_SCRATCH },
        { type: 'IMAGE_GALLERY_SCRATCH_REINIT_LOCAL' },
      )).toEqual(INITIAL_STATE);
    });

    it('processes IMAGE_GALLERY_SCRATCH_CREATE_REQUEST', () => {
      expect(imageScratchReducer(INITIAL_STATE, CREATE_REQUEST)).toEqual({
        loading: true,
        error: null,
        imageScratch: null,
      });
    });

    it('processes IMAGE_GALLERY_SCRATCH_CREATE_RESPONSE_OK', () => {
      expect(imageScratchReducer(INITIAL_STATE, {
        type: 'IMAGE_GALLERY_SCRATCH_CREATE_RESPONSE_OK',
        scratchImage: VALID_SCRATCH,
      })).toEqual({
        loading: false,
        error: null,
        imageScratch: VALID_SCRATCH,
      });
    });
  });
});
