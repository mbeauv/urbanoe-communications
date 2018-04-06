// @flow

import { Map } from 'immutable';
import { communicator, url } from '../../../common';
import type { ThunkAction } from '../../types';

/**
 * Returns an asynchronous action to retrieves a statistics object for
 * given city id.
 */
export function getCityStatistics(cityId: number, statsType: string): ThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'CITY_STATISTICS_REQUEST', cityId, statsType });

    try {
      const statsUrl = url(`/cities/${cityId}/statistics.json`, Map({
        type: statsType,
      }));
      const response = await communicator().get(statsUrl);
      dispatch({ type: 'CITY_STATISTICS_RESPONSE_OK', cityId, statsType, chart: response.data });
    } catch (error) {
      dispatch({ type: 'CITY_STATISTICS_RESPONSE_ERROR', cityId, statsType, error });
    }
  };
}
