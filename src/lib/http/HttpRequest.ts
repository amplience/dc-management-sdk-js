/**
 * @hidden
 */
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

/**
 * @hidden
 */
export interface HttpRequest {
  url: string;
  method: HttpMethod;
  data?: unknown;
  headers?: { [key: string]: string };
}
