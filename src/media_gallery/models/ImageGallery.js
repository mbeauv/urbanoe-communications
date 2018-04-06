// @flow

/**
 * Details associated with a given gallery.
 */
export type ImageGallery = {

  /** Unique id for the gallery. */
  +id: number,

  /** Unique name for the gallery */
  +name: string,

  /** Optional description of what the gallery contains. */
  +description?: string,

  /** Time at which the gallery was created, ruby time string.
      (e.g. 2018-03-04T11:56:26.792Z) */
  +createdOn: string,

  /** Time at which the gallery was last updated, ruby time string.
      (e.g. 2018-03-04T11:56:26.792Z) */
  +updatedOn: string,

  /** Number of images stored in the gallery. */
  +nbImages: number,

};
