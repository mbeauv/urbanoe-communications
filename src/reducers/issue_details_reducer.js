// @flow

import type { IssueDetailsData } from 'urbanoe-model';
import type { Action } from '../actions/types';

type State = {
  loading: boolean,
  issueDetails: ?IssueDetailsData,
  error: ?Object,
};

const INITIAL_STATE: State = {
  loading: false,
  issueDetails: null,
  error: null,
};

/**
 * Reducer function to process issue details actions. At the present time, only the
 * getIssueDetails action is handled.
 */
export function issueDetailsReducer(state: State = INITIAL_STATE, action: Action): State {
  switch (action.type) {
    case 'ISSUE_DETAILS_REQUEST':
      return { ...state, loading: true };
    case 'ISSUE_DETAILS_RESPONSE_OK':
      return { ...state, loading: false, issueDetails: action.issueDetails, error: null };
    case 'ISSUE_DETAILS_RESPONSE_ERROR':
      return { ...state, loading: false, issueDetails: null, error: action.error };
    default:
      return state;
  }
}
