import { HalResource } from '../hal/models/HalResource';
import { EmbeddedCollection } from './EmbeddedCollection';

/**
 * Class representing top hits  for an Algolia Search Index
 */
export class SearchIndexTopHits extends HalResource {
  /**
   * Record ObjectID that matched the search
   */
  public hit: string;

  /**
   * The number of hits
   */
  public count: number;
}

/**
 * @hidden
 */
export class SearchIndexTopHitsCollection extends EmbeddedCollection<
  SearchIndexTopHits
> {
  constructor(data?: unknown) {
    super('top-hits', SearchIndexTopHits, data);
  }
}
