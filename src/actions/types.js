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
  ImageGallery,
  ImageGalleryImageInfo,
  ImageScratchDetails,
} from 'urbanoe-model';

/**
 * List of all recognized React Redux actions that can be performed with
 * regards to the Urbanoe server.  The approach used follows the template
 * that was defined in the Facebook f8app sample.  See:
 *
 * https://github.com/fbsamples/f8app/blob/master/js/actions/types.js
 */
export type Action =
    { type: 'LOGIN_REQUEST', userName: string, password: string }
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
  | { type: 'IMAGE_GALLERY_LIST_REQUEST' }
  | { type: 'IMAGE_GALLERY_LIST_RESPONSE_OK', galleries: Array<ImageGallery> }
  | { type: 'IMAGE_GALLERY_LIST_RESPONSE_ERROR', error: Object }
  | { type: 'IMAGE_GALLERY_CREATE_REQUEST' }
  | { type: 'IMAGE_GALLERY_CREATE_RESPONSE_OK', gallery: ImageGallery }
  | { type: 'IMAGE_GALLERY_CREATE_RESPONSE_ERROR', error: Object }
  | { type: 'IMAGE_GALLERY_UPDATE_REQUEST', galleryId: number }
  | { type: 'IMAGE_GALLERY_UPDATE_RESPONSE_OK', gallery: ImageGallery }
  | { type: 'IMAGE_GALLERY_UPDATE_RESPONSE_ERROR', galleryId: number, error: Object }
  | { type: 'IMAGE_GALLERY_DELETE_REQUEST', galleryId: number }
  | { type: 'IMAGE_GALLERY_DELETE_RESPONSE_OK', galleryId: number }
  | { type: 'IMAGE_GALLERY_DELETE_RESPONSE_ERROR', galleryId: number, error: Object }
  | { type: 'IMAGE_GALLERY_IMAGE_INFO_LIST_REQUEST', galleryId: number }
  | { type: 'IMAGE_GALLERY_IMAGE_INFO_LIST_RESPONSE_OK', galleryId: number, imageInfos: Array<ImageGalleryImageInfo> }
  | { type: 'IMAGE_GALLERY_IMAGE_INFO_LIST_RESPONSE_ERROR', galleryId: number, error: Object }
  | { type: 'IMAGE_GALLERY_IMAGE_INFO_CREATE_REQUEST', galleryId: number }
  | { type: 'IMAGE_GALLERY_IMAGE_INFO_CREATE_RESPONSE_OK', galleryId: number, imageInfo: ImageGalleryImageInfo }
  | { type: 'IMAGE_GALLERY_IMAGE_INFO_CREATE_RESPONSE_ERROR', galleryId: number, error: Object }
  | { type: 'IMAGE_GALLERY_IMAGE_INFO_UPDATE_REQUEST', galleryId: number, imageInfoId: number }
  | { type: 'IMAGE_GALLERY_IMAGE_INFO_UPDATE_RESPONSE_OK', galleryId: number, imageInfo: ImageGalleryImageInfo }
  | { type: 'IMAGE_GALLERY_IMAGE_INFO_UPDATE_RESPONSE_ERROR', galleryId: number, imageInfoId: number, error: Object }
  | { type: 'IMAGE_GALLERY_IMAGE_INFO_DELETE_REQUEST', galleryId: number, imageInfoId: number }
  | { type: 'IMAGE_GALLERY_IMAGE_INFO_DELETE_RESPONSE_OK', galleryId: number, imageInfoId: number }
  | { type: 'IMAGE_GALLERY_IMAGE_INFO_DELETE_RESPONSE_ERROR', galleryId: number, imageInfoId: number, error: Object }
  | { type: 'IMAGE_GALLERY_IMAGE_INFO_SELECTION_REQUEST' }
  | { type: 'IMAGE_GALLERY_IMAGE_INFO_SELECTION_RESPONSE_OK', imageInfo: ImageGalleryImageInfo }
  | { type: 'IMAGE_GALLERY_IMAGE_INFO_SELECTION_RESPONSE_ERROR', error: Object}
  | { type: 'IMAGE_GALLERY_SCRATCH_CREATE_REQUEST' }
  | { type: 'IMAGE_GALLERY_SCRATCH_CREATE_RESPONSE_OK', scratchImage: ImageScratchDetails }
  | { type: 'IMAGE_GALLERY_SCRATCH_CREATE_RESPONSE_ERROR', error: Object }
  | { type: 'IMAGE_GALLERY_SCRATCH_DELETE_REQUEST' }
  | { type: 'IMAGE_GALLERY_SCRATCH_DELETE_RESPONSE_OK' }
  | { type: 'IMAGE_GALLERY_SCRATCH_DELETE_RESPONSE_ERROR' }
  | { type: 'IMAGE_GALLERY_SCRATCH_REINIT_LOCAL' }
  | { type: 'ISSUE_DETAILS_REQUEST', issueId: number }
  | { type: 'ISSUE_DETAILS_RESPONSE_OK', issueId: number, issueDetails: IssueDetailsData }
  | { type: 'ISSUE_DETAILS_RESPONSE_ERROR', issueId: number, error: Object }
  | { type: 'SELECTED_USER_PROFILE_REQUEST', userId: number }
  | { type: 'SELECTED_USER_PROFILE_RESPONSE_OK', userId: number, userProfile: UserProfileData }
  | { type: 'SELECTED_USER_PROFILE_RESPONSE_ERROR', userId: number, error: Object };

/** Typed promise for action */
export type PromiseAction = Promise<Action>;

/** Returns the Redux state. */
export type GetState = () => Object;

/** Flow definition of a dispatcher action. */
export type Dispatch = (action: Action | PromiseAction | Array<Action>) => any;

/** Represents a thunk promise, see redux-thunk */
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
