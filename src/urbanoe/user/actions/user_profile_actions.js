// @flow

import { communicator } from '../../../common';
import type { ThunkAction } from '../../types';

/**
 * Returns an asynchronous action to retrieve a given user's profile.
 */
export function getSelectedUserProfile(userId: number): ThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'SELECTED_USER_PROFILE_REQUEST', userId });

    try {
      const userUrl = `end_users/${userId}.json`;
      const response = await communicator().get(userUrl);
      dispatch({ type: 'SELECTED_USER_PROFILE_RESPONSE_OK', userProfile: response.data });
    } catch (error) {
      dispatch({ type: 'SELECTED_USER_PROFILE_RESPONSE_ERROR', userId, error });
    }
  };
}
