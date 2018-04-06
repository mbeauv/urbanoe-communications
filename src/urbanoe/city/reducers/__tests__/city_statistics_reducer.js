// @flow

import type { PieChartData } from '../../../models';
import { cityStatisticsReducer } from '../city_statistics_reducer';

const TEST_STATS_TYPE = 'pie';
const TEST_CITY_ID = 5;
const TEST_CHART : PieChartData = {
  title: 'a title',
  subTitle: 'a subtitle',
  type: 'pie',
  data: [{
    color: 'blue',
    label: 'alabel',
    value: 24,
  }],
};

const TEST_ERROR = { content: 'error' };

describe('city_statistics_reducer', () => {
  it('returns state is action is unsupported type', () => {
    expect(cityStatisticsReducer({}, { type: 'LOGOUT_REQUEST' })).toEqual({});
  });

  it('initializes with proper value', () => {
    expect(cityStatisticsReducer(undefined, { type: 'LOGOUT_REQUEST' })).toEqual({});
  });

  it('processes CITY_STATISTICS_REQUEST', () => {
    const expectedState = { pie: { loading: true, error: null, chart: null } };
    expect(cityStatisticsReducer({}, {
      type: 'CITY_STATISTICS_REQUEST',
      cityId: TEST_CITY_ID,
      statsType: TEST_STATS_TYPE,
    })).toEqual(expectedState);
  });

  it('processes CITY_STATISTICS_RESPONSE_OK', () => {
    expect(cityStatisticsReducer({}, {
      type: 'CITY_STATISTICS_RESPONSE_OK',
      cityId: TEST_CITY_ID,
      statsType: 'pie',
      chart: TEST_CHART,
    })).toEqual({
      pie: {
        chart: TEST_CHART,
        loading: false,
      },
    });
  });

  it('processes CITY_STATISTICS_RESPONSE_ERROR', () => {
    expect(cityStatisticsReducer(
      {},
      { type: 'CITY_STATISTICS_RESPONSE_ERROR', cityId: 23, statsType: 'slice', error: TEST_ERROR },
    )).toEqual({
      slice: {
        chart: { content: 'error' },
        loading: false,
      },
    });
  });
});
