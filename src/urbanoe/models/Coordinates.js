// @flow

/**
 * Basic type representing a geolocated coordinate.  The longitude, latitude
 * are in decimal and the accuracy is a value measured in meters (or fraction
 * of a meter).
 */
export type Coordinates = {

  /** Longitude (float number using decimals) */
  +longitude: number,

  /** Latitude (float number using decimals) */
  +latitude: number,

  /** Accuracy for the coordinates (in meters) */
  +accuracy?: number,
};
