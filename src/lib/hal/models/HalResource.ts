import { HttpMethod } from '../../http/HttpRequest';
import { HalClient } from '../services/HalClient';
import { HalLink } from './HalLink';

/**
 * @hidden
 */
export interface HalResourceConstructor<T extends HalResource> {
  new (data?: any): T;
}

/**
 * Base class for all Resources
 */
export class HalResource {
  // eslint-disable-next-line
  public _links?: Map<string, HalLink>;

  /**
   * @hidden
   */
  // eslint-disable-next-line
  protected _embedded: Map<string, any>;

  /**
   * @hidden
   */
  protected client?: HalClient;

  /**
   * Creates a new instance of the resource.
   * If data is provided it will be parsed as if it had
   * come from the remote api.
   * @param data
   */
  constructor(data?: any) {
    if (data) {
      this.parse(data);
    }
  }

  /**
   * Parses the data returned by the API into the model class
   * @hidden
   */
  public parse(data: any): void {
    Object.assign(this, data);
  }

  /**
   * Returns a copy of this resource's attributes excluding links and client references
   */
  public toJSON(): any {
    const result: any = Object.assign({}, this);
    delete result.client;
    delete result._links;
    delete result.related;
    return result;
  }

  /**
   * Returns a copy of this resource's attributes excluding links and client references
   * @deprecated
   */
  public toJson(): any {
    return this.toJSON();
  }

  /**
   * Set automatically by the HalClient when the resource is created.
   * If this is not set the resource will be unable to resolve related
   * resources and actions.
   *
   * @hidden
   */
  public setClient(client: HalClient): void {
    this.client = client;
  }

  /**
   * Converts an _embedded collection into an Array of
   * Resource instances.
   * @hidden
   */
  protected parseEmbedded<T extends HalResource>(
    name: string,
    resourceConstructor: HalResourceConstructor<T>
  ): T[] {
    if (this._embedded[name]) {
      return this._embedded[name].map((x) =>
        this.client.parse(x, resourceConstructor)
      );
    } else {
      return [];
    }
  }

  /**
   * GET a linked resource
   * @hidden
   */
  protected fetchLinkedResource<T extends HalResource>(
    name: string,
    params: any,
    resourceConstructor: HalResourceConstructor<T>
  ): Promise<T> {
    return this.withHalLink(name).then(([link, client]) =>
      client.fetchLinkedResource(link, params, resourceConstructor)
    );
  }

  /**
   * POST / CREATE a new resource
   * @hidden
   */
  protected createLinkedResource<T extends HalResource>(
    name: string,
    params: any,
    resource: T,
    resourceConstructor: HalResourceConstructor<T>
  ): Promise<T> {
    return this.withHalLink(name).then(([link, client]) =>
      client.createLinkedResource(link, params, resource, resourceConstructor)
    );
  }

  /**
   * POST to an action endpoint and get a resource response
   * @hidden
   */
  protected performActionThatReturnsResource<T extends HalResource>(
    name: string,
    params: any,
    data: any,
    resourceConstructor: HalResourceConstructor<T>,
    method:
      | HttpMethod.POST
      | HttpMethod.PATCH
      | HttpMethod.PUT = HttpMethod.POST
  ): Promise<T> {
    return this.withHalLink(name).then(([link, client]) =>
      client.performActionThatReturnsResource(
        link,
        params,
        data,
        resourceConstructor,
        method
      )
    );
  }

  /**
   * POST to an action endpoint with no resource response returned.
   */
  protected performActionWithoutResourceResponse(
    name: string,
    params: any,
    data: any,
    method:
      | HttpMethod.POST
      | HttpMethod.PATCH
      | HttpMethod.PUT = HttpMethod.POST
  ): Promise<void> {
    return this.withHalLink(name).then(([link, client]) =>
      client.performActionWithoutResourceResponse(link, params, data, method)
    );
  }

  /**
   * DELETE the current resource
   * @hidden
   */
  protected deleteResource(): Promise<void> {
    return this.deleteLinkedResource('delete', {});
  }

  /**
   * DELETE a linked resource
   * @hidden
   */
  protected deleteLinkedResource(name: string, params: any): Promise<void> {
    return this.withHalLink(name).then(([link, client]) =>
      client.deleteLinkedResource(link, params)
    );
  }

  /**
   * PATCH the current resource
   * @hidden
   */
  protected updateResource<T extends HalResource>(
    resource: T,
    resourceConstructor: HalResourceConstructor<T>
  ): Promise<T> {
    return this.updateLinkedResource(
      'update',
      {},
      resource,
      resourceConstructor
    );
  }

  /**
   * PATCH a linked resource
   * @hidden
   */
  protected updateLinkedResource<T extends HalResource>(
    name: string,
    params: any,
    resource: T,
    resourceConstructor: HalResourceConstructor<T>
  ): Promise<T> {
    return this.withHalLink(name).then(([link, client]) =>
      client.updateLinkedResource(link, params, resource, resourceConstructor)
    );
  }

  private withHalLink(name: string): Promise<[HalLink, HalClient]> {
    if (!this.client) {
      return Promise.reject(new Error('HalResource has no client'));
    }
    const link = this._links[name];
    if (!link) {
      return Promise.reject(
        `The ${name} action is not available, ensure you have permission to perform this action.`
      );
    }
    return Promise.resolve([link, this.client] as [HalLink, HalClient]);
  }
}
