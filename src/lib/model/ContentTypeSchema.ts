import { HalResource } from '../hal/models/HalResource';
import { Page } from './Page';

/**
 * Supported validation levels
 */
export enum ValidationLevel {
  SLOT = 'SLOT',
  CONTENT_TYPE = 'CONTENT_TYPE',
  PARTIAL = 'PARTIAL',
}

/**
 * Content type schema
 */
export class ContentTypeSchema extends HalResource {
  /**
   * Unique id generated on creation
   */
  public id?: string;

  /**
   * Content Type Schema
   */
  public body?: string;

  /**
   * Schema ID (URI)
   */
  public schemaId?: string;

  /**
   * Version number of the content type schema returned.
   * This number will automatically be incremented for each update.
   */
  public version?: number;

  /**
   * Validation level for this content type schema
   */
  public validationLevel?: ValidationLevel;

  /**
   * Id of the user responsible for originally creating the content item
   */
  public createdBy?: string;

  /**
   * Timestamp representing when the content item was originally created in ISO 8601 format
   */
  public createdDate?: string;

  /**
   * Id of the user responsible for the last update to the content item
   */
  public lastModifiedBy?: string;

  /**
   * Timestamp representing when the content item was last updated in ISO 8601 format
   */
  public lastModifiedDate?: string;

  /**
   * Resources and actions related to a ContentTypeSchema
   */
  public readonly related = {
    /**
     * Updated content type schema
     * @param updated
     */
    update: (mutation: ContentTypeSchema): Promise<ContentTypeSchema> =>
      this.updateResource(mutation, ContentTypeSchema),
  };
}

/**
 * @hidden
 */
export class ContentTypeSchemaPage extends Page<ContentTypeSchema> {
  constructor(data?: any) {
    super('content-type-schemas', ContentTypeSchema, data);
  }
}
