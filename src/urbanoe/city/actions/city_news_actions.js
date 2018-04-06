// @flow

import { Map } from 'immutable';
import { communicator, url } from '../../../common';
import type { ThunkAction } from '../../types';

/**
 * Returns an asynchronous action to retrieve a page of news from the server.
 */
export function getCityNews(cityId: number, pageId: number): ThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'CITY_NEWS_PAGE_REQUEST', cityId, pageId });

    try {
      const newsUrl = url('activities.json', Map({
        scope: 'for_city',
        city_id: cityId,
        page: pageId,
      }));
      const response = await communicator().get(newsUrl);
      dispatch({ type: 'CITY_NEWS_PAGE_RESPONSE_OK', cityNews: response.data });
    } catch (error) {
      dispatch({ type: 'CITY_NEWS_PAGE_RESPONSE_ERROR', error });
    }
  };
}
