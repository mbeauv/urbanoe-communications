// @flow

import { communicator } from './communicator';
import type { ThunkAction } from './types';

/**
 * Returns an asynchronous action to retrieve the details of a given issue.
 */
export function getImageGalleries(authToken: string): ThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'IMAGE_GALLERY_LIST_REQUEST' });

    try {
      const url = `/media_gallery/galleries.json?authToken=${authToken}`;
      const response = await communicator().get(url);
      dispatch({ type: 'IMAGE_GALLERY_LIST_RESPONSE_OK', galleries: response.data });
    } catch (error) {
      dispatch({ type: 'IMAGE_GALLERY_LIST_RESPONSE_ERROR', error });
    }
  };
}

export function getImageGallery(authToken: string, galleryId: number): ThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'IMAGE_GALLERY_SELECTION_REQUEST', galleryId });

    try {
      const url = `/media_gallery/galleries/${galleryId}.json?authToken=${authToken}`;
      const response = await communicator().get(url);
      dispatch({ type: 'IMAGE_GALLERY_SELECTION_RESPONSE_OK', gallery: response.data });
    } catch (error) {
      dispatch({ type: 'IMAGE_GALLERY_SELECTION_RESPONSE_ERROR', error });
    }
  };
}
