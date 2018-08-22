/**
 * Parameters for paginated requests
 */
export interface Pageable {
  /**
   * Page number to request
   */
  page?: number;

  /**
   * Maximum resources per page to return
   */
  size?: number;
}
