// @flow

import type { CityProfile } from 'urbanoe-model';
import type { Action } from '../actions/types';

type State = {
  loading: boolean,
  cityProfile: ?CityProfile,
  error: ?Object,
};

const INITIAL_STATE: State = {
  loading: false,
  cityProfile: null,
  error: null,
};

/**
 * Reducer function to process city profile actions. At the present time, only the
 * getCityProfile action is handled.
 */
export function cityProfileReducer(state: State = INITIAL_STATE, action: Action): State {
  switch (action.type) {
    case 'CITY_PROFILE_REQUEST':
      return { ...state, loading: true };
    case 'CITY_PROFILE_RESPONSE_OK':
      return { ...state, loading: false, cityProfile: action.cityProfile };
    case 'CITY_PROFILE_RESPONSE_ERROR':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}
