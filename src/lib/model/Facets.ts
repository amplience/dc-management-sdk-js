import { HalResource } from '../hal/models/HalResource';
import { Page } from './Page';

/**
 * Enum facet
 */
export interface EnumFacet {
  facetAs: 'ENUM';
  field: string;
  name?: string;
  filter?: {
    type: 'IN' | 'EXCLUDES' | 'EQ';
    values: string[];
    includeWithMissingField?: boolean;
  };
}

/**
 * Date facet
 */
export interface DateFacet {
  facetAs: 'DATE';
  field: string;
  name?: string;
  range?: {
    start?: string;
    end?: string;
  };
  filter?: {
    type: 'DATE';
    values: string[];
    includeWithMissingField?: boolean;
  };
}

export type FacetField = EnumFacet | DateFacet;

/**
 * Facet query
 */
export interface FacetQuery {
  /**
   * Return matching entities in the response
   */
  returnEntities: boolean;

  /**
   * Facet fields
   */
  fields: FacetField[];
}

/**
 * Facet count
 */
export interface FacetCount {
  _id: string;
  count: string;
}
/**
 * Facet Result
 */
export abstract class FacetsResponse<T extends HalResource> extends Page<T> {
  /**
   * Facet Metadata
   */
  public _facets?: Record<string, FacetCount[]>;

  /**
   * Facet Metadata
   */
  public getFacets(): Record<string, FacetCount[]> {
    return this._facets;
  }
}
