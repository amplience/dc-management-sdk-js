/**
 * Parameters for find by date requests
 */
export interface FindByDate {
  /**
   * Range start
   */
  rangeStart?: string;

  /**
   * Range end
   */
  rangeEnd?: string;

  /**
   * Bounded range
   */
  bounded?: boolean;
}
