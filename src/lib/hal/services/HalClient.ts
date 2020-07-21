import { HttpClient } from '../../http/HttpClient';
import { HttpError } from '../../http/HttpError';
import { HttpMethod, HttpRequest } from '../../http/HttpRequest';
import { HttpResponse } from '../../http/HttpResponse';
import { AccessTokenProvider } from '../../oauth2/models/AccessTokenProvider';
import { combineURLs } from '../../utils/URL';
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

  updateResource<T extends HalResource>(
    path: string,
    resource: T,
    resourceConstructor: HalResourceConstructor<T>
  ): Promise<T>;

  updateLinkedResource<T extends HalResource>(
    link: HalLink,
    params: any,
    resource: T,
    resourceConstructor: HalResourceConstructor<T>
  ): Promise<T>;

  deleteLinkedResource(link: HalLink, params: any): Promise<void>;

  deleteResource(path: string): Promise<void>;

  parse<T extends HalResource>(
    data: any,
    resourceConstructor: HalResourceConstructor<T>
  ): T;

  serialize<T>(data: T): any;
}

/**
 * @hidden
 */
export class DefaultHalClient implements HalClient {
  constructor(
    private baseUrl: string,
    private httpClient: HttpClient,
    private tokenProvider: AccessTokenProvider
  ) {}

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
      method: HttpMethod.GET,
      url: path,
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
      method: HttpMethod.POST,
      url: path,
    });
    return this.parse(response.data, resourceConstructor);
  }

  public async updateResource<T extends HalResource>(
    path: string,
    resource: T,
    resourceConstructor: HalResourceConstructor<T>
  ): Promise<T> {
    const response = await this.invoke({
      data: this.serialize(resource),
      method: HttpMethod.PATCH,
      url: path,
    });
    return this.parse(response.data, resourceConstructor);
  }

  public async updateLinkedResource<T extends HalResource>(
    link: HalLink,
    params: any,
    resource: T,
    resourceConstructor: HalResourceConstructor<T>
  ): Promise<T> {
    let href = link.href;
    if (link.templated) {
      href = CURIEs.expand(href, params);
    }
    return this.updateResource(href, resource, resourceConstructor);
  }

  public async deleteLinkedResource(link: HalLink, params: any): Promise<void> {
    let href = link.href;
    if (link.templated) {
      href = CURIEs.expand(href, params);
    }
    return this.deleteResource(href);
  }

  public async deleteResource(path: string): Promise<void> {
    const response = await this.invoke({
      method: HttpMethod.DELETE,
      url: path,
    });
    return Promise.resolve();
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
      method: HttpMethod.POST,
      url: href,
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

  protected async invoke(request: HttpRequest): Promise<HttpResponse> {
    const token = await this.tokenProvider.getToken();

    const fullRequest: HttpRequest = {
      data: request.data,
      headers: {
        Authorization: 'bearer ' + token.access_token,
      },
      method: request.method,
      url: combineURLs(this.baseUrl, request.url),
    };

    return this.httpClient.request(fullRequest).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        if (typeof response.data === 'string') {
          response.data = JSON.parse(response.data);
        }
        return response;
      } else {
        throw new HttpError(
          `Request failed with status code ${response.status}: ${JSON.stringify(
            response.data
          )}`,
          fullRequest,
          response
        );
      }
    });
  }
}
