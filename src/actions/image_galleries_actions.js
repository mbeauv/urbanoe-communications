// @flow

import { communicator, authMgUrl } from './communicator';
import type { ThunkAction } from './types';

/**
 * Creates an asynchronous action to create a new image gallery.
 */
export function createImageGallery(
  authToken: string,
  galleryName: string,
  galleryDescription: string,
): ThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'IMAGE_GALLERY_CREATE_REQUEST', galleryName, galleryDescription });

    try {
      const url = authMgUrl('.json', authToken);
      const response = await communicator().post(url, {
        name: galleryName,
        description: galleryDescription,
      });
      dispatch({ type: 'IMAGE_GALLERY_CREATE_RESPONSE_OK', gallery: response.data });
    } catch (error) {
      dispatch({ type: 'IMAGE_GALLERY_CREATE_RESPONSE_ERROR', error });
    }
  };
}

/**
 * Creates an asynchronous action to delete an existing image gallery.
 */
export function deleteImageGallery(authToken: string, galleryId: number): ThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'IMAGE_GALLERY_DELETE_REQUEST' });

    try {
      const url = authMgUrl(`/${galleryId}.json`, authToken);
      await communicator().delete(url);
      dispatch({ type: 'IMAGE_GALLERY_DELETE_RESPONSE_OK', galleryId });
    } catch (error) {
      dispatch({ type: 'IMAGE_GALLERY_DELETE_RESPONSE_ERROR', error });
    }
  };
}

/**
 * Returns an asynchronous action to retrieve the details of a given issue.
 */
export function getImageGalleries(authToken: string): ThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'IMAGE_GALLERY_LIST_REQUEST' });

    try {
      const url = authMgUrl('.json', authToken);
      const response = await communicator().get(url);
      dispatch({ type: 'IMAGE_GALLERY_LIST_RESPONSE_OK', galleries: response.data });
    } catch (error) {
      dispatch({ type: 'IMAGE_GALLERY_LIST_RESPONSE_ERROR', error });
    }
  };
}

/**
 * Fetches the gallery with the given galleryId.
 */
export function getImageGallery(authToken: string, galleryId: number): ThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'IMAGE_GALLERY_SELECTION_REQUEST', galleryId });

    try {
      const url = authMgUrl(`/${galleryId}.json`, authToken);
      const response = await communicator().get(url);
      dispatch({ type: 'IMAGE_GALLERY_SELECTION_RESPONSE_OK', gallery: response.data });
    } catch (error) {
      dispatch({ type: 'IMAGE_GALLERY_SELECTION_RESPONSE_ERROR', error });
    }
  };
}
