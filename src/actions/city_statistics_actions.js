// @flow

import { communicator } from './communicator';
import type { ThunkAction } from './types';

/**
 * Returns an asynchronous action to retrieves a statistics object for
 * given city id.
 */
export function getCityStatistics(cityId: number, statsType: string): ThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'CITY_STATISTICS_REQUEST', cityId, statsType });

    try {
      const url = `/cities/${cityId}/statistics.json?type=${statsType}`;
      const response = await communicator().get(url);
      dispatch({ type: 'CITY_STATISTICS_RESPONSE_OK', cityId, statsType, chart: response.data });
    } catch (error) {
      dispatch({ type: 'CITY_STATISTICS_RESPONSE_ERROR', cityId, statsType, error });
    }
  };
}
