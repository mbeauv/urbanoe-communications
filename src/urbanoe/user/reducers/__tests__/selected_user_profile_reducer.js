// @flow

import type { UserProfileData } from '../../../models';
import { selectedUserProfileReducer } from '../selected_user_profile_reducer';

const EMPTY_STATE = { loading: false, error: null, userProfile: null };
const TEST_USER_ID = 5;
const TEST_ERROR = { content: 'error' };
const TEST_USER_PROFILE : UserProfileData = {
  userName: 'jdoe',
  avatarUrl: 'http://www.google.com',
  cities: [
    {
      cityName: 'Montreal',
      countryName: 'Canada',
      id: 23,
      imageUrl: 'http://www.google.com',
      joinedOn: '12/12/2018',
      relationship: 'home',
      stateName: 'Ontario',
    },
  ],
  id: 12,
  joinedOn: '12/2/2018',
  karma: 22,
  lastActiveOn: '12/22/2018',
  latestIssues: [],
};

describe('selected_user_profile_reducer', () => {
  it('returns state is action is unsupported type', () => {
    expect(selectedUserProfileReducer(EMPTY_STATE, { type: 'LOGOUT_REQUEST' }))
      .toEqual(EMPTY_STATE);
  });

  it('initializes with proper value', () => {
    expect(selectedUserProfileReducer(undefined, { type: 'LOGOUT_REQUEST' })).toEqual(EMPTY_STATE);
  });

  it('processes SELECTED_USER_PROFILE_REQUEST', () => {
    expect(selectedUserProfileReducer(
      EMPTY_STATE,
      { type: 'SELECTED_USER_PROFILE_REQUEST', userId: TEST_USER_ID },
    )).toEqual({
      error: null,
      userProfile: null,
      loading: true,
    });
  });

  it('processes SELECTED_USER_PROFILE_RESPONSE_OK', () => {
    expect(selectedUserProfileReducer(
      EMPTY_STATE,
      { type: 'SELECTED_USER_PROFILE_RESPONSE_OK', userProfile: TEST_USER_PROFILE },
    )).toEqual({
      userProfile: TEST_USER_PROFILE,
      error: null,
      loading: false,
    });
  });

  it('processes SELECTED_USER_PROFILE_RESPONSE_ERROR', () => {
    expect(selectedUserProfileReducer(
      EMPTY_STATE,
      { type: 'SELECTED_USER_PROFILE_RESPONSE_ERROR', userId: TEST_USER_ID, error: TEST_ERROR },
    )).toEqual({
      userProfile: null,
      error: TEST_ERROR,
      loading: false,
    });
  });
});
