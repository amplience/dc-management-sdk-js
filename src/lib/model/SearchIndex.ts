import { HalResource } from '../hal/models/HalResource';
import {
  AssignedContentType,
  AssignedContentTypePage
} from './AssignedContentType';
import { Page } from './Page';
import { Pageable } from './Pageable';
import { SearchIndexKey } from './SearchIndexKey';
import { SearchIndexSettings } from './SearchIndexSettings';
import { SearchIndexStatistics } from './SearchIndexStatistics';
import { Sortable } from './Sortable';

/**
 * Class representing an Algolia Search Index.
 */
export class SearchIndex extends HalResource {
  /**
   * Unique id generated on creation.
   */
  public id?: string;

  /**
   * Id of the replicas parent index (only present on replica indexes).
   */
  public parentId?: string;

  /**
   * Number of replica indexes for this index (only present on non-replica indexes).
   */
  public replicaCount?: number;

  /**
   * Generated index name including the hub name and user defined suffix.
   */
  public name?: string;

  /**
   * User defined suffix used to uniquely name the index.
   */
  public suffix?: string;

  /**
   * Friendly display label for index.
   */
  public label?: string;

  /**
   * Type of index.
   */
  public type?: string;

  /**
   * Timestamp representing when the Index was originally created.
   */
  public createdDate?: string;

  /**
   * Timestamp representing when the Index was last updated.
   */
  public lastModifiedDate?: string;

  /**
   * Resources and actions related to a Search Index.
   */
  public readonly related = {
    clear: (): Promise<SearchIndex> =>
      this.performActionThatReturnsResource('clear', {}, {}, SearchIndex),

    delete: (): Promise<void> => this.deleteResource(),

    update: (resource: SearchIndex): Promise<SearchIndex> =>
      this.updateResource(resource, SearchIndex),

    assignedContentTypes: {
      create: (resource: AssignedContentType): Promise<AssignedContentType> =>
        this.createLinkedResource(
          'assigned-content-types',
          {},
          resource,
          AssignedContentType
        ),

      get: (id: string): Promise<AssignedContentType> =>
        this.client.fetchResource(
          // tslint:disable-next-line:no-string-literal
          `${this._links['self'].href}/assigned-content-types/${id}`,
          AssignedContentType
        ),

      list: (
        options?: Pageable & Sortable
      ): Promise<Page<AssignedContentType>> =>
        this.fetchLinkedResource(
          'assigned-content-types',
          { options },
          AssignedContentTypePage
        )
    },

    indexObject: {
      delete: (id: string): Promise<void> =>
        // tslint:disable-next-line:no-string-literal
        this.client.deleteResource(`${this._links['self'].href}/objects/${id}`)
    },

    keys: {
      get: (): Promise<SearchIndexKey> =>
        this.fetchLinkedResource('hub-search-key', {}, SearchIndexKey)
    },

    replicas: {
      list: (
        projection?: string,
        options?: Pageable & Sortable
      ): Promise<Page<SearchIndex>> =>
        this.fetchLinkedResource(
          'list-replicas',
          { projection, options },
          SearchIndexesPage
        )
    },

    settings: {
      get: (): Promise<SearchIndexSettings> =>
        this.fetchLinkedResource('settings', {}, SearchIndexSettings),

      update: (
        resource: SearchIndexSettings,
        forwardToReplicas?: boolean
      ): Promise<SearchIndexSettings> =>
        this.updateLinkedResource(
          'update-settings',
          { forwardToReplicas },
          resource,
          SearchIndexSettings
        )
    },

    stats: {
      get: (period?: string): Promise<SearchIndexStatistics> =>
        this.fetchLinkedResource('stats', { period }, SearchIndexStatistics)
    }
  };
}

/**
 * @hidden
 */
export class SearchIndexesPage extends Page<SearchIndex> {
  constructor(data?: any) {
    super('indexes', SearchIndex, data);
  }
}
