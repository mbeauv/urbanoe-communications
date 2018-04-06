// @flow

import type { IssueCommonData } from './IssueData';

/**
 * This is the association that can be made between a given user and a city.
 * Possible values are:
 * - home: This is where the user lives, there can only be one of these per
 *         user.
 * - visited: This is a city where the user spends non-negligible time.  For
 *            example, this could be where the user works.  There is a limited
 *            number of those allowed.
 * - liked: This is a city in which the user is interested but does not
 *          necessarily live in or visit.
 */
export type CityRelationship = 'home' | 'visited' | 'liked';

/**
 * Basic city of interest for the user.
 */
export type CitySignature = {

  /** Unique identifier for the city. */
  +id: number,

  /** Name of the city. */
  +cityName: string,

  /** Name of the state containing the city. */
  +stateName: string,

  /** Name of the country containing the city. */
  +countryName: string,

  /** Relationship that the user has with the city. */
  +relationship: CityRelationship,

  /** Indicates when the user started following this city. */
  +joinedOn: string,

  /** Image used to represent the city. */
  +imageUrl: string,
};

/**
 * Full information on a given user.
 */
export type UserProfileData = {

  /** Unique identififer for the user. */
  +id: number,

  /** User name (this should also be unique). */
  +userName: string,

  /** Indicates when the user joined the platform. */
  +joinedOn: string,

  /** Indicates when the user was last active. */
  +lastActiveOn: string,

  /** List of cities that are of interest to the user. */
  +cities: Array<CitySignature>,

  /** Image used to represent the user. */
  +avatarUrl: string,

  /** Number representing the user's overall karma. */
  +karma: number,

  /** Latest issues that were created by the user. */
  +latestIssues: Array<IssueCommonData>,
};
