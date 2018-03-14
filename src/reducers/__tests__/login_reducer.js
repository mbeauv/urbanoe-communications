import { loginReducer } from '../login_reducer';

const ERROR = 'an error';
const TOKEN = 'atoken';
const USER_ID = 'auserid';
const EMPTY_STATE = { loading: false, error: null, authInfo: null };
const LOGGED_IN_STATE = {
  loading: false,
  error: null,
  authInfo: {
    userName: 'aname',
    endUserId: 12,
  },
};

describe('login_reducer', () => {
  it('processes LOGOUT_REQUEST', () => {
    expect(loginReducer(LOGGED_IN_STATE, { type: 'LOGOUT_REQUEST' })).toEqual({
      authInfo: null,
      error: null,
      loading: true,
    });
  });

  it('processes LOGOUT_RESPONSE_OK', () => {
    expect(loginReducer(LOGGED_IN_STATE, { type: 'LOGOUT_RESPONSE_OK' })).toEqual({
      authInfo: null,
      error: null,
      loading: false,
    });
  });

  it('processes LOGIN_REQUEST', () => {
    expect(loginReducer(EMPTY_STATE, { type: 'LOGIN_REQUEST' })).toEqual({
      authInfo: null,
      error: null,
      loading: true,
    });
  });

  it('processes LOGIN_RESPONSE_OK', () => {
    expect(loginReducer(EMPTY_STATE, {
      type: 'LOGIN_RESPONSE_OK',
      login: {
        authToken: TOKEN,
        endUserId: USER_ID,
      } })).toEqual({
      loading: false,
      error: null,
      authInfo: {
        authToken: TOKEN,
        endUserId: USER_ID,
      } });
  });

  it('processes LOGIN_RESPONSE_ERROR', () => {
    expect(loginReducer(EMPTY_STATE, {
      type: 'LOGIN_RESPONSE_ERROR',
      error: ERROR })).toEqual({
      loading: false,
      authInfo: null,
      error: ERROR,
    });
  });
});
