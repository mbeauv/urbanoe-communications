// @flow

import type { UserProfileData } from 'urbanoe-model';
import type { UrbanoeAction } from '../../types';

type State = {
  loading: boolean,
  userProfile: ?UserProfileData,
  error: ?Object,
};

const INITIAL_STATE: State = {
  loading: false,
  userProfile: null,
  error: null,
};

/**
 * Reducer function to process user profile actions. At the present time, only
 * the getSelectedUserProfile action is handled.
 */
export function selectedUserProfileReducer(
  state: State = INITIAL_STATE,
  action: UrbanoeAction,
) : State {
  switch (action.type) {
    case 'SELECTED_USER_PROFILE_REQUEST':
      return { ...state, loading: true };
    case 'SELECTED_USER_PROFILE_RESPONSE_OK':
      return { ...state, loading: false, userProfile: action.userProfile };
    case 'SELECTED_USER_PROFILE_RESPONSE_ERROR':
      return { ...state, loading: false, userProfile: null, error: action.error };
    default:
      return state;
  }
}
