import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import axiosRetry, { isNetworkOrIdempotentRequestError } from 'axios-retry';

import { HttpClient } from './HttpClient';
import { HttpRequest } from './HttpRequest';
import { HttpResponse } from './HttpResponse';

const DEFAULT_RETRY_CONFIG = {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error: AxiosError) =>
    isNetworkOrIdempotentRequestError(error) ||
    (error && error.response && error.response.status === 429),
};

/**
 * @hidden
 */
export class AxiosHttpClient implements HttpClient {
  public client: AxiosInstance;

  constructor(private config: AxiosRequestConfig) {
    this.client = axios.create(config);
    axiosRetry(this.client, DEFAULT_RETRY_CONFIG);
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
          headers: response.headers,
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
