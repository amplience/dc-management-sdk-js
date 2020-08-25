import { HalResource } from '../hal/models/HalResource';

export interface SearchIndexUsersDateCount {
  count: number;
  date: string;
}

/**
 * Class representing users count for an Search Index
 */
export class SearchIndexUsersCount extends HalResource {
  /**
   * The total user count for an index
   */
  public count: number;

  /**
   * The user count by date
   */
  public dates: SearchIndexUsersDateCount[];
}
