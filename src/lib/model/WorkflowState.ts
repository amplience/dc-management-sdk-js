import { HalResource } from '../hal/models/HalResource';
import { Hub } from './Hub';
import { Page } from './Page';

/**
 * Class representing the [WorkflowState](https://amplience.com/docs/api/dynamic-content/management/#tag/Workflows) resource.
 *
 * It is possible to define a list of workflow states on a hub which will allow users to implement one or more rudimentary workflows. Each content item within the hub can have its status set to one of the workflow states defined within the hub.
 *
 * In the interest of flexibility, the transitions between states are not validated. In other words, it is possible to transition a content item from any state into any other state.
 */
export class WorkflowState extends HalResource {
  /**
   * Unique id generated on creation
   */
  public id?: string;

  /**
   * Friendly display label for the WorkflowState
   */
  public label?: string;

  /**
   * Id of the user responsible for originally creating the Workflow State
   */
  public createdBy?: string;

  /**
   * Timestamp representing when the Workflow State was originally created in ISO 8601 format
   */
  public createdDate?: string;

  /**
   * Id of the user responsible for the last update to the Workflow State
   */
  public lastModifiedBy?: string;

  /**
   * Timestamp representing when the Workflow State was last updated in ISO 8601 format
   */
  public lastModifiedDate?: string;

  /**
   * Assigned colour in the format of `rgb(R,B,G)`
   */
  public 'color': string;
  /**
   * Resources and actions related to a WorkflowState
   */
  public readonly related = {
    /**
     * Retrieves the Hub this webhook is stored in
     */
    hub: (): Promise<Hub> => this.fetchLinkedResource('hub', {}, Hub),

    /**
     * Updates this Workflow State with the changes in the mutation parameter.
     * @param mutation
     */
    update: (mutation: WorkflowState): Promise<WorkflowState> =>
      this.updateResource(mutation, WorkflowState),
  };
}

/**
 * @hidden
 */
export class WorkflowStatesPage extends Page<WorkflowState> {
  constructor(data?: Record<string, unknown>) {
    super('workflow-states', WorkflowState, data);
  }
}
