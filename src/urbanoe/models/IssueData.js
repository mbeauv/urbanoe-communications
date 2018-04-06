// @flow

import type { Coordinates } from './Coordinates';
import type { LocationInfo } from './LocationInfo';
import type { UserInfo } from './UserInfo';
import type { Comment } from './Comment';
import type { IssueStateChange } from './IssueStateChange';
import type { ImageInfo } from './ImageInfo';
import type { IssueProperties } from './IssueProperties';
import type { IssueType } from './IssueType';

/**
 * Minimum information ever returned about an issue.
 */
export type IssueCommonData = {

  /** Unique identifier for the issue. */
  +id: number,

  /** Coordinates of the issue */
  +coordinates: Coordinates,

  /** Non coordinate location information (e.g. street name) */
  +location: LocationInfo,

  /** Indicates if the issue is fixed or not. */
  +fixed: boolean,

  /** Rating for the issue. */
  +rating: number,

  /** Url of the feature image for the issue */
  +mainImageUrl: string,

  /** Type of issue (e.g. pothole) */
  +issueType: IssueType,

  /** Unique identifier for the city */
  +cityId: number,

  /** Date at which the issue was first reported */
  +reportedOn: string,

  /** Date at which the issue was last modified */
  +lastUpdatedOn: string,

  /** Short description of what the issue is */
  +overviewDescription?: string,

  /** Information on the reporter of the issue */
  +reporter: UserInfo,
};

/**
 * Issue summary information.  This is the minimum information on the issue
 * plus the number of comments associated with the issue.
 */
export type IssueSummaryData = IssueCommonData & {
  nbComments: number,
};

/**
 * Full detail on the issue.  This is the basic information plus a lot
 * of information that allows the user to view the details of on the
 * issue.
 */
export type IssueDetailsData = IssueCommonData & {

  /** List of properties specific to the issue */
  +properties: IssueProperties,

  /** List of comments for the issue */
  +comments: Array<Comment>,

  /** List of images for the issue (allows for construction of image gallery) */
  +imageDefinitions: Array<ImageInfo>,

  /** List of modifications that have been made to the issue's status */
  +history: Array<IssueStateChange>,

  /** Flag that indicates if the user can modify the issue's rating */
  +rateable: boolean,

  /**
   * Total rating score.  This is a weighted sum of all ratings applied to the
   * issue.
   */
  +ratingTotal: number,

  /** Average rating score */
  +ratingAverage: number,

  /** Number of people who have rated the issue. */
  +ratingVoteCount: number,

  /**
   * Ranking of the issue based on the score.  This is a city wide ranking.
   * One is highest rank (which usually means worst).
   */
  +ratingRank: number,
};
