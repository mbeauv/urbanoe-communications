// @flow

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

const TEST_CITY_ISSUES = [{ id: 1 }, { id: 2 }];
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
    const state = { ...EMPTY_STATE, cityIssues: [{ id: 22 }] };
    expect(cityIssuesReducer(
      state,
      { type: 'CITY_ISSUES_NEXT_PAGE_RESPONSE_OK', cityIssues: TEST_CITY_ISSUES },
    )).toEqual({
      cityIssues: [{ id: 22 }, ...TEST_CITY_ISSUES],
      error: null,
      filter: TEST_FILTER,
      loading: false,
      pageId: 0,
    });
  });

  it('processes CITY_ISSUES_NEXT_PAGE_RESPONSE_ERROR success path', () => {
    const state = { ...EMPTY_STATE, cityIssues: [{ id: 22 }] };
    expect(cityIssuesReducer(
      state,
      { type: 'CITY_ISSUES_NEXT_PAGE_RESPONSE_ERROR', error: TEST_ERROR },
    )).toEqual({
      cityIssues: [{ id: 22 }],
      error: TEST_ERROR,
      filter: TEST_FILTER,
      loading: false,
      pageId: 0,
    });
  });

  it('returns state is action is unsupported type', () => {
    expect(cityIssuesReducer(EMPTY_STATE, { type: 'BLAH_BLAH', error: TEST_ERROR }))
      .toEqual(EMPTY_STATE);
  });

  it('initializes with proper value', () => {
    expect(cityIssuesReducer(undefined, {})).toEqual(EMPTY_STATE);
  });
});
