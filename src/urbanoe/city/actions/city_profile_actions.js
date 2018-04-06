// @flow

import { communicator, url } from '../../../common';
import type { UrbanoeThunkAction } from '../../types';

/**
 * Returns an asynchronous action to retrieve the profile of the city
 * specified by the cityId value.
 */
export function getCityProfile(cityId: number): UrbanoeThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'CITY_PROFILE_REQUEST', cityId });

    try {
      const cityUrl = url(`cities/${cityId}.json`);
      const response = await communicator().get(cityUrl);
      dispatch({ type: 'CITY_PROFILE_RESPONSE_OK', cityProfile: response.data });
    } catch (error) {
      dispatch({ type: 'CITY_PROFILE_RESPONSE_ERROR', error });
    }
  };
}
