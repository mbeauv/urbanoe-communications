import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getIssueDetails } from '../issue_details_actions';

const TEST_ISSUE_ID = 4;

const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('issue_details_actions', () => {
  describe('getIssueDetails', () => {
    afterEach(() => {
      mock.reset();
      mock.restore();
    });

    it('handles successful fetch', () => {
      mock.onGet('https://www.urbanoe.com/mobile/issues/4.json').reply(200, { id: 4 });

      const expectedActions = [
        { type: 'ISSUE_DETAILS_REQUEST', issueId: TEST_ISSUE_ID },
        { type: 'ISSUE_DETAILS_RESPONSE_OK', issueId: 4, issueDetails: { id: 4 } },
      ];

      const store = mockStore({ todos: [] });

      return store.dispatch(getIssueDetails(TEST_ISSUE_ID)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
