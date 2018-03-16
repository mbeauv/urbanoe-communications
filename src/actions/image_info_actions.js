// @flow

import type { ThunkAction } from './types';
import { communicator, authMgUrl } from './communicator';

export function deleteImageInfo(authToken: string, galleryId: number, imageInfoId: number):
  ThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'IMAGE_GALLERY_IMAGE_INFO_DELETE_REQUEST', galleryId, imageInfoId });

    try {
      const url = authMgUrl(`/${galleryId}/image_infos/${imageInfoId}.json`, authToken);
      await communicator().delete(url);
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
      const url = authMgUrl(`/${galleryId}/image_infos.json`, authToken);
      const response = await communicator().get(url);
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
      const url = authMgUrl(`/${galleryId}/image_infos/${imageInfoId}.json`, authToken);
      const response = await communicator().get(url);
      dispatch({ type: 'IMAGE_GALLERY_IMAGE_INFO_SELECTION_RESPONSE_OK', imageInfo: response.data });
    } catch (error) {
      dispatch({ type: 'IMAGE_GALLERY_IMAGE_INFO_SELECTION_RESPONSE_ERROR', error });
    }
  };
}
