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

function processImageInfoDelete(imageInfo: ?ImageGalleryImageInfoDetails, action: Action)
  : ?ImageGalleryImageInfoDetails {
  if (imageInfo) {
    const { id, galleryId } = imageInfo;
    return (galleryId === action.galleryId && id === action.imageInfoId) ? null : imageInfo;
  }
  return null;
}

function processImageGalleryDelete(imageInfo: ?ImageGalleryImageInfoDetails, galleryId: number)
: ?ImageGalleryImageInfoDetails {
  if (imageInfo) {
    return (imageInfo.galleryId === galleryId) ? null : imageInfo;
  }
  return null;
}

export function imageInfoSelectedReducer(state : State = INITIAL_STATE, action : Action) : State {
  switch (action.type) {
    case 'IMAGE_GALLERY_DELETE_RESPONSE_OK':
      return { ...state, imageInfo: processImageGalleryDelete(state.imageInfo, action.galleryId) };
    case 'IMAGE_GALLERY_IMAGE_INFO_DELETE_RESPONSE_OK':
      return { ...state, imageInfo: processImageInfoDelete(state.imageInfo, action) };
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
