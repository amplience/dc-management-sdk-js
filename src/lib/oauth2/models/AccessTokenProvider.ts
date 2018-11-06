import { AccessToken } from './AccessToken';

export interface AccessTokenProvider {
  getToken(): Promise<AccessToken>;
}
