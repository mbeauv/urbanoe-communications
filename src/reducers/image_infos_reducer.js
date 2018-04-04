// @flow

import { Map } from 'immutable';
import _ from 'lodash';
import type { ImageGalleryImageInfo } from 'urbanoe-model';
import type { Action } from '../actions/types';

/** Information about one particular image. */
type ImageInfoState = {
  +loading: boolean,
  +imageInfo: ImageGalleryImageInfo,
  +error: ?Object,
};

/** Information about one gallery of images. */
type GalleryImagesState = {
  +loading: boolean,
  +error: ?Object,
  +imageInfos: Map<string, ImageInfoState>,
}

/** Information about all of the gallery images. */
type State = {
  +galleryImages: Map<string, GalleryImagesState>,
};

/** Constructs the index name for a gallery image collection. */
const galleryImageIndex = (galleryId: number) : string => `gallery_${galleryId}`;

const imageIndex = (imageId: number) => `image_${imageId}`;

const INITIAL_STATE = { galleryImages: new Map() };

function processGalleryListResponseOk(
  state: State,
  galleryId: number,
  imageInfos: Array<ImageGalleryImageInfo>,
) : State {
  const infos = [];
  _.reduce(imageInfos, (r, v) => {
    r.push([imageIndex(v.id), { loading: false, error: null, imageInfo: v }]);
    return r;
  }, infos);

  const gallery = { loading: false, error: null, imageInfos: Map(infos) };
  return {
    ...state,
    galleryImages: state.galleryImages.set(galleryImageIndex(galleryId), gallery),
  };
}

function processDeleteOk(
  state: State,
  galleryId: number,
  imageInfoId: number,
) : State {
  const galleryImageState = state.galleryImages.get(galleryImageIndex(galleryId));
  galleryImageState.imageInfos = galleryImageState.imageInfos.delete(imageIndex(imageInfoId));
  if (galleryImageState.imageInfos.length === 0) {
    state.galleryImages.delete(galleryImageIndex(galleryId));
  }
  return state;
}

export function imageInfosReducer(state : State = INITIAL_STATE, action : Action) : State {
  switch (action.type) {
    case 'IMAGE_GALLERY_IMAGE_INFO_LIST_REQUEST':
      return {
        ...state,
        galleryImages: state.galleryImages.mergeDeep({
          [galleryImageIndex(action.galleryId)]: {
            loading: true,
            error: null,
            imageInfos: Map(),
          },
        }),
      };
    case 'IMAGE_GALLERY_IMAGE_INFO_LIST_RESPONSE_ERROR':
      return {
        ...state,
        galleryImages: state.galleryImages.mergeDeep({
          [galleryImageIndex(action.galleryId)]: {
            loading: false,
            error: action.error,
          },
        }),
      };
    case 'IMAGE_GALLERY_IMAGE_INFO_LIST_RESPONSE_OK':
      return processGalleryListResponseOk(state, action.galleryId, action.imageInfos);
    case 'IMAGE_GALLERY_IMAGE_INFO_CREATE_REQUEST':
      return {
        ...state,
        galleryImages: state.galleryImages.mergeDeep({
          [galleryImageIndex(action.galleryId)]: {
            loading: true,
            error: null,
          },
        }),
      };
    case 'IMAGE_GALLERY_IMAGE_INFO_CREATE_RESPONSE_ERROR':
      return {
        ...state,
        galleryImages: state.galleryImages.mergeDeep({
          [galleryImageIndex(action.galleryId)]: {
            loading: false,
            error: action.error,
          },
        }),
      };
    case 'IMAGE_GALLERY_IMAGE_INFO_CREATE_RESPONSE_OK':
      return {
        ...state,
        galleryImages: state.galleryImages.mergeDeep({
          [galleryImageIndex(action.galleryId)]: {
            loading: false,
            error: null,
            imageInfos: {
              [imageIndex(action.imageInfo.id)]: {
                loading: false,
                error: null,
                imageInfo: action.imageInfo,
              },
            },
          },
        }),
      };
    case 'IMAGE_GALLERY_IMAGE_INFO_DELETE_REQUEST':
      return {
        ...state,
        galleryImages: state.galleryImages.mergeDeep({
          [galleryImageIndex(action.galleryId)]: {
            imageInfos: Map({
              [imageIndex(action.imageInfoId)]: {
                loading: true,
                error: null,
              },
            }),
          },
        }),
      };
    case 'IMAGE_GALLERY_IMAGE_INFO_DELETE_RESPONSE_ERROR':
      return {
        ...state,
        galleryImages: state.galleryImages.mergeDeep({
          [galleryImageIndex(action.galleryId)]: {
            imageInfos: Map({
              [imageIndex(action.imageInfoId)]: {
                loading: false,
                error: action.error,
              },
            }),
          },
        }),
      };
    case 'IMAGE_GALLERY_IMAGE_INFO_DELETE_RESPONSE_OK':
      return processDeleteOk(state, action.galleryId, action.imageInfoId);
    case 'IMAGE_GALLERY_IMAGE_INFO_UPDATE_REQUEST':
      return {
        ...state,
        galleryImages: state.galleryImages.mergeDeep({
          [galleryImageIndex(action.galleryId)]: {
            imageInfos: Map({
              [imageIndex(action.imageInfoId)]: {
                loading: true,
                error: null,
              },
            }),
          },
        }),
      };
    case 'IMAGE_GALLERY_IMAGE_INFO_UPDATE_RESPONSE_ERROR':
      return {
        ...state,
        galleryImages: state.galleryImages.mergeDeep({
          [galleryImageIndex(action.galleryId)]: {
            imageInfos: Map({
              [imageIndex(action.imageInfoId)]: {
                loading: false,
                error: action.error,
              },
            }),
          },
        }),
      };
    case 'IMAGE_GALLERY_IMAGE_INFO_UPDATE_RESPONSE_OK':
      return {
        ...state,
        galleryImages: state.galleryImages.mergeDeep({
          [galleryImageIndex(action.galleryId)]: {
            imageInfos: Map({
              [imageIndex(action.imageInfo.id)]: {
                loading: false,
                error: null,
                imageInfo: action.imageInfo,
              },
            }),
          },
        }),
      };
    default:
      return state;
  }
}
