import { HalResource } from '../hal/models/HalResource';

export interface SearchIndexNoResultsRate {
  date: string;
  rate: number;
  count: number;
  noResultRate: number;
}

/**
 * Class representing the no results rate for searches in an Algolia Search Index
 */
export class SearchIndexNoResultsRate extends HalResource {
  /**
   * The rate of no results for a given period
   */
  public rate: number;
  /**
   * The total searches count for a given period
   */
  public count: number;
  /**
   * The total count of no result searches for a given period
   */
  public noResultCount: number;

  /**
   * The no results rate by date
   */
  public dates: SearchIndexNoResultsRate[];
}
