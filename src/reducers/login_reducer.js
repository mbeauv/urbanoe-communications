// @flow

import type { LoginInfo } from 'urbanoe-model';
import type { Action } from '../actions/types';

type State = {
  +loading: boolean,
  +authInfo: ?LoginInfo,
  +error: ?Object,
};

const INITIAL_STATE: State = {
  loading: false,
  authInfo: null,
  error: null,
};

/**
 * Reducer function to process issue details actions. At the present time, only the
 * getIssueDetails action is handled.
 */
export function loginReducer(state: State = INITIAL_STATE, action: Action): State {
  switch (action.type) {
    case 'LOGOUT_REQUEST':
      return { ...state, loading: true, authInfo: null, error: null };
    case 'LOGOUT_RESPONSE_OK':
      return { ...state, loading: false, authInfo: null, error: null };
    case 'LOGIN_REQUEST':
      return { ...state, loading: true };
    case 'LOGIN_RESPONSE_OK':
      return { ...state, loading: false, authInfo: action.login, error: null };
    case 'LOGIN_RESPONSE_ERROR':
      return { ...state, loading: false, authInfo: null, error: action.error };
    default:
      return state;
  }
}
