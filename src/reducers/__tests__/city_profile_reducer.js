// @flow

import { cityProfileReducer } from '../city_profile_reducer';

const EMPTY_STATE = { loading: false, cityProfile: null, error: null };
const TEST_CITY_ID = 5;
const TEST_CITY_PROFILE = [{ id: 23 }];
const TEST_ERROR = { content: 'error' };

describe('city_news_reducer', () => {
  it('returns state is action is unsupported type', () => {
    expect(cityProfileReducer(EMPTY_STATE, { type: 'LOGOUT_REQUEST' }))
      .toEqual(EMPTY_STATE);
  });

  it('initializes with proper value', () => {
    expect(cityProfileReducer(undefined, { type: 'LOGOUT_REQUEST' })).toEqual(EMPTY_STATE);
  });

  it('processes CITY_PROFILE_REQUEST', () => {
    expect(cityProfileReducer(
      EMPTY_STATE,
      { type: 'CITY_PROFILE_REQUEST', cityId: TEST_CITY_ID },
    )).toEqual({
      cityProfile: null,
      error: null,
      loading: true,
    });
  });

  it('processes CITY_PROFILE_RESPONSE_OK', () => {
    const state = { ...EMPTY_STATE, cityProfile: { id: 121 } };
    expect(cityProfileReducer(
      state,
      { type: 'CITY_PROFILE_RESPONSE_OK', cityProfile: TEST_CITY_PROFILE },
    )).toEqual({
      cityProfile: TEST_CITY_PROFILE,
      error: null,
      loading: false,
    });
  });

  it('processes CITY_PROFILE_RESPONSE_ERROR', () => {
    const state = { ...EMPTY_STATE, cityProfile: { id: 121 } };
    expect(cityProfileReducer(
      state,
      { type: 'CITY_PROFILE_RESPONSE_ERROR', error: TEST_ERROR },
    )).toEqual({
      cityProfile: { id: 121 },
      error: TEST_ERROR,
      loading: false,
    });
  });
});
