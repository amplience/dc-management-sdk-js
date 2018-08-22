/**
 * Pagination Metadata
 */
export interface PageMetadata {
  /**
   * Maximum resources per page
   */
  size?: number;

  /**
   * Total found resources
   */
  totalElements?: number;

  /**
   * Total number of pages
   */
  totalPages?: number;

  /**
   * Page number returned
   */
  number?: number;
}
