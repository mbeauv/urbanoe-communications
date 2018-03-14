// @flow

import axios from 'axios';

/**
 * Returns the root url of the services.
 * TO test locally: 'http://localhost:3000/mobile'
 * To test remotely: 'https://www.urbanoe.com/mobile'
 */
export function getRootUrl() {
  return 'https://www.urbanoe.com/mobile';
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
