import { HalResource } from '../hal/models/HalResource';
import { Page } from './Page';
import { Webhook } from './Webhook';

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

  /**
   * Resources and actions related to an Assigned Content Type.
   */
  public readonly related = {
    /**
     * Unassigns the content type from the search index.
     */
    unassign: (id: string): Promise<void> =>
      this.deleteLinkedResource('unassign', {
        id,
      }),

    /**
     * Recreates the webhooks for this Assigned Content Type.
     */
    recreateWebhook: (): Promise<void> =>
      this.performActionWithoutResourceResponse('recreate-webhook'),

    /**
     * Gets the primary webhook for this Assigned Content Type.
     */
    webhook: (): Promise<Webhook> =>
      this.fetchLinkedResource('webhook', {}, Webhook),

    /**
     * Gets the active content webhook for this Assigned Content Type.
     */
    activeContentWebhook: (): Promise<Webhook> =>
      this.fetchLinkedResource('active-content-webhook', {}, Webhook),

    /**
     * Gets the archived content webhook for this Assigned Content Type.
     */
    archivedContentWebhook: (): Promise<Webhook> =>
      this.fetchLinkedResource('archived-content-webhook', {}, Webhook),
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
