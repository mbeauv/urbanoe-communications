// @flow

/**
 * The LocationInfo describes a given location in a given city.
 */
export type LocationInfo = {

  /** Name of the street on which issue is. */
  +streetName: string,

  /** Name of the city which contains issue. */
  +cityName: string,

  /** Name of the state which contains the issue. */
  +stateName?: string,

  /** Name of the country which contains the issue. */
  +countryName: string,
};
