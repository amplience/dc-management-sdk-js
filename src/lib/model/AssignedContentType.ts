import { HalResource } from '../hal/models/HalResource';
import { Page } from './Page';

/**
 * Class representing an Assigned Content Type for an Algolia Search Index.
 */
export class AssignedContentType extends HalResource {
  /**
   * Unique id generated on creation.
   */
  public id?: string;

  /**
   * URI that describes where to locate the JSON schema definition for this content type.
   */
  public contentTypeUri?: string;

  /**
   * Timestamp representing when the Index was originally created.
   */
  public createdDate?: string;

  /**
   *  Timestamp representing when the Assigned Content Type was last updated.
   */
  public lastModifiedDate?: string;

  public readonly related = {
    unassign: (id: string): Promise<void> =>
      this.deleteLinkedResource('unassign', {
        id
      }),

    recreateWebhook: (): Promise<void> =>
      this.performActionWithoutResourceResponse('recreate-webhook')
  };
}

/**
 * @hidden
 */
export class AssignedContentTypePage extends Page<AssignedContentType> {
  constructor(data?: any) {
    super('assigned-content-types', AssignedContentType, data);
  }
}
