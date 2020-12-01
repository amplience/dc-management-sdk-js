import { HalResource } from '../hal/models/HalResource';
import { EmbeddedCollection } from './EmbeddedCollection';

/**
 * Filter details
 */
export class SearchIndexTopFiltersNoResultSearchValue {
  /**
   * The attribute
   */
  public attribute: string;

  /**
   * The operator
   */
  public operator: string;

  /**
   * The value
   */
  public value: string;
}

/**
 * Class representing searches with no results for an Algolia Search Index
 */
export class SearchIndexTopFiltersNoResultSearch extends HalResource {
  /**
   * The number of hits
   */
  public count: number;

  /**
   * The filter values
   */
  public values: SearchIndexTopFiltersNoResultSearchValue[];
}
/**
 * @hidden
 */
export class SearchIndexTopFiltersNoResultSearchCollection extends EmbeddedCollection<
  SearchIndexTopFiltersNoResultSearch
> {
  constructor(data?: any) {
    super(
      'top-filters-no-result-search',
      SearchIndexTopFiltersNoResultSearch,
      data
    );
  }
}
