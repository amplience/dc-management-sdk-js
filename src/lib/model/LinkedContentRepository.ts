import { HalResource } from '../hal/models/HalResource';
import { Page } from './Page';

export class LinkedContentRepository extends HalResource {
  /**
   * Origin hub ID
   */
  public originHubId: string;
  /**
   * IDs of the hubs involved in this mapping (origin & destination)
   */
  public hubIds: string[];
  /**
   * The label of the origin hub
   */
  public originHubLabel?: string;
  /**
   * The label of the destination hub
   */
  public destinationHubLabel?: string;
  /**
   * Is the mapping bidirectional?
   */
  public bidirectional: boolean;
  /**
   * How the repositories in the origin hub map to the repositiories in the destinatoin hub
   */
  public relationships: {
    /**
     * ID of the origin repository
     */
    originRepositoryId: string;
    /**
     * Label of the origin repository
     */
    originRepositoryLabel?: string;
    /**
     * ID of the destination repository
     */
    dstRepositoryId: string;
    /**
     * Label of the destination repository
     */
    dstRepositoryLabel?: string;
  }[];
}

/**
 * @hidden
 */
export class LinkedContentRepositoriesPage extends Page<LinkedContentRepository> {
  constructor(data?: any) {
    super('linked-content-repositories', LinkedContentRepository, data);
  }
}
