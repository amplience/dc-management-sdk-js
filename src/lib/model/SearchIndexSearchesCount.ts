/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { HalResource } from '../hal/models/HalResource';

export interface SearchIndexSearchesCount {
  count: number;
  date: string;
}

/**
 * Class representing searches count for an Algolia Search Index
 */
export class SearchIndexSearchesCount extends HalResource {
  /**
   * The total searches count for an given period
   */
  public count: number;

  /**
   * The user count by date
   */
  public dates: SearchIndexSearchesCount[];
}
