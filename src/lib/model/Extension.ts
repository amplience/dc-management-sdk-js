import { HalResource } from '../hal/models/HalResource';
import { Hub } from './Hub';
import { Page } from './Page';
import { Status } from './Status';

/**
 * Extension snippet
 */
export interface ExtensionSnippet {
  /**
   * User friendly name of the snippet
   */
  label?: string;

  /**
   * JSON body of the snippet
   */
  body?: string;
}

/**
 * Class representing the [Extension](https://amplience.com/docs/api/dynamic-content/management/#tag/Extensions) resource.
 */
export class Extension extends HalResource {
  /**
   * Id of the extension
   */
  public id?: string;

  /**
   * Id of the associated hub
   */
  public hubId?: string;

  /**
   * System name of the extension
   */
  public name: string;

  /**
   * User friendly name of the extension
   */
  public label: string;

  /**
   * Description for the extension
   */
  public description?: string;

  /**
   * Base url for the extension
   */
  public url: string;

  /**
   * Height of the extension
   */
  public height?: number;

  /**
   * Category of the extension
   */
  public category: 'CONTENT_FIELD' | 'DASHBOARD';

  /**
   * JSON config parameters of the extension
   */
  public parameters?: string;

  /**
   * Array of snippets
   */
  public snippets?: ExtensionSnippet[];

  /**
   * Settings of the extension, as a JSON string
   */
  public settings?: string;

  /**
   * Status of the extension
   */
  public status: Status;

  /**
   * User who created the Extension
   */
  public createdBy: string;

  /**
   * Created date of the extension
   */
  public createdDate: string;

  /**
   * User who last changed the Extension
   */
  public lastModifiedBy: string;

  /**
   * Last modified date of the extension
   */
  public lastModifiedDate: string;

  /**
   * Resources and actions related to an Extension
   */
  public readonly related = {
    /**
     * Updates this extension with the changes in the mutation parameter.
     */
    update: (mutation: Extension): Promise<Extension> =>
      this.updateResource(mutation, Extension),

    /**
     * Retrieves the Hub this extension is stored in
     */
    hub: (): Promise<Hub> => this.fetchLinkedResource('hub', {}, Hub),

    /**
     * Deletes this extension.
     */
    delete: (): Promise<void> => this.deleteResource(),
  };
}

/**
 * @hidden
 */
export class ExtensionsPage extends Page<Extension> {
  constructor(data?: any) {
    super('extensions', Extension, data);
  }
}
