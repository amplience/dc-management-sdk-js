import { HttpRequest } from './HttpRequest';
import { HttpResponse } from './HttpResponse';

/**
 * @hidden
 */
export interface HttpClient {
  request(config: HttpRequest): Promise<HttpResponse>;
}
