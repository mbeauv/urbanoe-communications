import { selectedUserProfileReducer } from '../selected_user_profile_reducer';

const EMPTY_STATE = { loading: false, error: null, userProfile: null };
const TEST_USER_ID = 5;
const TEST_USER_PROFILE = { id: 23 };
const TEST_ERROR = { content: 'error' };

describe('selected_user_profile_reducer', () => {
  it('returns state is action is unsupported type', () => {
    expect(selectedUserProfileReducer(EMPTY_STATE, { type: 'BLAH_BLAH', error: TEST_ERROR }))
      .toEqual(EMPTY_STATE);
  });

  it('initializes with proper value', () => {
    expect(selectedUserProfileReducer(undefined, {})).toEqual(EMPTY_STATE);
  });

  it('processes SELECTED_USER_PROFILE_REQUEST', () => {
    expect(selectedUserProfileReducer(
      EMPTY_STATE,
      { type: 'SELECTED_USER_PROFILE_REQUEST', userId: TEST_USER_ID },
    )).toEqual({
      error: null,
      userProfile: null,
      loading: true,
    });
  });

  it('processes SELECTED_USER_PROFILE_RESPONSE_OK', () => {
    expect(selectedUserProfileReducer(
      EMPTY_STATE,
      { type: 'SELECTED_USER_PROFILE_RESPONSE_OK', userProfile: TEST_USER_PROFILE },
    )).toEqual({
      userProfile: TEST_USER_PROFILE,
      error: null,
      loading: false,
    });
  });

  it('processes SELECTED_USER_PROFILE_RESPONSE_ERROR', () => {
    expect(selectedUserProfileReducer(
      EMPTY_STATE,
      { type: 'SELECTED_USER_PROFILE_RESPONSE_ERROR', error: TEST_ERROR },
    )).toEqual({
      userProfile: null,
      error: TEST_ERROR,
      loading: false,
    });
  });
});
