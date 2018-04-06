// @flow

import type { CityProfile } from 'urbanoe-model';
import { cityProfileReducer } from '../city_profile_reducer';

const TEST_CITY_ID = 5;
const CITY_1 : CityProfile = {
  area: 222.12,
  citizenCount: 23,
  cityName: 'Montreal',
  contacts: {},
  countryName: 'Canada',
  id: TEST_CITY_ID,
  mainImageUrl: 'http://www.google.com',
  stateName: 'Quebec',
  thumbImageUrl: 'http://www.google.com',
  townCenter: {
    accuracy: 12,
    latitude: 22,
    longitude: 33,
  },
};

const EMPTY_STATE = { loading: false, cityProfile: null, error: null };
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
    const state = { ...EMPTY_STATE, cityProfile: CITY_1 };
    const newProfile = { ...CITY_1, cityName: 'blah' };
    expect(cityProfileReducer(
      state,
      { type: 'CITY_PROFILE_RESPONSE_OK', cityProfile: newProfile },
    )).toEqual({
      cityProfile: newProfile,
      error: null,
      loading: false,
    });
  });

  it('processes CITY_PROFILE_RESPONSE_ERROR', () => {
    const state = { ...EMPTY_STATE, cityProfile: CITY_1 };
    expect(cityProfileReducer(
      state,
      { type: 'CITY_PROFILE_RESPONSE_ERROR', error: TEST_ERROR },
    )).toEqual({
      cityProfile: CITY_1,
      error: TEST_ERROR,
      loading: false,
    });
  });
});
