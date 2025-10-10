import { HalResource } from '../hal/models/HalResource';
import { Page } from './Page';

export type JobStatus = 'CREATED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';

export type JobEntityType =
  | 'HUB'
  | 'REPOSITORY'
  | 'EVENT'
  | 'EDITION'
  | 'CONTENT_ITEM';

export type JobType = 'DEEP_SYNC_JOB';

export type JobError = {
  entity: {
    entityId: string;
    entityType: JobEntityType;
  };
  errorResponse: {
    Level: string;
    Code:
      | 'FORBIDDEN'
      | 'MAXIMUM_ITEM_ID_COUNT_EXCEEDED'
      | 'DESTINATION_HUB_INVALID'
      | 'CONTENT_ITEM_ID_INVALID'
      | 'DIFFERING_DAM_MEDIA_HUBS'
      | 'NO_MAPPED_REPOSITORIES';
    Message: string;
  };
};

interface iCreateDeepSyncJobRequest {
  label: string;
  ignoreSchemaValidation: boolean;
  destinationHubId: string;
  input: {
    rootContentItemIds: string[];
  };
}

export class CreateDeepSyncJobRequest implements iCreateDeepSyncJobRequest {
  public label: string;
  public ignoreSchemaValidation: boolean;
  public destinationHubId: string;
  public input: {
    rootContentItemIds: string[];
  };
  constructor(params: iCreateDeepSyncJobRequest) {
    Object.assign(this, params);
  }
}
export class CreateDeepSyncJobResponse extends HalResource {
  /**
   * Job ID
   */
  public jobId: string;
}

export class Job extends HalResource {
  /**
   * Job ID
   */
  public id: string;
  /**
   * Job label
   */
  public label: string;
  /**
   * Job status
   */
  public status: JobStatus;
  /**
   * Timestamps of status changes
   */
  public stateChanges: {
    status: JobStatus;
    timestamp: string;
  }[];
  /**
   * Type of job
   */
  public jobType: JobType;
  /**
   * Origin hub ID
   */
  public originHubId: string;
  /**
   * Destination hub ID
   */
  public destinationHubId: string;
  /**
   * Root content item IDs that the job is syncing
   */
  public rootContentItemIDs: string[];
  /**
   * IDs of the hubs associated with this job (origin & destination)
   */
  public associatedHubIds: string[];
  /**
   * User that created the job
   */
  public createdBy: string;
  /**
   * Date the job was created
   */
  public createdDate: string;
  /**
   * Date the job was last modified
   */
  public errors: JobError[];
}

export class JobsPage extends Page<Job> {
  constructor(data?: any) {
    super('jobs', Job, data);
  }
}
