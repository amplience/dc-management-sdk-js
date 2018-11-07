/**
 * @hidden
 */
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

/**
 * @hidden
 */
export interface HttpRequest {
  url: string;
  method: HttpMethod;
  data?: string | object;
  headers?: { [key: string]: string };
}
