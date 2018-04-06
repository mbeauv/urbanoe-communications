// @flow

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getCityProfile } from '../city_profile_actions';
import { setCommunicatorInstance } from '../../../../common';

const TEST_CITY_ID = 4;

const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('city_profile_actions', () => {
  beforeEach(() => setCommunicatorInstance(mock.axiosInstance));

  afterEach(() => mock.reset());

  describe('getCityProfile', () => {
    it('handles successful fetch', () => {
      mock.onGet(`/cities/${TEST_CITY_ID}.json`).reply(200, { id: 4 });

      const expectedActions = [
        { type: 'CITY_PROFILE_REQUEST', cityId: TEST_CITY_ID },
        { type: 'CITY_PROFILE_RESPONSE_OK', cityProfile: { id: 4 } },
      ];

      const store = mockStore({ todos: [] });

      return store.dispatch(getCityProfile(TEST_CITY_ID)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
