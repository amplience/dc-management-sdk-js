import { HalResource } from '../hal/models/HalResource';
import { LocalizationRoot } from './LocalizationRoot';
import { Page } from './Page';
import { Pageable } from './Pageable';
import { Sortable } from './Sortable';

/**
 * Class representing a LocalizationJob.
 * A Localization Job tracks the status of the process that creates locale-variants of content items.
 */
export class LocalizationJob extends HalResource {
  /**
   * Status for the Job
   */
  public status?: string;

  /**
   * Root content item
   */
  public rootContentItem?: LocalizationRoot;

  /**
   * Id of the user responsible for originally creating the job
   */
  public createdBy?: string;

  /**
   * Timestamp representing when the job was originally created (ISO 8601 format)
   */
  public createdDate?: string;

  public readonly related = {
    /**
     * Retrieves the Localization Job Page
     */
    findByRootContentItem: (
      options?: Pageable & Sortable
    ): Promise<Page<LocalizationJob>> =>
      this.fetchLinkedResource(
        'findByRootContentItem',
        { options },
        LocalizationJobPage
      ),
  };
}

/**
 * @hidden
 */
export class LocalizationJobPage extends Page<LocalizationJob> {
  constructor(data?: any) {
    super('localization-jobs', LocalizationJob, data);
  }
}
