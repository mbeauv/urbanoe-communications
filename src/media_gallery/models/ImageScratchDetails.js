// @flow
import type { ImageScratchImageVariant } from './ImageScratchImageVariant';

/**
 * Information associated with a given user's image scratch.
 */
export type ImageScratchDetails = {

  /** Unique identifier for the scratch. */
  +id: number,

  /** Unique identifier for the associated image version. */
  +imageVersionId: number,

  /** Array for the image variants. */
  +variants: Array<ImageScratchImageVariant>,

};
