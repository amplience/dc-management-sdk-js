/**
 * @hidden
 */
export interface HttpResponse<TResponseBody = Record<string, unknown>> {
  status: number;
  data: string | TResponseBody;
}
