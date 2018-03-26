// @flow

import { Map } from 'immutable';
import type { ThunkAction } from './types';
import { communicator, url } from '../common';

const galleryUrl = galleryId => `/media_gallery/galleries/${galleryId}/image_infos`;

export function createImageInfo(
  authToken: string,
  galleryId: number,
  label: string,
  description: string,
  file: Object,
) : ThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'IMAGE_GALLERY_IMAGE_INFO_CREATE_REQUEST' });

    try {
      const imgUrl = url(`${galleryUrl(galleryId)}.json`, Map({ auth_token: authToken }));
      const response = await communicator().post(imgUrl, {
        label,
        description,
        file,
      });
      dispatch({ type: 'IMAGE_GALLERY_IMAGE_INFO_CREATE_RESPONSE_OK', imageInfo: response.data });
    } catch (error) {
      dispatch({ type: 'IMAGE_GALLERY_IMAGE_INFO_CREATE_RESPONSE_ERROR', error });
    }
  };
}

export function deleteImageInfo(authToken: string, galleryId: number, imageInfoId: number):
  ThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'IMAGE_GALLERY_IMAGE_INFO_DELETE_REQUEST', galleryId, imageInfoId });

    try {
      const imgUrl = url(`${galleryUrl(galleryId)}/${imageInfoId}.json`, Map({ auth_token: authToken }));
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
      const imgUrl = url(`${galleryUrl(galleryId)}.json`, Map({ auth_token: authToken }));
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
      const imgUrl = url(`${galleryUrl(galleryId)}/${imageInfoId}.json`, Map({ auth_token: authToken }));
      const response = await communicator().get(imgUrl);
      dispatch({ type: 'IMAGE_GALLERY_IMAGE_INFO_SELECTION_RESPONSE_OK', imageInfo: response.data });
    } catch (error) {
      dispatch({ type: 'IMAGE_GALLERY_IMAGE_INFO_SELECTION_RESPONSE_ERROR', error });
    }
  };
}
