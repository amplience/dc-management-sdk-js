import { HalResource } from '../hal/models/HalResource';

export class PublishingJob extends HalResource {
  public id: string;

  public createdDate?: string;

  public createdBy?: string;

  public state?: string;

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
