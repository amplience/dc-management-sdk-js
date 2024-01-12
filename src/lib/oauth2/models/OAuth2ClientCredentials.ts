import { AccessToken } from './AccessToken';

/**
 * OAuth2 Client Credentials
 */
export interface OAuth2ClientCredentials {
  /**
   * Client id
   */
  client_id: string;

  /**
   * Client secret
   */
  client_secret: string;
  pat_token?: AccessToken;
}
