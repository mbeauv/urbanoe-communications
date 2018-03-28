// @flow

import { Map } from 'immutable';
import type { ThunkAction } from './types';
import { communicator, url } from '../common';

const imageInfoUrl = galleryId => `/media_gallery/galleries/${galleryId}/image_infos`;

/**
 * Creates a new image info object and associates it to the the gallery.  Note
 * that there's an assumption that there's an image that's already been placed
 * in the image scratch.
 */
export function createImageInfo(
  authToken: string,
  galleryId: number,
  name: string,
  description: string,
) : ThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'IMAGE_GALLERY_IMAGE_INFO_CREATE_REQUEST' });

    try {
      const imgUrl = url(`${imageInfoUrl(galleryId)}.json`, Map({ auth_token: authToken, use_scratch: true }));
      const response = await communicator().post(imgUrl, {
        name,
        description,
      });
      dispatch({ type: 'IMAGE_GALLERY_IMAGE_INFO_CREATE_RESPONSE_OK', imageInfo: response.data });
    } catch (error) {
      dispatch({ type: 'IMAGE_GALLERY_IMAGE_INFO_CREATE_RESPONSE_ERROR', error });
    }
  };
}

/**
 * Updates an existing image info with the passed in data.  At the present time
 * there is an assumption that an image was placed in the image scratch (if it
 * was one of the attributes to be modified).
 */
export function updateImageInfo(
  authToken: string,
  galleryId: number,
  imageInfoId: number,
  name: string,
  description: string,
) : ThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'IMAGE_GALLERY_IMAGE_INFO_UPDATE_REQUEST' });

    try {
      const imgUrl = url(`${imageInfoUrl(galleryId)}/${imageInfoId}.json`, Map({ auth_token: authToken, use_scratch: true }));
      const response = await communicator().put(imgUrl, {
        name,
        description,
      });
      dispatch({ type: 'IMAGE_GALLERY_IMAGE_INFO_UPDATE_RESPONSE_OK', imageInfo: response.data });
    } catch (error) {
      dispatch({ type: 'IMAGE_GALLERY_IMAGE_INFO_UPDATE_RESPONSE_ERROR', error });
    }
  };
}

export function deleteImageInfo(authToken: string, galleryId: number, imageInfoId: number):
  ThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'IMAGE_GALLERY_IMAGE_INFO_DELETE_REQUEST', galleryId, imageInfoId });

    try {
      const imgUrl = url(`${imageInfoUrl(galleryId)}/${imageInfoId}.json`, Map({ auth_token: authToken }));
      await communicator().delete(imgUrl);
      dispatch({ type: 'IMAGE_GALLERY_IMAGE_INFO_DELETE_RESPONSE_OK', galleryId, imageInfoId });
    } catch (error) {
      dispatch({ type: 'IMAGE_GALLERY_IMAGE_INFO_DELETE_RESPONSE_ERROR', galleryId, imageInfoId, error });
    }
  };
}

export function getImageInfos(authToken: string, galleryId: number): ThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'IMAGE_GALLERY_IMAGE_INFO_LIST_REQUEST' });

    try {
      const imgUrl = url(`${imageInfoUrl(galleryId)}.json`, Map({ auth_token: authToken }));
      const response = await communicator().get(imgUrl);
      dispatch({ type: 'IMAGE_GALLERY_IMAGE_INFO_LIST_RESPONSE_OK', imageInfos: response.data });
    } catch (error) {
      dispatch({ type: 'IMAGE_GALLERY_IMAGE_INFO_LIST_RESPONSE_ERROR', error });
    }
  };
}

export function getImageInfo(authToken: string, galleryId: number, imageInfoId: number):
  ThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'IMAGE_GALLERY_IMAGE_INFO_SELECTION_REQUEST', galleryId, imageInfoId });

    try {
      const imgUrl = url(`${imageInfoUrl(galleryId)}/${imageInfoId}.json`, Map({ auth_token: authToken }));
      const response = await communicator().get(imgUrl);
      dispatch({ type: 'IMAGE_GALLERY_IMAGE_INFO_SELECTION_RESPONSE_OK', imageInfo: response.data });
    } catch (error) {
      dispatch({ type: 'IMAGE_GALLERY_IMAGE_INFO_SELECTION_RESPONSE_ERROR', error });
    }
  };
}
