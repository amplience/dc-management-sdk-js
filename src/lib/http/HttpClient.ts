import { HttpRequest } from './HttpRequest';
import { HttpResponse } from './HttpResponse';

/**
 * @hidden
 */
export interface HttpClient {
  request<TResponseBody = Record<string, unknown>>(
    config: HttpRequest
  ): Promise<HttpResponse<TResponseBody>>;
}
