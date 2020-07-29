import { HalResource } from '../hal/models/HalResource';

/**
 * Class representing an API key for Algolia Search Indexes.
 */
export class SearchIndexKey extends HalResource {
  /**
   * Unique id generated on creation.
   */
  public id?: string;

  /**
   * Type of Search API Key.
   */
  public type?: string;

  /**
   * API key for Algolia Search Indexes.
   */
  public key?: string;

  /**
   * Application ID for Algolia Search Index API key.
   */
  public applicationId?: string;
}
