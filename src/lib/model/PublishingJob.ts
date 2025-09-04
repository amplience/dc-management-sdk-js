import { HalResource } from '../hal/models/HalResource';
import { PublishingJobStatus } from './PublishingJobStatus';

/**
 * Class representing the [Publishing Jobs](https://amplience.com/developers/docs/apis/content-management-reference/#tag/Publishing-Jobs) resource.
 * A publishing job can be retrieved by id and also cancelled by id.
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
  public state: PublishingJobStatus;

  /**
   * Publish error status (only present if state=FAILED)
   */
  public publishErrorStatus?: string;

  public readonly related = {
    /**
     * Cancel the publishing job.
     */
    cancel: (): Promise<PublishingJob> =>
      this.updateLinkedResource(
        'cancel',
        {},
        new PublishingJob({ state: PublishingJobStatus.CANCELLED }),
        PublishingJob
      ),
  };
}
