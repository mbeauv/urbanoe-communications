// @flow

import { communicator } from '../../../common';
import type { ThunkAction } from '../../types';

/**
 * Returns an asynchronous action to logout of the platform.  At the present
 * time, it does not actually make a call to the server, just clears the token.
 */
export function doLogout() : ThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'LOGOUT_REQUEST' });
    dispatch({ type: 'LOGOUT_RESPONSE_OK' });
  };
}

/**
 * Returns an asynchronous action to login the platform.
 */
export function doLogin(
  userName: string,
  password: string,
): ThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST' });

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
