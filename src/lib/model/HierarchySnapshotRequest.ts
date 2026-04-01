import { HalResource } from '../hal/models/HalResource';
import { SnapshotType } from './SnapshotType';

/**
 * Class representing the request body for creating a snapshot of a content hierarchy.
 */
export class HierarchySnapshotRequest extends HalResource {
  /**
   * hierarchyNodeIds is the list of content item ids that will be snapshotted.
   */
  public hierarchyNodeIds: string[];
  /**
   * Include all descendant content items of the specified hierarchyNodeIds in the snapshot when set to true. Otherwise, only the specified content items will be included in the snapshot.
   */
  public getDescendants: boolean;
  /**
   * Snapshot type to create. See SnapshotType for more details on the different snapshot types available.
   */
  public type: SnapshotType;
  /**
   * Comment to be associated with the snapshot.
   */
  public comment: string;
}
