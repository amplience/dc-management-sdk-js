import { HalResource } from '../hal/models/HalResource';
import { Page } from './Page';
import { Snapshot } from './Snapshot';

/**
 * EditionContent represents the content of an Edition
 */
export class EditionContent extends HalResource {
  /**
   * Create from a snapshot - this is useful for creating a new edition from an existing snapshot
   * @param snapshot
   * @returns
   */
  static fromSnapshot(snapshot: Snapshot): EditionContent {
    // For backwards compatibility reasons, some snapshots may have a single rootContentItem property instead of an array of rootContentItems.
    const rootContentItem =
      snapshot.rootContentItems[0] || snapshot.rootContentItem;
    if (!rootContentItem) {
      throw new Error(
        'Snapshot must have at least one root content item to create an EditionContent'
      );
    }
    const ids = snapshot.rootContentItems.map((item) => item.id) || [
      snapshot.rootContentItem.id,
    ];
    return new EditionContent({
      body: {
        contents: [
          {
            _meta: {
              schema:
                'http://bigcontent.io/cms/schema/v1/core#/definitions/content-link',
              rootContentItemIds: ids,
              locked: false,
            },
            id: snapshot.id,
            contentType: rootContentItem.contentTypeUri,
          },
        ],
      },
    });
  }
  /**
   * The body of the edition content - this is the same format as the body of a snapshot, but with an additional "locked" property in the _meta object to indicate whether the content item is locked for editing or not
   */
  public body?: {
    contents: {
      _meta: {
        schema: string;
        rootContentItemIds: string[];
        locked: boolean;
      };
      id: string;
      contentType: string;
    }[];
  };
}

/**
 * @hidden
 */
export class EditionContentPage extends Page<EditionContent> {
  constructor(data?: any) {
    super('edition-content', EditionContent, data);
  }
}
