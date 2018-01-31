import { cityNewsReducer } from '../city_news_reducer';

const EMPTY_STATE = { loading: false, pageId: 0, cityNews: [], error: null };
const TEST_CITY_ID = 5;
const TEST_CITY_NEWS = [{ id: 23 }];
const TEST_ERROR = { content: 'error' };

describe('city_news_reducer', () => {
  it('returns state is action is unsupported type', () => {
    expect(cityNewsReducer(EMPTY_STATE, { type: 'BLAH_BLAH', error: TEST_ERROR }))
      .toEqual(EMPTY_STATE);
  });

  it('initializes with proper value', () => {
    expect(cityNewsReducer(undefined, {})).toEqual(EMPTY_STATE);
  });

  it('processes CITY_NEWS_PAGE_REQUEST success path', () => {
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

  it('processes CITY_NEWS_PAGE_RESPONSE_OK success path', () => {
    const state = { ...EMPTY_STATE, cityNews: [{ id: 10 }] };
    expect(cityNewsReducer(
      state,
      { type: 'CITY_NEWS_PAGE_RESPONSE_OK', cityNews: TEST_CITY_NEWS },
    )).toEqual({
      cityNews: [{ id: 10 }, ...TEST_CITY_NEWS],
      error: null,
      loading: false,
      pageId: 0,
    });
  });

  it('processes CITY_NEWS_PAGE_RESPONSE_ERROR success path', () => {
    const state = { ...EMPTY_STATE, cityNews: [{ id: 10 }] };
    expect(cityNewsReducer(
      state,
      { type: 'CITY_NEWS_PAGE_RESPONSE_ERROR', error: TEST_ERROR },
    )).toEqual({
      cityNews: [{ id: 10 }],
      error: TEST_ERROR,
      loading: false,
      pageId: 0,
    });
  });
});
