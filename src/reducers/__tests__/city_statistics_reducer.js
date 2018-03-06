import { cityStatisticsReducer } from '../city_statistics_reducer';

const EMPTY_STATE = {};
const TEST_STATS_TYPE = 'pie';
const TEST_CITY_ID = 5;
const TEST_CHART = { datum1: 'data' };
const TEST_ERROR = { content: 'error' };

describe('city_statistics_reducer', () => {
  it('returns state is action is unsupported type', () => {
    expect(cityStatisticsReducer(EMPTY_STATE, { type: 'BLAH_BLAH', error: TEST_ERROR }))
      .toEqual(EMPTY_STATE);
  });

  it('initializes with proper value', () => {
    expect(cityStatisticsReducer(undefined, {})).toEqual(EMPTY_STATE);
  });

  it('processes CITY_STATISTICS_REQUEST success path', () => {
    expect(cityStatisticsReducer(
      EMPTY_STATE,
      { type: 'CITY_STATISTICS_REQUEST', cityId: TEST_CITY_ID, statsType: TEST_STATS_TYPE },
    )).toEqual({ pie: { loading: true } });
  });

  it('processes CITY_STATISTICS_RESPONSE_OK success path', () => {
    expect(cityStatisticsReducer(
      EMPTY_STATE,
      { type: 'CITY_STATISTICS_RESPONSE_OK', cityId: TEST_CITY_ID, statsType: 'pie', chart: TEST_CHART },
    )).toEqual({
      pie: {
        chart: {
          datum1: 'data',
        },
        loading: false,
      },
    });
  });

  it('processes CITY_STATISTICS_RESPONSE_ERROR success path', () => {
    expect(cityStatisticsReducer(
      EMPTY_STATE,
      { type: 'CITY_STATISTICS_RESPONSE_ERROR', cityId: 23, statsType: 'slice', error: TEST_ERROR },
    )).toEqual({
      slice: {
        chart: { content: 'error' },
        loading: false,
      },
    });
  });
});
