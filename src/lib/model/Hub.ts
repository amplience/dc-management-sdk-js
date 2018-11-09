import { HalResource } from '../hal/models/HalResource';
import {
  ContentRepositoriesPage,
  ContentRepository
} from './ContentRepository';
import { Event, EventsPage } from './Event';
import { Page } from './Page';
import { Pageable } from './Pageable';
import { Sortable } from './Sortable';
import { Status } from './Status';
import { Webhook, WebhooksPage } from './Webhook';

/**
 * Class representing the [Hub](https://api.amplience.net/v2/content/docs/api/index.html#resources-hubs) resource.
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
   * Resources and actions related to a Hub
   */
  public readonly related = {
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
        )
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
        this.fetchLinkedResource('events', options, EventsPage)
    },
    webhooks: {
      /**
       * Creates a Webhook inside this Hub
       * @param resource
       */
      create: (resource: Webhook): Promise<Webhook> =>
        this.createLinkedResource('create-webhook', {}, resource, Webhook),

      /**
       * Get a webhook inside this hub by its id
       */
      get: (id: string): Promise<Webhook> =>
        this.client.fetchResource(`hubs/${this.id}/webhooks/${id}`, Webhook),

      /**
       * Retrieves a list of Events associated with this Hub
       * @param options Pagination options
       */
      list: (options?: Pageable & Sortable): Promise<Page<Webhook>> =>
        this.fetchLinkedResource('webhooks', options, WebhooksPage)
    }
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
