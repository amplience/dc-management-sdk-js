import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { HttpClient } from './HttpClient';
import { HttpRequest } from './HttpRequest';
import { HttpResponse } from './HttpResponse';

/**
 * @hidden
 */
export class AxiosHttpClient implements HttpClient {
  public client: AxiosInstance;

  constructor(private config: AxiosRequestConfig) {
    this.client = axios.create(config);
  }

  public request(config: HttpRequest): Promise<HttpResponse> {
    return this.client
      .request({
        data: config.data,
        headers: config.headers,
        method: config.method,
        url: config.url,
      })
      .then((response) => {
        return {
          data: response.data,
          status: response.status,
        };
      })
      .catch((error) => {
        if (error && error.response) {
          return {
            data: error.response.data,
            status: error.response.status,
          };
        }
        return error;
      });
  }
}
