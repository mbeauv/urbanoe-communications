// @flow

/**
 * Information associated with a specific user of the system.
 */
export type UserInfo = {

  /** Unique identifier for the user. */
  +userId: number,

  /** User name (this is also unique, system wide) */
  +userName: string,

  /** Url for the user's avatar */
  +avatarUrl: string,
};
