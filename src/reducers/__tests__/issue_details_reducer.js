// @flow

import type { IssueDetailsData } from 'urbanoe-model';
import { issueDetailsReducer } from '../issue_details_reducer';

const EMPTY_STATE = { loading: false, error: null, issueDetails: null };
const TEST_ISSUE_ID = 5;
const TEST_ISSUE_DETAILS : IssueDetailsData = {
  cityId: 12,
  coordinates: {
    accuracy: 12.2,
    latitude: 1.23,
    longitude: 5.55,
  },
  fixed: false,
  id: 22,
  issueType: 'pothole',
  lastUpdatedOn: '12/22/2018',
  location: {
    cityName: 'Montreal',
    countryName: 'Canada',
    stateName: 'Quebec',
    streetName: 'Ste-Catherine',
  },
  mainImageUrl: 'http://www.google.com',
  overviewDescription: 'a small description',
  rating: 4,
  reportedOn: '12/22/2018',
  reporter: {
    avatarUrl: 'http://www.google.com',
    userId: 12,
    userName: 'jdoe',
  },
  comments: [],
  history: [],
  imageDefinitions: [],
  properties: {},
  rateable: true,
  ratingAverage: 2,
  ratingRank: 1,
  ratingTotal: 12,
  ratingVoteCount: 5,
};

const TEST_ERROR = { content: 'error' };

describe('issue_details_reducer', () => {
  it('returns state is action is unsupported type', () => {
    expect(issueDetailsReducer(EMPTY_STATE, { type: 'LOGOUT_REQUEST' }))
      .toEqual(EMPTY_STATE);
  });

  it('initializes with proper value', () => {
    expect(issueDetailsReducer(undefined, { type: 'LOGOUT_REQUEST' })).toEqual(EMPTY_STATE);
  });

  it('processes ISSUE_DETAILS_REQUEST success path', () => {
    expect(issueDetailsReducer(
      EMPTY_STATE,
      { type: 'ISSUE_DETAILS_REQUEST', issueId: TEST_ISSUE_ID },
    )).toEqual({
      error: null,
      issueDetails: null,
      loading: true,
    });
  });

  it('processes ISSUE_DETAILS_RESPONSE_OK success path', () => {
    expect(issueDetailsReducer(
      EMPTY_STATE,
      { type: 'ISSUE_DETAILS_RESPONSE_OK', issueDetails: TEST_ISSUE_DETAILS },
    )).toEqual({
      issueDetails: TEST_ISSUE_DETAILS,
      error: null,
      loading: false,
    });
  });

  it('processes ISSUE_DETAILS_RESPONSE_ERROR success path', () => {
    expect(issueDetailsReducer(
      EMPTY_STATE,
      { type: 'ISSUE_DETAILS_RESPONSE_ERROR', issueId: TEST_ISSUE_ID, error: TEST_ERROR },
    )).toEqual({
      issueDetails: null,
      error: TEST_ERROR,
      loading: false,
    });
  });
});
