import { HalResource } from '../hal/models/HalResource';
import { Snapshot } from './Snapshot';

/**
 * Resource containing the results of a batch snapshot create request.
 */
export class SnapshotResultList extends HalResource {
  /**
   * The Hub ID associated to the Snapshots
   */
  hubId: string;

  /**
   * The result Snapshots
   */
  snapshots: Snapshot[];
}
