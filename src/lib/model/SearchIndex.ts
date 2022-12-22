import { HalResource } from '../hal/models/HalResource';
import {
  AssignedContentType,
  AssignedContentTypePage,
} from './AssignedContentType';
import { Page } from './Page';
import { Pageable } from './Pageable';
import { SearchIndexKey } from './SearchIndexKey';
import { SearchIndexSettings } from './SearchIndexSettings';
import { SearchIndexStatistics } from './SearchIndexStatistics';
import { SearchIndexTopHitsCollection } from './SearchIndexTopHits';
import {
  SearchesOrderBy,
  SearchIndexTopSearchesCollection,
} from './SearchIndexTopSearches';
import { Sortable } from './Sortable';
import { SearchIndexSearchesWithNoResultsCollection } from './SearchIndexSearchesWithNoResults';
import { SearchIndexTopFiltersNoResultSearchCollection } from './SearchIndexTopFiltersNoResultSearch';
import { SearchIndexUsersCount } from './SearchIndexUsersCount';
import { SearchIndexSearchesCount } from './SearchIndexSearchesCount';
import { SearchIndexNoResultsRate } from './SearchIndexNoResultsRate';
import { Hub } from './Hub';
import { retry, RetryOptions } from '../utils/Retryer';
import isEqual from '../utils/isEqual';

