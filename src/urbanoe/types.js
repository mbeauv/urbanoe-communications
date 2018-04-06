// @flow

import type {
  CityProfile,
  CityNews,
  IssueSummaryData,
  IssueDetailsData,
  CityIssuesFilterData,
  PieChartData,
  UserProfileData,
  LoginInfo,
} from 'urbanoe-model';

/**
 * List of all recognized React Redux actions that can be performed with
 * regards to the Urbanoe server.  The approach used follows the template
 * that was defined in the Facebook f8app sample.  See:
 *
 * https://github.com/fbsamples/f8app/blob/master/js/actions/types.js
 */
export type UrbanoeAction =
    { type: 'LOGIN_REQUEST' }
  | { type: 'LOGIN_RESPONSE_OK', login: LoginInfo }
  | { type: 'LOGOUT_REQUEST' }
  | { type: 'LOGOUT_RESPONSE_OK' }
  | { type: 'LOGIN_RESPONSE_ERROR', error: Object }
  | { type: 'CITY_PROFILE_REQUEST', cityId: number }
  | { type: 'CITY_PROFILE_RESPONSE_OK', cityProfile: CityProfile }
  | { type: 'CITY_PROFILE_RESPONSE_ERROR', error: Object }
  | { type: 'CITY_NEWS_PAGE_REQUEST', cityId: number, pageId: number }
  | { type: 'CITY_NEWS_PAGE_RESPONSE_OK', cityNews: Array<CityNews> }
  | { type: 'CITY_NEWS_PAGE_RESPONSE_ERROR', error: Object }
  | { type: 'CITY_ISSUES_FIRST_PAGE_REQUEST', cityId: number, filter: CityIssuesFilterData }
  | { type: 'CITY_ISSUES_FIRST_PAGE_RESPONSE_OK', cityIssues: Array<IssueSummaryData> }
  | { type: 'CITY_ISSUES_FIRST_PAGE_RESPONSE_ERROR', error: Object }
  | { type: 'CITY_ISSUES_NEXT_PAGE_REQUEST', cityId: number, pageId: number }
  | { type: 'CITY_ISSUES_NEXT_PAGE_RESPONSE_OK', cityIssues: Array<IssueSummaryData> }
  | { type: 'CITY_ISSUES_NEXT_PAGE_RESPONSE_ERROR', error: Object }
  | { type: 'CITY_STATISTICS_REQUEST', cityId: number, statsType: string }
  | { type: 'CITY_STATISTICS_RESPONSE_OK', cityId: number, statsType: string, chart: PieChartData }
  | { type: 'CITY_STATISTICS_RESPONSE_ERROR', cityId: number, statsType: string, error: Object }
  | { type: 'ISSUE_DETAILS_REQUEST', issueId: number }
  | { type: 'ISSUE_DETAILS_RESPONSE_OK', issueDetails: IssueDetailsData }
  | { type: 'ISSUE_DETAILS_RESPONSE_ERROR', issueId: number, error: Object }
  | { type: 'SELECTED_USER_PROFILE_REQUEST', userId: number }
  | { type: 'SELECTED_USER_PROFILE_RESPONSE_OK', userProfile: UserProfileData }
  | { type: 'SELECTED_USER_PROFILE_RESPONSE_ERROR', userId: number, error: Object };

/** Typed promise for action */
export type UrbanoePromiseAction = Promise<UrbanoeAction>;

/** Returns the Redux state. */
export type GetState = () => Object;

/** Flow definition of a dispatcher action. */
export type Dispatch = (action: UrbanoeAction | UrbanoePromiseAction | Array<UrbanoeAction>) => any;

/** Represents a thunk promise, see redux-thunk */
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
