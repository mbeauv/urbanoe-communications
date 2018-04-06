// @flow

import type {
  ImageGallery,
  ImageGalleryImageInfo,
  ImageScratchDetails,
} from '../models';

/**
 * List of all recognized React Redux actions that can be performed with
 * regards to the Urbanoe server.  The approach used follows the template
 * that was defined in the Facebook f8app sample.  See:
 *
 * https://github.com/fbsamples/f8app/blob/master/js/actions/types.js
 */
export type MediaGalleryAction =
  | { type: 'IMAGE_GALLERY_LIST_REQUEST' }
  | { type: 'IMAGE_GALLERY_LIST_RESPONSE_OK', galleries: Array<ImageGallery> }
  | { type: 'IMAGE_GALLERY_LIST_RESPONSE_ERROR', error: Object }
  | { type: 'IMAGE_GALLERY_CREATE_REQUEST' }
  | { type: 'IMAGE_GALLERY_CREATE_RESPONSE_OK', gallery: ImageGallery }
  | { type: 'IMAGE_GALLERY_CREATE_RESPONSE_ERROR', error: Object }
  | { type: 'IMAGE_GALLERY_UPDATE_REQUEST', galleryId: number }
  | { type: 'IMAGE_GALLERY_UPDATE_RESPONSE_OK', gallery: ImageGallery }
  | { type: 'IMAGE_GALLERY_UPDATE_RESPONSE_ERROR', galleryId: number, error: Object }
  | { type: 'IMAGE_GALLERY_DELETE_REQUEST', galleryId: number }
  | { type: 'IMAGE_GALLERY_DELETE_RESPONSE_OK', galleryId: number }
  | { type: 'IMAGE_GALLERY_DELETE_RESPONSE_ERROR', galleryId: number, error: Object }
  | { type: 'IMAGE_GALLERY_IMAGE_INFO_LIST_REQUEST', galleryId: number }
  | { type: 'IMAGE_GALLERY_IMAGE_INFO_LIST_RESPONSE_OK', galleryId: number, imageInfos: Array<ImageGalleryImageInfo> }
  | { type: 'IMAGE_GALLERY_IMAGE_INFO_LIST_RESPONSE_ERROR', galleryId: number, error: Object }
  | { type: 'IMAGE_GALLERY_IMAGE_INFO_CREATE_REQUEST', galleryId: number }
  | { type: 'IMAGE_GALLERY_IMAGE_INFO_CREATE_RESPONSE_OK', galleryId: number, imageInfo: ImageGalleryImageInfo }
  | { type: 'IMAGE_GALLERY_IMAGE_INFO_CREATE_RESPONSE_ERROR', galleryId: number, error: Object }
  | { type: 'IMAGE_GALLERY_IMAGE_INFO_UPDATE_REQUEST', galleryId: number, imageInfoId: number }
  | { type: 'IMAGE_GALLERY_IMAGE_INFO_UPDATE_RESPONSE_OK', galleryId: number, imageInfo: ImageGalleryImageInfo }
  | { type: 'IMAGE_GALLERY_IMAGE_INFO_UPDATE_RESPONSE_ERROR', galleryId: number, imageInfoId: number, error: Object }
  | { type: 'IMAGE_GALLERY_IMAGE_INFO_DELETE_REQUEST', galleryId: number, imageInfoId: number }
  | { type: 'IMAGE_GALLERY_IMAGE_INFO_DELETE_RESPONSE_OK', galleryId: number, imageInfoId: number }
  | { type: 'IMAGE_GALLERY_IMAGE_INFO_DELETE_RESPONSE_ERROR', galleryId: number, imageInfoId: number, error: Object }
  | { type: 'IMAGE_GALLERY_IMAGE_INFO_SELECTION_REQUEST' }
  | { type: 'IMAGE_GALLERY_IMAGE_INFO_SELECTION_RESPONSE_OK', imageInfo: ImageGalleryImageInfo }
  | { type: 'IMAGE_GALLERY_IMAGE_INFO_SELECTION_RESPONSE_ERROR', error: Object}
  | { type: 'IMAGE_GALLERY_SCRATCH_CREATE_REQUEST' }
  | { type: 'IMAGE_GALLERY_SCRATCH_CREATE_RESPONSE_OK', scratchImage: ImageScratchDetails }
  | { type: 'IMAGE_GALLERY_SCRATCH_CREATE_RESPONSE_ERROR', error: Object }
  | { type: 'IMAGE_GALLERY_SCRATCH_DELETE_REQUEST' }
  | { type: 'IMAGE_GALLERY_SCRATCH_DELETE_RESPONSE_OK' }
  | { type: 'IMAGE_GALLERY_SCRATCH_DELETE_RESPONSE_ERROR' }
  | { type: 'IMAGE_GALLERY_SCRATCH_REINIT_LOCAL' };

/** Typed promise for action */
export type MediaGalleryPromiseAction = Promise<MediaGalleryAction>;

/** Returns the Redux state. */
export type MediaGalleryGetState = () => Object;

/** Flow definition of a dispatcher action. */
export type MediaGalleryDispatch = (
  action: MediaGalleryAction |
  MediaGalleryPromiseAction |
  Array<MediaGalleryAction>
) => any;

/** Represents a thunk promise, see redux-thunk */
export type MediaGalleryThunkAction = (
  dispatch: MediaGalleryDispatch,
  getState: MediaGalleryGetState
) => any;
