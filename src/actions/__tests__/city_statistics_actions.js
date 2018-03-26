// @flow

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { setCommunicatorInstance } from '../../common';
import { getCityStatistics } from '../city_statistics_actions';

const TEST_CITY_ID = 4;
const TEST_CITY_STATS_TYPE = 'pie';

const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('city_statistics_actions', () => {
  beforeEach(() => setCommunicatorInstance(mock.axiosInstance));

  afterEach(() => mock.reset());

  describe('getCityStatistics', () => {
    it('handles successful fetch', () => {
      mock.onGet(`/cities/${TEST_CITY_ID}/statistics.json?type=pie`).reply(200, { id: 4 });

      const expectedActions = [
        { type: 'CITY_STATISTICS_REQUEST', cityId: TEST_CITY_ID, statsType: TEST_CITY_STATS_TYPE },
        { type: 'CITY_STATISTICS_RESPONSE_OK', chart: { id: TEST_CITY_ID }, cityId: TEST_CITY_ID, statsType: 'pie' },
      ];

      const store = mockStore({ todos: [] });

      return store.dispatch(getCityStatistics(TEST_CITY_ID, TEST_CITY_STATS_TYPE)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
