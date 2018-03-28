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
 * Instance of the axios communicator.  The timeout was set to 2.5 seconds
 * because in some cases, e.g. delete that includes S3 access, the
 * operation can actually take quite a bit of time.
 */
let axiosInstance = axios.create({
  baseURL: getRootUrl(),
  timeout: 5000,
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
