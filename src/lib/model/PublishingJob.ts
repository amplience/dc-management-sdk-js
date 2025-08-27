import { HalResource } from '../hal/models/HalResource';

/**
 * Class representing the [Publishing Jobs](https://amplience.com/developers/docs/apis/content-management-reference/#tag/Publishing-Jobs) resource.
 */
export class PublishingJob extends HalResource {
  /**
   * ID of the publishing job
   */
  public id: string;

  /**
   * Timestamp representing when the Publishing Job was created
   */
  public createdDate: string;

  /**
   * User who created the Publishing Job
   */
  public createdBy: string;

  /**
   * State of Publishing Job
   */
  public state: string;

  /**
   * Publish error status (only present if state=FAILED)
   */
  public publishErrorStatus?: string;

  public readonly related = {
    /**
     * Updates this PublishingJob with the changes in the mutation parameter.
     * @param mutation Mutated publishingjob
     */
    cancel: (mutation: PublishingJob): Promise<PublishingJob> =>
      this.updateLinkedResource('cancel', {}, mutation, PublishingJob),
  };
}
