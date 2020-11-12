import { HalResource } from '../hal/models/HalResource';
import { ContentItem } from './ContentItem';
import { Hub } from './Hub';
import { SnapshotType } from './SnapshotType';

/**
 * Class representing the [Snapshot](https://api.amplience.net/v2/content/docs/api/index.html#resources-snapshots) resource.
 * A Snapshot is an immutable representation of a content item with all of its descendants (including their versions) at a given point in time.
 */
export class Snapshot extends HalResource {
  /**
   * Unique id generated on creation
   */
  public id?: string;

  /**
   * Textual comment description of the Snapshot
   */
  public comment?: string;

  /**
   * Id of the user responsible for originally creating the Snapshot
   */
  public createdBy?: string;

  /**
   * Timestamp representing when the Snapshot was originally created in ISO 8601 format
   */
  public createdDate?: string;

  /**
   * Snapshot type
   */
  public type?: SnapshotType;

  /**
   * Resources and actions related to a Snapshot
   */
  public readonly related = {
    /**
     * Retrieves the Hub this snapshot is stored in
     */
    hub: (): Promise<Hub> => this.fetchLinkedResource('hub', {}, Hub),

    /**
     * Retrieves the specific version of a content item referenced by the Snapshot
     * @param id Content item id
     */
    snapshotContentItem: (id: string): Promise<ContentItem> =>
      this.client.fetchResource(
        `snapshots/${this.id}/content-items/${id}`,
        ContentItem
      ),
  };
}
