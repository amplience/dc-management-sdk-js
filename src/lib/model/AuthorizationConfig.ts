/**
 * AuthorizationConfig
 * @description Either OAuth2ClientCredentials or PatTokenCredentials
 */

export interface AuthorizationConfig {
  patToken?: string;
  client_id?: string;
  client_secret?: string;
}
