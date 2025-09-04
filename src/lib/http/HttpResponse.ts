/**
 * @hidden
 */
export interface HttpResponse {
  status: number;
  data: string | Record<string, unknown>;
  headers?: Record<string, string>;
}
