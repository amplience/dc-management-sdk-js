import { HalResource } from '../hal/models/HalResource';

/**
 * Class representing a LocalizationRoot.
 * A Localization Job tracks the status of the process that creates locale-variants of content items.
 */
export class LocalizationRoot extends HalResource {
  /**
   * Unique id generated on creation
   */
  public id?: string;

  /**
   * Root content item label
   */
  public label?: string;

  /**
   * Root content item locale
   */
  public locale?: string;
}
