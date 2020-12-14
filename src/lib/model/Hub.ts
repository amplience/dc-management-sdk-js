import { HalResource } from '../hal/models/HalResource';
import {
  ContentRepositoriesPage,
  ContentRepository,
} from './ContentRepository';
import { ContentType, ContentTypePage } from './ContentType';
import { ContentTypeSchema, ContentTypeSchemaPage } from './ContentTypeSchema';
import { Edition, EditionsPage } from './Edition';
import { Event, EventsPage } from './Event';
import { FindByDate } from './FindByDate';
import { Page } from './Page';
import { Pageable } from './Pageable';
import { SearchIndex, SearchIndexesPage } from './SearchIndex';
import { Sortable } from './Sortable';
import { Status } from './Status';
import { Settings } from './Settings';
import { Webhook, WebhooksPage } from './Webhook';
import { WorkflowState, WorkflowStatesPage } from './WorkflowState';

/**
 * Class representing the [Hub](https://amplience.com/docs/api/dynamic-content/management/#resources-hubs) resource.
 * Hubs are containers for multiple repositories including media, content, content types.
 */
export class Hub extends HalResource {
  /**
   * Unique id generated on creation
   */
  public id?: string;

  /**
   * Globally unique programmatic name for the Hub
   */
  public name?: string;

  /**
   * Friendly display label for the Hub
   */
  public label?: string;

  /**
   * Textual description of the Hub
   */
  public description?: string;

  /**
   * Lifecycle status of the Hub
   */
  public status?: Status;

  /**
   * Id of the user responsible for originally creating the Hub
   */
  public createdBy?: string;

  /**
   * Timestamp representing when the Hub was originally created in ISO 8601 format
   */
  public createdDate?: string;

  /**
   * Id of the user responsible for the last update to the Hub
   */
  public lastModifiedBy?: string;

  /**
   * Timestamp representing when the Hub was last updated in ISO 8601 format
   */
  public lastModifiedDate?: string;

  /**
   * Hub settings
   */
  public settings?: Settings;

  /**
   * Resources and actions related to a Hub
   */
  public readonly related = {
    contentTypeSchema: {
      /**
       * Creates a new Content Type Schema
       * @param resource
       */
      create: (resource: ContentTypeSchema): Promise<ContentTypeSchema> =>
        this.createLinkedResource(
          'create-content-type-schema',
          {},
          resource,
          ContentTypeSchema
        ),

      /**
       * Retrieves a list of Content Type Schemas associated with this Hub
       * @param options Pagination options
       */
      list: (options?: Pageable): Promise<Page<ContentTypeSchema>> =>
        this.fetchLinkedResource(
          'list-content-type-schemas',
          options,
          ContentTypeSchemaPage
        ),
    },

    contentRepositories: {
      /**
       * Retrieves a list of Content Repositories associated with this Hub
       * @param options Pagination options
       */
      list: (options?: Pageable & Sortable): Promise<Page<ContentRepository>> =>
        this.fetchLinkedResource(
          'content-repositories',
          options,
          ContentRepositoriesPage
        ),

      /**
       * Find all the Content Repositories that contain a feature
       * @param options Options
       */
      findByFeature: (
        feature: string,
        options?: Pageable & Sortable
      ): Promise<Page<ContentRepository>> =>
        this.client.fetchLinkedResource(
          {
            href: `hubs/${this.id}/content-repositories/search/findByFeaturesContaining?feature={feature}{&page,size,sort}`,
            templated: true,
          },
          { feature, ...options },
          ContentRepositoriesPage
        ),
    },
    contentTypes: {
      /**
       * Retrieves a list of Content Types associated with this Hub
       * @param options Pagination options
       */
      list: (options?: Pageable & Sortable): Promise<Page<ContentType>> =>
        this.fetchLinkedResource('content-types', options, ContentTypePage),

      /**
       * Register a Content Type on a hub so it can be enabled on a repository
       */
      register: (resource: ContentType): Promise<ContentType> =>
        this.createLinkedResource(
          'register-content-type',
          {},
          resource,
          ContentType
        ),

      /**
       * Get a content type by its id
       */
      get: (id: string): Promise<ContentType> =>
        this.client.fetchResource(`content-types/${id}`, ContentType),
    },

    editions: {
      /**
       * Find editions by date associated with this Hub
       * @param options FindByDate & Pageable & Sortable options
       */
      findByDate: (
        options?: FindByDate & Pageable & Sortable,
        projection?: string
      ): Promise<Page<Edition>> =>
        this.fetchLinkedResource(
          'search-editions',
          { projection, ...options },
          EditionsPage
        ),
    },

    events: {
      /**
       * Creates an Event inside this Hub
       * @param resource
       */
      create: (resource: Event): Promise<Event> =>
        this.createLinkedResource('create-event', {}, resource, Event),

      /**
       * Retrieves a list of Events associated with this Hub
       * @param options Pagination options
       */
      list: (options?: Pageable & Sortable): Promise<Page<Event>> =>
        this.fetchLinkedResource('events', options, EventsPage),
    },

    searchIndexes: {
      /**
       * Create a search index for a given hub
       * @param resource
       */
      create: (resource: SearchIndex): Promise<SearchIndex> =>
        this.createLinkedResource(
          'create-algolia-search-index',
          {},
          resource,
          SearchIndex
        ),

      /**
       * Get a search index by its id
       */
      get: (id: string): Promise<SearchIndex> =>
        this.client.fetchResource(
          `algolia-search/${this.id}/indexes/${id}`,
          SearchIndex
        ),

      /**
       * Retrieves a list of search indexes associated with this Hub
       */
      list: (
        parentId?: string,
        projection?: string,
        options?: Pageable & Sortable
      ): Promise<Page<SearchIndex>> =>
        this.fetchLinkedResource(
          'algolia-search-indexes',
          { parentId, projection, ...options },
          SearchIndexesPage
        ),
    },

    settings: {
      /**
       * Updates this hub settings with the changes in the mutation parameter.
       */
      update: (mutation: Settings): Promise<Settings> =>
        this.updateLinkedResource(
          'update-settings',
          {
            method: 'PATCH',
          },
          mutation,
          Settings
        ),
    },

    webhooks: {
      /**
       * Creates a Webhook inside this Hub
       * @param resource
       */
      create: (resource: Webhook): Promise<Webhook> =>
        this.createLinkedResource('create-webhook', {}, resource, Webhook),

      /**
       * Get a Webhook inside this Hub by its id
       */
      get: (id: string): Promise<Webhook> =>
        this.client.fetchResource(`hubs/${this.id}/webhooks/${id}`, Webhook),

      /**
       * Retrieves a list of Webhooks associated with this Hub
       * @param options Pagination options
       */
      list: (options?: Pageable & Sortable): Promise<Page<Webhook>> =>
        this.fetchLinkedResource('webhooks', options, WebhooksPage),
    },

    workflowStates: {
      /**
       * Creates a Workflow State inside this Hub
       * @param resource
       */
      create: (resource: WorkflowState): Promise<WorkflowState> =>
        this.createLinkedResource(
          'create-workflow-state',
          {},
          resource,
          WorkflowState
        ),

      /**
       * Retrieves a list of Workflow States associated with this Hub
       * @param options Pagination options
       */
      list: (options?: Pageable & Sortable): Promise<Page<WorkflowState>> =>
        this.fetchLinkedResource(
          'workflow-states',
          options,
          WorkflowStatesPage
        ),
    },
  };
}

/**
 * @hidden
 */
export class HubsPage extends Page<Hub> {
  constructor(data?: any) {
    super('hubs', Hub, data);
  }
}
