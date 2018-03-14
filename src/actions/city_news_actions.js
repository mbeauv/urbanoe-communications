// @flow

import { communicator } from './communicator';
import type { ThunkAction } from './types';

/**
 * Returns an asynchronous action to retrieve a page of news from the server.
 */
export function getCityNews(cityId: number, pageId: number): ThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'CITY_NEWS_PAGE_REQUEST', cityId, pageId });

    try {
      const url = `activities.json?scope=for_city&city_id=${cityId}&page=${pageId}`;
      const response = await communicator().get(url);
      dispatch({ type: 'CITY_NEWS_PAGE_RESPONSE_OK', cityNews: response.data });
    } catch (error) {
      dispatch({ type: 'CITY_NEWS_PAGE_RESPONSE_ERROR', error });
    }
  };
}
