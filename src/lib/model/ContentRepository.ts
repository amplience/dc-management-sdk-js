import { HalResource } from '../hal/models/HalResource';
import { ContentItem } from './ContentItem';
import { Page } from './Page';
import { Status } from './Status';

/**
 * Class representing the [Content Repository](https://api.amplience.net/v2/content/docs/api/index.html#resources-content-repositories) resource.
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
   * Resources and actions related to a Content Repository
   */
  public readonly related = {
    contentItems: {
      /**
       * Creates a content item inside the repository
       * @param resource The new content item to create
       */
      create: (resource: ContentItem): Promise<ContentItem> =>
        this.createLinkedResource(
          'create-content-item',
          {},
          resource,
          ContentItem
        )
    }
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
