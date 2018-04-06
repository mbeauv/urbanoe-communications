// @flow

import type { PieChartData } from 'urbanoe-model';
import type { Action } from '../actions/types';

export type StatReportState = {
  loading: boolean,
  error: ?Object,
  chart: ?PieChartData,
};

export type StatisticsState = {
  [ key: string] : StatReportState,
};

/**
 * Reducer function to process city statistics actions. At the present time, only the
 * getCityStatistics action is handled.
 */
export function cityStatisticsReducer(state: StatisticsState = {}, action: Action)
: StatisticsState {
  const report = {};
  switch (action.type) {
    case 'CITY_STATISTICS_REQUEST':
      report[action.statsType] = { loading: true, error: null, chart: null };
      return { ...state, ...report };
    case 'CITY_STATISTICS_RESPONSE_OK':
      report[action.statsType] = { loading: false, chart: action.chart };
      return { ...state, ...report };
    case 'CITY_STATISTICS_RESPONSE_ERROR':
      report[action.statsType] = { loading: false, chart: action.error };
      return { ...state, ...report };
    default:
      return state;
  }
}
