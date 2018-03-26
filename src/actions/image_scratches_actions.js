// @flow

import { Map } from 'immutable';
import type { ThunkAction } from './types';
import { communicator, url } from '../common';

const scratchUrl = (authToken : string) => url('/media_gallery/image_scratches.json', Map({ auth_token: authToken }));

export function createImageScratch(authToken: string, imageFile: Object) : ThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'IMAGE_GALLERY_SCRATCH_CREATE_REQUEST' });
    try {
      const response = await communicator().post(scratchUrl(authToken), {
        scratchImage: {
          image: imageFile,
        },
      });
      dispatch({ type: 'IMAGE_GALLERY_SCRATCH_CREATE_RESPONSE_OK', scratchImage: response.data });
    } catch (error) {
      dispatch({ type: 'IMAGE_GALLERY_SCRATCH_CREATE_RESPONSE_ERROR', error });
    }
  };
}

export function deleteImageScratch(authToken: string) : ThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'IMAGE_GALLERY_SCRATCH_DELETE_REQUEST' });

    try {
      await communicator().delete(scratchUrl(authToken));
      dispatch({ type: 'IMAGE_GALLERY_SCRATCH_DELETE_RESPONSE_OK' });
    } catch (error) {
      dispatch({ type: 'IMAGE_GALLERY_SCRATCH_DELETE_RESPONSE_ERROR', error });
    }
  };
}
