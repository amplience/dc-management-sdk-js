import { HalResource } from '../hal/models/HalResource';

/**
 * Class representing a LocalizationJob.
 * A Localization Job tracks the status of the process that creates locale-variants of content items.
 */
export class LocalizationJobContentRoot extends HalResource {
  /**
   * Unique id generated on creation
   */
  public id?: string;

  public label?: string;

  public locale?: string;
  
}
