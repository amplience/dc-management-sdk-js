import { HalResource } from '../hal/models/HalResource';
import { LocalizationJobContentRoot } from './LocalizationJobContentRoot';

/**
 * Class representing a LocalizationJob.
 * A Localization Job tracks the status of the process that creates locale-variants of content items.
 */
export class LocalizationJob extends HalResource {
  /**
   * Status for the Job
   */
  public status?: string;

  public rootContentItem?: LocalizationJobContentRoot;

  /**
   * Id of the user responsible for originally creating the job
   */
  public createdBy?: string;

  /**
   * Timestamp representing when the job was originally created (ISO 8601 format)
   */
  public createdDate?: string;

}