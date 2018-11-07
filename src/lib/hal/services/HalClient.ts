import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { AccessTokenProvider } from '../../oauth2/models/AccessTokenProvider';
import { HalLink } from '../models/HalLink';
import { HalResource, HalResourceConstructor } from '../models/HalResource';
import { CURIEs } from './CURIEs';

/**
 * @hidden
 */
export interface HalClient {
  fetchLinkedResource<T extends HalResource>(
    link: HalLink,
    params: any,
    resourceConstructor: HalResourceConstructor<T>
  ): Promise<T>;

  fetchResource<T extends HalResource>(
    path: string,
    resourceConstructor: HalResourceConstructor<T>
  ): Promise<T>;

  createLinkedResource<T extends HalResource>(
    link: HalLink,
    params: any,
    resource: T,
    resourceConstructor: HalResourceConstructor<T>
  ): Promise<T>;

  performActionThatReturnsResource<T extends HalResource>(
    link: HalLink,
    params: any,
    data: any,
    resourceConstructor: HalResourceConstructor<T>
  ): Promise<T>;

  createResource<T extends HalResource>(
    path: string,
    resource: T,
    resourceConstructor: HalResourceConstructor<T>
  ): Promise<T>;

  parse<T extends HalResource>(
    data: any,
    resourceConstructor: HalResourceConstructor<T>
  ): T;

  serialize<T>(data: T): any;
}

/**
 * @hidden
 */
export interface ResourceRequest {
  url: string;
  method: string;
  data?: any;
}

/**
 * @hidden
 */
export abstract class DefaultHalClient implements HalClient {
  public async fetchLinkedResource<T extends HalResource>(
    link: HalLink,
    params: any,
    resourceConstructor: HalResourceConstructor<T>
  ): Promise<T> {
    let href = link.href;
    if (link.templated) {
      href = CURIEs.expand(href, params);
    }
    return this.fetchResource(href, resourceConstructor);
  }

  public async fetchResource<T extends HalResource>(
    path: string,
    resourceConstructor: HalResourceConstructor<T>
  ): Promise<T> {
    const response = await this.invoke({
      method: 'get',
      url: path
    });
    return this.parse(response.data, resourceConstructor);
  }

  public async createLinkedResource<T extends HalResource>(
    link: HalLink,
    params: any,
    resource: T,
    resourceConstructor: HalResourceConstructor<T>
  ): Promise<T> {
    let href = link.href;
    if (link.templated) {
      href = CURIEs.expand(href, params);
    }
    return this.createResource(href, resource, resourceConstructor);
  }

  public async createResource<T extends HalResource>(
    path: string,
    resource: T,
    resourceConstructor: HalResourceConstructor<T>
  ): Promise<T> {
    const response = await this.invoke({
      data: this.serialize(resource),
      method: 'post',
      url: path
    });
    return this.parse(response.data, resourceConstructor);
  }

  public async performActionThatReturnsResource<T extends HalResource>(
    link: HalLink,
    params: any,
    data: any,
    resourceConstructor: HalResourceConstructor<T>
  ): Promise<T> {
    let href = link.href;

    if (link.templated) {
      href = CURIEs.expand(href, params);
    }

    const response = await this.invoke({
      data: this.serialize(data),
      method: 'post',
      url: href
    });

    return this.parse(response.data, resourceConstructor);
  }

  public parse<T extends HalResource>(
    data: any,
    resourceConstructor: HalResourceConstructor<T>
  ): T {
    const instance: T = new resourceConstructor(data);
    instance.setClient(this);
    return instance;
  }

  public serialize<T>(data: T): any {
    return JSON.parse(JSON.stringify(data));
  }

  protected abstract invoke(request: ResourceRequest): Promise<any>;
}

/**
 * @hidden
 */
export class AxiosHalClient extends DefaultHalClient {
  public client: AxiosInstance;
  private tokenProvider: AccessTokenProvider;

  constructor(tokenProvider: AccessTokenProvider, config: AxiosRequestConfig) {
    super();

    this.tokenProvider = tokenProvider;
    this.client = axios.create(config);
  }

  protected async invoke(request: ResourceRequest): Promise<any> {
    const token = await this.tokenProvider.getToken();

    const requestConfig = {
      ...request,
      headers: {
        Authorization: 'bearer ' + token.access_token
      }
    };

    return this.client.request(requestConfig).catch(
      (error: any): any => {
        if (error.response.data) {
          const newError: any = new Error(
            `Request failed with status code ${
              error.response.status
            }: ${JSON.stringify(error.response.data)}`
          );
          newError.code = error.code;
          newError.response = error.response;
          newError.requets = error.request;
          throw newError;
        }
        throw error;
      }
    );
  }
}
