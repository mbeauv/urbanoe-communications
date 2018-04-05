// @flow

import { Map } from 'immutable';
import type { MediaGalleryThunkAction, MediaGalleryAction } from './types';
import { communicator, url } from '../../common';

const scratchUrl = (authToken : string) => url('/media_gallery/image_scratches.json', Map({ auth_token: authToken }));

export function clearLocalScratch() : MediaGalleryAction {
  return { type: 'IMAGE_GALLERY_SCRATCH_REINIT_LOCAL' };
}

export function createImageScratch(authToken: string, image: string) : MediaGalleryThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'IMAGE_GALLERY_SCRATCH_CREATE_REQUEST' });
    try {
      const response = await communicator().post(scratchUrl(authToken), {
        image_scratch: {
          image,
        },
      });
      dispatch({ type: 'IMAGE_GALLERY_SCRATCH_CREATE_RESPONSE_OK', scratchImage: response.data });
    } catch (error) {
      dispatch({ type: 'IMAGE_GALLERY_SCRATCH_CREATE_RESPONSE_ERROR', error });
    }
  };
}

export function deleteImageScratch(authToken: string) : MediaGalleryThunkAction {
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
