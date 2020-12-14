import { HalResource } from '../hal/models/HalResource';
import { Edition, EditionsPage } from './Edition';
import { Hub } from './Hub';
import { Page } from './Page';
import { Pageable } from './Pageable';
import { Sortable } from './Sortable';

/**
 * Class representing the [Event](https://amplience.com/docs/api/dynamic-content/management/#tag/Events) resource.
 * An Event represents a major date in the calendar, such as Christmas or Black Friday. An Event may span multiple days and start and end at any given UTC time.
 */
export class Event extends HalResource {
  /**
   * Unique id generated on creation
   */
  public id?: string;

  /**
   * Friendly name for the event
   */
  public name?: string;

  /**
   * Textual comment to describe the event
   */
  public comment?: string;

  /**
   * Date when the event should begin in ISO 8601 format
   */
  public start?: string;

  /**
   * Date when the event should end in ISO 8601 format
   */
  public end?: string;

  /**
   * Hyperlink to a document describing the requirements for the Event
   */
  public brief?: string;

  /**
   * Resources and actions related to an Event
   */
  public readonly related = {
    /**
     * Archive Event
     */
    archive: (): Promise<Event> =>
      this.performActionThatReturnsResource('archive', {}, {}, Event),

    /**
     * Delete Event
     */
    delete: (): Promise<void> => this.deleteResource(),

    /**
     * Retrieves the Hub this event is stored in
     */
    hub: (): Promise<Hub> => this.fetchLinkedResource('hub', {}, Hub),

    editions: {
      /**
       * Creates an Edition inside the Event
       * @param resource The new Edition to create
       */
      create: (resource: Edition): Promise<Edition> =>
        this.createLinkedResource('create-edition', {}, resource, Edition),

      /**
       * Retrieves a list of Editions associated with this Event.
       * @param options Pagination options
       */
      list: (options?: Pageable & Sortable): Promise<Page<Edition>> =>
        this.fetchLinkedResource('editions', options, EditionsPage),
    },
  };
}

/**
 * @hidden
 */
export class EventsPage extends Page<Event> {
  constructor(data?: any) {
    super('events', Event, data);
  }
}
