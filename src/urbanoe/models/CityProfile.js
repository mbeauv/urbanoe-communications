// @flow

import type { Coordinates } from './Coordinates';
import type { ContactProfile } from './ContactProfile';

/**
 * Basic information on a given city.
 */
export type CityProfile = {

  /**
   * Unique identifier representing the city.
   */
  +id: number,

  /**
   * Name for the city.
   */
  +cityName: string,

  /**
   * Name of the state to which the city belongs to.
   */
  +stateName: string,

  /**
   * Name of the country to which the city belongs to.
   */
  +countryName: string,

  /**
   * Geolocation of the city's center.
   */
  +townCenter: Coordinates,

  /**
   * Total area of the city (this is a floating value of km**2)
   */
  +area: number,

  /**
   * Total number of citizens that live in this city.
   */
  +citizenCount: number,

  /**
   * URL of the city's featured image (used as poster image on city page)
   */
  +mainImageUrl: string,

  /**
   * URL of the city's thumb image (used as tile image in lists).
   */
  +thumbImageUrl: string,

  /**
   * Contact information for the city and service department.
   */
  +contacts: {
    +city?: ContactProfile,
    +service?: ContactProfile,
  }
}
