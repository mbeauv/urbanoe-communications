// @flow

/**
 * City contact information.  At the present time, there are two types of
 * contacts supported (city and service).
 */
export type ContactProfile = {

  /** Phone number. */
  +phone?: string,

  /** URL */
  +www?: string,

  /** Facebook id */
  +facebook?: string,

  /** Twitter id */
  +twitter?: string,

  /** Email address. */
  +email?: string,
};
