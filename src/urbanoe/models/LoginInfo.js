// @flow

/**
 * The LoginInfo structure contains information from the login operation.
 */
export type LoginInfo = {

  /** Token for the user. */
  +authToken: string,

  /** Identifier for the user. */
  +endUserId: number,

};