export const SEARCH_INDEX_RETRY_OPTIONS: RetryOptions = {
  timeout: 3 * 60 * 1000,
};

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
    /**
     * Retrieves the Hub this search index is stored in
     */
    hub: (): Promise<Hub> => this.fetchLinkedResource('hub', {}, Hub),

    clear: (): Promise<SearchIndex> =>
      this.performActionThatReturnsResource('clear', {}, {}, SearchIndex),

    delete: (): Promise<void> => this.deleteResource(),

    update: (resource: SearchIndex): Promise<SearchIndex> =>
      this.updateResource(resource, SearchIndex),

    assignedContentTypes: {
      create: (resource: AssignedContentType): Promise<AssignedContentType> =>
        this.createLinkedResource(
          'create-assigned-content-types',
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
        ),
    },

    indexObject: {
      delete: (id: string): Promise<void> =>
        // tslint:disable-next-line:no-string-literal
        this.client.deleteResource(`${this._links['self'].href}/objects/${id}`),
    },

    keys: {
      get: (): Promise<SearchIndexKey> =>
        this.fetchLinkedResource('hub-search-key', {}, SearchIndexKey),
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
        ),
    },

    settings: {
      get: (): Promise<SearchIndexSettings> =>
        retry(
          () => this.fetchLinkedResource('settings', {}, SearchIndexSettings),
          SEARCH_INDEX_RETRY_OPTIONS
        ),

      update: async (
        resource: SearchIndexSettings,
        forwardToReplicas?: boolean,
        options?: { waitUntilApplied: boolean }
      ): Promise<SearchIndexSettings> => {
        const updatedResource = await this.updateLinkedResource(
          'update-settings',
          { forwardToReplicas },
          resource,
          SearchIndexSettings
        );
        if (!options || !options.waitUntilApplied) {
          return updatedResource;
        }
        const checkForUpdate = async () => {
          const savedSettings = (
            await this.fetchLinkedResource('settings', {}, SearchIndexSettings)
          ).toJSON();
          const areTheSame =
            Object.entries(resource.toJSON()).findIndex(
              (entry) => !isEqual(savedSettings[entry[0]], entry[1])
            ) === -1;
          if (!areTheSame) {
            throw new Error('Settings are not the same');
          }
          return updatedResource;
        };
        return retry(checkForUpdate, SEARCH_INDEX_RETRY_OPTIONS);
      },
    },

    stats: {
      get: (period?: string): Promise<SearchIndexStatistics> =>
        this.fetchLinkedResource('stats', { period }, SearchIndexStatistics),
    },

    'top-searches': {
      get: ({
        clickAnalytics = false,
        orderBy,
        direction,
        startDate,
        endDate,
        limit,
        offset,
        tags,
        includeReplicas,
      }: {
        clickAnalytics?: boolean;
        orderBy?: SearchesOrderBy;
        direction?: 'asc' | 'desc';
        startDate?: string;
        endDate?: string;
        limit?: number;
        offset?: number;
        tags?: string;
        includeReplicas?: boolean;
      }): Promise<SearchIndexTopSearchesCollection> =>
        this.fetchLinkedResource(
          'top-searches',
          {
            clickAnalytics,
            direction,
            endDate,
            limit,
            offset,
            orderBy,
            startDate,
            tags,
            includeReplicas,
          },
          SearchIndexTopSearchesCollection
        ),
    },

    'top-hits': {
      get: ({
        search,
        startDate,
        endDate,
        limit,
        offset,
        tags,
        includeReplicas,
      }: {
        search?: string;
        startDate?: string;
        endDate?: string;
        limit?: number;
        offset?: number;
        tags?: string;
        includeReplicas?: boolean;
      }): Promise<SearchIndexTopHitsCollection> =>
        this.fetchLinkedResource(
          'top-hits',
          {
            endDate,
            limit,
            offset,
            search,
            startDate,
            tags,
            includeReplicas,
          },
          SearchIndexTopHitsCollection
        ),
    },

    'searches-with-no-results': {
      get: ({
        startDate,
        endDate,
        limit,
        offset,
        tags,
        includeReplicas,
      }: {
        startDate?: string;
        endDate?: string;
        limit?: number;
        offset?: number;
        tags?: string;
        includeReplicas?: boolean;
      }): Promise<SearchIndexSearchesWithNoResultsCollection> =>
        this.fetchLinkedResource(
          'searches-with-no-results',
          {
            endDate,
            limit,
            offset,
            startDate,
            tags,
            includeReplicas,
          },
          SearchIndexSearchesWithNoResultsCollection
        ),
    },
    'top-filters-no-result-search': {
      get: ({
        search,
        startDate,
        endDate,
        limit,
        offset,
        tags,
        includeReplicas,
      }: {
        search: string;
        startDate?: string;
        endDate?: string;
        limit?: number;
        offset?: number;
        tags?: string;
        includeReplicas?: boolean;
      }): Promise<SearchIndexTopFiltersNoResultSearchCollection> =>
        this.fetchLinkedResource(
          'top-filters-no-result-search',
          {
            endDate,
            limit,
            offset,
            search,
            startDate,
            tags,
            includeReplicas,
          },
          SearchIndexTopFiltersNoResultSearchCollection
        ),
    },
    'users-count': {
      get: ({
        startDate,
        endDate,
        tags,
        includeReplicas,
      }: {
        startDate?: string;
        endDate?: string;
        tags?: string;
        includeReplicas?: boolean;
      }): Promise<SearchIndexUsersCount> =>
        this.fetchLinkedResource(
          'users-count',
          {
            startDate,
            endDate,
            tags,
            includeReplicas,
          },
          SearchIndexUsersCount
        ),
    },
    'searches-count': {
      get: ({
        startDate,
        endDate,
        tags,
        includeReplicas,
      }: {
        startDate?: string;
        endDate?: string;
        tags?: string;
        includeReplicas?: boolean;
      }): Promise<SearchIndexSearchesCount> =>
        this.fetchLinkedResource(
          'searches-count',
          {
            startDate,
            endDate,
            tags,
            includeReplicas,
          },
          SearchIndexSearchesCount
        ),
    },
    'no-results-rate': {
      get: ({
        startDate,
        endDate,
        tags,
        includeReplicas,
      }: {
        startDate?: string;
        endDate?: string;
        tags?: string;
        includeReplicas?: boolean;
      }): Promise<SearchIndexNoResultsRate> =>
        this.fetchLinkedResource(
          'no-results-rate',
          {
            startDate,
            endDate,
            tags,
            includeReplicas,
          },
          SearchIndexNoResultsRate
        ),
    },
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
