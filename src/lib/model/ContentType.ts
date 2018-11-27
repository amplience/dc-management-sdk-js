import { HalResource } from '../hal/models/HalResource';
import { Page } from './Page';

export interface ContentTypeIcon {
  /**
   * Pixel size of the icon
   */
  size?: number;

  /**
   * URL address of the icon file
   */
  url?: string;
}

/**
 * Visualizations are externally hosted applications which can provide a preview of the content type.
 */
export interface ContentTypeVisualization {
  /**
   * Friendly name for the visualization
   */
  label?: string;

  /**
   * Templated URL of the externally hosted application.
   */
  templatedUri?: string;

  /**
   * Indicates if this is the default visualization for the content type
   */
  default?: boolean;
}

export interface ContentTypeSettings {
  /**
   * Friendly name for the content type
   */
  label?: string;

  /**
   * Icons for the content type
   */
  icons?: ContentTypeIcon[];

  /**
   * Visualizations used to provide high quality preview of the content type
   */
  visualizations?: ContentTypeVisualization[];
}

/**
 * Class representing the [Content Type](https://api.amplience.net/v2/content/docs/api/index.html#resources-content-types) resource.
 * Content types are JSON schemas that define a type of content to be created, including its structure, format and validation rules.
 */
export class ContentType extends HalResource {
  /**
   * Unique id generated on creation
   */
  public id?: string;

  /**
   * URI that describes where to locate the JSON schema definition for this content type
   */
  public contentTypeUri?: string;

  /**
   * Object containing display settings for the content type
   */
  public settings?: ContentTypeSettings;

  /**
   * Resources and actions related to a ContentType
   */
  public readonly related = {};
}

/**
 * @hidden
 */
export class ContentTypePage extends Page<ContentType> {
  constructor(data?: any) {
    super('content-types', ContentType, data);
  }
}
