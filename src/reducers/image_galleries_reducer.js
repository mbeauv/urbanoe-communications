// @flow
import type { ImageGalleryInfo } from 'urbanoe-model';
import type { Action } from '../actions';

type State = {
  loading: boolean,
  +error: ?Object,
  +galleries: Array<ImageGalleryInfo>,
}

const INITIAL_STATE : State = {
  loading: false,
  error: null,
  galleries: [],
};

export function imageGalleriesReducer(state: State = INITIAL_STATE, action: Action): State {
  switch (action.type) {
    case 'IMAGE_GALLERY_LIST_REQUEST':
      return { ...state, loading: true, galleries: [] };
    case 'IMAGE_GALLERY_LIST_RESPONSE_OK':
      return { ...state, loading: false, galleries: action.galleries };
    case 'IMAGE_GALLERY_LIST_RESPONSE_ERROR':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}
