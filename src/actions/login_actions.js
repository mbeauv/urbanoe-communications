// @flow

import { communicator } from './communicator';
import type { ThunkAction } from './types';

/**
 * Returns an asynchronous action to login the platform.
 */
export function doLogin(
  userName: string,
  password: string,
): ThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST', userName, password });

    try {
      const response = await communicator().post('sessions.json', {
        end_user: {
          username: userName,
          password,
        },
      });
      dispatch({
        type: 'LOGIN_RESPONSE_OK',
        login: {
          authToken: response.data.auth_token,
          endUserId: response.data.end_user_id,
        } });
    } catch (ex) {
      dispatch({ type: 'LOGIN_RESPONSE_ERROR', error: { status: ex.response.status } });
    }
  };
}
