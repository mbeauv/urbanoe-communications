import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getCityIssuesFirstPage } from '../city_issues_actions';
import { setCommunicatorInstance } from '../communicator';

const TEST_CITY_ID = 4;
const TEST_CITY_FILTER = {
  statuses: {
    fixed: true,
    notFixed: true,
  },
};

const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('city_issues_actions', () => {
  describe('getCityIssuesFirstPage', () => {
    beforeEach(() => {
      setCommunicatorInstance(mock.axiosInstance);
    });

    afterEach(() => {
      mock.reset();
      mock.restore();
    });

    it('handles successful fetch', () => {
      mock.onGet(`/cities/${TEST_CITY_ID}/issues.json?page=1&status=all&issue_types=`).reply(200, []);

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
