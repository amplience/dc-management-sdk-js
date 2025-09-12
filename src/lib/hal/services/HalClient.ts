import { HttpClient } from '../../http/HttpClient';
import { HttpError } from '../../http/HttpError';
import { HttpMethod, HttpRequest } from '../../http/HttpRequest';
import { HttpResponse } from '../../http/HttpResponse';
import { AuthHeaderProvider } from '../../auth/AuthHeaderProvider';
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
    resourceConstructor: HalResourceConstructor<T>,
    method: HttpMethod.POST | HttpMethod.PATCH | HttpMethod.PUT
  ): Promise<T>;

  performActionWithHeadersThatReturnsResource<T extends HalResource>(
    link: HalLink,
    params: any,
    data: any,
    resourceConstructor: HalResourceConstructor<T>,
    method: HttpMethod.POST | HttpMethod.PATCH | HttpMethod.PUT
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

  performActionWithoutResourceResponse(
    link: HalLink,
    params: any,
    data: any,
    method: HttpMethod.POST | HttpMethod.PATCH | HttpMethod.PUT
  ): Promise<void>;

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
    private authHeaderProvider: AuthHeaderProvider
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
    await this.invoke({
      method: HttpMethod.DELETE,
      url: path,
    });
    return Promise.resolve();
  }

  public async performActionWithoutResourceResponse(
    link: HalLink,
    params: any,
    data: any,
    method:
      | HttpMethod.POST
      | HttpMethod.PATCH
      | HttpMethod.PUT = HttpMethod.POST
  ): Promise<void> {
    let href = link.href;

    if (link.templated) {
      href = CURIEs.expand(href, params);
    }

    await this.invoke({
      data: this.serialize(data),
      method,
      url: href,
    });
    return Promise.resolve();
  }

  public async performActionThatReturnsResource<T extends HalResource>(
    link: HalLink,
    params: any,
    data: any,
    resourceConstructor: HalResourceConstructor<T>,
    method:
      | HttpMethod.POST
      | HttpMethod.PATCH
      | HttpMethod.PUT = HttpMethod.POST
  ): Promise<T> {
    let href = link.href;

    if (link.templated) {
      href = CURIEs.expand(href, params);
    }

    const response = await this.invoke({
      data: this.serialize(data),
      method,
      url: href,
    });

    return this.parse(response.data, resourceConstructor);
  }

  public async performActionWithHeadersThatReturnsResource<
    T extends HalResource
  >(
    link: HalLink,
    params: any,
    data: any,
    resourceConstructor: HalResourceConstructor<T>,
    method:
      | HttpMethod.POST
      | HttpMethod.PATCH
      | HttpMethod.PUT = HttpMethod.POST
  ): Promise<T> {
    let href = link.href;

    if (link.templated) {
      href = CURIEs.expand(href, params);
    }

    const response = await this.invoke({
      data: this.serialize(data),
      method,
      url: href,
    });

    const responseData =
      typeof response.data === 'string'
        ? JSON.parse(JSON.stringify(response.data))
        : response.data;

    return this.parse(
      { ...responseData, ...response.headers },
      resourceConstructor
    );
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
    const authHeader = await this.authHeaderProvider.getAuthHeader();

    const fullRequest: HttpRequest = {
      data: request.data,
      headers: {
        Authorization: authHeader,
      },
      method: request.method,
      url: combineURLs(this.baseUrl, request.url),
    };

    return this.httpClient.request(fullRequest).then((response) => {
      if (response.status === 204) {
        return response;
      }

      if (response.status >= 200 && response.status < 300) {
        if (typeof response.data === 'string') {
          response.data = JSON.parse(JSON.stringify(response.data));
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
