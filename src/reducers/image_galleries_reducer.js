// @flow
import { Map } from 'immutable';
import type { ImageGallery } from 'urbanoe-model';
import type { Action } from '../actions';

type ImageGalleryState = {
  +loading: boolean,
  +error: ?Object,
  +gallery: ImageGallery,
};

type State = {
  loading: boolean,
  +error: ?Object,
  +galleries: Map<string, ImageGalleryState>,
}

const galleryIndex = (galleryId: number) => `gallery_${galleryId}`;

const createGalleryState = (gallery: ImageGallery) : ImageGalleryState =>
  ({ loading: false, error: null, gallery });

const createGalleries = (galleries : Array<ImageGallery>) : Map<string, ImageGalleryState> =>
  (Map(galleries.map(item => [galleryIndex(item.id), createGalleryState(item)])));

const INITIAL_STATE : State = {
  loading: false,
  error: null,
  galleries: (new Map(): Map<string, ImageGalleryState>),
};

function mergeGallery(state: State, galleryId: number, attribs: Object) : State {
  return {
    ...state,
    galleries: state.galleries.mergeDeep({
      [galleryIndex(galleryId)]: attribs,
    }) };
}

export function imageGalleriesReducer(state: State = INITIAL_STATE, action: Action): State {
  switch (action.type) {
    case 'IMAGE_GALLERY_DELETE_REQUEST':
      return mergeGallery(state, action.galleryId, { loading: true, error: null });
    case 'IMAGE_GALLERY_DELETE_RESPONSE_ERROR':
      return mergeGallery(state, action.galleryId, { loading: false, error: action.error });
    case 'IMAGE_GALLERY_DELETE_RESPONSE_OK':
      return {
        ...state,
        galleries: state.galleries.remove(galleryIndex(action.galleryId)),
      };
    case 'IMAGE_GALLERY_UPDATE_REQUEST':
      return mergeGallery(state, action.galleryId, { loading: true, error: null });
    case 'IMAGE_GALLERY_UPDATE_RESPONSE_ERROR':
      return mergeGallery(state, action.galleryId, { loading: false, error: action.error });
    case 'IMAGE_GALLERY_UPDATE_RESPONSE_OK':
      return mergeGallery(state, action.gallery.id, {
        loading: false,
        error: null,
        gallery: action.gallery });
    case 'IMAGE_GALLERY_CREATE_REQUEST':
      return { ...state, loading: true, error: null, galleries: Map() };
    case 'IMAGE_GALLERY_CREATE_RESPONSE_ERROR':
      return { ...state, loading: false, error: action.error, galleries: Map() };
    case 'IMAGE_GALLERY_CREATE_RESPONSE_OK':
      return {
        ...state,
        loading: false,
        error: null,
        galleries:
          state.galleries.set(galleryIndex(action.gallery.id), createGalleryState(action.gallery)),
      };
    case 'IMAGE_GALLERY_LIST_REQUEST':
      return { ...state, loading: true, error: null, galleries: Map() };
    case 'IMAGE_GALLERY_LIST_RESPONSE_OK':
      return { ...state, loading: false, galleries: createGalleries(action.galleries) };
    case 'IMAGE_GALLERY_LIST_RESPONSE_ERROR':
      return { ...state, loading: false, error: action.error, galleries: Map() };
    default:
      return state;
  }
}
