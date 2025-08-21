import { HalResource } from '../hal/models/HalResource';
import { HierarchyNodeModel, HierarchyNode } from './HierarchyNode';
import { ContentItemPublishingStatus } from './PublishingStatus';
import { ContentItem } from './ContentItem';
import { HalClient } from '../hal/services/HalClient';

export type HierarchyChildrenModelJson = HierarchyNodeModel & {
  /**
   * List of children of this node
   */
  children: Array<HierarchyNodeModel>;
};

export class HierarchyChildren
  extends HalResource
  implements HierarchyChildrenModelJson
{
  public id: string;
  public label: string;
  public parentId: string | undefined;
  public contentTypeUri: string;
  public root: boolean;
  public hasChildren: boolean;
  public repositoryId: string;
  public publishingStatus: ContentItemPublishingStatus | string;
  public children: Array<HierarchyNode>;

  constructor(data: HierarchyNodeModel) {
    super(data);

    this.children = this.children.map((node) => new HierarchyNode(node));
  }

  setClient(client: HalClient): void {
    this.client = client;

    this.children.forEach((child) => {
      child.setClient(client);
    });
  }

  toJson(): HierarchyChildrenModelJson {
    return this.toJSON();
  }

  toJSON(): HierarchyChildrenModelJson {
    return Object.assign(super.toJSON(), {
      children: this.children.map((parent) => parent.toJSON()),
    });
  }

  public related = {
    contentItem: {
      /**
       * Retrieve the content item associated with this node
       */
      get: (): Promise<ContentItem> =>
        this.fetchLinkedResource('content-item', {}, ContentItem),
    },
  };
}
