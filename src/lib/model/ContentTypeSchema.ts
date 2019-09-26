import { HalResource } from '../hal/models/HalResource';
import { Page } from './Page';

export interface ContentTypeCachedSchema {
  $schema: string;
  id: string;

  [key: string]: any;
}

/**
 * Class representing the [Content Type Schema](https://api.amplience.net/v2/content/docs/api/index.html#resources-content-types) resource.
 * Content types are JSON schemas that define a type of content to be created, including its structure, format and validation rules.
 */
export class ContentTypeSchema extends HalResource {
  /**
   * Associated hub id
   */
  public hubId?: string;

  /**
   * URI that describes where to locate the JSON schema definition for this content type
   */
  public contentTypeUri?: string;

  /**
   * Object containing the cached schema content type
   */
  public cachedSchema?: ContentTypeCachedSchema;

  /**
   * Resources and actions related to a ContentType
   */
  public readonly related = {};
}

/**
 * @hidden
 */
export class ContentTypeSchemaPage extends Page<ContentTypeSchema> {
  constructor(data?: any) {
    super('content-type-schema', ContentTypeSchema, data);
  }
}
