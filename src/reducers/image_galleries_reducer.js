// @flow
import { Map } from 'immutable';
import type { ImageGalleryInfo } from 'urbanoe-model';
import type { Action } from '../actions';

type State = {
  loading: boolean,
  +error: ?Object,
  +galleries: Map<number, ImageGalleryInfo>,
}

function delGallery(galleries, id): Map<number, ImageGalleryInfo> {
  return galleries.delete(id);
}

function addGallery(galleries: Map<number, ImageGalleryInfo>, gallery: ImageGalleryInfo) :
  Map<number, ImageGalleryInfo> {
  return galleries.set(parseInt(gallery.id, 10), gallery);
}

function createGalleries(galleries : Array<ImageGalleryInfo>) : Map<number, ImageGalleryInfo> {
  return Map(galleries.map(item => [parseInt(item.id, 10), item]));
}

const INITIAL_STATE : State = {
  loading: false,
  error: null,
  galleries: (new Map(): Map<number, ImageGalleryInfo>),
};

export function imageGalleriesReducer(state: State = INITIAL_STATE, action: Action): State {
  switch (action.type) {
    case 'IMAGE_GALLERY_DELETE_RESPONSE_OK':
      return { ...state, galleries: delGallery(state.galleries, action.galleryId) };
    case 'IMAGE_GALLERY_CREATE_RESPONSE_OK':
      return { ...state, galleries: addGallery(state.galleries, action.gallery) };
    case 'IMAGE_GALLERY_LIST_REQUEST':
      return { ...state, loading: true, galleries: new Map() };
    case 'IMAGE_GALLERY_LIST_RESPONSE_OK':
      return { ...state, loading: false, galleries: createGalleries(action.galleries) };
    case 'IMAGE_GALLERY_LIST_RESPONSE_ERROR':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}
