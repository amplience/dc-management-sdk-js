import { HalResource } from '../hal/models/HalResource';
import { HttpMethod } from '../http/HttpRequest';
import { Page } from './Page';

/**
 * Class representing the [EditionSlot](https://amplience.com/docs/api/dynamic-content/management/#tag/Slots) resource.
 * EditionSlots model what content will go into a particular Slot for a specific Edition.
 */
export class EditionSlot extends HalResource {
  /**
   * Unique id generated on creation
   */
  public id?: string;

  /**
   * Id of the slot content item
   */
  public slotId?: string;

  /**
   * JSON body of the slot as it will be when the Edition is published
   */
  public content: any;

  /**
   * Whether the slot is empty or not
   */
  public empty?: boolean;

  /**
   * Resources and actions related to a Slot
   */
  public readonly related = {
    /**
     * Updates this slot with new content
     * @param content New content to update with
     */
    content: (content: any, lastModifiedDate?: string): Promise<EditionSlot> =>
      this.performActionThatReturnsResource(
        'safe-update-content',
        { lastModifiedDate },
        content,
        EditionSlot,
        HttpMethod.PUT
      ),
  };
}

/**
 * @hidden
 */
export class EditionSlotsPage extends Page<EditionSlot> {
  constructor(data?: any) {
    super('edition-slots', EditionSlot, data);
  }
}
