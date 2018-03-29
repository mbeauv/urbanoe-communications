// @flow
import { Map } from 'immutable';
import type { ImageGalleryInfo, ImageGalleryDetails, ImageGalleryImageInfoDetails} from 'urbanoe-model';
import type { Action } from '../actions';

type State = {
  loading: boolean,
  +error: ?Object,
  +galleries: Map<number, ImageGalleryInfo>,
}

function convertGalleryDetailsToInfo(details : ImageGalleryDetails) : ImageGalleryInfo {
  const { id, description, name } = details;
  return { id, description, name, nbImages: details.imageInfos.length };
}

function addGallery(galleries: Map<number, ImageGalleryInfo>, gallery: ImageGalleryDetails) :
  Map<number, ImageGalleryInfo> {
  return galleries.set(parseInt(gallery.id, 10), convertGalleryDetailsToInfo(gallery));
}

function createGalleries(galleries : Array<ImageGalleryInfo>) : Map<number, ImageGalleryInfo> {
  return Map(galleries.map(item => [parseInt(item.id, 10), item]));
}

function processImageInfoCreate(
  state : State,
  { galleryId }: ImageGalleryImageInfoDetails,
) : State {
  const gallery = state.galleries.get(galleryId);
  if (gallery) {
    const newGallery = { ...gallery, nbImages: gallery.nbImages + 1 };
    return { ...state, galleries: state.galleries.set(galleryId, newGallery) };
  }
  return state;
}

const INITIAL_STATE : State = {
  loading: false,
  error: null,
  galleries: (new Map(): Map<number, ImageGalleryInfo>),
};

export function imageGalleriesReducer(state: State = INITIAL_STATE, action: Action): State {
  switch (action.type) {
    case 'IMAGE_GALLERY_IMAGE_INFO_CREATE_RESPONSE_OK':
      return processImageInfoCreate(state, action.imageInfo);
    case 'IMAGE_GALLERY_UPDATE_RESPONSE_OK':
      return {
        ...state,
        galleries: state.galleries.set(
          action.gallery.id,
          convertGalleryDetailsToInfo(action.gallery),
        ),
      };
    case 'IMAGE_GALLERY_DELETE_RESPONSE_OK':
      return { ...state, galleries: state.galleries.delete(action.galleryId) };
    case 'IMAGE_GALLERY_CREATE_RESPONSE_OK':
      return { ...state, galleries: addGallery(state.galleries, action.gallery) };
    case 'IMAGE_GALLERY_LIST_REQUEST':
      return { ...state, loading: true };
    case 'IMAGE_GALLERY_LIST_RESPONSE_OK':
      return { ...state, loading: false, galleries: createGalleries(action.galleries) };
    case 'IMAGE_GALLERY_LIST_RESPONSE_ERROR':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}
