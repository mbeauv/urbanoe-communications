// @flow

import axios from 'axios';

/**
 * Returns the root url of the services.
 * TO test locally: 'http://localhost:3000/mobile'
 * To test remotely: 'https://www.urbanoe.com/mobile'
 */
export function getRootUrl() {
  return 'http://localhost:3000/mobile';
}

/**
 * Returns a valid URL to access the media gallery.
 */
export function mgUrl(part: string) {
  return `media_gallery/galleries${part}`;
}

/**
 * Returns a valid URL to access the media gallery with an authToken.
 */
export function authMgUrl(part: string, authToken: string) {
  return mgUrl(`${part}?auth_token=${authToken}`);
}


let axiosInstance = axios.create({
  baseURL: getRootUrl(),
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export function setCommunicatorInstance(instance : Object) {
  axiosInstance = instance;
}

export function communicator() {
  return axiosInstance;
}
