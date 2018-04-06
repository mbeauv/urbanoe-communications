// @flow

/**
 * Represents the author of the news article.
 */
export type ReporterProfile = {

  /** Unique identifier for the user. */
  +userId: number,

  /** User name (this is also unique, system wide) */
  +userName: string,

  /** Url for the user's avatar */
  +avatarUrl: string,
};
