import { loginReducer } from '../login_reducer';

const ERROR = 'an error';
const TOKEN = 'atoken';
const USER_ID = 'auserid';
const EMPTY_STATE = { loading: false, error: null, authInfo: null };

describe('login_reducer', () => {
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
