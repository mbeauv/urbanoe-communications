// @flow

import { communicator } from './communicator';
import type { ThunkAction } from './types';

/**
 * Returns an asynchronous action to retrieve the profile of the city
 * specified by the cityId value.
 */
export function getCityProfile(cityId: number): ThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'CITY_PROFILE_REQUEST', cityId });

    try {
      const url = `cities/${cityId}.json`;
      const response = await communicator().get(url);
      dispatch({ type: 'CITY_PROFILE_RESPONSE_OK', cityProfile: response.data });
    } catch (error) {
      dispatch({ type: 'CITY_PROFILE_RESPONSE_ERROR', error });
    }
  };
}
