import { HttpRequest } from './HttpRequest';
import { HttpResponse } from './HttpResponse';

export class HttpError extends Error {
  constructor(
    message: string,
    public readonly request?: HttpRequest,
    public readonly response?: HttpResponse
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
