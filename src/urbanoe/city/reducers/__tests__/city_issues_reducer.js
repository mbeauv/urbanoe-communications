// @flow

import type { IssueSummaryData } from '../../../models';
import { cityIssuesReducer } from '../city_issues_reducer';

const TEST_CITY_ID = 5;
const TEST_FILTER = {
  statuses: {
    fixed: false,
    notFixed: true,
  },
  types: {
    pothole: true,
    graffiti: true,
    lostPet: true,
    garbageCan: true,
    brokenLight: true,
    other: true,
  },
};

const TEST_ISSUE : IssueSummaryData = {
  cityId: 22,
  coordinates: {
    accuracy: 4.0,
    latitude: 23.0,
    longitude: 45.0,
  },
  fixed: false,
  id: 12,
  issueType: 'pothole',
  lastUpdatedOn: '12/12/2018',
  location: {
    cityName: 'Montreal',
    countryName: 'Canada',
    stateName: 'Quebec',
    streetName: 'Crescent',
  },
  mainImageUrl: 'http://www.google.com',
  overviewDescription: 'a short description',
  rating: 2.5,
  reportedOn: '12/13/1221',
  reporter: {
    avatarUrl: 'http://www.google.com',
    userId: 21,
    userName: 'mbeauv',
  },
  nbComments: 4,
};

const TEST_CITY_ISSUES = [TEST_ISSUE];
const TEST_ERROR = { content: 'error' };

const EMPTY_STATE = {
  loading: false,
  error: null,
  pageId: 0,
  cityIssues: [],
  filter: TEST_FILTER,
};

describe('city_issues_reducer', () => {
  it('processes CITY_ISSUES_FIRST_PAGE_REQUEST success path', () => {
    expect(cityIssuesReducer(
      EMPTY_STATE,
      { type: 'CITY_ISSUES_FIRST_PAGE_REQUEST', cityId: TEST_CITY_ID, filter: TEST_FILTER },
    )).toEqual({
      cityIssues: [],
      error: null,
      filter: TEST_FILTER,
      loading: true,
      pageId: 1,
    });
  });

  it('processes CITY_ISSUES_FIRST_PAGE_RESPONSE_OK success path', () => {
    expect(cityIssuesReducer(
      EMPTY_STATE,
      { type: 'CITY_ISSUES_FIRST_PAGE_RESPONSE_OK', cityIssues: TEST_CITY_ISSUES },
    )).toEqual({
      cityIssues: TEST_CITY_ISSUES,
      error: null,
      filter: TEST_FILTER,
      loading: false,
      pageId: 0,
    });
  });

  it('processes CITY_ISSUES_FIRST_PAGE_RESPONSE_ERROR success path', () => {
    expect(cityIssuesReducer(
      EMPTY_STATE,
      { type: 'CITY_ISSUES_FIRST_PAGE_RESPONSE_ERROR', error: TEST_ERROR },
    )).toEqual({
      cityIssues: [],
      error: TEST_ERROR,
      filter: TEST_FILTER,
      loading: false,
      pageId: 0,
    });
  });

  it('processes CITY_ISSUES_NEXT_PAGE_REQUEST success path', () => {
    expect(cityIssuesReducer(
      EMPTY_STATE,
      { type: 'CITY_ISSUES_NEXT_PAGE_REQUEST', cityId: TEST_CITY_ID, pageId: 5 },
    )).toEqual({
      cityIssues: [],
      error: null,
      filter: TEST_FILTER,
      loading: true,
      pageId: 5,
    });
  });

  it('processes CITY_ISSUES_NEXT_PAGE_RESPONSE_OK success path', () => {
    const state = { ...EMPTY_STATE, cityIssues: [TEST_ISSUE] };
    expect(cityIssuesReducer(
      state,
      { type: 'CITY_ISSUES_NEXT_PAGE_RESPONSE_OK', cityIssues: TEST_CITY_ISSUES },
    )).toEqual({
      cityIssues: [TEST_ISSUE, ...TEST_CITY_ISSUES],
      error: null,
      filter: TEST_FILTER,
      loading: false,
      pageId: 0,
    });
  });

  it('processes CITY_ISSUES_NEXT_PAGE_RESPONSE_ERROR success path', () => {
    const state = { ...EMPTY_STATE, cityIssues: [TEST_ISSUE] };
    expect(cityIssuesReducer(
      state,
      { type: 'CITY_ISSUES_NEXT_PAGE_RESPONSE_ERROR', error: TEST_ERROR },
    )).toEqual({
      cityIssues: [TEST_ISSUE],
      error: TEST_ERROR,
      filter: TEST_FILTER,
      loading: false,
      pageId: 0,
    });
  });

  it('returns state is action is unsupported type', () => {
    expect(cityIssuesReducer(EMPTY_STATE, { type: 'LOGOUT_REQUEST' }))
      .toEqual(EMPTY_STATE);
  });

  it('initializes with proper value', () => {
    expect(cityIssuesReducer(undefined, { type: 'LOGOUT_REQUEST' })).toEqual(EMPTY_STATE);
  });
});
