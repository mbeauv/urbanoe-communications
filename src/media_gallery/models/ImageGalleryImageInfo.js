// @flow

/**
 * Information on a gallery image.
 */
export type ImageGalleryImageInfoVersion = {

  /**
   * Name of the version of the image (usually something like "thumb",
   * "square", etc.)
   */
  +name: string,

  /** URL of the image */
  +url: string,

}

/**
 * This is all the information about a given image info structure.
 */
export type ImageGalleryImageInfo = {

  /** Unique identifier for the image info. */
  +id: number,

  /** Descriptive information about the image info. */
  +name: string,

  /** A description of the image info. */
  +description: string,

  /** Time at which the image info was created, ruby time string.
      (e.g. 2018-03-04T11:56:26.792Z) */
  +createdOn: string,

  /** Time at which the image info was last updated, ruby time string.
      (e.g. 2018-03-04T11:56:26.792Z) */
  +updatedOn: string,

  /** Url of the original image */
  +originalUrl: string,

  /** All of the versions of the image that exist. */
  +variants: Array<ImageGalleryImageInfoVersion>

}
