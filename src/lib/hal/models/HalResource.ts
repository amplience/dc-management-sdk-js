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
  // tslint:disable-next-line
  public _links?: Map<string, HalLink>;

  /**
   * @hidden
   */
  // tslint:disable-next-line
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
      return this._embedded[name].map(x =>
        this.client.parse(x, resourceConstructor)
      );
    } else {
      return [];
    }
  }

  /**
   * @hidden
   */
  protected fetchLinkedResource<T extends HalResource>(
    name: string,
    params: any,
    resourceConstructor: HalResourceConstructor<T>
  ): Promise<T> {
    if (!this.client) {
      return Promise.reject(new Error('HalResource has no client'));
    }
    const link = this._links[name];
    if (!link) {
      return Promise.resolve(null);
    }
    return this.client.fetchLinkedResource(link, params, resourceConstructor);
  }

  /**
   * @hidden
   */
  protected createLinkedResource<T extends HalResource>(
    name: string,
    params: any,
    resource: T,
    resourceConstructor: HalResourceConstructor<T>
  ): Promise<T> {
    if (!this.client) {
      return Promise.reject(new Error('HalResource has no client'));
    }
    const link = this._links[name];
    if (!link) {
      return Promise.resolve(null);
    }
    return this.client.createLinkedResource(
      link,
      params,
      resource,
      resourceConstructor
    );
  }

  /**
   * Post to an action endpoint and get a resource response.
   *
   * @hidden
   */
  protected performActionThatReturnsResource<T extends HalResource>(
    namedAction: string,
    params: any,
    data: any,
    resourceConstructor: HalResourceConstructor<T>
  ): Promise<T> {
    if (!this.client) {
      return Promise.reject(new Error('HalResource has no client'));
    }
    const link = this._links[namedAction];
    if (!link) {
      return Promise.resolve(null);
    }
    return this.client.performActionThatReturnsResource(
      link,
      params,
      data,
      resourceConstructor
    );
  }

  protected deleteResource(): Promise<void> {
    if (!this.client) {
      return Promise.reject(new Error('HalResource has no client'));
    }

    // Bug in type script compiler interprets the delete keyword in a string incorrectly and raises type errors
    const namedAction = 'del' + 'ete';
    const link = this._links[namedAction];
    if (!link) {
      return Promise.reject('Resource does not have a delete action');
    }
    return this.client.deleteLinkedResource(link, {});
  }
}
