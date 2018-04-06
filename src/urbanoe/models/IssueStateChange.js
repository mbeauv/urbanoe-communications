// @flow

import type { UserInfo } from './UserInfo';

/**
 * Structure that defines one state change that was done on a given issue.
 */
export type IssueStateChange = {

  /** Indicates if issue was fixed or not. */
  +fixed: bool,

  /** Reason why issue is considered fixed */
  +closeReason: string,

  /**
   * Description for the close.  Used to add extra information on status
   * change.
   */
  +description: string,

  /** Date on which the issue was changed. */
  +changedOn: string,

  /** Information on the user who changed the issue's state. */
  +author: UserInfo,
};
