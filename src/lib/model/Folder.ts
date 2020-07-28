import { HalResource } from '../hal/models/HalResource';
import { CURIEs } from '../hal/services/CURIEs';
import { ContentItem, ContentItemsPage } from './ContentItem';
import { ContentRepository } from './ContentRepository';
import { Page } from './Page';
import { Pageable } from './Pageable';
import { Sortable } from './Sortable';

export class Folder extends HalResource {
  public id?: string;

  public name?: string;

  /**
   * Resources and actions related to a Folder
   */
  public readonly related = {
    /**
     * Retrieves the ContentRepository this folder is stored in
     */
    contentRepository: (): Promise<ContentRepository> =>
      this.fetchLinkedResource('content-repository', {}, ContentRepository),

    folders: {
      /**
       * Retrieves the parent folder of this Folder
       */
      parent: (): Promise<Folder> =>
        this.fetchLinkedResource('parent-folder', {}, Folder),

      /**
       * Retrieves the list of sub-folders contained within this Folder
       * @param options Pagination options
       */
      list: (options?: Pageable & Sortable): Promise<Page<Folder>> => {
        const path = CURIEs.expand(
          `folders/${this.id}/folders{?page,size,sort}`,
          options
        );
        return this.client.fetchResource(path, FoldersPage);
      },

      /**
       * Creates a folder beneath the folder
       * @param resource The new Folder to create
       */
      create: (resource: Folder): Promise<Folder> =>
        this.createLinkedResource('create-folder', {}, resource, Folder),
    },

    contentItems: {
      /**
       * Retrieves a list of Content Items stored within this Folder
       * @param options Pagination options
       */
      list: (options?: Pageable & Sortable): Promise<Page<ContentItem>> =>
        this.fetchLinkedResource('content-items', options, ContentItemsPage),
    },
  };
}

/**
 * @hidden
 */
export class FoldersPage extends Page<Folder> {
  constructor(data?: any) {
    super('folders', Folder, data);
  }
}
