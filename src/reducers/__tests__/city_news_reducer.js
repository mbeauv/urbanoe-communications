// @flow

import type { CityNews } from 'urbanoe-model';
import { cityNewsReducer } from '../city_news_reducer';

const NEWS_1 : CityNews = {
  actionableId: 1,
  actionableType: 'issue',
  cityId: 12,
  description: 'a new description 1',
  extraActionInfoId: 12,
  id: 12,
  imageUrl: 'animageurl',
  nbComments: 5,
  nbLikes: 2,
  reportedOn: '12/12/2018',
  reporter: {
    avatarUrl: 'anavatarulr',
    userId: 5,
    userName: 'jdoe',
  },
};

const NEWS_2 : CityNews = {
  actionableId: 2,
  actionableType: 'issue',
  cityId: 22,
  description: 'a new description 1',
  extraActionInfoId: 22,
  id: 22,
  imageUrl: 'animageurl',
  nbComments: 25,
  nbLikes: 22,
  reportedOn: '12/12/2018',
  reporter: {
    avatarUrl: 'anavatarulr',
    userId: 25,
    userName: 'jdoe',
  },
};

const EMPTY_STATE = { loading: false, pageId: 0, cityNews: [], error: null };
const TEST_CITY_ID = 5;
const TEST_ERROR = { content: 'error' };

describe('city_news_reducer', () => {
  it('returns state is action is unsupported type', () => {
    expect(cityNewsReducer(EMPTY_STATE, { type: 'LOGOUT_REQUEST' }))
      .toEqual(EMPTY_STATE);
  });

  it('initializes with proper value', () => {
    expect(cityNewsReducer(undefined, { type: 'LOGOUT_REQUEST' })).toEqual(EMPTY_STATE);
  });

  it('processes CITY_NEWS_PAGE_REQUEST', () => {
    expect(cityNewsReducer(
      EMPTY_STATE,
      { type: 'CITY_NEWS_PAGE_REQUEST', cityId: TEST_CITY_ID, pageId: 2 },
    )).toEqual({
      cityNews: [],
      error: null,
      loading: true,
      pageId: 2,
    });
  });

  it('processes CITY_NEWS_PAGE_RESPONSE_OK', () => {
    const state = { ...EMPTY_STATE, cityNews: [NEWS_1] };
    expect(cityNewsReducer(
      state,
      { type: 'CITY_NEWS_PAGE_RESPONSE_OK', cityNews: [NEWS_2] },
    )).toEqual({
      cityNews: [NEWS_1, NEWS_2],
      error: null,
      loading: false,
      pageId: 0,
    });
  });

  it('processes CITY_NEWS_PAGE_RESPONSE_ERROR', () => {
    const state = { ...EMPTY_STATE, cityNews: [NEWS_1] };
    expect(cityNewsReducer(
      state,
      { type: 'CITY_NEWS_PAGE_RESPONSE_ERROR', error: TEST_ERROR },
    )).toEqual({
      cityNews: [NEWS_1],
      error: TEST_ERROR,
      loading: false,
      pageId: 0,
    });
  });
});
