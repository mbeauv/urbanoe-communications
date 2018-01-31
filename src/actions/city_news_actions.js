// @flow

import axios from 'axios';
import { getRootUrl } from './common';
import type { ThunkAction } from './types';

/**
 * Returns an asynchronous action to retrieve a page of news from the server.
 */
export function getCityNews(cityId: number, pageId: number): ThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'CITY_NEWS_PAGE_REQUEST', cityId, pageId });

    try {
      const url = `${getRootUrl()}/activities.json?scope=for_city&city_id=${cityId}&page=${pageId}`;
      const response = await axios.get(url, { 'Content-Type': 'application/json' });
      dispatch({ type: 'CITY_NEWS_PAGE_RESPONSE_OK', cityNews: response.data });
    } catch (error) {
      dispatch({ type: 'CITY_NEWS_PAGE_RESPONSE_ERROR', error });
    }
  };
}
