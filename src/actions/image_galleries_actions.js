// @flow

import { Map } from 'immutable';
import { communicator, url } from '../common';
import type { ThunkAction } from './types';

/**
 * Creates an asynchronous action to update an existing image gallery.
 */
export function updateImageGallery(
  authToken: string,
  id: number,
  name: string,
  description: string,
): ThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'IMAGE_GALLERY_UPDATE_REQUEST' });

    try {
      const imgUrl = url(`/media_gallery/galleries/${id}.json`, Map({ auth_token: authToken }));
      const response = await communicator().put(imgUrl, {
        name,
        description,
      });
      dispatch({ type: 'IMAGE_GALLERY_UPDATE_RESPONSE_OK', gallery: response.data });
    } catch (error) {
      dispatch({ type: 'IMAGE_GALLERY_UPDATE_REPSONSE_ERROR', error });
    }
  };
}

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
      const imgUrl = url('/media_gallery/galleries.json', Map({ auth_token: authToken }));
      const response = await communicator().post(imgUrl, {
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
      const imgUrl = url(`/media_gallery/galleries/${galleryId}.json`, Map({ auth_token: authToken }));
      await communicator().delete(imgUrl);
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
      const gUrl = url('/media_gallery/galleries.json', Map({ auth_token: authToken }));
      const response = await communicator().get(gUrl);
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
      const imgUrl = url(`/media_gallery/galleries/${galleryId}.json`, Map({ auth_token: authToken }));
      const response = await communicator().get(imgUrl);
      dispatch({ type: 'IMAGE_GALLERY_SELECTION_RESPONSE_OK', gallery: response.data });
    } catch (error) {
      dispatch({ type: 'IMAGE_GALLERY_SELECTION_RESPONSE_ERROR', error });
    }
  };
}
