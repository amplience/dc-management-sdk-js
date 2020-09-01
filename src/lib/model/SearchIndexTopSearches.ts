import { HalResource } from '../hal/models/HalResource';
import { EmbeddedCollection } from './EmbeddedCollection';

export enum SearchesOrderBy {
  SEARCH_COUNT = 'searchCount',
  CLICK_THROUGH_RATE = 'clickThroughRate',
  CONVERSION_RATE = 'conversionRate',
  AVERAGE_CLICK_POSITION = 'averageClickPosition',
}

/**
 * Class representing search analytics for an Algolia Search Index
 */
export class SearchIndexTopSearches extends HalResource {
  /**
   * The queried search term
   */
  public search: string;

  /**
   * The number of impressions
   */
  public count: number;

  /**
   * Number of returned results
   */
  public nbHits: number;

  /**
   * Click through rate
   */
  public clickThroughRate?: number | null;

  /**
   * Conversion rate
   */
  public conversionRate?: number | null;

  /**
   * Average position in the results set when clicked
   */
  public averageClickPosition?: number | null;

  /**
   * Number of searches used for click analytics
   */
  public trackedSearchCount?: number;

  /**
   * Number of clicks
   */
  public clickCount?: number;

  /**
   * Number of conversions
   */
  public conversionCount?: number;
}

/**
 * @hidden
 */
export class SearchIndexTopSearchesCollection extends EmbeddedCollection<
  SearchIndexTopSearches
> {
  constructor(data?: any) {
    super('top-searches', SearchIndexTopSearches, data);
  }
}
