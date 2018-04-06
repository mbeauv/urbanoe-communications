// @flow

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import type { CityIssuesFilterData } from '../../../models';
import { getCityIssuesFirstPage, getCityIssuesNextPage } from '../city_issues_actions';
import { setCommunicatorInstance } from '../../../../common';

const TEST_CITY_ID = 4;
const TEST_PAGE_ID = 2;
const TEST_CITY_FILTER : CityIssuesFilterData = {
  statuses: {
    fixed: true,
    notFixed: true,
  },
  types: {
    pothole: true,
    graffiti: true,
    lostPet: true,
    garbageCan: true,
    brokenLight: true,
    other: true,
  },
};

const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('city_issues_actions', () => {
  beforeEach(() => setCommunicatorInstance(mock.axiosInstance));

  afterEach(() => mock.reset());

  describe('getCityIssuesNextPage', () => {
    it('handles success fetch', () => {
      const testUrl = `/cities/${TEST_CITY_ID}/issues.json?page=${TEST_PAGE_ID}&status=all&issue_types=pothole,graffiti,lostPet,garbageCan,brokenLight,other`;
      mock.onGet(testUrl).reply(200, []);

      const expectedActions = [
        { type: 'CITY_ISSUES_NEXT_PAGE_REQUEST', filter: TEST_CITY_FILTER, pageId: TEST_PAGE_ID, cityId: TEST_CITY_ID },
        { type: 'CITY_ISSUES_NEXT_PAGE_RESPONSE_OK', pageId: TEST_PAGE_ID, cityIssues: [] },
      ];

      const store = mockStore({ todos: [] });

      return store.dispatch(getCityIssuesNextPage(TEST_CITY_ID, TEST_CITY_FILTER, TEST_PAGE_ID))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('getCityIssuesFirstPage', () => {
    it('handles successful fetch', () => {
      mock.onGet(`/cities/${TEST_CITY_ID}/issues.json?page=1&status=all&issue_types=pothole,graffiti,lostPet,garbageCan,brokenLight,other`).reply(200, []);

      const expectedActions = [
        { type: 'CITY_ISSUES_FIRST_PAGE_REQUEST', cityId: TEST_CITY_ID, filter: TEST_CITY_FILTER },
        { type: 'CITY_ISSUES_FIRST_PAGE_RESPONSE_OK', cityIssues: [] },
      ];

      const store = mockStore({ todos: [] });

      return store.dispatch(getCityIssuesFirstPage(TEST_CITY_ID, TEST_CITY_FILTER)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
