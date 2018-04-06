// @flow

import type { CityNews } from 'urbanoe-model';
import type { UrbanoeAction } from '../../types';

type State = {
  +loading: boolean,
  +pageId: number,
  +cityNews: Array<CityNews>,
  +error: ?Object,
}

const INITIAL_STATE = {
  loading: false,
  pageId: 0,
  error: null,
  cityNews: [],
};

/**
 * Reducer function to process city news actions. At the present time, only the
 * getCityNews action is handled.
 */
export function cityNewsReducer(state: State = INITIAL_STATE, action: UrbanoeAction): State {
  switch (action.type) {
    case 'CITY_NEWS_PAGE_REQUEST':
      return { ...state, loading: true, pageId: action.pageId };
    case 'CITY_NEWS_PAGE_RESPONSE_OK':
      return { ...state, loading: false, cityNews: [...state.cityNews, ...action.cityNews] };
    case 'CITY_NEWS_PAGE_RESPONSE_ERROR':
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}
