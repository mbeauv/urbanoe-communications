// @flow

import _ from 'lodash';
import { Map } from 'immutable';
import type { CityIssuesFilterData } from 'urbanoe-model';
import { communicator, url } from '../../../common';
import type { ThunkAction } from '../../types';

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

function constructFilterMap(pageId: number, filter: CityIssuesFilterData) {
  return Map({
    page: pageId,
    status: constructStatusFilter(filter),
    issue_types: constructTypesFilter(filter),
  });
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
    dispatch({ type: 'CITY_ISSUES_NEXT_PAGE_REQUEST', cityId, pageId, filter });

    try {
      const cityUrl = url(`cities/${cityId}/issues.json`, constructFilterMap(pageId, filter));
      const response = await communicator().get(cityUrl);
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
      const cityUrl = url(`cities/${cityId}/issues.json`, constructFilterMap(1, filter));
      const response = await communicator().get(cityUrl);
      dispatch({ type: 'CITY_ISSUES_FIRST_PAGE_RESPONSE_OK', cityIssues: response.data });
    } catch (error) {
      dispatch({ type: 'CITY_ISSUES_FIRST_PAGE_RESPONSE_ERROR', error });
    }
  };
}
