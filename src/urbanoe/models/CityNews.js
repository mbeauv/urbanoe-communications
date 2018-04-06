// @flow

import type { ReporterProfile } from './ReporterProfile';

/**
 * This is one news article associated with a given city.
 */
export type CityNews = {

  /** Unique identifier for the CityNews. */
  +id: number,

  /** Unique identifier for the city to which this news is associated with. */
  +cityId: number,

  /**
   * Unique identifier with an object that is associated to the news.  For
   * example, if the news is associated to an issue, this would most
   * probably be the unique id of the issue.  This works in conjunction with
   * the actionableType value.
   */
  +actionableId: number,

  /**
   * Type of object to which the action can be tied to.  For example, This
   * could be `Issue` or `Cititzen` or something alike.
   */
  +actionableType: string,

  // TODO Remove the following
  /**
   * Extra action information.  Not used anymore.  Should be phased out.
   */
  +extraActionInfoId: number,

  /**
   * Content of the news.
   */
  +description: string,

  /**
   * Number of likes that the news has.
   */
  +nbLikes: number,

  /**
   * Date when this news was reported.
   */
  +reportedOn: string,

  /**
   * Number of comments for the news.
   */
  +nbComments: number,

  /**
   * Url of the feature image associated to the news.
   */
  +imageUrl: string,

  /**
   * Basic information about the person who is the authore of this news.
   */
  +reporter: ReporterProfile,
};
