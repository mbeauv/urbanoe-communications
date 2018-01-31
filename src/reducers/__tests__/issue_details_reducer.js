import { issueDetailsReducer } from '../issue_details_reducer';

const EMPTY_STATE = { loading: false, error: null, issueDetails: null };
const TEST_ISSUE_ID = 5;
const TEST_ISSUE_DETAILS = [{ id: 23 }];
const TEST_ERROR = { content: 'error' };

describe('issue_details_reducer', () => {
  it('returns state is action is unsupported type', () => {
    expect(issueDetailsReducer(EMPTY_STATE, { type: 'BLAH_BLAH', error: TEST_ERROR }))
      .toEqual(EMPTY_STATE);
  });

  it('initializes with proper value', () => {
    expect(issueDetailsReducer(undefined, {})).toEqual(EMPTY_STATE);
  });

  it('processes ISSUE_DETAILS_REQUEST success path', () => {
    expect(issueDetailsReducer(
      EMPTY_STATE,
      { type: 'ISSUE_DETAILS_REQUEST', issueId: TEST_ISSUE_ID },
    )).toEqual({
      error: null,
      issueDetails: null,
      loading: true,
    });
  });

  it('processes ISSUE_DETAILS_RESPONSE_OK success path', () => {
    expect(issueDetailsReducer(
      EMPTY_STATE,
      { type: 'ISSUE_DETAILS_RESPONSE_OK', issueDetails: TEST_ISSUE_DETAILS },
    )).toEqual({
      issueDetails: TEST_ISSUE_DETAILS,
      error: null,
      loading: false,
    });
  });

  it('processes ISSUE_DETAILS_RESPONSE_ERROR success path', () => {
    expect(issueDetailsReducer(
      EMPTY_STATE,
      { type: 'ISSUE_DETAILS_RESPONSE_ERROR', error: TEST_ERROR },
    )).toEqual({
      issueDetails: null,
      error: TEST_ERROR,
      loading: false,
    });
  });
});
