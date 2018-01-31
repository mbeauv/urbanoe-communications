import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getSelectedUserProfile } from '../user_profile_actions';

const TEST_USER_ID = 4;

const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('user_profile_actions', () => {
  describe('getSelectedUserProfile', () => {
    afterEach(() => {
      mock.reset();
      mock.restore();
    });

    it('handles successful fetch', () => {
      mock.onGet('https://www.urbanoe.com/mobile/end_users/4.json').reply(200, { id: 4 });

      const expectedActions = [
        { type: 'SELECTED_USER_PROFILE_REQUEST', userId: TEST_USER_ID },
        { type: 'SELECTED_USER_PROFILE_RESPONSE_OK', userId: 4, userProfile: { id: 4 } },
      ];

      const store = mockStore({ todos: [] });

      return store.dispatch(getSelectedUserProfile(TEST_USER_ID)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
