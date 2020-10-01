import { HalResource } from '../hal/models/HalResource';
import { HierarchyNodeModel, HierarchyNode } from './HierarchyNode';
import { ContentItemPublishingStatus } from './PublishingStatus';
import { ContentItem } from './ContentItem';
import { HalClient } from '../hal/services/HalClient';

export type HierarchyParentModelJson = HierarchyNodeModel & {
  /**
   * List of parents of this node
   */
  parents: Array<HierarchyNodeModel>;
};

export class HierarchyParents extends HalResource
  implements HierarchyNodeModel {
  public id: string;
  public label: string;
  public parentId: string | undefined;
  public contentTypeUri: string;
  public root: boolean;
  public hasChildren: boolean;
  public repositoryId: string;
  public parents: Array<HierarchyNode>;
  public publishingStatus: ContentItemPublishingStatus | string;

  constructor(data: any) {
    super(data);

    this.parents = this.parents.map((node) => {
      return new HierarchyNode(node);
    });
  }

  setClient(client: HalClient): void {
    this.client = client;

    this.parents.forEach((parent) => {
      parent.setClient(client);
    });
  }

  toJson(): HierarchyParentModelJson {
    return this.toJSON();
  }

  toJSON(): HierarchyParentModelJson {
    return Object.assign(super.toJSON(), {
      parents: this.parents.map((parent) => parent.toJSON()),
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
