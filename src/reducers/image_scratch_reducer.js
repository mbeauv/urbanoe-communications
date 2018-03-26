// @flow
import type { ImageScratchDetails } from 'urbanoe-model';
import type { Action } from '../actions/types';

type State = {
  +loading: bool,
  +error: ?Object,
  +imageScratch: ?ImageScratchDetails
};

const INITIAL_STATE = {
  loading: false,
  error: null,
  imageScratch: null,
};

export function imageScratchReducer(state: State = INITIAL_STATE, action: Action) : State {
  switch (action.type) {
    case 'IMAGE_GALLERY_SCRATCH_CREATE_REQUEST':
      return { ...state, loading: true, error: null, imageScratch: null };
    case 'IMAGE_GALLERY_SCRATCH_CREATE_RESPONSE_OK':
      return { ...state, loading: false, error: null, imageScratch: action.scratchImage };
    case 'IMAGE_GALLERY_SCRATCH_CREATE_RESPONSE_ERROR':
      return { ...state, loading: false, error: action.error, imageScratch: null };
    default:
      return state;
  }
}
