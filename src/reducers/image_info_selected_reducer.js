// @flow

import type { ImageGalleryImageInfoDetails } from 'urbanoe-model';
import type { Action } from '../actions/types';


type State = {
  +loading: boolean,
  +error: ?Object,
  +imageInfo: ?ImageGalleryImageInfoDetails,
};

const INITIAL_STATE = {
  loading: false,
  error: null,
  imageInfo: null,
};

function calculateStateForDeletion(
  state: State,
  deletedGalleryId: number,
  deletedImageInfoId: number,
) : State {
  if (state.imageInfo === null) {
    return INITIAL_STATE;
  }

  const { galleryId, id } = state.imageInfo;
  if (galleryId === deletedGalleryId && id === deletedImageInfoId) {
    return INITIAL_STATE;
  }

  return state;
}

export function imageInfoSelectedReducer(state : State = INITIAL_STATE, action : Action) : State {
  switch (action.type) {
    case 'IMAGE_GALLERY_IMAGE_INFO_DELETE_RESPONSE_OK':
      return calculateStateForDeletion(state, action.galleryId, action.imageInfoId);
    case 'IMAGE_GALLERY_IMAGE_INFO_SELECTION_REQUEST':
      return { ...state, loading: true, error: null, imageInfo: null };
    case 'IMAGE_GALLERY_IMAGE_INFO_SELECTION_RESPONSE_OK':
      return { ...state, loading: false, error: null, imageInfo: action.imageInfo };
    case 'IMAGE_GALLERY_IMAGE_INFO_SELECTION_RESPONSE_ERROR':
      return { ...state, loading: false, error: action.error, imageInfo: null };
    default:
      return state;
  }
}
