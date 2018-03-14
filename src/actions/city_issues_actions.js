// @flow

import _ from 'lodash';
import type { CityIssuesFilterData } from 'urbanoe-model';
import { communicator } from './communicator';
import type { ThunkAction } from './types';

function constructStatusFilter(filter: CityIssuesFilterData) {
  const { fixed, notFixed } = filter.statuses;
  if (fixed && notFixed) {
    return 'all';
  }
  return fixed ? 'fixed' : 'notFixed';
}

function constructTypesFilter(filter: CityIssuesFilterData) {
  return _.keys(_.pickBy(filter.types, value => value)).toString();
}

function constructFilterString(filter: CityIssuesFilterData) {
  return `&status=${constructStatusFilter(filter)}&issue_types=${constructTypesFilter(filter)}`;
}

/**
 * Returns an asynchronous action to retrieve the next page of issues from the server.
 */
export function getCityIssuesNextPage(
  cityId: number,
  filter: CityIssuesFilterData,
  pageId: number,
): ThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'CITY_ISSUES_NEXT_PAGE_REQUEST', cityId, pageId });

    try {
      constructTypesFilter(filter);
      const url = `cities/${cityId}/issues.json?page=${pageId}${constructFilterString(filter)}`;
      const response = await communicator().get(url);
      dispatch({ type: 'CITY_ISSUES_NEXT_PAGE_RESPONSE_OK', cityIssues: response.data, pageId });
    } catch (error) {
      dispatch({ type: 'CITY_ISSUES_NEXT_PAGE_RESPONSE_ERROR', error, pageId });
    }
  };
}

/**
 * Returns an asychronous action to retrieve the first page of issues from the server.
 */
export function getCityIssuesFirstPage(
  cityId: number,
  filter: CityIssuesFilterData,
): ThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'CITY_ISSUES_FIRST_PAGE_REQUEST', cityId, filter });

    try {
      const url = `cities/${cityId}/issues.json?page=1${constructFilterString(filter)}`;
      const response = await communicator().get(url);
      dispatch({ type: 'CITY_ISSUES_FIRST_PAGE_RESPONSE_OK', cityIssues: response.data });
    } catch (error) {
      dispatch({ type: 'CITY_ISSUES_FIRST_PAGE_RESPONSE_ERROR', error });
    }
  };
}
