import { ContentItemPublishingStatus } from './PublishingStatus';
import { HalResource } from '../hal/models/HalResource';
import { HierarchyParents } from './HierarchyParents';
import { HierarchyChildren } from './HierarchyChildren';
import { ContentItem } from './ContentItem';

export type HierarchyNodeModel = HierarchyMeta & {
  /**
   * Unique id generated on creation
   */
  id: string;

  /**
   * Friendly label for the content item
   */
  label: string;

  /**
   * Unique id of the repository this content item is saved within
   */
  repositoryId: string;

  /**
   * Schema URI of the content item
   */
  contentTypeUri: string;

  /**
   * Boolean to denote weather the hierarchy node has children
   */
  hasChildren: boolean;

  /**
   * publishing status of the content item
   *
   * NONE - hasn't been published before
   *
   * EARLY - changes have been made since last publish
   *
   * LATEST - no changes have been made since last publish
   */
  publishingStatus: ContentItemPublishingStatus | string;
};

export interface HierarchyMeta {
  /**
   * Unique id of the parent node
   */
  parentId?: string;
  /**
   * Boolean denoting if this is the root of a hierarchy
   */
  root: boolean;
}

export class HierarchyNode extends HalResource implements HierarchyNodeModel {
  public id: string;
  public label: string;
  public parentId?: string;
  public repositoryId: string;
  public contentTypeUri: string;
  public root: boolean;
  public hasChildren: boolean;
  public publishingStatus: ContentItemPublishingStatus | string;

  public related = {
    contentItem: {
      /**
       * Retrieve the content item associated with this node
       */
      get: (): Promise<ContentItem> => {
        return this.fetchLinkedResource('content-item', {}, ContentItem);
      },
    },
    children: {
      /**
       * Retrieve children of the associated node
       */
      get: (): Promise<HierarchyChildren> => {
        return this.fetchLinkedResource(
          'get-hierarchy-children',
          {},
          HierarchyChildren
        );
      },
    },
    parents: {
      /**
       * Retrieve parents of the associated node
       */
      get: (): Promise<HierarchyParents> => {
        return this.fetchLinkedResource(
          'get-hierarchy-parents',
          {},
          HierarchyParents
        );
      },
    },
  };
}
