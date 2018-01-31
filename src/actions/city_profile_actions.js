// @flow

import axios from 'axios';
import { getRootUrl } from './common';
import type { ThunkAction } from './types';

/**
 * Returns an asynchronous action to retrieve the profile of the city
 * specified by the cityId value.
 */
export function getCityProfile(cityId: number): ThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'CITY_PROFILE_REQUEST', cityId });

    try {
      const url = `${getRootUrl()}/cities/${cityId}.json`;
      const response = await axios.get(url, { 'Content-Type': 'application/json' });
      dispatch({ type: 'CITY_PROFILE_RESPONSE_OK', cityProfile: response.data });
    } catch (error) {
      dispatch({ type: 'CITY_PROFILE_RESPONSE_ERROR', error });
    }
  };
}
