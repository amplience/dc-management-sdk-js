import { HalResource } from '../hal/models/HalResource';
import { Page } from './Page';

/**
 * Workflow state
 */

export class WorkflowState extends HalResource {
  /**
   * Unique id generated on creation
   */
  public id: string;

  /**
   * RGB color of the workflow state
   */
  public color: string;

  /**
   * Id of the user responsible for originally creating the workflow state
   */
  public createdBy: string;

  /**
   * Timestamp representing when the workflow state was originally created in ISO 8601 format
   */
  public createdDate: string;

  /**
   * Friendly label for the workflow state
   */
  public label: string;

  /**
   * Id of the user responsible for the last update to the workflow state
   */
  public lastModifiedBy: string;

  /**
   * Timestamp representing when the workflow state was last updated in ISO 8601 format
   */
  public lastModifiedDate: string;
  /**
   * Resources and actions related to a Workflow State
   */
  public readonly related = {
    /**
     * Updates this Workflow State with the changes in the mutation parameter.
     */
    update: (mutation: WorkflowState): Promise<WorkflowState> =>
      this.updateResource(mutation, WorkflowState),
  };
}

/**
 * @hidden
 */
export class WorkflowStatesPage extends Page<WorkflowState> {
  constructor(data?: any) {
    super('workflow-states', WorkflowState, data);
  }
}
