import { HalResource } from '../hal/models/HalResource';
import { ContentItem, ContentItemsPage } from './ContentItem';
import { ContentRepository } from './ContentRepository';
import { Page } from './Page';

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
       */
      list: (): Promise<Page<Folder>> =>
        this.client.fetchResource(`folders/${this.id}/folders`, FoldersPage),

      /**
       * Creates a folder beneath the folder
       * @param resource The new Folder to create
       */
      create: (resource: Folder): Promise<Folder> =>
        this.createLinkedResource('create-folder', {}, resource, Folder)
    },

    contentItems: {
      /**
       * Retrieves a list of Content Items stored within this Folder
       */
      list: (): Promise<Page<ContentItem>> =>
        this.fetchLinkedResource('content-items', {}, ContentItemsPage)
    }
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
