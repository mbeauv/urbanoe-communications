// @flow

import type { ReporterProfile } from './ReporterProfile';

/**
 * Information on an image.  This will usually be issue related images.
 */
export type ImageInfo = {

  /** URL of the image in its full size (used as posters or in a image view) */
  +mainImageUrl: string,

  /** URL of the image in its small size (used in tile views normally) */
  +thumbImageUrl: string,

  /** Date at which the image was added */
  +createdOn: string,

  /** Profile of image reporter. */
  +author: ReporterProfile,
}
