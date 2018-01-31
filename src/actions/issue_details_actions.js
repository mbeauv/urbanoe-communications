// @flow

import axios from 'axios';
import { getRootUrl } from './common';
import type { ThunkAction } from './types';

/**
 * Returns an asynchronous action to retrieve the details of a given issue.
 */
export function getIssueDetails(issueId: number): ThunkAction {
  return async (dispatch) => {
    dispatch({ type: 'ISSUE_DETAILS_REQUEST', issueId });

    try {
      const url = `${getRootUrl()}/issues/${issueId}.json`;
      const response = await axios.get(url, { 'Content-Type': 'application/json' });
      dispatch({ type: 'ISSUE_DETAILS_RESPONSE_OK', issueId, issueDetails: response.data });
    } catch (error) {
      dispatch({ type: 'ISSUE_DETAILS_RESPONSE_ERROR', issueId, error });
    }
  };
}
