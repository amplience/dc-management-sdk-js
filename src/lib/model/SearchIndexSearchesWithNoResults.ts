import { HalResource } from '../hal/models/HalResource';
import { EmbeddedCollection } from './EmbeddedCollection';

/**
 * Class representing searches with no results for an Algolia Search Index
 */
export class SearchIndexSearchesWithNoResults extends HalResource {
  /**
   * Search term
   */
  public search: string;

  /**
   * The number of hits
   */
  public count: number;

  /**
   * The number of hits with filter
   */
  public withFilterCount: number;
}

/**
 * @hidden
 */
export class SearchIndexSearchesWithNoResultsCollection extends EmbeddedCollection<
  SearchIndexSearchesWithNoResults
> {
  constructor(data?: unknown) {
    super('searches-with-no-results', SearchIndexSearchesWithNoResults, data);
  }
}
