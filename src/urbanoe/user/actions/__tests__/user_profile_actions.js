// @flow

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { setCommunicatorInstance } from '../../../../common';
import { getSelectedUserProfile } from '../user_profile_actions';

const TEST_USER_ID = 4;

const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('user_profile_actions', () => {
  beforeEach(() => setCommunicatorInstance(mock.axiosInstance));

  afterEach(() => mock.reset());

  describe('getSelectedUserProfile', () => {
    it('handles successful fetch', () => {
      mock.onGet(`/end_users/${TEST_USER_ID}.json`).reply(200, { id: TEST_USER_ID });

      const expectedActions = [
        { type: 'SELECTED_USER_PROFILE_REQUEST', userId: TEST_USER_ID },
        { type: 'SELECTED_USER_PROFILE_RESPONSE_OK', userProfile: { id: TEST_USER_ID } },
      ];

      const store = mockStore({ todos: [] });

      return store.dispatch(getSelectedUserProfile(TEST_USER_ID)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
