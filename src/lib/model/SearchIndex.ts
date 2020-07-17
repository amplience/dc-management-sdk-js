import { HalResource } from '../hal/models/HalResource';
import { Page } from './Page';
import { SearchIndexKey } from './SearchIndexKey';

export class SearchIndex extends HalResource {
  /**
   * Unique id generated on creation
   */
  public id?: string;

  /**
   * Id of the replicas parent index (only present on replica indexes)
   */
  public parentId?: string;

  /**
   * Number of replica indexes for this index (only present on non-replica indexes)
   */
  public replicaCount?: number;

  /**
   * Generated index name including the hub name and user defined suffix
   */
  public name?: string;

  /**
   * User defined suffix used to uniquely name the index
   */
  public suffix?: string;

  /**
   * Friendly display label for index
   */
  public label?: string;

  /**
   * Type of index
   */
  public type?: string;

  /**
   * Timestamp representing when the Index was originally created
   */
  public createdDate?: string;

  /**
   * Timestamp representing when the Index was last updated
   */
  public lastModifiedDate?: string;

  /**
   * Resources and actions related to a Search Index
   */
  public readonly related = {
    clear: (): Promise<SearchIndex> =>
      this.performActionThatReturnsResource('clear', {}, {}, SearchIndex),

    delete: (): Promise<void> => this.deleteResource(),

    update: (resource: SearchIndex): Promise<SearchIndex> =>
      this.updateResource(resource, SearchIndex),

    keys: {
      get: (): Promise<SearchIndexKey> =>
        this.fetchLinkedResource('hub-search-key', {}, SearchIndexKey)
    },

    settings: {
      // get:
      // update:
    },

    assignedContentTypes: {
      // create:
      // delete:
      // get:
      // list
    },

    stats: {
      // get:
    }
  };
}

/**
 * @hidden
 */
export class SearchIndexesPage extends Page<SearchIndex> {
  constructor(data?: any) {
    super('algolia-search-indexes', SearchIndex, data);
  }
}
