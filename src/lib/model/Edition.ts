import { HalResource } from '../hal/models/HalResource';
import { EditionSlot, EditionSlotsPage } from './EditionSlot';
import { Event } from './Event';
import { Page } from './Page';
import { PublishingStatus } from './PublishingStatus';

/**
 * Interface representing a projected [Event](https://api.amplience.net/v2/content/docs/api/index.html#resources-events) resource.
 * An Event represents a major date in the calendar, such as Christmas or Black Friday. An Event may span multiple days and start and end at any given UTC time.
 */
interface ProjectedEvent {
  /**
   * Unique id generated on creation
   */
  id?: string;

  /**
   * Friendly name for the event
   */
  name?: string;

  /**
   * Textual comment to describe the event
   */
  comment?: string;

  /**
   * Date when the event should begin in ISO 8601 format
   */
  start?: string;

  /**
   * Date when the event should end in ISO 8601 format
   */
  end?: string;

  /**
   * Hyperlink to a document describing the requirements for the Event
   */
  brief?: string;
}

/**
 * Class representing the [Edition](https://api.amplience.net/v2/content/docs/api/index.html#resources-editions) resource.
 * An Edition is the main way of scheduling content to be published on a specific date.
 * It holds the association between slots and content items. Once all slots are valid and
 * there are no conflicts, it is ready to be scheduled.
 */
export class Edition extends HalResource {
  /**
   * Unique id generated on creation
   */
  public id?: string;

  /**
   * Friendly name for the edition
   */
  public name?: string;

  /**
   * Textual comment to describe the edition
   */
  public comment?: string;

  /**
   * Date when the edition should begin in ISO 8601 format
   */
  public start?: string;

  /**
   * Date when the edition should end in ISO 8601 format
   */
  public end?: string;

  /**
   * Boolean flag indicating if the content should become invalid after the end date.
   * This does not cause the content to become unpublished but instead acts as a flag
   * for your application to decide if the content should be displayed after the end date.
   */
  public activeEndDate?: boolean;

  /**
   * Id of the event the edition is associated with.
   */
  public eventId?: string;

  /**
   * Current publishing status of the edition
   */
  public publishingStatus?: PublishingStatus;

  /**
   * Id of the job responsible for publishing the content in this edition.
   * This will be <tt>undefined</tt> if the edition is in a state
   * where a publish is yet to occur.
   */
  public publishingJobId?: string;

  /**
   * Id of the publish manifest generated when the edition was scheduled.
   * This will be <tt>undefined</tt> if the edition is in a state
   * where a schedule is yet to occur.
   */
  public publishManifestId?: string;

  /**
   * Id of the user responsible for originally creating the edition
   */
  public createdBy?: string;

  /**
   * Timestamp representing when the edition was originally created in ISO 8601 format
   */
  public createdDate?: string;

  /**
   * Id of the user responsible for the last update to the edition
   */
  public lastModifiedBy?: string;

  /**
   * Timestamp representing when the edition was last updated in ISO 8601 format
   */
  public lastModifiedDate?: string;

  /**
   * Projected event
   */
  public event?: ProjectedEvent;

  /**
   * Resources and actions related to an Edition
   */
  public readonly related = {
    /**
     * Archive Edition
     */
    archive: (): Promise<Edition> =>
      this.performActionThatReturnsResource('archive', {}, {}, Edition),

    /**
     * Delete Edition
     */
    delete: (): Promise<void> => this.deleteResource(),

    /**
     * Retrieves the Event associated with this Edition
     */
    event: (): Promise<Event> => this.fetchLinkedResource('event', {}, Event),

    slots: {
      /**
       * Retrieves a list of slots associated with this Edition
       */
      list: (): Promise<Page<EditionSlot>> =>
        this.fetchLinkedResource('list-slots', {}, EditionSlotsPage),
    },

    /**
     * Unschedule Edition
     */
    unschedule: (): Promise<void> => this.deleteLinkedResource('schedule', {}),
  };
}

/**
 * @hidden
 */
export class EditionsPage extends Page<Edition> {
  constructor(data?: any) {
    super('editions', Edition, data);
  }
}
