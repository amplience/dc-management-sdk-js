import { HalResource } from '../hal/models/HalResource';
import { ContentRepository } from './ContentRepository';
import { LocalizationJob } from './LocalizationJob';
import { Page } from './Page';
import { Status } from './Status';

/**
 * Class representing the [Content Item](https://api.amplience.net/v2/content/docs/api/index.html#resources-content-items) resource.
 * Content Items are instances of content created from a content type.
 */
export class ContentItem extends HalResource {
  /**
   * Unique id generated on creation
   */
  public id?: string;

  /**
   * Id of the folder where this content item is placed.
   * This will be <tt>undefined</tt> if the item is in the repository root.
   */
  public folderId?: string;

  /**
   * Content item JSON body. The body must include the content type URL to indicate which content type this
   * item will be created against, e.g.
   *
   * ```json
   * {
   *  "_meta": {
   *    "schema": "https://raw.githubusercontent.com/amplience/dc-content-types/master/text-block.json"
   *  }
   * }
   * ```
   *
   * The body will be validated against the content type
   * and will reject if there are any validation errors.
   */
  public body?: any;

  /**
   * Version number of the content item returned. By default this is
   * the latest version but content items accessed via a snapshot
   * will return the version found in the snapshot.
   */
  public version?: number;

  /**
   * Friendly label for the content item
   */
  public label?: string;

  /**
   * Unique id used by client applications to request the content from the delivery API
   */
  public deliveryId?: string;

  /**
   * Lifecycle status of the content item
   */
  public status?: Status;

  /**
   * Id of the user responsible for originally creating the content item
   */
  public createdBy?: string;

  /**
   * Timestamp representing when the content item was originally created in ISO 8601 format
   */
  public createdDate?: string;

  /**
   * Id of the user responsible for the last update to the content item
   */
  public lastModifiedBy?: string;

  /**
   * Timestamp representing when the content item was last updated in ISO 8601 format
   */
  public lastModifiedDate?: string;

  /**
   * Resources and actions related to a Content Item
   */
  public readonly related = {
    /**
     * Retrieves a specific version of the content item
     * @param version Version number requested
     */
    contentItemVersion: (version: number): Promise<ContentItem> =>
      this.fetchLinkedResource(
        'content-item-version',
        { version },
        ContentItem
      ),

    /**
     * Retrieves the ContentRepository this content item is stored in
     */
    contentRepository: (): Promise<ContentRepository> =>
      this.fetchLinkedResource('content-repository', {}, ContentRepository),

    /**
     * Sets a locale of the form ll-CC (language, country code)
     * @param locale Locale code
     */
    setLocale: (localeDefinition: string): Promise<ContentItem> =>
      this.performActionThatReturnsResource(
        'set-locale',
        {},
        { locale: localeDefinition, version: this.version },
        ContentItem
      ),

    /**
     * Create localizations of the content item
     * @param locales Array of locales to create
     */
    localize: (localesList: string[]): Promise<any> =>
      this.performActionThatReturnsResource(
        'create-localizations',
        {},
        { locales: localesList, version: this.version },
        LocalizationJob
      )
  };
}

/**
 * @hidden
 */
export class ContentItemsPage extends Page<ContentItem> {
  constructor(data?: any) {
    super('content-items', ContentItem, data);
  }
}
