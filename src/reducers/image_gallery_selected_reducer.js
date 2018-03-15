// @flow

import type { ImageGalleryDetails } from 'urbanoe-model';
import type { Action } from '../actions/types';

type State = {
  +loading: boolean,
  +gallery: ?ImageGalleryDetails,
  +error: ?Object,
};

const INITIAL_STATE = {
  loading: false,
  gallery: null,
  error: null,
};

export function imageGallerySelectedReducer(state : State = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case 'IMAGE_GALLERY_SELECTION_REQUEST':
      return { ...state, loading: true, gallery: null, error: null };
    case 'IMAGE_GALLERY_SELECTION_RESPONSE_OK':
      return { ...state, loading: false, gallery: action.gallery, error: null };
    case 'IMAGE_GALLERY_SELECTION_RESPONSE_ERROR':
      return { ...state, loading: false, gallery: null, error: action.error };
    default:
      return state;
  }
}
