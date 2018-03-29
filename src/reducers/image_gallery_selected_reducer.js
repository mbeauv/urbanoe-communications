// @flow

import type { ImageGalleryDetails, ImageGalleryImageInfoDetails } from 'urbanoe-model';
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

/**
 * Verifies if the selected gallery should be deleted or not. It will be
 * deleted if it's the same gallery.
 */
function shouldDelete(state : State, galleryId: number) : bool {
  return (state.gallery != null && state.gallery.id === galleryId);
}

function processImageInfo(gallery : ImageGalleryDetails, imageInfo: ImageGalleryImageInfoDetails)
: ImageGalleryDetails {
  if (imageInfo.galleryId === gallery.id) {
    const imageInfos = [
      ...gallery.imageInfos,
      { name: imageInfo.name, url: imageInfo.version[0].url },
    ];
    return { ...gallery, imageInfos };
  }
  return gallery;
}

export function imageGallerySelectedReducer(state : State = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case 'IMAGE_GALLERY_IMAGE_INFO_CREATE_RESPONSE_OK':
      return { ...state, gallery: processImageInfo(state.gallery, action.imageInfo) };
    case 'IMAGE_GALLERY_UPDATE_RESPONSE_OK':
      return { ...state, gallery: action.gallery };
    case 'IMAGE_GALLERY_DELETE_RESPONSE_OK':
      return shouldDelete(state, action.galleryId) ? INITIAL_STATE : state;
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
