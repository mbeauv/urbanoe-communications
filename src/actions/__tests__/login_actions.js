// @flow

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { setCommunicatorInstance } from '../../common';
import { doLogin, doLogout } from '../login_actions';

const USER_ID = 24;
const USER_NAME = 'jdoe';
const USER_PASSWORD = 'apassword';
const TOKEN = 'atoken';

const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('login_actions', () => {
  beforeEach(() => setCommunicatorInstance(mock.axiosInstance));

  afterEach(() => mock.reset());

  describe('doLogout', () => {
    it('handles logout', () => {
      const expectedActions = [
        { type: 'LOGOUT_REQUEST' },
        { type: 'LOGOUT_RESPONSE_OK' },
      ];

      const store = mockStore({ todos: [] });

      return store.dispatch(doLogout()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('doLogin', () => {
    it('handles successful login', () => {
      mock.onPost('/sessions.json', { end_user: { username: USER_NAME, password: USER_PASSWORD } })
        .reply(200, { auth_token: TOKEN, end_user_id: USER_ID });

      const expectedActions = [
        { type: 'LOGIN_REQUEST' },
        { type: 'LOGIN_RESPONSE_OK', login: { authToken: TOKEN, endUserId: USER_ID } },
      ];

      const store = mockStore({ todos: [] });

      return store.dispatch(doLogin(USER_NAME, USER_PASSWORD)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
