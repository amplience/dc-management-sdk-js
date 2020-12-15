import { HalResource } from '../hal/models/HalResource';
import { Page } from './Page';

/**
 * Class representing the [EditionSlot](https://amplience.com/docs/api/dynamic-content/management/#tag/Slots) resource.
 * EditionSlots model what content will go into a particular Slot for a specific Edition.
 */
export class EditionSlot extends HalResource {
  /**
   * Id of the slot content item
   */
  public slotId?: string;

  /**
   * JSON body of the slot as it will be when the Edition is published
   */
  public content: any;
}

/**
 * @hidden
 */
export class EditionSlotsPage extends Page<EditionSlot> {
  constructor(data?: unknown) {
    super('edition-slots', EditionSlot, data);
  }
}
