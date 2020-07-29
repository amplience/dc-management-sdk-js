import { HalLink } from '../models/HalLink';
import { CURIEs } from '../services/CURIEs';

/**
 * @hidden
 */
export interface HalLiteral {
  _links: {
    [name: string]: HalLink;
  };
}

/**
 * @hidden
 */
export class HalMockResource {
  private resource: HalLiteral;
  private mocks: HalMocks;

  constructor(resource: HalLiteral, mocks: HalMocks) {
    this.resource = resource;
    this.mocks = mocks;
  }

  public nestedResource(
    linkName: string,
    args: any,
    resource: HalLiteral
  ): this {
    const link = this.resource._links[linkName];
    const href = CURIEs.expand(link.href, args);
    this.mocks.resource(resource, href);
    return this;
  }

  public nestedCollection(
    linkName: string,
    args: any,
    type: string,
    values: HalLiteral[]
  ): this {
    const link = this.resource._links[linkName];
    const href = CURIEs.expand(link.href, args);
    this.mocks.collection(href, type, values);
    return this;
  }

  public nestedCreateResource(
    linkName: string,
    args: any,
    resource: HalLiteral
  ): this {
    const link = this.resource._links[linkName];
    const href = CURIEs.expand(link.href, args);
    this.mocks.createResource(href, resource);
    return this;
  }

  public nestedUpdateResource(
    linkName: string,
    args: any,
    resource: HalLiteral
  ): this {
    const link = this.resource._links[linkName];
    const href = CURIEs.expand(link.href, args);
    this.mocks.updateResource(href, resource);
    return this;
  }

  public nestedDelete(linkName: string, args: any): this {
    const link = this.resource._links[linkName];
    const href = CURIEs.expand(link.href, args);
    this.mocks.deleteResource(href);
    return this;
  }
}

/**
 * @hidden
 */
export class HalMocks {
  public mockInstance;

  constructor(mockInstance) {
    this.mockInstance = mockInstance;
  }

  public resource(resource: HalLiteral, url?: string): HalMockResource {
    if (!url) {
      url = resource._links.self.href;
    }
    this.mockInstance.onGet(url).reply(200, resource);

    if (resource._links.delete) {
      this.mockInstance.onDelete(resource._links.delete.href).reply(204);
    }

    return new HalMockResource(resource, this);
  }

  public collection(url: string, type: string, values: HalLiteral[]): void {
    this.mockInstance.onGet(url).reply(200, {
      _embedded: {
        [type]: values,
      },
    });
  }

  public createResource(url: string, resource: HalLiteral): HalMockResource {
    this.mockInstance.onPost(url).reply(200, resource);
    return new HalMockResource(resource, this);
  }

  public updateResource(url: string, resource: HalLiteral): HalMockResource {
    this.mockInstance.onPatch(url).reply(200, resource);
    return new HalMockResource(resource, this);
  }

  public deleteResource(url: string): void {
    this.mockInstance.onDelete(url).reply(200);
  }

  public postResource(url: string): void {
    this.mockInstance.onPost(url).reply(204);
  }
}
