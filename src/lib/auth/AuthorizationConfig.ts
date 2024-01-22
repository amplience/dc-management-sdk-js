/**
 * AuthorizationConfig
 * @description Either OAuth2ClientCredentials or a Personal Access Token
 */

export interface AuthorizationConfig {
  patToken?: string;
  client_id?: string;
  client_secret?: string;
}
