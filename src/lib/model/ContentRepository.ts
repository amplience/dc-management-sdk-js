import { HalResource } from '../hal/models/HalResource';
import { ContentItem, ContentItemsPage } from './ContentItem';
import { Folder, FoldersPage } from './Folder';
import { Hub } from './Hub';
import { Page } from './Page';
import { Pageable } from './Pageable';
import { Sortable } from './Sortable';
import { Status } from './Status';

/**
 * Represents the association of a content type to a repository
 */
export interface ContentRepositoryContentType {
  /**
   * Id of the content type
   */
  hubContentTypeId?: string;

  /**
   * URI of the content type
   */
  contentTypeUri?: string;
}

/**
 * Class representing the [Content Repository](https://amplience.com/docs/api/dynamic-content/management/#tag/Content-Repositories) resource.
 * Content repositories are containers where content can be stored.
 */
export class ContentRepository extends HalResource {
  /**
   * Unique id generated on creation
   */
  public id?: string;

  /**
   * Programmatic friendly name which must be unique
   * within a single hub
   */
  public name?: string;

  /**
   * Friendly label for the content repository
   */
  public label?: string;

  /**
   * Lifecycle status
   */
  public status?: Status;

  /**
   * List of features enabled on the content repository, e.g. <tt>slots</tt>
   */
  public features?: string[];

  /**
   * Content Types enabled on this repository
   */
  public contentTypes?: ContentRepositoryContentType[];

  /**
   * Set of locales that are assigned to this repository
   */
  public itemLocales?: string[];

  /**
   * Resources and actions related to a Content Repository
   */
  public readonly related = {
    /**
     * Retrieves the Hub this content repository is stored in
     */
    hub: (): Promise<Hub> => this.fetchLinkedResource('hub', {}, Hub),

    folders: {
      /**
       * Retrieves the list of top-level folders within this Content Repository
       */
      list: (options?: Pageable): Promise<Page<Folder>> =>
        this.fetchLinkedResource('folders', options, FoldersPage),

      /**
       * Creates a folder in the Content Repository
       * @param resource The new Folder to create
       */
      create: (resource: Folder): Promise<Folder> =>
        this.createLinkedResource('create-folder', {}, resource, Folder),
    },

    contentItems: {
      /**
       * Creates a content item inside the repository
       * @param resource The new content item to create
       * @param options
       * @param options.ignoreValidation Should items be validated ?
       */
      create: (
        resource: ContentItem,
        params?: { ignoreSchemaValidation?: boolean }
      ): Promise<ContentItem> =>
        this.createLinkedResource(
          'create-content-item',
          { ...params },
          resource,
          ContentItem
        ),

      /**
       * Retrieves a list of Content Items stored within this Content Repository
       */
      list: (options?: Pageable & Sortable): Promise<Page<ContentItem>> =>
        this.fetchLinkedResource('content-items', options, ContentItemsPage),
    },

    contentTypes: {
      /**
       * Assigns a content type to the repository
       */
      assign: (contentTypeId: string): Promise<ContentRepository> =>
        this.performActionThatReturnsResource(
          'assign-content-type',
          {},
          { contentTypeId },
          ContentRepository
        ),

      /**
       * Unassign a content type from this repository
       */
      unassign: (contentTypeId: string): Promise<void> =>
        this.deleteLinkedResource('unassign-content-type', {
          id: contentTypeId,
        }),
    },
  };
}

/**
 * @hidden
 */
export class ContentRepositoriesPage extends Page<ContentRepository> {
  constructor(data?: any) {
    super('content-repositories', ContentRepository, data);
  }
}
