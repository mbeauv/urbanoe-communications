// @flow

import type { UserInfo } from './UserInfo';

/**
 * Comment on a given issue.
 */
export type Comment = {

  /** Unique identifier for the comment. */
  +id: number,

  /** Information on the user who made the comment. */
  +author: UserInfo,

  /** Content of the comment. */
  +message: string,

  /** Time at which the comment was made (since epoch). */
  +commentedOn: number,
};
