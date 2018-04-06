// @flow

import type { IssueSummaryData, CityIssuesFilterData } from '../../models';
import { createDefaultFilter } from '../../models';
import type { UrbanoeAction } from '../../types';

type State = {
  +loading: boolean,
  +pageId: number,
  +cityIssues: Array<IssueSummaryData>,
  +error: ?Object,
  +filter: CityIssuesFilterData,
};

const INITIAL_STATE: State = {
  loading: false,
  error: null,
  pageId: 0,
  cityIssues: [],
  filter: createDefaultFilter(),
};

/**
 * Reducer function to process city issues actions. At the present time, only the
 * getCityIssuesFirstPage and the getCityIssuesNextPage actions.
 */
export function cityIssuesReducer(state: State = INITIAL_STATE, action: UrbanoeAction) : State {
  switch (action.type) {
    case 'CITY_ISSUES_FIRST_PAGE_REQUEST':
      return { ...state, loading: true, pageId: 1, filter: action.filter, cityIssues: [] };
    case 'CITY_ISSUES_FIRST_PAGE_RESPONSE_OK':
      return { ...state, loading: false, cityIssues: action.cityIssues, error: null };
    case 'CITY_ISSUES_FIRST_PAGE_RESPONSE_ERROR':
      return { ...state, loading: false, error: action.error };
    case 'CITY_ISSUES_NEXT_PAGE_REQUEST':
      return { ...state, loading: true, pageId: action.pageId };
    case 'CITY_ISSUES_NEXT_PAGE_RESPONSE_OK':
      return { ...state, loading: false, cityIssues: [...state.cityIssues, ...action.cityIssues] };
    case 'CITY_ISSUES_NEXT_PAGE_RESPONSE_ERROR':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}
