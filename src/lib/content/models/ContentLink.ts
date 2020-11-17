/**
 * Reference to a Content Item
 */
export interface ContentLinkInstance {
  id: string;
  contentType: string;
}

export interface ContentLinkModel {
  _meta?: {
    schema?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

/**
 * Utility to assist parsing the body of a content item
 */
export class ContentLink {
  public static readonly SCHEMA =
    'http://bigcontent.io/cms/schema/v1/core#/definitions/content-link';

  /**
   * Detects if the provided JSON node is a content link
   * @param json JSON node to test
   * @returns boolean <tt>true</tt> if the json node is a content link, otherwise <tt>false</tt>
   */
  public static isContentLink(json: ContentLinkModel): boolean {
    return json && json._meta && json._meta.schema === ContentLink.SCHEMA;
  }
}
