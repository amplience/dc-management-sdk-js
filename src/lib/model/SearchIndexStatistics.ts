import { HalResource } from '../hal/models/HalResource';

export interface SearchIndexStatisticsUsage {
  averageResponseTime?: SearchIndexStatisticsUsageMetric;
  numberOfSearches?: SearchIndexStatisticsUsageMetric;
}

export interface SearchIndexStatisticsUsageMetric {
  unit?: string;
  duration?: number;
  value?: number;
}

/**
 * Class representing Statistics for an Algolia Search Index
 */
export class SearchIndexStatistics extends HalResource {
  /**
   * Total number of records within an index.
   */
  public totalRecords?: number;

  /**
   * Total size of records (in bytes).
   */
  public totalRecordSize?: number;

  /**
   * Average size of an index record (in bytes).
   */
  public averageRecordSize?: number;

  /**
   * Usage statistics for an index.
   */
  public usage?: SearchIndexStatisticsUsage;
}
