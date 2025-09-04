import { HalResource } from '../hal/models/HalResource';
import { PublishingJob } from './PublishingJob';

/**
 * Class representing the Publishing Job Location resource.
 */
export class PublishingJobLocation extends HalResource {
  /**
   * Location of the publishing job
   */
  public location: string;

  public readonly related = {
    /**
     * Returns the publishing job
     */
    publishingJob: (): Promise<PublishingJob> => {
      return this.client.fetchResource(
        `/publishing-jobs/${this.location.split('/').pop()}`,
        PublishingJob
      );
    },
  };
}
