// @flow

/**
 * One item of data for the pie chart.  Ultimately this corresponds to a
 * slice.
 */
export type PieChartDataItem = {

  /** Label for the pie chart slice. */
  +label: string,

  /** Value for the pie chart slice. */
  +value: number,

  /** Color of the pie slice. */
  +color: string,
};

/**
 * All information necessary to represent a pie chart.
 */
export type PieChartData = {

  /** Title of the pie chart. */
  +title: string,

  /** Subtitle of the pie chart. */
  +subTitle: string,

  /** Type of chart (at the moment only pie chart supported) */
  +type: 'pie',

  /** List of data items for the chart. */
  +data: Array<PieChartDataItem>,
};
