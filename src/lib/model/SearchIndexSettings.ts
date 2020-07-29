import { HalResource } from '../hal/models/HalResource';

/**
 * Class representing settings for an Algolia Search Index.
 */
export class SearchIndexSettings extends HalResource {
  /**
   * Algolia Search Settings
   */
  [key: string]: any;
}
